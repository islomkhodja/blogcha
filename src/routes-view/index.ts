import express from "express";
const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
  return res.render('index', {
    message: "welcome to my api",
  });
});

export default viewRouter;
