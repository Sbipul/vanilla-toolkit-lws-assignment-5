const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");
const baseUrl = require("../url/url");

// initial state
const initialState = {
  video: {},
  loading: false,
  err: null,
};

// fetch api
const fetchVideos = createAsyncThunk("fetchvideos/getvideos", async () => {
  const res = await fetch(baseUrl.videos);
  const resData = await res.json();
  return resData;
});

// video reducer
const videosSlice = createSlice({
  name: "videosGet/slice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.video = action.payload;
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.loading = false;
      state.video = {};
      state.err = action.payload;
    });
  },
});

module.exports = videosSlice.reducer;
module.exports.fetchVideos = fetchVideos;
