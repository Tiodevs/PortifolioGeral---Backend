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
exports.CreateFotosService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateFotosService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ albumId, foto }) {
            // Verifica se tem alguim campo vazio
            if (!albumId) {
                throw new Error("albumId incorreto");
            }
            if (!foto) {
                throw new Error("foto não informado");
            }
            // Cria uma foto
            const fotos = yield prisma_1.default.fotos.create({
                data: {
                    albumId,
                    foto
                }
            });
            return fotos;
        });
    }
}
exports.CreateFotosService = CreateFotosService;
