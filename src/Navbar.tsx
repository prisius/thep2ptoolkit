import React from 'react';
import { Link } from 'wouter'; // Import Link for navigation

const Navbar = (props: {}) => {
  return (
    <div>
    <h1>The p2p toolkit</h1>
    <ul>
      <li>
        <Link href="/file">
          <img src="file.png" alt="File Icon" width="15px" />
        </Link>
      </li>
      <li>
        <Link href="/chat">
          <img src="chat.png" alt="Chat Icon" width="20px" />
        </Link>
      </li>
    </ul>
    </div>
  );
};

export default Navbar;
