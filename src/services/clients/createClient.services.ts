import AppDataSource from "../../data-source"
import { Client } from "../../entities/client.entity"
import { AppError } from "../../errors/appError"
import { hashSync } from "bcryptjs"

const createClientService = async (data: Client) => {
    
    const {name, email, phone} = data

    if(!name || !phone || !email || !data.password) {
        throw new AppError("Body invalid");
    }

    const clientRepository = AppDataSource.getRepository(Client)

    const clientAlreadyExists = await clientRepository.findOneBy({email})

    if(clientAlreadyExists) {
        throw new AppError("this client already exists", 403)
    }

    if(phone.length > 11) {
        throw new AppError("must contain 11 digits", 403)
    }

    const newClient = clientRepository.create({
        name,
        email,
        password: hashSync(data.password, 10),
        phone
    })

    await clientRepository.save(newClient)

    const {password, ...noPassword} = newClient

    return noPassword
}
export default createClientService