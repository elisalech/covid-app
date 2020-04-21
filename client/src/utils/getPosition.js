export default (left, top, width, height) => {
  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;

  left = wWidth - left > width ? left : left - width;
  top = wHeight - top > height ? top : top - height;

  return { left, top };
};
