import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postsAPI } from "../../api/postsAPI";

const initialState = {
  posts: {
    list: null,
    loading: false,
    sortOrder: 'none',
    searchQuery: '', 
  },
  postForView: {
    post: null,
    loading: false,
  },
  freshPosts: {
    posts: null,
    loading: false,
  },
};


const updatePostList = (postList, updatedPost) => {
  return postList.map((post) => {
    if (post.id === updatedPost.id) {
      return updatedPost;
    }
    return post;
  });
};


const addNewPost = (postList, newPost) => {
  return [newPost, ...postList];
};


const deletePostFromList = (postList, postId) => {
  return postList.filter((post) => post.id !== postId);
};


export const getPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId) => {
    return await postsAPI.fetchById(postId);
  }
);

export const getPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await postsAPI.fetchPosts();
});

export const getFreshPosts = createAsyncThunk(
  "posts/fetchFreshPosts",
  async (limit) => {
    return await postsAPI.fetchFreshPosts(limit);
  }
);


export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    editPost: (state, action) => {
      state.posts.list = updatePostList(state.posts.list, action.payload);
      state.freshPosts.posts = updatePostList(state.freshPosts.posts,action.payload);

      if (state.postForView.post && state.postForView.post.id === action.payload.id) {
        state.postForView.post = action.payload;
      }
    },
    addPost: (state, action) => {
      const newPost = { ...action.payload };
      newPost.id = new Date().getTime();
      state.posts.list = addNewPost(state.posts.list, newPost);
      state.freshPosts.posts = addNewPost(state.freshPosts.posts, newPost);
    },
    showPost: (state, action) => {
      state.postForView = {
        post: action.payload,
        loading: false,
      };
    },
    deletePost: (state, action) => {
      state.posts.list = deletePostFromList(state.posts.list, action.payload.id);
      state.freshPosts.posts = deletePostFromList(state.freshPosts.posts, action.payload.id);

      state.postForView = {
        post: null,
        loading: false,
      };
    },
    setSortOrder: (state, action) => {
      state.posts.sortOrder = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.posts.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostById.pending, (state, action) => {
      state.postForView = {
        post: null,
        loading: true,
      };
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.postForView = {
        post: action.payload,
        loading: false,
      };
    });
    builder.addCase(getPosts.pending, (state, action) => {
      state.posts = {
        list: null,
        loading: true,
      };
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = {
        list: action.payload,
        loading: false,
      };
    });
    builder.addCase(getFreshPosts.pending, (state, action) => {
      state.freshPosts = {
        posts: null,
        loading: true,
      };
    });
    builder.addCase(getFreshPosts.fulfilled, (state, action) => {
      state.freshPosts = {
        posts: action.payload,
        loading: false,
      };
    });
  },
});

export const { editPost, addPost, showPost, deletePost, setSortOrder, setSearchQuery  } = postsSlice.actions;

export default postsSlice.reducer;


