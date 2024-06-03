import express from "express";
import { askQuestion, askQuestionWithChain  } from "../ai/controllers/askQuestion";

export async function questionHandler(
  req: express.Request,
  res: express.Response
) {
    // console.log("Req: ", req)
    console.log("Body: ",req.body)
    
    try {
        const { question } = req.body;

      console.log("Question: ", question);
        //   const response = await askQuestion(question);
      const response = await askQuestionWithChain(question);
      console.log("Response: ", response);
    
      return res.json(response);
        
    } catch (e:any) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }

}
