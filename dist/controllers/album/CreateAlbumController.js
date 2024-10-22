"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAlbumController = void 0;
const cloudinary_1 = require("cloudinary");
const CreateAlbumService_1 = require("../../services/album/CreateAlbumService");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class CreateAlbumController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, titulo, description } = req.body;
                const createAlbumService = new CreateAlbumService_1.CreateAlbumService();
                // Verifica se há arquivos na requisição
                if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).json({ error: "Nenhum arquivo foi enviado" });
                }
                const file = req.files['campamini'];
                // Envia a imagem para o Cloudinary
                const resultFile = yield new Promise((resolve, reject) => {
                    cloudinary_1.v2.uploader.upload_stream({}, (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result);
                    }).end(file.data);
                });
                console.log("Upload result:", resultFile);
                const album = yield createAlbumService.execute({
                    userId,
                    campamini: resultFile.url,
                    campafull: resultFile.url,
                    titulo,
                    description
                });
                return res.status(201).json(album);
            }
            catch (error) {
                console.error("Erro ao criar álbum:", error);
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.CreateAlbumController = CreateAlbumController;
