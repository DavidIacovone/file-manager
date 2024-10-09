import "reflect-metadata";
import { container } from 'tsyringe';
import FolderController from '../controllers/FolderController';
import { IFolderService } from '../services/IFolderService';
import FolderDTO from '../dto/FolderDTO';

const mockFolderService: IFolderService = {
    getFolders: jest.fn(),
    createFolder: jest.fn(),
    deleteFolder: jest.fn(),
    updateFolder: jest.fn(),
};

container.registerInstance('IFolderService', mockFolderService);

describe('FolderController', () => {
    let folderController: FolderController;

    beforeEach(() => {
        folderController = new FolderController(mockFolderService);
    });

    it('should initialize router and folderService', () => {
        expect(folderController.router).toBeDefined();
        expect(folderController.folderService).toBeDefined();
    });

    it('should get folders', async () => {
        const mockFolders = [{ id: 1, name: 'folder1' }];
        (mockFolderService.getFolders as jest.Mock).mockResolvedValue(mockFolders);

        const result = await folderController.getFolders();
        expect(result).toBe(mockFolders);
        expect(mockFolderService.getFolders).toHaveBeenCalled();
    });

    it('should create a folder', async () => {
        const folderData: FolderDTO = { id: 1, name: 'folder1', files: [] };
        (mockFolderService.createFolder as jest.Mock).mockResolvedValue(folderData);

        const result = await folderController.createFolder(folderData);
        expect(result).toBe(folderData);
        expect(mockFolderService.createFolder).toHaveBeenCalledWith(folderData);
    });

    it('should delete a folder', async () => {
        (mockFolderService.deleteFolder as jest.Mock).mockResolvedValue(true);

        const result = await folderController.deleteFolder(1);
        expect(result).toBe(true);
        expect(mockFolderService.deleteFolder).toHaveBeenCalledWith(1);
    });

    it('should update a folder', async () => {
        const folderData: FolderDTO = { id: 1, name: 'folder1', files: [] };
        (mockFolderService.updateFolder as jest.Mock).mockResolvedValue(folderData);

        const result = await folderController.updateFolder(folderData);
        expect(result).toBe(folderData);
        expect(mockFolderService.updateFolder).toHaveBeenCalledWith(folderData);
    });

    it('should define routes', () => {
        const router = folderController.routes();
        expect(router).toBe(folderController.router);
    });
});