import Constans from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "https://api.nasa.gov/",
    apiKey: "RIMsRhP5lClsqnFzx3eykpkRhnapwzfOkhs7s9pb",
    // apiImageUrl: "https://image.tmdb.org/t/p/",
    // apiImageSize: "w500",
  },
};

const getEnvVars = (env = Constans.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
};

export default getEnvVars;
