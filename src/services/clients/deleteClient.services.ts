import AppDataSource from "../../data-source"
import { Client } from "../../entities/client.entity"
import { AppError } from "../../errors/appError"

const deleteClientService = async (id: string) => {
    const clientRepository = AppDataSource.getRepository(Client)

    const findClient = await clientRepository.findOneBy({id})

    if(!findClient){
        throw new AppError("Client not found", 404)
    }

    await clientRepository.delete(id)
}

export default deleteClientService