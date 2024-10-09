import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Folder from './Folder';
import FileVersion from './FileVersion';


/**
 * Entity representing a File.
 */
@Entity()
export default class File {

    /**
     * Primary key for the File entity.
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * Name of the file.
     */
    @Column()
    name: string

    /**
     * Description of the file.
     */
    @Column()
    description: string

    /**
     * URL where the file is stored.
     */
    @Column()
    url: string

    /**
     * The folder to which the file belongs.
     */
    @ManyToOne(() => Folder, (folder) => folder.files)
    @JoinColumn({ name: 'folderId' })
    folder: Folder

    /**
     * Versions of the file.
     */
    @OneToMany(() => FileVersion, (version) => version.file)
    versions: FileVersion[];
}