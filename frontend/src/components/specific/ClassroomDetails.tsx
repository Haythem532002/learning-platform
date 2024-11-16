import classroomDetails from "./classroomDetails.module.css";
import FileList from "./FileList";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Chat from "./Chat";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Classroom } from "../../types/props";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ebeeef",
  boxShadow: 24,
  p: 3,
  borderRadius: "8px",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
interface File {
  name: string;
  type: string;
  url: string;
}

const files: File[] = [
  { name: "Document.pdf", type: "pdf", url: "path/to/document.pdf" },
  { name: "Image.jpg", type: "image", url: "path/to/image.jpg" },
  { name: "Report.docx", type: "word", url: "path/to/report.docx" },
];

const ClassroomDetails = (props: Classroom) => {
  console.log("dffsdsfsdfsdfdssdfsfsdfsd")
  console.log(props);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={classroomDetails.container}>
      <div className={classroomDetails.goLive}>
        <a className={classroomDetails.goLiveButton} href="">
          Go Live
        </a>
      </div>
      <div>
        <Button
          style={{ margin: "10px" }}
          variant="contained"
          onClick={handleOpen}
        >
          Materials
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Get the Classroom Materials :
            </Typography>
            <FileList files={files} />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </Box>
        </Modal>
        <Chat />
      </div>
    </div>
  );
};

export default ClassroomDetails;
