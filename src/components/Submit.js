import { useMongo } from "util/database";

export default function Submit() {
  const database = useMongo();
  const { loading, insert } = database.insertHobby();

  const handleSubmit = (event) => {
    const data = new window.FormData(event.target);
    const name = data.get("name");
    const slug = name.toLowerCase().replace(" ", "-");

    insert(
      { name, slug },
      {
        limit: 1000,
      }
    );

    event.preventDefault();
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a New Entry</h1>
      <input placeholder="name" name="name" type="text" required />

      <button type="submit" disabled={loading}>
        Create
      </button>
    </form>
  );
}
