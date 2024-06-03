import express from "express";
import { questionHandler } from "../controllers/questionHandler";

export function question(router: express.Router) {
  router.post("/question", questionHandler);
}
