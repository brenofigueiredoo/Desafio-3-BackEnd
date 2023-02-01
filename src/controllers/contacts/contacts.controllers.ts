import { Request, Response } from "express";
import { Contacts } from "../../entities/contact.entity";
import createContactService from "../../services/contacts/createContact.services";
import deleteContactService from "../../services/contacts/deleteContact.services";
import listContactService from "../../services/contacts/listContact.services";
import updateContactService from "../../services/contacts/updateContact.services";


const createContactController = async (req: Request, res: Response) => {
    const client_id = req.client.id
    const data: Contacts = req.body
    const newContact = await createContactService(data, client_id)
    return res.status(201).json(newContact)
}

const listContactController = async (req: Request, res: Response) => {
    const client_id = req.client.id
    const contact = await listContactService(client_id)
    return res.status(200).json(contact)
}

const updateContactController = async (req: Request, res: Response) => {
    const client_id = req.client.id
    const data: Contacts = req.body
    const id = req.params.id
    const contactUpdated = await updateContactService(data, client_id, id)
    return res.status(200).json(contactUpdated)
}

const deleteContactController = async (req: Request, res: Response) => {
    const client_id = req.client.id
    const id = req.params.id
    const deletedContact = await deleteContactService(client_id, id)
    return res.status(204).json(deletedContact)
}

export {createContactController, listContactController, updateContactController, deleteContactController}