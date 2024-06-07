import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createRetrieverTool } from "langchain/tools/retriever";

import { createRetrievalChain } from "langchain/chains/retrieval";

import { ChatGroq } from "@langchain/groq";


let conversationChain: any;

const defineEmbeddings = () => {
  const embeddings = new OllamaEmbeddings({
    model: process.env.OLLAMA_EMDEDDINGS_MODEL,
  });

  return embeddings;
};

const defineVectorStore = async () => {
  const loader = new PuppeteerWebBaseLoader(
    "https://tihalt.com/examples-of-static-websites/"
  );
  // const loader = new PuppeteerWebBaseLoader(
  //   "https://constituteproject.org/constitution/Ghana_1996"
  // );

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  const embeddings = defineEmbeddings();

  const vectoreStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  return vectoreStore;
};

const defineRetriever = async () => {
  const vectoreStore = await defineVectorStore();

  const retriever = vectoreStore.asRetriever({
    k: 2,
  });

  return retriever;
};

const defineModel = () => {
  //   const model = new ChatOllama({
  //     baseUrl: process.env.OLLAMA_URL,
  //       model: process.env.OLLAMA_MODEL,
  //     temperature: 0.2,
  //   });
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
  });

  return model;
};

const definePrompt = () => {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Answer the user's question. Search the context for the answer. context: {context}",
    ],
    ["user", "{input}"],
  ]);

  return prompt;
};

const defineTool = async () => {
  const retriever = await defineRetriever();

  const tool = createRetrieverTool(retriever, {
    name: "constitution_of_ghana",
    description:
      "A tool to retrieve information from the constitution of Ghana",
  });

  return [tool];
};

const createAgent = async () => {
  const model = defineModel();
  const prompt = definePrompt();
  const tool = await defineTool();

  // const chain = await prompt.pipe(model).pipe(tool);

  // return chain;
};

const defineChain = async () => {
  const model = defineModel();
  const prompt = definePrompt();

  const chain = await prompt.pipe(model);

//   const chain = await createStuffDocumentsChain({
//     llm: model,
//     prompt: prompt,
    //   });
    

  return chain;
};

export const defineConverstationChain = async () => {
  const chain = await defineChain();

  conversationChain = await createRetrievalChain({
    combineDocsChain: chain,
    retriever: await defineRetriever(),
  });

  console.log("Conversation chain initialized...");

  return conversationChain;
};

export const aiConfig = {
  get conversationChain() {
    return conversationChain;
  },
  defineChain,
  defineConverstationChain,
};
