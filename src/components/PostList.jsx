import PostItem from "./PostItem";

const PostList = ({ posts, onDelete, onEdit }) => {
  if (posts.length === 0) {
    return <p>No hay posts disponibles.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default PostList;
