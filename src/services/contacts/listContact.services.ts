import AppDataSource from "../../data-source";
import { Contacts } from "../../entities/contact.entity";
import { AppError } from "../../errors/appError";

const listContactService = async (id: string, client_id: string) => {

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
    
    return findContact
}

export default listContactService