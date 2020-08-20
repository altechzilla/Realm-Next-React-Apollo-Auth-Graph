import { gql, useQuery } from '@apollo/client'

export const ALL_POSTS_QUERY = gql`
  query Hobbies($limit: Int!) {
    hobbies(sortBy: NAME_ASC, limit: $limit) {
      _id
      name
      slug
    }
  }
`

export const allPostsQueryVars = {
  limit: 1000,
}

export default function PostList() {
  const { loading, error, data } = useQuery(ALL_POSTS_QUERY, {
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true,
  })

  if (error) return <div>Error loading posts.</div>
  if (loading) return <div>Loading</div>

  const { hobbies } = data

  return (
    <section>
      <ul>
        {hobbies.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <a href={post.slug}>{post.name}</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
