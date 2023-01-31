import { Router } from "express";
import { createClientController, deleteClientController, listClientController, updateClientController } from "../controllers/clients/clients.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuthClient.middleware";
import ensureOwnerMiddleware from "../middlewares/ensureOwner.middleware";
import verifyBodyClientMiddleware from "../middlewares/verifyBodyClient.middleware";

const clientsRoutes = Router()

clientsRoutes.post("", createClientController)
clientsRoutes.get("/:id", ensureAuthMiddleware, ensureOwnerMiddleware, listClientController)
clientsRoutes.patch("/:id", ensureAuthMiddleware, ensureOwnerMiddleware, verifyBodyClientMiddleware, updateClientController)
clientsRoutes.delete("/:id", ensureAuthMiddleware, ensureOwnerMiddleware, deleteClientController)

export default clientsRoutes