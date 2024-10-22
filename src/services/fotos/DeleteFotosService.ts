import  prismaClient  from "../../prisma"

interface ItemRequest {
    foto_id: string
}

class DeleteFotoService {
  async execute({ foto_id }: ItemRequest) {
      
    const fotos = await prismaClient.fotos.delete({
      where: {
        id: foto_id
      }
    })

    return fotos
  }
}

export { DeleteFotoService }