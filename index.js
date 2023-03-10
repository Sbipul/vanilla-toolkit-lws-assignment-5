const { fetchData } = require("./reducers/dataSlice");
const { fetchVideos } = require("./reducers/videoSlice");
const store = require("./store/store");

store.subscribe(() => {
  //   console.log(store.getState())
});
const eventFire = async () => {
  await store.dispatch(fetchVideos());
  await store.dispatch(fetchData(store.getState()?.video?.video?.tags));
};
eventFire();
