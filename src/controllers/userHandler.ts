import express from "express";
import {
  askQuestionWithChain,
} from "../ai/controllers/askQuestion";
import { initializeUser } from "../ai/controllers/userController";

export async function createUserSessionHandler(
  req: express.Request,
  res: express.Response
) {
  console.log("Body: ", req.body);

  try {

    const response = await initializeUser();
    console.log("Response: ", response);

    return res.json(response);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
}
