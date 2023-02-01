import { Router } from "express";
import { createContactController, deleteContactController, listContactController, updateContactController } from "../controllers/contacts/contacts.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuthClient.middleware";
import verifyBodyContactMiddleware from "../middlewares/verifyBodyContact.middleware";

const contactsRoutes = Router()

contactsRoutes.post("", ensureAuthMiddleware, createContactController)
contactsRoutes.get("", ensureAuthMiddleware, listContactController)
contactsRoutes.patch("/:id", ensureAuthMiddleware, verifyBodyContactMiddleware, updateContactController)
contactsRoutes.delete("/:id", ensureAuthMiddleware, deleteContactController)

export default contactsRoutes