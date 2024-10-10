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
    private readonly folderRepository: Repository<Folder>
    private readonly fileService: IFileService

    constructor(@inject('IFileService') fileService: IFileService) {
        this.folderRepository = AppDataSource.getRepository(Folder);
        this.fileService = fileService;
    }

    async getFolders(): Promise<Folder[] | Error> {
        try {
            return await this.folderRepository.find();
        } catch (error) {
            return new Error(error as string);
        }
    }

    async deleteFolder(id: number): Promise<void | Error> {
        try {
            const folder = await this.folderRepository.findOneBy({id: id});

            if (!folder) {
                throw new Error('Folder not found');
            }

            const files = await this.fileService.getFiles({ folder: { id: id } }) as File[];
            for (const file of files) {
                await this.fileService.deleteFile(file.id);
            }

            await this.folderRepository.delete(folder);
        } catch (error) {
            return new Error(error as string);
        }
    }

    async createFolder(folderDTO: FolderDTO): Promise<Folder | Error> {
        try {
            if (folderDTO.name === undefined) {
                throw new Error('A name is required to create a folder');
            }

            const folder = new Folder();
            folder.name = folderDTO.name;
            return await this.folderRepository.save(folder);
        } catch (error) {
            return new Error(error as string);
        }
    }

    async updateFolder(folderDTO: FolderDTO): Promise<Folder | Error> {
        try {
            const folder = await this.folderRepository.findOneBy({id: folderDTO.id});

            if (!folder) {
                throw new Error('Folder not found');
            }

            folder.name = folderDTO.name;
            folder.files = await this.fileService.getFiles({id: In(folderDTO.files)}) as File[];

            return await this.folderRepository.save(folder);
        } catch (error) {
            return new Error(error as string);
        }
    }
}