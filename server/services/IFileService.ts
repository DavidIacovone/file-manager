import File from '../domain/File';
import FileDTO from '../dto/FileDTO';

export interface IFileService {
    getFiles(query: Object): Promise<File[] | Error>;
    deleteFile(id: number): Promise<void | Error>;
    createFile(file: FileDTO): Promise<File | Error>;
    updateFile(fileDTO: FileDTO): Promise<File | Error>;
}