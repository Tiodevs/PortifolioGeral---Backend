import prismaClient from "../../prisma";

interface UserRequest {
    userId: string;
    campamini: string;
    campafull: string;
    titulo: string;
    description: string;
}

class CreateAlbumService {
    async execute({ userId, campamini, campafull, titulo, description }: UserRequest) {
        // Validação dos dados
        if (!userId || !campamini || !campafull || !titulo || !description) {
            throw new Error("Todos os campos são obrigatórios");
        }

        // Verifica se já existe um álbum com o mesmo título
        const albumExists = await prismaClient.album.findFirst({
            where: { titulo }
        });

        if (albumExists) {
            throw new Error("Álbum já cadastrado");
        }

        // Criação do álbum no banco de dados
        const album = await prismaClient.album.create({
            data: {
                userId,
                campamini,
                campafull,
                titulo,
                description
            }
        });

        return album;
    }
}

export { CreateAlbumService };
