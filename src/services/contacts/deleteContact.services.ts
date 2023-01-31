import AppDataSource from "../../data-source"
import { Contacts } from "../../entities/contact.entity"
import { AppError } from "../../errors/appError"


const deleteContactService = async (client_id: string, id: string) => {

    const contactsRepository = AppDataSource.getRepository(Contacts)

    const findClientInContact = await contactsRepository.findBy({
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

    await contactsRepository.delete(id)
}

export default deleteContactService