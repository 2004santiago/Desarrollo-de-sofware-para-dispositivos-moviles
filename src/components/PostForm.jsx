import { useEffect, useState } from "react";

const PostForm = ({ onSubmit, editingPost, onCancel }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    onSubmit({ title, body, userId: 1 });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{editingPost ? "Editar Post" : "Nuevo Post"}</h2>

      <input
        type="text"
        placeholder="Titulo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Contenido"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={styles.textarea}
      />

      <div style={styles.buttons}>
        <button type="submit" style={styles.submitBtn}>
          {editingPost ? "Guardar cambios" : "Crear post"}
        </button>

        {editingPost && (
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

const styles = {
  form: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "24px",
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    minHeight: "80px",
  },
  buttons: {
    display: "flex",
    gap: "8px",
  },
  submitBtn: {
    padding: "8px 16px",
    backgroundColor: "#2dd36f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "8px 16px",
    backgroundColor: "#92949c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PostForm;
