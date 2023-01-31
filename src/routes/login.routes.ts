import { Router } from "express";
import { loginClientController } from "../controllers/clients/clients.controllers";

const loginRoutes = Router()

loginRoutes.post("", loginClientController)

export default loginRoutes