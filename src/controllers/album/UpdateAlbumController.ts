import { Request, Response } from "express";
import { UpdateAlbumService } from "../../services/album/UpdateAlbumService";

class UpdateAlbumController {
  async handle(req: Request, res: Response) {
    const {albumId, titulo, description} = req.body

    const updateAlbumService = new UpdateAlbumService()

    const album = await updateAlbumService.execute({ albumId, titulo, description })

    return res.json(album)
  }
}

export { UpdateAlbumController }