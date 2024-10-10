export interface IFile {
    id: number
    name: string
    description: string
    url?: string
    versions: IVersion[]
}

export interface IVersion {
    id: number
    version: number
    url: string
    createdAt: string
}