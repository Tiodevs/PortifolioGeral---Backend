import { Request, Response } from "express";
import { DeleteAlbumService } from "../../services/album/DeleteAlbumService";

class DeleteAlbumController {
  async handle(req: Request, res: Response) {
    const album_id = req.query.album_id as string

    const deleteAlbumService = new DeleteAlbumService()

    const album = await deleteAlbumService.execute({ album_id })

    return res.json(album)
  }
}

export { DeleteAlbumController }