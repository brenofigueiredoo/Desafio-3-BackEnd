import AppDataSource from "../../data-source";
import { Contacts } from "../../entities/contact.entity";
import { AppError } from "../../errors/appError";

const listContactService = async (client_id: string) => {

    const contactRepository = AppDataSource.getRepository(Contacts)

    const findClientInContact = await contactRepository.findBy({
        client: {
            id: client_id
        }
    })

    if(!findClientInContact) {
        throw new AppError("Client not found");
    }

    return findClientInContact
}

export default listContactService