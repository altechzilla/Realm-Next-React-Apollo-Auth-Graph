import { useMongo } from "util/database";

export default function PostList() {
  const database = useMongo();
  const { loading, error, data } = database.list("hobbies", {
    limit: 1000,
  });

  if (error) return <div>Error loading posts.</div>;
  if (loading) return <div>Loading</div>;

  const { hobbies } = data;

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
  );
}
