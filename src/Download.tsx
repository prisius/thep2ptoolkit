import WebTorrent from 'webtorrent';
import { useState } from 'react';

const client = new WebTorrent();

function Download() {
  const [magnetURI, setMagnetURI] = useState("");
  const [files, setFiles] = useState([]); // State to hold the list of torrent files

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent form submission and page reload

    client.add(magnetURI, torrent => {
      // Got torrent metadata!
      console.log('Client is downloading:', torrent.infoHash);

      // Update state with the list of files
      setFiles(torrent.files);
    });
  }

  // Function to handle downloading the file using file.blob()
  const handleDownload = async (file) => {
    try {
      // Use WebTorrent's file.blob() to get the file as a Blob
      const blob = await file.blob();
      // Create a URL for the blob and trigger the download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name; // Set the filename for download
      document.body.appendChild(a);
      a.click(); // Programmatically click the link to trigger the download
      document.body.removeChild(a); // Clean up the DOM
      URL.revokeObjectURL(url); // Free up memory after download
    } catch (err) {
      console.error('Error downloading file:', err);
    }
  };

  return (
    <>
      <label htmlFor="torrentId">Télécharger depuis un lien magnet: </label>
      <input
        placeholder="magnet:"
        value={magnetURI}
        onChange={(e) => setMagnetURI(e.target.value)}
      />
      <button onClick={handleSubmit} type="submit">Download</button>

      <div className="link">
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => handleDownload(file)}
                >
                  Download {file.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Download;
