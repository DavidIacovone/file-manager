import File from '../domain/File';
import FileDTO from '../dto/FileDTO';

export interface IFileService {
    getFiles(query: Object): Promise<File[]>;
    deleteFile(id: number): Promise<void>;
    createFile(file: FileDTO): Promise<File>;
    updateFile(fileDTO: FileDTO): Promise<File>;
}