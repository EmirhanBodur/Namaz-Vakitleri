// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-black text-center p-4">
      <div>
        <p>&copy; {new Date().getFullYear()} <a href="https://www.emirhanbodur.dev" target='_blank'  rel="noreferrer">Emirhan Bodur</a> Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
