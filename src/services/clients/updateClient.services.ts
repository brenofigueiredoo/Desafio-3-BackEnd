import { hashSync } from "bcryptjs"
import AppDataSource from "../../data-source"
import { Client } from "../../entities/client.entity"
import { AppError } from "../../errors/appError"

const updateClientService = async (data: Partial<Client>, id: string) => {
    const clientRepository = AppDataSource.getRepository(Client)

    const emailClientAlreadyExist = await clientRepository.findOneBy({email: data.email})
    const phoneClientAlreadyExist = await clientRepository.findOneBy({phone: data.phone})

    if(emailClientAlreadyExist || phoneClientAlreadyExist){
        throw new AppError("Client already exists", 403)
    }

    const findClient = await clientRepository.findOneBy({id})

    if(!findClient){
        throw new AppError("Client not found", 404)
    }

    const verifyData = Object.keys(data);

    if(verifyData.includes("id") || verifyData.includes("createdAt") || verifyData.includes("updatedAt")) {
        throw new AppError("Unable to change this key")
    }

    if(verifyData.includes("password")) {
        data.password = hashSync(data.password, 10)
    }

    await clientRepository.update(id, {
        name: data.name ? data.name : findClient.name,
        email: data.email ? data.email : findClient.email,
        password: data.password ? data.password : findClient.password,
        phone: data.phone ? data.phone : findClient.phone,
        updatedAt: new Date,
    })

    const updatedClient = await clientRepository.findOneBy({id})

    if(!updatedClient) {
        throw new AppError("client not updated", 404);
    }

    const {password, ...noPassword} = updatedClient

    return noPassword
}
export default updateClientService