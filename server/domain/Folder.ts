import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import File from './File';

/**
 * Entity representing a Folder.
 */
@Entity()
export default class Folder {

    /**
     * Primary key for the Folder entity.
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * Name of the folder.
     */
    @Column()
    name: string

    /**
     * Files contained in the folder.
     */
    @OneToMany(() => File, (file) => file.folder)
    files: File[]
}
