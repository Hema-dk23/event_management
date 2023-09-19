import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface IProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description: string;
  showCancel?: boolean;
  handleOk?: () => any;
}

// Dialog component to show confirmation and success dialogs
const DialogComponent = ({
  isOpen,
  setOpen,
  title,
  description,
  showCancel = true,
  handleOk
}: IProps) => {
  const handleClose = () => {
    setOpen(false);
    if (handleOk) {
      handleOk();
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setOpen(false)}>
      <DialogTitle align="center">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          OK
        </Button>
        {showCancel && (
          <Button onClick={() => setOpen(false)} autoFocus>
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
