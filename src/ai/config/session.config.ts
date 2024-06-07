import { v4 as uuidv4 } from 'uuid';

interface Session{
    id: string;
    vectorStore?: any;
    retriever?: any;
}

let sessions: Map<string, Session> = new Map();

export const getSession = (id: string) => {
    return sessions.get(id);
}

export const creatSession = () => {
    const id = uuidv4();
    const session: Session = {
        id
    }
    sessions.set(id, session);
    return session;
}