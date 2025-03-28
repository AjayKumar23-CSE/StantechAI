import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postsSlice";
import PostItem from "../components/PostItem";
import SearchBar from "../components/SearchBar";
import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; 
  const maxVisiblePages = 3; 

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setFilteredPosts(posts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase())));
    setCurrentPage(1); 
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const getPaginationRange = () => {
    const range = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      range.push(1); 
      if (currentPage > maxVisiblePages + 1) range.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        range.push(i);
      }
      if (currentPage < totalPages - maxVisiblePages) range.push("...");
      range.push(totalPages); 
    }
    return range;
  };

  return (
    <div className="container">
      <div className="Navbar">
        <h1>Posts</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="row">
            {currentPosts.map((post) => (
              <div key={post.id} className="col-md-4">
                <PostItem post={post} />
              </div>
            ))}
          </div>

          
          <div className="pagination">
            <button
              className="page-button arrow-button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </button>

            {getPaginationRange().map((page, index) => (
              <button
                key={index}
                className={`page-button ${currentPage === page ? "active" : ""}`}
                onClick={() => typeof page === "number" && handlePageChange(page)}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}

            <button
              className="page-button arrow-button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
