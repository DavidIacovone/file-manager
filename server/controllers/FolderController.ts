import { inject, injectable } from 'tsyringe';
import FolderDTO from '../dto/FolderDTO';
import { Router } from 'express';
import { IFolderService } from '../services/IFolderService';


@injectable()
export default class FolderController {
    router: Router;
    folderService: IFolderService;

    constructor(@inject('IFolderService') folderService: IFolderService) {
        this.folderService = folderService;
        this.router = Router();
    }

    /**
     * Retrieves all folders.
     * @returns A promise that resolves to the list of folders.
     */
    async getFolders() {
        return await this.folderService.getFolders();
    }

    /**
     * Deletes a folder and its content by its ID.
     * @param id - The ID of the folder to be deleted.
     * @returns A promise that resolves to a boolean indicating success.
     */
    async deleteFolder(id: number) {
        return await this.folderService.deleteFolder(id);
    }

    /**
     * Creates a new folder.
     * @param folder - The data of the folder to be created.
     * @returns A promise that resolves to the created folder.
     */
    async createFolder(folder: FolderDTO) {
        return await this.folderService.createFolder(folder);
    }

    /**
     * Updates an existing folder.
     * @param folder - The data of the folder to be updated.
     * @returns A promise that resolves to the updated folder.
     */
    async updateFolder(folder: FolderDTO) {
        return await this.folderService.updateFolder(folder);
    }

    /**
     * Defines the routes for folder operations.
     * @returns The configured router.
     */
    routes(): Router {
        this.router.get('/', async (req, res) => {
            const result = await this.getFolders();
            if (result instanceof Error) {
                res.status(500).send(result.message);
            } else {
                res.send(result);
            }
        });

        this.router.delete('/', async (req, res) => {
            const result = await this.deleteFolder(req.body.id);
            if (result instanceof Error) {
                res.status(404).send(result.message);
            } else {
                res.sendStatus(204);
            }
        });

        this.router.post('/', async (req, res) => {
            const result = await this.createFolder(req.body);
            if (result instanceof Error) {
                res.status(400).send(result.message);
            } else {
                res.status(201).send(result);
            }
        });

        this.router.put('/', async (req, res) => {
            const result = await this.updateFolder(req.body);
            if (result instanceof Error) {
                res.status(400).send(result.message);
            } else {
                res.send(result);
            }
        });

        return this.router;
    }
}