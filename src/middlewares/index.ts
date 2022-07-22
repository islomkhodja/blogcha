export default (req, res, next) => {
  console.log("auth middleware was ran");
  next();
};
