import prismaClient from "../../prisma"

interface UserRequest {
  userId: string
  campamini: string
  campafull: string
  titulo: string
  description: string
}

class CreateAlbumService {
  async execute({ userId, campamini, campafull, titulo, description }: UserRequest) {

    // Verifica se tem alguim campo vazio
    if (!userId) {
      throw new Error("userId incorreto")
    }
    if (!campamini) {
      throw new Error("campamini não informado")
    }
    if (!campafull) {
      throw new Error("campafull não informada")
    }
    if (!titulo) {
      throw new Error("titulo não informada")
    }
    if (!description) {
      throw new Error("description não informada")
    }


    // Verifica se já existe o use com o titulo igual
    const albumExists = await prismaClient.album.findFirst({
      where: {
        titulo: titulo
      }
    })

    if (albumExists) {
      throw new Error("Album já cadastrado")
    }

    // Cria o album
    const album = await prismaClient.album.create({
      data: {
        userId, 
        campamini, 
        campafull, 
        titulo, 
        description
      }
    })

    return album

  }
}

export { CreateAlbumService }