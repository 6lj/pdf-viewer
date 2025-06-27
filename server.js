const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 8000;

// Serve static files from root and certs directory
app.use(express.static(path.join(__dirname)));
app.use('/certs', express.static(path.join(__dirname, 'certs')));

// Serve index.html at root
app.get('/', (req, res) => {
    console.log('Request received: GET /');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve certs.json
app.get('/certs', async (req, res) => {
    console.log('Request received: GET /certs');
    try {
        const certsData = await fs.readFile(path.join(__dirname, 'certs.json'));
        res.json(JSON.parse(certsData));
    } catch (error) {
        console.error('Error serving certs.json:', error);
        res.status(500).json({ error: 'Failed to load certs.json' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
