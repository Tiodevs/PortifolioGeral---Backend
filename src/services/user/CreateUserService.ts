import { hash, genSalt } from 'bcryptjs'
import prismaClient from "../../prisma"

interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {

    // Verifica se tem alguim campo vazio
    if (!email) {
      throw new Error("E-mail incorreto")
    }
    if (!name) {
      throw new Error("Nome não informado")
    }
    if (!password) {
      throw new Error("Senha não informada")
    }


    // Verifica se já existe o use com o email
    const userExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (userExists) {
      throw new Error("Usuário já cadastrado")
    }

    // Cria a criptografia da senha
    const hashedPassword = await hash(password, 8)

    // Cria o user
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
      }
    })

    return user

  }
}

export { CreateUserService }