import Folder from '../domain/Folder';
import FolderDTO from '../dto/FolderDTO';

export interface IFolderService {
    /**
     * Retrieves all folders.
     * @returns A promise that resolves to an array of folders or an error.
     */
    getFolders(): Promise<Folder[] | Error>;

    /**
     * Deletes a folder and its content by its ID.
     * @param id - The ID of the folder to be deleted.
     * @returns A promise that resolves to void or an error.
     */
    deleteFolder(id: number): Promise<void | Error>;

    /**
     * Creates a new folder.
     * @param folderDTO - The folder data transfer object.
     * @returns A promise that resolves to the created folder or an error.
     */
    createFolder(folderDTO: FolderDTO): Promise<Folder | Error>;

    /**
     * Updates an existing folder.
     * @param folderDTO - The folder data transfer object.
     * @returns A promise that resolves to the updated folder or an error.
     */
    updateFolder(folderDTO: FolderDTO): Promise<Folder | Error>;
}