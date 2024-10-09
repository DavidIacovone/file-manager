import { inject, injectable } from 'tsyringe';
import { Router } from 'express';
import FileDTO from '../dto/FileDTO';
import { IFileService } from '../services/IFileService';

@injectable()
export default class FileController {
    router: Router;
    fileService: IFileService;

    constructor(@inject('IFileService') fileService: IFileService) {
        this.fileService = fileService;
        this.router = Router();
    }

    async getFiles(id: number) {
        return await this.fileService.getFiles({ folder: { id: id } });
    }

    async createFile(fileData: FileDTO) {
        return await this.fileService.createFile(fileData);
    }

    async deleteFile(id: number) {
        return await this.fileService.deleteFile(id);
    }

    async updateFile(file: FileDTO) {
        return await this.fileService.updateFile(file);
    }

    routes(): Router {
        this.router.get('/:id', async (req, res) => {
            const result = await this.getFiles(parseInt(req.params.id));
            if (result instanceof Error) {
                res.status(500).send(result.message);
            } else {
                res.send(result);
            }
        });

        this.router.post('/', async (req, res) => {
            const fileDTO = { ...req.file, description: req.body.description } as FileDTO;
            const result = await this.createFile(fileDTO);
            if (result instanceof Error) {
                res.status(400).send(result.message);
            } else {
                res.status(201).send(result);
            }
        });

        this.router.delete('/', async (req, res) => {
            const result = await this.deleteFile(parseInt(req.body.id));
            if (result instanceof Error) {
                res.status(404).send(result.message);
            } else {
                res.sendStatus(204);
            }
        });

        this.router.put('/', async (req, res) => {
            const fileDTO = { ...req.file, id: req.body.id, description: req.body.description } as FileDTO;
            const result = await this.updateFile(fileDTO);
            if (result instanceof Error) {
                res.status(400).send(result.message);
            } else {
                res.send(result);
            }
        });

        return this.router;
    }
}