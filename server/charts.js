import { Router } from "express";

const ChartsRouter = Router();

ChartsRouter.get("/", (req, res) => {
  console.log("ChartsRouter");
  res.send("ChartsRouter");
});

export default ChartsRouter;
