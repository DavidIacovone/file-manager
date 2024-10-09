import File from '../domain/File';
import FileDTO from '../dto/FileDTO';

export interface IFileService {
    /**
     * Retrieves files based on the provided query.
     * @param query - The query object to filter files.
     * @returns A promise that resolves to an array of files or an error.
     */
    getFiles(query: Object): Promise<File[] | Error>;

    /**
     * Deletes a file by its ID.
     * @param id - The ID of the file to delete.
     * @returns A promise that resolves to void or an error.
     */
    deleteFile(id: number): Promise<void | Error>;

    /**
     * Creates a new file.
     * @param file - The file data transfer object.
     * @returns A promise that resolves to the created file or an error.
     */
    createFile(file: FileDTO): Promise<File | Error>;

    /**
     * Updates an existing file.
     * @param fileDTO - The file data transfer object.
     * @returns A promise that resolves to the updated file or an error.
     */
    updateFile(fileDTO: FileDTO): Promise<File | Error>;
}