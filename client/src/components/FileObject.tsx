import React, { useState } from 'react';
import file from '../static/file.svg';
import { IFile, IVersion } from '../interfaces/IFile';
import axios from 'axios';

function FileObject(props: IFile) {
    const [selectedVersion, setSelectedVersion] = useState<string>(`Version ${props.versions[0].version.toString()}`);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleSelect = (version: IVersion) => {
        setSelectedVersion(`Version ${version.version}`);
    };

    const handleDownload = (path: string) => {
        axios.get(`http://localhost:3000/files/download?path=${path}`).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = response.headers['content-disposition'];
            const fileName = contentDisposition ? contentDisposition.split('filename=')[1].split(';')[0].replace(/['"]/g, '') : 'file';
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        });
    }

    const handleUpdate = (id: number, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id.toString());

        axios.put(`http://localhost:3000/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const data = response.data as IFile;
            setSelectedVersion('Version ' + data.versions[data.versions.length - 1].version.toString());
        }).catch(error => {
            console.error('Error updating file', error);
        });
    };

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:3000/files`, { data: { id: id } }).then(response => {
            window.location.reload();
        }).catch(error => {
            console.error('Error deleting file', error);
        });
    }

    return (
        <div className="card p-4 m-2" style={{ width: '18rem' }}>
            <img src={file} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.description}</p>
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-success m-1"
                            onClick={() => handleDownload(props.versions.find(version => version.version === parseInt(selectedVersion.replace('Version ', '')))?.url as string)}>
                        Download
                    </button>
                    <button type="button" className="btn btn-warning m-1" data-bs-toggle="modal"
                            data-bs-target="#FileUpdate">
                        Update
                    </button>
                    <button type="button" className="btn btn-danger m-1"
                            onClick={() => handleDelete(props.id)}>
                        Delete
                    </button>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            {selectedVersion}
                        </button>
                        <ul className="dropdown-menu">
                            {props.versions.map((version, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" type="button"
                                            onClick={() => handleSelect(version)}>Version {version.version}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="modal fade" id="FileUpdate" tabIndex={-1} aria-labelledby="FileUpdate"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="FileUpdateLabel">File update form</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input type="file" className="form-control" ref={fileInputRef}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary"
                                        onClick={() => handleUpdate(props.id, fileInputRef.current?.files?.[0] as File)}
                                        data-bs-dismiss="modal">Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileObject;