import "reflect-metadata"
import { DataSource } from "typeorm"
import File from './domain/File';
import Folder from './domain/Folder';
import FileVersion from './domain/FileVersion';

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "file-manager-db",
    entities: [File, Folder, FileVersion],
    synchronize: true,
    logging: false,
})


export default AppDataSource;