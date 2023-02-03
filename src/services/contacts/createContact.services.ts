import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Contacts } from "../../entities/contact.entity";
import { AppError } from "../../errors/appError";

const createContactService = async (data: Contacts, client_id: string) => {
    
    const {name, phone} = data

    if(!name || !phone || !data.email) {
        throw new AppError("Body invalid");
    }

    const contactRepository = AppDataSource.getRepository(Contacts)
    const clientRepository = AppDataSource.getRepository(Client)
    
    const findClient = await clientRepository.findOneBy({id: client_id})
    const findContact = await contactRepository.findBy({
        client: {
            id: client_id
        }
    })

    findContact.find(elem => {
        if(elem.phone === phone || elem.email === data.email) {
            throw new AppError("Contact is already registered");
        }
    })
    
    const newContact = contactRepository.create({
        name,
        email: data.email,
        phone,
        client: findClient
    })
    
    await contactRepository.save(newContact)

    const {password, email, createdAt, updatedAt, ...restClient} = newContact.client

    const returnContact = {
        id: newContact.id,
        name,
        email: data.email,
        phone,
        client: restClient,
        createdAt: newContact.createdAt
    }

    return returnContact
}

export default createContactService