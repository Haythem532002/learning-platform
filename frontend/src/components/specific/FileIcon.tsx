import React from "react";
import { FaFilePdf, FaFileImage, FaFileWord, FaFileAlt } from "react-icons/fa";

interface FileIconProps {
  fileType: string;
}

const FileIcon: React.FC<FileIconProps> = ({ fileType }) => {
  switch (fileType) {
    case "pdf":
      return <FaFilePdf style={{ color: "red" }} />;
    case "image":
      return <FaFileImage style={{ color: "blue" }} />;
    case "word":
      return <FaFileWord style={{ color: "blue" }} />;
    default:
      return <FaFileAlt />;
  }
};

export default FileIcon;
