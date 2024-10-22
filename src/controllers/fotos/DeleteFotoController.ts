import { Request, Response } from "express";
import { DeleteFotoService } from "../../services/fotos/DeleteFotosService";

class DeleteFotoController {
  async handle(req: Request, res: Response) {
    const foto_id = req.query.foto_id as string

    const deleteFotoService = new DeleteFotoService()

    const foto = await deleteFotoService.execute({ foto_id })

    return res.json(foto)
  }
}

export { DeleteFotoController }