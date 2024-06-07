import { createResource, createRetriever, createSplittedChunksDocs, createVectorStore } from "../config/ai.config.v2";
import { creatSession, getSession } from "../config/session.config"

export const initializeUser = async () => {

    const session = creatSession();
    const initialResource = await createResource(
      "https://tihalt.com/examples-of-static-websites/"
  );
  
    const splitDocs = await createSplittedChunksDocs(initialResource);
    const vectoreStore = await createVectorStore(splitDocs);
    session.vectorStore = vectoreStore;

    const retriever = await createRetriever(vectoreStore);
    session.retriever = retriever;

    return session.id;
}

export const getUserSession = (id: string) => {

    const session = getSession(id);

    return session;
}