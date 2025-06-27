# Certificate Viewer

A web application for browsing and viewing PDF certificates stored in the `certs/` directory. It introduces a **user-friendly interface for rendering PDFs** using PDF.js with auto-sizing to fit the display area. Users can interact with certificates through a web interface, view them in a modal with navigation, and enjoy a modern dark theme with glassmorphism effects and particle animations. The app is hosted on Azure App Service at [https://pdf-viewer-6lj.azurewebsites.net](https://pdf-viewer-6lj.azurewebsites.net).

## Requires
- **[Node.js](https://nodejs.org/)** (v18 or higher recommended, e.g., v20 LTS)
  - Verify: `node -v` and `npm -v`
- **[Bower](https://bower.io/)** for installing `pdfjs-dist`
  - Verify: `bower -v`
- A modern web browser (e.g., Chrome, Firefox, Edge)

## Installation

1. **Move Project to a Path Without Spaces**
   - Ensure the project is in a directory without spaces to avoid file access issues. For example:
     - **Correct**: `C:\Users\YourName\pdf-viewer`
     - **Incorrect**: `C:\Users\YourName\New Folder (103)\pdf-viewer`
   - Move the project if needed:
     ```bash
     cd C:\Users\YourName\pdf-viewer
     ```

2. **Install Dependencies**
   - Install Node.js dependencies and Bower:
     ```bash
     npm install
     npm install -g bower
     bower install
     ```

3. **Generate `certs.json`**
   - Ensure the `certs/` directory contains PDFs (e.g., `certs/Profile.pdf`).
   - Run:
     ```bash
     node generate-certs-json.js
     ```
   - Verify `certs.json` lists PDFs (e.g., `/certs/Profile.pdf`).

4. **Start the Server**
   - Run the Node.js/Express server:
     ```bash
     npm start
     ```
   - The server runs at `http://localhost:8000`.

5. **Access the Application**
   - Open a browser and navigate to `http://localhost:8000`.
   - Browse folders (e.g., `Professional`, `Academic`) or click a PDF (e.g., `Profile.pdf`) to view it in a modal with auto-sizing and navigation.

## Using the Application (End-Users)
1. **Access Online**:
   - Visit [https://pdf-viewer-6lj.azurewebsites.net](https://pdf-viewer-6lj.azurewebsites.net).
   - Browse folders and click PDFs to view them.

2. **Local Testing**:
   - After starting the server (`npm start`), open `http://localhost:8000`.
   - Click a folder to expand its PDFs or select a standalone PDF.
   - PDFs open in a modal with Previous/Next buttons for multi-page documents.

## If an Error Occurs

- **Error: `Error loading PDF: http://localhost:8000/Certs/Profile.pdf`**
  - **Cause**: Likely due to:
    - Incorrect case (`Certs/` vs. `certs/`).
    - Missing `Profile.pdf` in `certs/`.
    - Server not serving files correctly.
  - **Fix**:
    1. Verify `certs/` (lowercase) contains `Profile.pdf`:
       ```bash
       ls -l certs/
       mv Certs certs  # Rename if uppercase
       chmod -R 755 certs/
       ```
    2. Run the server:
       ```bash
       npm start
       ```
       Check logs for “Request received: GET /certs/Profile.pdf”.
    3. Test PDF access:
       ```bash
       curl http://localhost:8000/certs/Profile.pdf
       ```
       Confirm the file downloads or check for a 404 error.
    4. Verify `/certs` endpoint:
       - Visit `http://localhost:8000/certs`.
       - Ensure `Profile.pdf` is listed:
         ```json
         [{ "type": "file", "name": "Profile.pdf", "path": "/certs/Profile.pdf" }]
         ```
    5. Check browser console (F12 > Console) for errors (e.g., “Failed to fetch”).
    6. Ensure the project directory has write permissions:
       - On Windows: Right-click `pdf-viewer` > Properties > Security > Confirm "Full control".
       - On Linux/macOS: `chmod -R 755 pdf-viewer`.

- **Other Issues**
  - **Node.js not recognized**: Install Node.js from [nodejs.org](https://nodejs.org) and add to PATH (e.g., `C:\Program Files\nodejs`).
  - **Bower not installed**: Run `npm install -g bower` and verify with `bower -v`.
  - **Antivirus interference**: Temporarily disable antivirus to test file access.
  - **Logs**: Check server logs in the terminal for errors (e.g., `Error serving certs.json`).
  - **Azure Issues**: If PDFs don’t load at `https://pdf-viewer-6lj.azurewebsites.net`, check Azure logs:
    ```bash
    az webapp log tail --name pdf-viewer-6lj --resource-group pdf-viewer-rg
    ```
  - Contact the maintainer for further assistance.

## Notes
- The application requires `pdfjs-dist#^2.16.105` for PDF rendering. Ensure `bower_components/pdfjs-dist/build/pdf.min.js` and `pdf.worker.min.js` are present.
- Avoid spaces and special characters in the project path to prevent file access issues.
- The `azure-webapps-node.yml` workflow deploys to Azure App Service using the `AZURE_WEBAPP_PUBLISH_PROFILE` secret.

## Contributing
1. Fork the repository (`https://github.com/6lj/pdf-viewer`).
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License
MIT License.

## Contact
For issues, open a ticket on [GitHub Issues](https://github.com/6lj/pdf-viewer/issues) or contact the maintainer at [your-email@example.com].