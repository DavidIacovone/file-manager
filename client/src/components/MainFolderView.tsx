import React from 'react';
import axios from 'axios';
import Folder from './Folder';
import IFolder from '../interfaces/IFolder';

function MainFolderView() {
  const [folders, setFolders] = React.useState<IFolder[]>([]);
  const [newFolderName, setNewFolderName] = React.useState('');

// Fetches the list of folders from the server when the component mounts
    React.useEffect(() => {
        axios.get('http://localhost:3000/folders')
            .then(response => {
                setFolders(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

// Adds a new folder by sending a POST request to the server
    const addFolder = () => {
        axios.post('http://localhost:3000/folders', { name: newFolderName })
            .then(response => {
                setFolders([...folders, response.data]);
                setNewFolderName('');
            })
            .catch(error => {
                console.error(error);
            });
    }

// Deletes a folder by sending a DELETE request to the server
    const deleteFolder = (id: number) => {
        axios.delete('http://localhost:3000/folders/', { data: { id: id }}).then(response => {
            setFolders(folders.filter(folder => folder.id !== id));
        }).catch(error => {
            console.error(error);
        })
    }


    return (
      <div className="p-2">
          <div className="d-flex justify-content-space-between  align-items-center w-100">
              <h1>Home</h1>
              <h2 className="mx-2">/</h2>
              <button type="button" className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#FolderCreation">
                  Add folder
              </button>
          </div>
          <div className="d-flex justify-content-center align-items-center">
              <div className="modal fade" id="FolderCreation" tabIndex={-1} aria-labelledby="FolderCreation"
                   aria-hidden="true">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h1 className="modal-title fs-5" id="FolderCreationLabel">Folder creation form</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal"
                                      aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                              <input type="text" className="form-control" placeholder="Folder name"
                                     value={newFolderName}
                                     onChange={(e) => setNewFolderName(e.target.value)}/>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" className="btn btn-primary" onClick={addFolder}
                                      data-bs-dismiss="modal">Create
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row text-center p-4 mt-4 mx-auto">
                  {folders.map((folder) => (
                      <div className="col-md-6" key={folder.id}>
                          <Folder id={folder.id} name={folder.name} deleteFolder={deleteFolder}/>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    );
}

export default MainFolderView;