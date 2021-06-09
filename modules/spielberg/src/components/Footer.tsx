import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-gray-800 bottom-0 p-2 text-center w-full leading-tight mt-auto
    border-t border-gray-600"
    >
      <div className="text-sm mx-auto inline">Made with 💜 by LabQuatro | </div>
      <a
        className="text-xs font-thin underline"
        href="https://ko-fi.com/labquatro"
        target="_blank"
        rel="noreferrer"
      >
        Buy us a ko-fi
      </a>
    </footer>
  );
};

export default Footer;
