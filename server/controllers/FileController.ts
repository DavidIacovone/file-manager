import { inject, injectable } from 'tsyringe';
import e, { Router } from 'express';
import FileDTO from '../dto/FileDTO';
import { IFileService } from '../services/IFileService';

@injectable()
export default class FileController {
    private readonly router: Router;
    private readonly fileService: IFileService;

    constructor(@inject('IFileService') fileService: IFileService) {
        this.fileService = fileService;
        this.router = Router();
    }

    /**
     * Retrieves files associated with a specific folder.
     * @param id - The ID of the folder.
     * @returns A promise that resolves to the list of files.
     */
    async getFiles(id: number) {
        return await this.fileService.getFiles({ folder: { id: id } });
    }

    /**
     * Creates a new file.
     * @param fileData - The data of the file to be created.
     * @returns A promise that resolves to the created file.
     */
    async createFile(fileData: FileDTO) {
        return await this.fileService.createFile(fileData);
    }

    /**
     * Deletes a file by its ID.
     * @param id - The ID of the file to be deleted.
     * @returns A promise that resolves to a boolean indicating success.
     */
    async deleteFile(id: number) {
        return await this.fileService.deleteFile(id);
    }

    /**
     * Updates an existing file.
     * @param file - The data of the file to be updated.
     * @returns A promise that resolves to the updated file.
     */
    async updateFile(file: FileDTO) {
        return await this.fileService.updateFile(file);
    }

    /**
     * Defines the routes for file operations.
     * @returns The configured router.
     */
    routes(): Router {
        this.router.get('/data/:id', async (req, res) => {
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

        this.router.get('/download', async (req, res) => {
            try {
                res.download(req.query.path as string);
            } catch (error) {
                res.status(404).send('File not found');
            }
        });

        return this.router;
    }
}