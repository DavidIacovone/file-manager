import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import File from './File';

/**
 * Entity representing a FileVersion.
 */
@Entity()
export default class FileVersion {

    /**
     * Primary key for the FileVersion entity.
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Version number of the file.
     */
    @Column()
    version: number;

    /**
     * URL where the file version is stored.
     */
    @Column()
    url: string;

    /**
     * Date when the file version was created.
     */
    @CreateDateColumn()
    createAt: Date;

    /**
     * The file to which this version belongs.
     */
    @ManyToOne(() => File, (file) => file.versions)
    file: File;
}