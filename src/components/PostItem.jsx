import { Link } from "react-router-dom";
import "./PostItem.scss";

const PostItem = ({ post }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body.substring(0, 80)}...</p>
        <Link to={`/posts/${post.id}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
