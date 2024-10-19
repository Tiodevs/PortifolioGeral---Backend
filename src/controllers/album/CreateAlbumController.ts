import { Request, Response } from "express"
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { CreateAlbumService } from "../../services/album/CreateAlbumService"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

export class CreateAlbumController {
    async handle(req: Request, res: Response) {

        const { userId, titulo, description } = req.body

        const createAlbumService = new CreateAlbumService()

        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error("error upload file image")
        } else {

            // Enviar a imagem para a api docaludnary
            const file: any = req.files['campamini']

            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({}, function (error, result) {
                    if (error) {
                        reject(error)
                        return
                    }

                    resolve(result)
                }).end(file.data)
            })

            console.log(resultFile)

            const album = await createAlbumService.execute({
                userId, 
                campamini: resultFile.url, 
                campafull: resultFile.url, 
                titulo, 
                description
            })

            return res.json(album)
        }

    }
}