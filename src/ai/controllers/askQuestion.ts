import { aiConfig } from "../config/ai.config";

export const askQuestion = async (question: string) => {
    const chain = await aiConfig.defineChain();

    const userInput = {
        input: question
    }
    const response = await chain.invoke(userInput)
    return response;
}

export const askQuestionWithChain = async (question: string) => {
    const conversationChain = aiConfig.conversationChain;
  
    console.log("Conversation chain: ", conversationChain);

    const userInput = {
        input: question
    }
    if (!conversationChain) {
            
        console.log("Conversation chain not initialized.");
       return new Error("Conversation chain not initialized.");
    }
    
    const response = await conversationChain.invoke(userInput);

    return response;
}


