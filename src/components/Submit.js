import { gql, useMutation } from '@apollo/client'
import { ALL_POSTS_QUERY, allPostsQueryVars } from './PostList'

const CREATE_POST_MUTATION = gql`
  mutation insertOneHobby($name: String!, $slug: String!) {
    insertOneHobby(data: { name: $name, slug: $slug }) {
      _id
      name
      slug
    }
  }
`

export default function Submit() {
  const [insertOneHobby, { loading }] = useMutation(CREATE_POST_MUTATION)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const name = formData.get('name')
    const slug = name.toLowerCase().replace(' ', '-')
    form.reset()

    insertOneHobby({
      variables: { name, slug },
      update: (proxy, { data: { insertOneHobby } }) => {
        const data = proxy.readQuery({
          query: ALL_POSTS_QUERY,
          variables: allPostsQueryVars,
        })
        // Update the cache with the new post at the top of the list
        proxy.writeQuery({
          query: ALL_POSTS_QUERY,
          data: {
            ...data,
            hobbies: [insertOneHobby, ...data.hobbies],
          },
          variables: allPostsQueryVars,
        })
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a New Entry</h1>
      <input placeholder="name" name="name" type="text" required />

      <button type="submit" disabled={loading}>
        Create
      </button>
    </form>
  )
}
