import prismaClient from "../../prisma"

interface Req {
    albumId: string
    titulo: string
    description: string
}

class UpdateAlbumService {
    async execute({ albumId, titulo, description }: Req) {

        const album = await prismaClient.album.findFirst({
            where: {
                id: albumId
            },
        });

        if (!album) {
            return { error: 'Album não encontrado' }
        }

        const newAlbum = await prismaClient.album.update({
            where: { id: albumId },
            data: {
              titulo: titulo,
              description: description
            },
          });
          console.log("Album atualizada")
        return newAlbum
    }
}

export { UpdateAlbumService }