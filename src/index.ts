import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import { aiConfig } from "./ai/config/ai.config";

import router from './routes';

configDotenv();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());

app.use(router());

//implement error handling
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: err.message });
});

const initializeApp = async () => {
    
    // await aiConfig.defineConverstationChain();
    
    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

}

initializeApp()

