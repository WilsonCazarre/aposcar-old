import React from "react";

const Footer: React.FC = () => {
  return (
    <div
      className="bg-gray-800 border-t
    border-gray-700 p-1 text-center text-sm bottom-0 fixed w-full"
    >
      Made with 💜 by LabQuatro |{" "}
      <a href="https://ko-fi.com/labquatro" target="_blank" rel="noreferrer">
        Buy us a Ko-fi
      </a>
    </div>
  );
};

export default Footer;
