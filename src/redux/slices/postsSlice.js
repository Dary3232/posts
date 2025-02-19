import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 6,
      title: "Post 6",
      image:
        "https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.",
    },
    {
      id: 5,
      title: "Post 5",
      image:
        "https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.",
    },
    {
      id: 4,
      title: "Post 4",
      image:
        "https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.",
    },
    {
      id: 3,
      title: "Post 3",
      image:
        "https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.",
    },
    {
      id: 2,
      title: "Post 2",
      image:
        "https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.",
    },
    {
      id: 1,
      title: "Post 1",
      image:
        "https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.",
    },
  ],
  postForView: null,
  freshPosts: null
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.list = action.payload;
    },
    editPost: (state, action) => {
      // edit post
    },
    getPost: (state, action) => {
      state.postForView = state.list.find((item) => item.id === action.payload)
    },
    getFreshPosts: (state) => {
      state.freshPosts = state.list.slice(0,3)
    },
    addPost: (state, action) => {
      // add new post by date
    },
  },
});

export const { setPosts, getPost, editPost, addPost, getFreshPosts } = postsSlice.actions;

export default postsSlice.reducer;
