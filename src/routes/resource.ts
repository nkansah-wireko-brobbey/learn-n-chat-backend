import express from 'express'
import { resourceHandler } from '../controllers/resourceHandler'

export function resource(router: express.Router) {
    router.post("/resource", resourceHandler);
}