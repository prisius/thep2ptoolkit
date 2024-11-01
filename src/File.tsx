import {toast} from "react-toastify"
import { useState, useEffect } from 'react';
import './App.css';
import dragDrop from 'drag-drop';
import WebTorrent from 'webtorrent';
import Download from "./Download.tsx"

function File() {
  const [magnet, setMagnet ] = useState("");
  const notify = () => toast.success("Copiée dans le presse papier !");

function pasta() {
  notify();
  const Text = document.getElementById("magnet-text");
  navigator.clipboard.writeText(Text.innerText) // Use innerText instead of value
    .then(() => {
      console.log('Copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
}
   

  useEffect(() => {
    const client = new WebTorrent(); // Create client inside useEffect
    const targetElement = document.getElementById('target');

    let drop = document.getElementById("target");

    drop.addEventListener("dragenter", () => {
      drop.style.backgroundColor = "#ffffc5"
      drop.style.borderWidth = "8px"
    })

    drop.addEventListener("dragleave", () => {
      drop.style.backgroundColor = "#ffffff"
      drop.style.borderWidth = "2px"
    })


 

    if (targetElement) {
      dragDrop(targetElement, (files) => { // Use targetElement for dragDrop
        client.seed(files, (torrent) => {
          console.log('Client is seeding:', torrent.magnetURI);
          setMagnet(torrent.magnetURI)
        });
      });
    }

    // Cleanup function to destroy the client
 }, []); // Empty dependency array to run only once on mount

  return (
    <div>
    <br/>
    <h1>File Transfer</h1>
    <div className="warning">

<p>Avant de commencer à télécharger ou à partager du contenu via des réseaux P2P (peer-to-peer), nous tenons à vous rappeler que l'utilisation de ces technologies peut comporter des risques.</p>

<ul><li>
Points à Considérer :
Respect des Droits d’Auteur : Le téléchargement de contenu protégé par des droits d'auteur sans autorisation est illégal et peut entraîner des sanctions juridiques. Veuillez vous assurer que vous avez le droit de télécharger et de partager le contenu que vous utilisez.
</li>
<li>
Utilisation Frauduleuse : Nous ne garantissons en aucun cas que le contenu téléchargé via des réseaux P2P ne sera pas utilisé à des fins frauduleuses. Soyez conscient que le partage de fichiers peut impliquer des contenus illicites ou non sécurisés.

  </li>

<li>
Sécurité de Votre Système : Le téléchargement de fichiers à partir de sources non vérifiées peut exposer votre appareil à des virus, des malwares ou des logiciels espions. Assurez-vous de disposer de logiciels de sécurité à jour et de vérifier la provenance des fichiers avant de les télécharger.

  </li>
Confidentialité : En utilisant des réseaux P2P, vos adresses IP et vos informations personnelles peuvent être exposées. Pensez à utiliser un VPN pour protéger votre anonymat en ligne.

  <li>
Conclusion
L'utilisation de technologies P2P est à vos propres risques. Soyez prudent et informé, et n'oubliez pas de respecter les lois en vigueur dans votre pays.
  </li>
</ul>
    </div>
    <div className="container">
     <p id="target">Déposez ici votre fichier, veuillez noter que vous devez garder votre session ouverte pour partager</p>
      </div>
{magnet &&
  <>

        <div>
<img src="down.png" width="40px" />

      <button onClick={pasta}>copy to clipboard</button>
<div id="magnet">
      <p id="magnet-text">{magnet}</p>
      </div>
      <img src="up.png" width="40px"/>

      </div>
      </>
      }

      <Download/>

    </div>
  );
}

export default File;

