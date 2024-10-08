import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import File from './File';

@Entity()
export default class Folder {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => File, (file) => file.folder)
    files: File[]
}
