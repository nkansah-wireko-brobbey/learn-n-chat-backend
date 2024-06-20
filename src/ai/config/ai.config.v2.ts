import { ChatGroq } from "@langchain/groq";
import { FireworksEmbeddings } from "@langchain/community/embeddings/fireworks";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";


import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";

export const createModel = () => {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
  });

  return model;
};

export const createEmbeddings = () => {
  const embeddings = new OllamaEmbeddings({
    model: process.env.OLLAMA_EMDEDDINGS_MODEL,
  });

  return embeddings;
};

export const createResource = async (url: string) => {
  const loader = new CheerioWebBaseLoader(url);

  const docs = await loader.load();

  return docs;
};

export const createSplittedChunksDocs = async (docs: any) => {

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 20,
    });
    
    const splitDocs = await splitter.splitDocuments(docs);
    
    return splitDocs;
    
}

export const createVectorStore = async (splitDocuments: any) => {

  const embeddings = createEmbeddings();

  const vectoreStore = await MemoryVectorStore.fromDocuments(
    splitDocuments,
    embeddings
  );

  return vectoreStore;
};

export const createRetriever = async (vectoreStore: any) => {
  const retriever = vectoreStore.asRetriever({
    k: 2,
  });

  return retriever;
};

export const definePromptTemplate = () => {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You're an AI assistance. Answer the user's question. Search the context first for the answer. context: {context}. If you can't find it, search the model.",
    ],
    ["user", "{input}"],
  ]);

  return prompt;
};

export const defineConverstationChain = async (retriever: any) => {
  const model = createModel();
  const prompt = definePromptTemplate();

  const chain = await prompt.pipe(model);
  const conversationChain = await createRetrievalChain({
    combineDocsChain: chain,
    retriever,
  });

  return conversationChain

};
