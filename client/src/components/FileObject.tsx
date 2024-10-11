import React, { useState } from 'react';
import file from '../static/file.svg';
import { IFile, IVersion } from '../interfaces/IFile';
import axios from 'axios';

interface IFileWithUpdate extends IFile {
    updateFile: (file: IFile) => void;
}

function FileObject(props: IFileWithUpdate) {
    const [selectedVersion, setSelectedVersion] = useState<string>(`Version ${props.versions[0].version.toString()}`);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

// Function to handle the selection of a file version
// Sets the selected version state to the chosen version
    const handleSelect = (version: IVersion) => {
        setSelectedVersion(`Version ${version.version}`);
    };

// Function to handle the download of a file
// Creates a temporary anchor element to trigger the download
    const handleDownload = (path: string) => {
        const url = `http://localhost:3000/files/download?path=${path}`;
        const link = document.createElement('a');
        link.href = url;
        const fileName = url.split('/').pop() ?? 'file';
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

// Function to handle the update of a file
// Sends a PUT request with the file data to update the file on the server
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
            props.updateFile(data);
            setSelectedVersion('Version ' + data.versions[data.versions.length - 1].version.toString());
        }).catch(error => {
            console.error('Error updating file', error);
        });
    };

// Function to handle the deletion of a file
// Sends a DELETE request to remove the file from the server
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
                                <button type="button" className="btn btn-warning"
                                        onClick={() => handleUpdate(props.id, fileInputRef.current?.files?.[0] as File)}
                                        data-bs-dismiss="modal">Update
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