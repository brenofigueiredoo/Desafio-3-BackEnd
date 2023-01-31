import AppDataSource from "../../data-source"
import { Client } from "../../entities/client.entity"
import { AppError } from "../../errors/appError"

const listClientService = async (id: string) => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({id})

    if(!client) {
        throw new AppError("Client not found", 404)
    }

    const {password, ...noPassword} = client

    return noPassword
}

export default listClientService