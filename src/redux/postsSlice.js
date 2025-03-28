import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, fetchPostById } from "../api/api";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  return await fetchPosts();
});

export const getPostDetails = createAsyncThunk("posts/getPostDetails", async (id) => {
  return await fetchPostById(id);
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    selectedPost: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
      });
  },
});
export const { clearSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
