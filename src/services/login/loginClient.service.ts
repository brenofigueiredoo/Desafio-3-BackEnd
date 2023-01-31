import { compare, compareSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { IClientLogin } from "../../interfaces";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/appError";

const loginClientService = async (data: IClientLogin) => {
    const {email, password} = data

    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({email})

    if(!client) {
        throw new AppError("Invalid email or password", 404);  
    }

    const passwordValid =  compareSync(password, client.password)
    
    if(!passwordValid) {
        throw new AppError("Invalid email or password", 404);  
    }

    const token = jwt.sign(
        { email: client.email },
        process.env.SECRET_KEY as string,
        { expiresIn: "24h", subject: client.id }
      );
    
    return token;
}

export default loginClientService