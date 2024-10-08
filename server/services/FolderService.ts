import { inject, injectable } from 'tsyringe';
import { In, Repository } from 'typeorm';
import Folder from '../domain/Folder';
import File from '../domain/File';
import AppDataSource from '../data-source';
import FolderDTO from '../dto/FolderDTO';
import { IFolderService } from './IFolderService';
import { IFileService } from './IFileService';


@injectable()
export default class FolderService implements IFolderService {
    folderRepository: Repository<Folder>
    fileService: IFileService

    constructor(@inject('IFileService') fileService: IFileService) {
        this.folderRepository = AppDataSource.getRepository(Folder);
        this.fileService = fileService;
    }

    async getFolders(): Promise<Folder[]> {
        return await this.folderRepository.find();
    }

    async deleteFolder(id: number): Promise<void> {
        const folder = await this.folderRepository.findOneBy({id: id});

        if (!folder) {
            throw new Error('Folder not found');
        }

        const files = await this.fileService.getFiles({ folder: { id: id } });
        for (const file of files) {
            await this.fileService.deleteFile(file.id);
        }

        await this.folderRepository.delete(folder);
    }

    async createFolder(folderDTO: FolderDTO): Promise<Folder> {
        const folder = new Folder();
        folder.name = folderDTO.name;

        return await this.folderRepository.save(folder);
    }

    async updateFolder(folderDTO: FolderDTO): Promise<Folder> {
        const folder = await this.folderRepository.findOneBy({id: folderDTO.id});

        if (!folder) {
            throw new Error('Folder not found');
        }

        folder.name = folderDTO.name;
        folder.files = await this.fileService.getFiles({id: In(folderDTO.files)});

        return await this.folderRepository.save(folder);
    }
}