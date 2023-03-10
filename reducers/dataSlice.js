const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");
const baseUrl = require("../url/url");
const initialState = {
  data: [],
  loading: false,
  err: null,
};

const fetchData = createAsyncThunk("fetchData/getData", async (arr) => {
  let str = "?";
  await arr.forEach((ele, i) => {
    str += i !== arr.length - 1 ? `tags_like=${ele}&` : `tags_like=${ele}`;
  });
  const res = await fetch(`${baseUrl.videos}${str}`);
  const resData = await res.json();
  const sorted = await resData.sort((obj1, obj2) => {
    const numA = parseInt(obj1.views.match(/\d+/));
    const numB = parseInt(obj2.views.match(/\d+/));
    if (numA > numB) {
      return -1;
    }
    if (numA < numB) {
      return 1;
    }
    return 0;
  });
  return sorted;
});

const dataSlice = createSlice({
  name: "datasGet/slice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.err = action.payload;
    });
  },
});

module.exports = dataSlice.reducer;
module.exports.fetchData = fetchData;
