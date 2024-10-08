import Folder from '../domain/Folder';
import File from '../domain/File';
import FolderDTO from '../dto/FolderDTO';

export interface IFolderService {
    getFolders(): Promise<Folder[]>;
    deleteFolder(id: number): Promise<void>;
    createFolder(folderDTO: FolderDTO): Promise<Folder>;
    updateFolder(folderDTO: FolderDTO): Promise<Folder>;
}