import { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { data, isPending, error, getAll, post, put, remove } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const handleSubmit = async (formData) => {
    if (editingPost) {
      await put(editingPost.id, { ...formData, id: editingPost.id });
      setEditingPost(null);
    } else {
      await post(formData);
    }
  };

  const handleEdit = (selectedPost) => {
    setEditingPost(selectedPost);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    await remove(id);
  };

  const handleCancel = () => {
    setEditingPost(null);
  };

  return (
    <div style={styles.container}>
      <h1>Posts App</h1>

      <PostForm
        onSubmit={handleSubmit}
        editingPost={editingPost}
        onCancel={handleCancel}
      />

      {isPending && <p>Cargando...</p>}

      {error && <p style={styles.error}>{error}</p>}

      <PostList posts={data} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px",
  },
  error: {
    color: "red",
    marginBottom: "12px",
  },
};

export default Home;
