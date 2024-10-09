import "reflect-metadata";
import { Router } from 'express';
import { container } from 'tsyringe';
import FileController from '../controllers/FileController';
import { IFileService } from '../services/IFileService';
import FileDTO from '../dto/FileDTO';

const mockFileService: IFileService = {
    getFiles: jest.fn(),
    createFile: jest.fn(),
    deleteFile: jest.fn(),
    updateFile: jest.fn(),
};

container.registerInstance('IFileService', mockFileService);

describe('FileController', () => {
    let fileController: FileController;

    beforeEach(() => {
        fileController = new FileController(mockFileService);
    });

    it('should initialize router and fileService', () => {
        expect(fileController.router).toBeDefined();
        expect(fileController.fileService).toBeDefined();
    });

    it('should get files', async () => {
        const mockFiles = [{ id: 1, name: 'file1' }];
        (mockFileService.getFiles as jest.Mock).mockResolvedValue(mockFiles);

        const result = await fileController.getFiles(1);
        expect(result).toBe(mockFiles);
        expect(mockFileService.getFiles).toHaveBeenCalledWith({ folder: { id: 1 } });
    });

    it('should create a file', async () => {
        const fileData: FileDTO = { id: 1, originalname: 'file1', description: 'desc', path: 'path' };
        (mockFileService.createFile as jest.Mock).mockResolvedValue(fileData);

        const result = await fileController.createFile(fileData);
        expect(result).toBe(fileData);
        expect(mockFileService.createFile).toHaveBeenCalledWith(fileData);
    });

    it('should delete a file', async () => {
        (mockFileService.deleteFile as jest.Mock).mockResolvedValue(true);

        const result = await fileController.deleteFile(1);
        expect(result).toBe(true);
        expect(mockFileService.deleteFile).toHaveBeenCalledWith(1);
    });

    it('should update a file', async () => {
        const fileData: FileDTO = { id: 1, originalname: 'file1', description: 'desc', path: 'path' };
        (mockFileService.updateFile as jest.Mock).mockResolvedValue(fileData);

        const result = await fileController.updateFile(fileData);
        expect(result).toBe(fileData);
        expect(mockFileService.updateFile).toHaveBeenCalledWith(fileData);
    });

    it('should define routes', () => {
        const router = fileController.routes();
        expect(router).toBe(fileController.router);
    });
});