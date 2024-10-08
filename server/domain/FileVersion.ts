import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import File from './File';

@Entity()
export default class FileVersion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    version: number;

    @Column()
    url: string;

    @ManyToOne(() => File, (file) => file.versions)
    file: File;
}