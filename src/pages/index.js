import { allHobbies, allHobbiesVars } from "util/queries/hobbies";

import Header from "../components/Header";
import Submit from "../components/Submit";
import PostList from "../components/PostList";

import { initializeApollo } from "util/apollo";

const IndexPage = () => (
  <>
    <Header />
    <Submit />
    <PostList />
  </>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: allHobbies,
    variables: allHobbiesVars,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default IndexPage;
