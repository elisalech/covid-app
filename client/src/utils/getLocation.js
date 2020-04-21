export default (func) => {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(func);
  } else {
    console.log("getLocation else");
  }
};
