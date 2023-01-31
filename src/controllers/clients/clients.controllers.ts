import { Request, Response } from "express";
import { Client } from "../../entities/client.entity";
import { IClientLogin } from "../../interfaces";
import createClientService from "../../services/clients/createClient.services";
import deleteClientService from "../../services/clients/deleteClient.services";
import listClientService from "../../services/clients/listClient.service";
import loginClientService from "../../services/login/loginClient.service";
import updateClientService from "../../services/clients/updateClient.services";

const createClientController = async (req: Request, res: Response) => {
    const data: Client = req.body
    const newClient = await createClientService(data)
    return res.status(201).json(newClient)
}

const listClientController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const data = await listClientService(id)
    return res.status(200).json(data)

}

const updateClientController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const data: Client = req.body
    const clientUpdated = await updateClientService(data, id) 
    return res.status(200).json(clientUpdated) 
}

const deleteClientController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const clientDeleted = await deleteClientService(id)
    return res.status(204).json()
}

const loginClientController = async (req: Request, res: Response) => {
    const data: IClientLogin = req.body
    const login = await loginClientService(data)
    return res.status(200).json(login)
}

export {createClientController, listClientController, updateClientController, deleteClientController, loginClientController}