import "reflect-metadata"
import { DataSource } from "typeorm"
import File from './domain/File';
import Folder from './domain/Folder';
import FileVersion from './domain/FileVersion';

const AppDataSource = new DataSource({
    type: "postgres",
    // The URL is in the format postgres://<username>:<password>@<host>:<port>/<database>
    // Please note, that connection strings should not be hardcoded in production applications.
    // Instead, use environment variables to store sensitive information
    // This is done for demonstration purposes only
    url: "postgres://admin:admin@db:5432/file-manager-db",
    port: 5432,
    database: "file-manager-db",
    entities: [File, Folder, FileVersion],
    synchronize: true,
    logging: false,
})


export default AppDataSource;
