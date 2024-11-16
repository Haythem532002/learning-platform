import React from "react";
import FileIcon from "./FileIcon";
import "./FileList.css";

interface File {
  name: string;
  type: string;
  url: string;
}

interface FileListProps {
  files: File[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <div className="file-list">
      {files.map((file, index) => (
        <div key={index} className="file-item">
          <FileIcon fileType={file.type} />
          <a href={file.url} download={file.name} className="file-link">
            {file.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default FileList;
