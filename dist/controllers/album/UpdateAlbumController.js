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
exports.UpdateAlbumController = void 0;
const UpdateAlbumService_1 = require("../../services/album/UpdateAlbumService");
class UpdateAlbumController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { albumId, titulo, description } = req.body;
            const updateAlbumService = new UpdateAlbumService_1.UpdateAlbumService();
            const album = yield updateAlbumService.execute({ albumId, titulo, description });
            return res.json(album);
        });
    }
}
exports.UpdateAlbumController = UpdateAlbumController;
