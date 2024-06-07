import express, { Router } from "express";
import { test } from "./test";
import { question } from "./question";
import { createUserSession } from "./user";
import { resource } from "./resource";

const router = express.Router();

export default (): express.Router => {
  question(router);

  test(router);

  createUserSession(router);

  resource(router);

  return router;
};
