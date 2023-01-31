import AppDataSource from "../../data-source"
import { Contacts } from "../../entities/contact.entity"
import { AppError } from "../../errors/appError"

const updateContactService = async (data: Partial<Contacts>, client_id: string, id: string) => {

    const verifyData = Object.keys(data);

    if(verifyData.includes("id") || verifyData.includes("createdAt") || verifyData.includes("updatedAt") || verifyData.includes("client")) {
        throw new AppError("Unable to change this key")
    }
    
    const contactRepository = AppDataSource.getRepository(Contacts)

    const findClientInContact = await contactRepository.findBy({
        client: {
            id: client_id
        }
    })

    if(!findClientInContact) {
        throw new AppError("Client not found");
    }

    const findContact = findClientInContact.find(elem => elem.id === id)
    
    if(!findContact) {
        throw new AppError("Contact not found");
    }

    await contactRepository.update(id, {
        name: data.name ? data.name : findContact.name,
        email: data.email ? data.email : findContact.email,
        phone: data.phone ? data.phone : findContact.phone,
        updatedAt: new Date
    })

    const updatedContact = await contactRepository.findOneBy({id})

    if(!updatedContact) {
        throw new AppError("Contact not updated", 404);
    }

    return updatedContact
}

export default updateContactService