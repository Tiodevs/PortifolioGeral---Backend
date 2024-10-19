import prismaClient from "../../prisma"

class ListUserService {
    async execute(){

        const listUsers = prismaClient.user.findMany({
            orderBy: {
                name: 'asc',
            },
            include: {
                album: {
                    include: {
                        fotos: true
                    }
                }
            }
        }) 

        return listUsers
    }
}

export {ListUserService}