import { createResource, createSplittedChunksDocs, createVectorStore } from "../config/ai.config.v2";
import { getSession } from "../config/session.config";

export async function updateVectoreStore(url: string, id: string) {

    try {
        const existingSession = await getSession(id);
    
        if(!existingSession){
            return new Error("Session not found");
        }
        const docs = await createResource(url);
        const splitDocs = await createSplittedChunksDocs(docs);
    
        if(existingSession.vectorStore){
            existingSession.vectorStore.addDocuments(splitDocs);
            existingSession.retriever = existingSession.vectorStore.asRetriever({k: 2});
        }
        else{
            const vectoreStore = await createVectorStore(splitDocs);
            existingSession.vectorStore = vectoreStore;
            existingSession.retriever = vectoreStore.asRetriever({k: 2});
        }
        return "Vectore store updated successfully";
        
    } catch (error) {

        return error;
        
    }



}