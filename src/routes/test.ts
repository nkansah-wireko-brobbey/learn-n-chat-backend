import { Router } from 'express';

export const test = (router: Router)=>{
    
    router.get('/test', (req, res)=>{
        res.send('Hello World');
    });
    
}