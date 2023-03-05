

// initial state

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");

const initialState = {
    pending: false,
    posts: [],
    error: ''
}

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const posts = await response.json();
    return posts;
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchPosts.pending, (state, action) => {
            state.pending = true
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.pending = false,
            state.posts = action.payload
            state.error = ''
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.pending = false;
            state.posts = [];
            state.error = action.error.message
        })


    }
})

module.exports = postSlice.reducer;
module.exports.fetchPosts = fetchPosts;