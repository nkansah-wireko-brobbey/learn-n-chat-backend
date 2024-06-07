import express from "express";
import { createUserSessionHandler } from "../controllers/userHandler";

export function createUserSession(router: express.Router) {
    router.post("/user", createUserSessionHandler);
}