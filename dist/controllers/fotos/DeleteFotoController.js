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
exports.DeleteFotoController = void 0;
const DeleteFotosService_1 = require("../../services/fotos/DeleteFotosService");
class DeleteFotoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const foto_id = req.query.foto_id;
            const deleteFotoService = new DeleteFotosService_1.DeleteFotoService();
            const foto = yield deleteFotoService.execute({ foto_id });
            return res.json(foto);
        });
    }
}
exports.DeleteFotoController = DeleteFotoController;
