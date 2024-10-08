import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Folder from './Folder';
import FileVersion from './FileVersion';


@Entity()
export default class File {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    url: string

    @ManyToOne(() => Folder, (folder) => folder.files)
    @JoinColumn({ name: 'folderId' })
    folder: Folder

    @OneToMany(() => FileVersion, (version) => version.file)
    versions: FileVersion[];
}