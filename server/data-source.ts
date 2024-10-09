import "reflect-metadata"
import { DataSource } from "typeorm"
import File from './domain/File';
import Folder from './domain/Folder';
import FileVersion from './domain/FileVersion';

const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgres://admin:admin@db:5432/file-manager-db",
    port: 5432,
    database: "file-manager-db",
    entities: [File, Folder, FileVersion],
    synchronize: true,
    logging: false,
})


export default AppDataSource;