import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetails, clearSelectedPost } from "../redux/postsSlice";
import "./PostDetail.scss";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPost, status } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(clearSelectedPost());  
    dispatch(getPostDetails(id));
  }, [dispatch, id]);

  if (status === "loading" || !selectedPost) return <p>Loading...</p>;

  return (
    <div className="post-detail">
      <h1 className="post-title">{selectedPost.title}</h1>
      <p className="post-body">{selectedPost.body}</p>
      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default PostDetail;
