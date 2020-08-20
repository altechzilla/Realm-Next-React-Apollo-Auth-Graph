import { useContext, createContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

/**
 *
 */

const mongoContext = createContext();

/**
 * Create the Mongo database provider.
 */

export function useMongoProvider() {
  /**
   * Return a read query by collection.
   */

  let read = (collection) => {
    return gql`
		query ($limit: Int) {
			${collection}(sortBy: NAME_ASC, limit: $limit) {
			  _id
			  name
			  slug
			}
		 }
	`;
  };

  /**
   * List all the entries in a collection.
   *
   * @param {string} collection The collection to insert data into.
   *
   * Example:
   * mongo.list('hobbies');
   */

  const list = (collection, variables = {}) => {
    return useQuery(read(collection), {
      variables: variables,
      notifyOnNetworkStatusChange: true,
    });
  };

  /**
   * Insert an entry/multiple entries in a database collection.
   *
   * @param {string} collection The collection to insert data into.
   * @param {object} data The data object or array of objects to be inserted.
   *
   * Example:
   * mongo.insert('hobbies', {
   *    name: 'hellow',
   * });
   */

  const insertHobby = () => {
    const [insertOneHobby, { loading }] = useMutation(gql`
      mutation insertOneHobby($name: String!, $slug: String!) {
        insertOneHobby(data: { name: $name, slug: $slug }) {
          _id
          name
          slug
        }
      }
    `);

    const insert = (data, variables) => {
      insertOneHobby({
        variables: data,
        update: (proxy, { data: { insertOneHobby } }) => {
          const data = proxy.readQuery({
            query: read("hobbies"),
            variables: variables,
          });

          // Update the cache with the new post at the top of the list
          proxy.writeQuery({
            query: read("hobbies"),
            data: {
              ...data,
              hobbies: [insertOneHobby, ...data.hobbies],
            },
            variables: variables,
          });
        },
      });
    };

    return { insert, loading };
  };

  return {
    read,
    list,
    insertHobby,
  };
}

/**
 * Create the Apollo provider.
 */

export function MongoProvider({ children }) {
  return (
    <mongoContext.Provider value={useMongoProvider()}>
      {children}
    </mongoContext.Provider>
  );
}

/**
 * Create the Mongo hook.
 */

export const useMongo = () => {
  return useContext(mongoContext);
};
