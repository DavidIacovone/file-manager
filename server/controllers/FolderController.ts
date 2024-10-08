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

    async getFolders() {
        return await this.folderService.getFolders();
    }

    async deleteFolder(id: number) {
        return await this.folderService.deleteFolder(id);
    }

    async createFolder(folder: FolderDTO) {
        return await this.folderService.createFolder(folder);
    }

    async updateFolder(folder: FolderDTO) {
        return await this.folderService.updateFolder(folder);
    }

    routes(): Router {
        this.router.get('/', async (req, res) => { res.send(await this.getFolders()) });
        this.router.delete('/', async (req, res) => { res.send(await this.deleteFolder(req.body.id)) });
        this.router.post('/', async (req, res) => { res.send(await this.createFolder(req.body)) });
        this.router.put('/', async (req, res) => { res.send(await this.updateFolder(req.body)) });

        return this.router;
    }
}