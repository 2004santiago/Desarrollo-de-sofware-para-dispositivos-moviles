const PostItem = ({ post, onDelete, onEdit }) => {
  return (
    <div style={styles.card}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div style={styles.buttons}>
        <button onClick={() => onEdit(post)} style={styles.editBtn}>
          Editar
        </button>
        <button onClick={() => onDelete(post.id)} style={styles.deleteBtn}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: "#fff",
  },
  buttons: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
  },
  editBtn: {
    padding: "6px 12px",
    backgroundColor: "#3880ff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#eb445a",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PostItem;
