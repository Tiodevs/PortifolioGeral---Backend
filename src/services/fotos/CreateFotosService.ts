import prismaClient from "../../prisma"

interface UserRequest {
  albumId: string
  foto: string
}

class CreateFotosService {
  async execute({ albumId, foto }: UserRequest) {

    // Verifica se tem alguim campo vazio
    if (!albumId) {
      throw new Error("albumId incorreto")
    }
    if (!foto) {
      throw new Error("foto não informado")
    }

    // Cria uma foto
    const fotos = await prismaClient.fotos.create({
      data: {
        albumId, 
        foto
      }
    })

    return fotos

  }
}

export { CreateFotosService }