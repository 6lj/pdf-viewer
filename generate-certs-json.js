const fs = require('fs').promises;
const path = require('path');

async function generateCertsJson() {
    try {
        const certsDir = './Certs';
        const certsData = [];
        const items = await fs.readdir(certsDir, { withFileTypes: true });

        for (const item of items) {
            if (item.isDirectory()) {
                const subItems = await fs.readdir(path.join(certsDir, item.name));
                const pdfFiles = subItems
                    .filter(subItem => subItem.toLowerCase().endsWith('.pdf'))
                    .map(subItem => ({
                        type: 'file',
                        name: subItem,
                        path: `/certs/${item.name}/${subItem}`
                    }));
                certsData.push({
                    type: 'folder',
                    name: item.name,
                    contents: pdfFiles
                });
            } else if (item.name.toLowerCase().endsWith('.pdf')) {
                certsData.push({
                    type: 'file',
                    name: item.name,
                    path: `/certs/${item.name}`
                });
            }
        }

        await fs.writeFile('certs.json', JSON.stringify(certsData, null, 2));
        console.log('Generated certs.json:', certsData);
    } catch (error) {
        console.error('Error generating certs.json:', error);
    }
}

generateCertsJson();