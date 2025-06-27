const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('.', {
    setHeaders: (res, path) => {
        if (path.endsWith('.pdf')) {
            res.setHeader('Content-Type', 'application/pdf');
        }
    }
}));

app.get('/certs', async (req, res) => {
    try {
        const certsDir = './Certs';
        console.log(`Reading directory: ${certsDir}`);
        const items = await fs.readdir(certsDir, { withFileTypes: true });
        const certsData = [];
        for (const item of items) {
            console.log(`Found item: ${item.name} (${item.isDirectory() ? 'directory' : 'file'})`);
            if (item.isDirectory()) {
                const subItems = await fs.readdir(path.join(certsDir, item.name));
                const pdfFiles = subItems
                    .filter(subItem => subItem.toLowerCase().endsWith('.pdf'))
                    .map(subItem => ({
                        type: 'file',
                        name: subItem,
                        path: `/Certs/${item.name}/${subItem}`
                    }));
                console.log(`Folder ${item.name} contains PDFs:`, pdfFiles.map(f => f.name));
                certsData.push({
                    type: 'folder',
                    name: item.name,
                    contents: pdfFiles
                });
            } else if (item.name.toLowerCase().endsWith('.pdf')) {
                certsData.push({
                    type: 'file',
                    name: item.name,
                    path: `/Certs/${item.name}`
                });
            }
        }
        console.log('Returning certs data:', certsData);
        res.json(certsData);
    } catch (error) {
        console.error('Error reading Certs directory:', error);
        res.status(500).json({ error: 'Failed to read Certs directory' });
    }
});

app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});
