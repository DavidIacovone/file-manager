import React from 'react';
import folder from '../static/folder.svg';
import IFolder from '../interfaces/IFolder';
import { useNavigate } from 'react-router-dom';

interface IFolderWithDelete extends IFolder {
    deleteFolder: (id: number) => void;
}

function Folder(props: IFolderWithDelete) {
    const navigate = useNavigate();

    const handleFileClick = (id: number, name: string) => {
        navigate(`/folder/${id}`, { state: { name } });
    }

    return (
        <div className="card p-4 m-2" style={{width: '18rem'}}>
            <img src={folder} className="card-img-top" alt="..."/>
            <button type="button" className="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#Delete">
                Delete
            </button>
            <button type="button" className="btn btn-success m-1" onClick={() => handleFileClick(props.id, props.name)}>
                Open
            </button>
            <div className="modal fade" id="Delete" tabIndex={-1} aria-labelledby="DeleteLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="DeleteLabel">Warning!</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this folder? This will delete all the files inside it.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={() => props.deleteFolder(props.id)} data-bs-dismiss="modal">Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
            </div>
        </div>
    );
}

export default Folder;