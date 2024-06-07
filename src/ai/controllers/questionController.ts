import { defineConverstationChain } from "../config/ai.config.v2";
import { getUserSession } from "./userController";

export const askQuestion = async (question: string, id: string) => {

    if (!id) {
        return new Error("User session not initialized.");
    }

    try {

        const session = getUserSession(id);

        if (!session) {
            return new Error("User session not initialized.");
        }

        const retriever = session.retriever;

        const conversationChain = await defineConverstationChain(retriever)

        const userInput = {
            input: question,
        };

         if (!conversationChain) {
           console.log("Conversation chain not initialized.");
           return new Error("Conversation chain not initialized.");
        }
        
        const response = await conversationChain.invoke(userInput);

        return response;
        
    }catch(err: any) {
        console.log(err);
        return new Error("An error occured while processing your request.");
    }

}