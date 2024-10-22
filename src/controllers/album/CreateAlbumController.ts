import { Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CreateAlbumService } from "../../services/album/CreateAlbumService";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export class CreateAlbumController {
    async handle(req: Request, res: Response) {
        try {
            const { userId, titulo, description } = req.body;

            const createAlbumService = new CreateAlbumService();

            // Verifica se há arquivos na requisição
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ error: "Nenhum arquivo foi enviado" });
            }

            const file: any = req.files['campamini'];

            // Envia a imagem para o Cloudinary
            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({}, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result as UploadApiResponse);
                }).end(file.data);
            });

            console.log("Upload result:", resultFile);

            const album = await createAlbumService.execute({
                userId,
                campamini: resultFile.url,
                campafull: resultFile.url,
                titulo,
                description
            });

            return res.status(201).json(album);
        } catch (error) {
            console.error("Erro ao criar álbum:", error);
            return res.status(500).json({ error: error.message });
        }
    }
}
