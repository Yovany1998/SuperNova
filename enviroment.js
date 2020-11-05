import Constans from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "https://api.nasa.gov/",
    apiKey: "RIMsRhP5lClsqnFzx3eykpkRhnapwzfOkhs7s9pb",
    apisearch: "search?q",
    apiImage: "https://images-api.nasa.gov",
  },
};

const getEnvVars = (env = Constans.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
};

export default getEnvVars;
