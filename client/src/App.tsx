import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainFolderView from './components/MainFolderView';
import FolderView from './components/FolderView';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainFolderView />} />
                <Route path="/folder/:id" element={<FolderView />} />
            </Routes>
        </Router>
    );
}

export default App;