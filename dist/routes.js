"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Middlewares
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
// Controllers
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const EditActiveUserController_1 = require("./controllers/user/EditActiveUserController");
const ListeUserController_1 = require("./controllers/user/ListeUserController");
const CreateAlbumController_1 = require("./controllers/album/CreateAlbumController");
const CreateFotosController_1 = require("./controllers/fotos/CreateFotosController");
const DeleteFotoController_1 = require("./controllers/fotos/DeleteFotoController");
const DeleteAlbumController_1 = require("./controllers/album/DeleteAlbumController");
const UpdateAlbumController_1 = require("./controllers/album/UpdateAlbumController");
const router = (0, express_1.Router)();
exports.router = router;
// Configuração do envio de arquivos
router.get('/', (req, res) => {
    return res.send(`
    <h1 style='font-family: sans-serif'>
        API Portifolio!!! 👩‍🏫
    <h1>
  `);
});
// Cria um novo usuario
router.post('/users', new CreateUserController_1.CreateUserController().handle);
// Pega todos os usuarios e seus cursos
router.get('/users', new ListeUserController_1.ListUserContoller().handle);
// Desativa um usuario
router.post('/users/edit', isAuthenticated_1.isAuthenticated, new EditActiveUserController_1.EditActiveUserController().handle);
// Faz a altenticação de login do usuario
router.post('/login', new AuthUserController_1.AuthUserController().handle);
// Pega os detalhes do usuario logado
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
// ALBUM //
// Cria um album
router.post('/album', new CreateAlbumController_1.CreateAlbumController().handle);
// Delta um album
router.delete('/album', new DeleteAlbumController_1.DeleteAlbumController().handle);
// Edita um album
router.put('/album', new UpdateAlbumController_1.UpdateAlbumController().handle);
// FOTOS //
// Adicionar foto no album
router.post('/foto', new CreateFotosController_1.CreateFotosController().handle);
// Deltar foto
router.delete('/foto', new DeleteFotoController_1.DeleteFotoController().handle);
