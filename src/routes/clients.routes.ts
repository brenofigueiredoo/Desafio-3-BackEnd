import { Router } from "express";
import { createClientController, deleteClientController, listClientController, updateClientController } from "../controllers/clients/clients.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuthClient.middleware";
import verifyBodyClientMiddleware from "../middlewares/verifyBodyClient.middleware";

const clientsRoutes = Router()

clientsRoutes.post("", createClientController)
clientsRoutes.get("/me", ensureAuthMiddleware, listClientController)
clientsRoutes.patch("/me", ensureAuthMiddleware, verifyBodyClientMiddleware, updateClientController)
clientsRoutes.delete("/me", ensureAuthMiddleware, deleteClientController)

export default clientsRoutes