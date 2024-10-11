# File Manager Application

## Description

The File Manager Application is a web-based tool that allows users to manage files within folders. Users can upload, download, update, and delete files. Each file can have multiple versions, and users can select and manage these versions. The application consists of a client-side built with React and TypeScript, and a server-side built with Node.js and Express, with PostgreSQL as the database.

## Technologies Used

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Routing**: React Router

## How to Start Locally Using Docker Compose

To start the File Manager Application locally using Docker Compose, follow these steps:

1. Ensure Docker and Docker Compose are installed on your machine.
   - [Docker Installation Guide](https://docs.docker.com/get-docker/)
   - [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)
2. Clone the repository to your local machine.
3. Navigate to the project directory.
4. Run `docker-compose up` to build and start the containers.
5. Access the application at `http://localhost:3001`.

This setup will start the client, server, and database services defined in the `docker-compose.yml` file.

## How the app works ?

The File Manager Application is designed to provide a seamless experience for managing files, including uploading, downloading, updating, and deleting files. Here is a detailed technical overview of how the application works:

### Frontend

1. **React Components**: The frontend is built using React, with components like `FileObject.tsx` handling the display and interaction logic for individual files.
2. **State Management**: React Hooks are used for state management. For example, `useState` and `useRef` are used to manage the state of selected file versions and file input references.
3. **HTTP Requests**: Axios is used to make HTTP requests to the backend. Functions like `handleDownload`, `handleUpdate`, and `handleDelete` send requests to the server to perform file operations.
4. **UI Elements**: The application uses Bootstrap for styling and UI components, such as modals, buttons, and dropdowns, to provide a responsive and user-friendly interface.

### Backend

1. **Node.js and Express**: The backend is built using Node.js and Express. It provides RESTful API endpoints for file operations.
2. **File Operations**: The backend handles file operations such as uploading, downloading, updating, and deleting files. It interacts with the file system and the PostgreSQL database to manage file metadata and versions.
3. **Database**: PostgreSQL is used to store metadata about the files, such as file names, paths, and versions. The database schema includes tables for files and their versions.

### API Endpoints

1. **Create File**: `POST /files/data` - Accepts a file and metadata, saves the file to the server, and stores metadata in the database.
2. **Download File**: `GET /files/download` - Accepts a file path as a query parameter, retrieves the file from the server, and sends it to the client for download.
3. **List Files**: `GET /files` - Retrieves a list of all files from the server.
3. **Update File**: `PUT /files` - Accepts a file and metadata, updates the existing file on the server, and updates the metadata in the database.
4. **Delete File**: `DELETE /files` - Accepts a file ID, deletes the file from the server, and removes the metadata from the database.
5. **Create Folder**: `POST /folders` - Accepts folder metadata, creates a new folder on the server, and stores metadata in the database.
6. **List Folders**: `GET /folders` - Retrieves a list of all folders from the server.
7. **Update Folder**: `PUT /folders` - Accepts folder metadata, updates the existing folder on the server, and updates the metadata in the database.
8. **Delete Folder**: `DELETE /folders` - Accepts a folder ID, deletes the folder from the server, and removes the metadata from the database.

### Docker and Docker Compose

1. **Containerization**: The application is containerized using Docker. Dockerfiles are used to create images for the client, server, and database services.
2. **Docker Compose**: Docker Compose is used to orchestrate the multi-container setup. The `docker-compose.yml` file defines the services, networks, and volumes required to run the application.

## What can be improved ?

1. **Frontend State Management**: Implement a more robust state management solution such as Redux or Context API to handle complex state logic and improve maintainability.
2. **File Storage**: Use a cloud storage provider like AWS S3, Google Cloud Storage, or Azure Blob Storage for file storage to ensure scalability, reliability, and security.
3. **API Versioning**: Introduce API versioning to manage changes and updates to the API without breaking existing clients. This can be done by including version numbers in the API endpoints (e.g., `/api/v1/files`).
4. **Request Validation**: Implement request validation on the server-side using libraries like Joi or Yup to ensure that incoming requests meet the required schema and constraints, improving security and data integrity.
5. **Error Handling**: Enhance error handling by implementing custom error messages, status codes, and logging to provide better feedback to users and developers in case of failures.
6. **Full support for mobile devices**: Make the application fully responsive and optimized for mobile devices to provide a consistent user experience across different screen sizes.

[![CC BY 4.0][cc-by-shield]][cc-by]

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[cc-by-shield]: https://licensebuttons.net/l/by/4.0/88x31.png
[cc-by]: http://creativecommons.org/licenses/by/4.0/
