import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { IFile } from '../interfaces/IFile';
import FileObject from './FileObject';

function FolderView() {
    const [newFileDescription, setNewFileDescription] = React.useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [files, setFiles] = React.useState<IFile[]>([]);
    const { id } = useParams();
    const location = useLocation();
    const folderName = location.state?.name;

    useEffect(() => {
        axios.get(`http://localhost:3000/files/data/${id}`)
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleUpload = () => {
        const file = fileInputRef.current?.files?.[0] as File;
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', newFileDescription);

        axios.post(`http://localhost:3000/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setFiles(prevFiles => {
                const updatedFiles = [...prevFiles, response.data];
                const fileIds = updatedFiles.map(file => file.id);
                axios.put(`http://localhost:3000/folders`, { id: id, name: folderName, files: fileIds })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error updating folder', error);
                    });
                return updatedFiles;
            });
            setNewFileDescription('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }).catch(error => {
            console.error('Error uploading file', error);
        });
    }

  return (
      <div className="p-2">
          <div className="d-flex justify-content-space-between  align-items-center w-100">
              <h1>{folderName}</h1>
              <h2 className="mx-2">/</h2>
              <button type="button" className="btn btn-primary m-2" data-bs-toggle="modal"
                      data-bs-target="#FileCreation">
                  Add file
              </button>
          </div>
          <div className="d-flex justify-content-center align-items-center">
              <div className="modal fade" id="FileCreation" tabIndex={-1} aria-labelledby="FileCreation"
                   aria-hidden="true">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h1 className="modal-title fs-5" id="FileLabel">File upload form</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal"
                                      aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                              <input type="text" className="form-control m-1" placeholder="File description"
                                     value={newFileDescription}
                                     onChange={(e) => setNewFileDescription(e.target.value)}/>
                              <input type="file" className="form-control m-1" ref={fileInputRef}/>
                          </div>
                          <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                              </button>
                              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpload}>Upload</button>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row text-center p-4 mt-4 mx-auto">
                  {files.map((file) => (
                      <div className="col-md-6" key={file.id}>
                          <FileObject id={file.id} name={file.name} description={file.description} versions={file.versions} />
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
}

export default FolderView;