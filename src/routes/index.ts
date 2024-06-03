import express, { Router } from "express";
import { test } from "./test";
import { question } from "./question";

const router = express.Router();

export default (): express.Router => {
  question(router);

  test(router);

  return router;
};
