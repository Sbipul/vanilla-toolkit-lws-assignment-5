const videoSlice = require("../reducers/videoSlice");
const dataSlice = require("../reducers/dataSlice");
const { configureStore } = require("@reduxjs/toolkit");
const { default: logger } = require("redux-logger");

const store = configureStore({
  reducer: {
    video: videoSlice,
    data: dataSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
