import { injectable } from 'tsyringe';
import File from '../domain/File';
import { Repository } from 'typeorm';
import AppDataSource from '../data-source';
import FileDTO from '../dto/FileDTO';
import { IFileService } from './IFileService';
import FileVersion from '../domain/FileVersion';


@injectable()
export default  class FileService implements IFileService {
    fileRepository: Repository<File>
    fileVersionRepository: Repository<FileVersion>

    constructor() {
        this.fileRepository = AppDataSource.getRepository(File);
        this.fileVersionRepository = AppDataSource.getRepository(FileVersion);
    }

    async getFiles(query: Object) {
        return await this.fileRepository.find({
            where: query,
            relations: ['versions']
        });
    }

    async deleteFile(id: number): Promise<void> {
        const file = await this.fileRepository.findOneBy({ id: id });

        if (!file) {
            throw new Error('File not found');
        }

        await this.fileRepository.delete(file);
    }

    async createFile(fileDTO: FileDTO): Promise<File> {
        const file = new File();
        file.name = fileDTO.originalname;
        file.url = fileDTO.path;
        file.description = fileDTO.description ?? '';

        const savedFile = await this.fileRepository.save(file);

        const fileVersion = new FileVersion();
        fileVersion.version = 1;
        fileVersion.url = fileDTO.path;
        fileVersion.file = savedFile;

        await this.fileVersionRepository.save(fileVersion);

        return savedFile;
    }

    async updateFile(fileDTO: FileDTO): Promise<File> {
        const file = await this.fileRepository.findOneBy({ id: fileDTO.id });

        if (!file) {
            throw new Error('File not found');
        }

        const latestVersion = await this.fileVersionRepository.findOne({
            where: { file: { id: file.id } },
            order: { version: 'DESC' }
        });

        const newVersion = new FileVersion();
        newVersion.version = (latestVersion?.version ?? 0) + 1;
        newVersion.url = fileDTO.path;
        newVersion.file = file;

        await this.fileVersionRepository.save(newVersion);

        file.name = fileDTO.originalname;
        file.url = fileDTO.path;

        return await this.fileRepository.save(file);
    }
}