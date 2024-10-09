import Folder from '../domain/Folder';
import FolderDTO from '../dto/FolderDTO';

export interface IFolderService {
    getFolders(): Promise<Folder[] | Error>;
    deleteFolder(id: number): Promise<void | Error>;
    createFolder(folderDTO: FolderDTO): Promise<Folder | Error>;
    updateFolder(folderDTO: FolderDTO): Promise<Folder | Error>;
}