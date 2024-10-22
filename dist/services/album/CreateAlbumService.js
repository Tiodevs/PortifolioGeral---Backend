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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAlbumService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateAlbumService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, campamini, campafull, titulo, description }) {
            // Validação dos dados
            if (!userId || !campamini || !campafull || !titulo || !description) {
                throw new Error("Todos os campos são obrigatórios");
            }
            // Verifica se já existe um álbum com o mesmo título
            const albumExists = yield prisma_1.default.album.findFirst({
                where: { titulo }
            });
            if (albumExists) {
                throw new Error("Álbum já cadastrado");
            }
            // Criação do álbum no banco de dados
            const album = yield prisma_1.default.album.create({
                data: {
                    userId,
                    campamini,
                    campafull,
                    titulo,
                    description
                }
            });
            return album;
        });
    }
}
exports.CreateAlbumService = CreateAlbumService;
