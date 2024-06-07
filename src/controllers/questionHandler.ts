import express from "express";
import { askQuestionWithChain  } from "../ai/controllers/askQuestion";
import { askQuestion } from "../ai/controllers/questionController";

export async function questionHandler(
  req: express.Request,
  res: express.Response
) {
console.log("Body: ", req.body);

try {
  const { question, id } = req.body;

  console.log("Question: ", question);
  const response = await askQuestion(question, id);
  console.log("Response: ", response);

  return res.json(response);
} catch (e: any) {
  console.log(e);
  return res.status(500).json({ error: e.message });
}

}
