import  prismaClient  from "../../prisma"

interface ItemRequest {
    album_id: string
}

class DeleteAlbumService {
  async execute({ album_id }: ItemRequest) {
      
    const fotos = await prismaClient.fotos.deleteMany({
      where: {
        albumId: album_id
      }
    })

    const album = await prismaClient.album.delete({
      where: {
        id: album_id
      }
    })

    return album
  }
}

export { DeleteAlbumService }