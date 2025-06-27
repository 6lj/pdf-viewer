# PDF Viewer

A web application for browsing and viewing PDF certificates stored in the `certs/` directory.

## Requires
- **[Node.js](https://nodejs.org/)** (v18 or higher recommended, e.g., v20 LTS)
  - Verify: `node -v` and `npm -v`
- **[Bower](https://bower.io/)** for installing `pdfjs-dist`
  - Verify: `bower -v`
- A modern web browser (e.g., Chrome, Firefox, Edge)


1. **Install Dependencies**
   - Install Node.js dependencies and Bower:
     ```bash
     npm install
     npm install -g bower
     bower install
     ```

4. **Start the Server**
   - Run the Node.js/Express server:
     ```bash
     node server.js
     ```
   - The server runs at `http://localhost:8000`.

5. **Access the Application**
   - Open a browser and navigate to `http://localhost:8000`.
   - Browse folders (e.g., `Professional`, `Academic`) or click a PDF (e.g., `Profile.pdf`) to view it in a modal with auto-sizing and navigation.





## Notes
- The application requires `pdfjs-dist#^2.16.105` for PDF rendering. Ensure `bower_components/pdfjs-dist/build/pdf.min.js` and `pdf.worker.min.js` are present.
- Avoid spaces and special characters in the project path to prevent file access issues.






