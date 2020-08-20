import { ApolloProvider } from "@apollo/client";
import { useApollo } from "util/apollo";
import { MongoProvider } from "util/database";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <MongoProvider>
        <Component {...pageProps} />
      </MongoProvider>
    </ApolloProvider>
  );
}
