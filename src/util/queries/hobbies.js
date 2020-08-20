import { gql } from "@apollo/client";

export const allHobbies = gql`
  query Hobbies($limit: Int!) {
    hobbies(sortBy: NAME_ASC, limit: $limit) {
      _id
      name
      slug
    }
  }
`;

export const allHobbiesVars = {
  limit: 1000,
};

export const createHobby = gql`
  mutation insertOneHobby($name: String!, $slug: String!) {
    insertOneHobby(data: { name: $name, slug: $slug }) {
      _id
      name
      slug
    }
  }
`;
