import "reflect-metadata";
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import multer, { Multer } from 'multer';
import { container } from 'tsyringe';
import AppDataSource from './data-source';
import FileController from './controllers/FileController';
import FolderController from './controllers/FolderController';
import { IFolderService } from './services/IFolderService';
import FolderService from './services/FolderService';
import { IFileService } from './services/IFileService';
import FileService from './services/FileService';

// Initialize the database connection
AppDataSource.initialize().then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.error('Error connecting to database:', error);
});

// Register the services and controllers
container.register<IFolderService>('IFolderService', { useClass: FolderService });
container.register<IFileService>('IFileService', { useClass: FileService });
const folderController = container.resolve(FolderController);
const fileController = container.resolve(FileController);

// Initialize the Express app and multer
// Multer is a middleware for handling file uploads and stores them in the 'uploads/' directory
// In production, you should store the files in a cloud storage service like AWS S3 or similar
const uploadFileMiddleware: Multer = multer({ dest: 'uploads/' });
const app: Express = express();

// add middleware
app.use(bodyParser.json());

// add routes
app.use('/folders', folderController.routes());
app.use('/files', uploadFileMiddleware.single('file'), fileController.routes());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});