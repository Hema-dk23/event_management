import { FC, useState, useContext } from "react";
import {
  Box,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import type { IListItem } from "../types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogComponent from "./modal/DialogComponent";
import { STATIC_TEXT } from "../consts/staticText";
import { BASE_URL } from "../consts/config";

interface IProps {
  data: IListItem;
  refreshData: () => void;
}
export const EventCard: FC<IProps> = ({
  data: { id, title, description, image_path, startdatetime },
  refreshData,
}) => {
  const { userRole } = useContext(UserContext);
  const navigate = useNavigate();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [isSuccessOpen, setSuccessOpen] = useState<boolean>(false);

  const handleDelte = () => {
    const url = `${BASE_URL}/events/${id}`;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions).then(() => {
      setSuccessOpen(true);
    });
  };

  const handleSuccess = () => {
    navigate("/");
    refreshData();
  };

  // This is card component to show information regarding events
  return (
    <>
      <Card sx={{ width: "300px", height: "275px", my: "10px" }}>
        <CardMedia sx={{ height: 80 }} image={image_path} />
        <CardContent>
          <Typography
            sx={{
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            gutterBottom
            variant="h6"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            sx={{
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            variant="body2"
            color="text.secondary"
          >
            {description} <br />
          </Typography>
          <Typography sx={{ fontWeight: 300 }}>
            {new Date(startdatetime).toLocaleString("en-GB").slice(0, -3)} CET
          </Typography>
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button size="small" onClick={() => navigate(`/${id}`)}>
              {STATIC_TEXT.btnLearnMore}
            </Button>
            {userRole === "ROLE_ADMIN" && (
              <Box>
                <IconButton>
                  <EditIcon onClick={() => navigate(`/update/${id}`)} />
                </IconButton>
                <IconButton onClick={() => setConfirmOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </CardActions>
      </Card>
      <DialogComponent
        isOpen={isConfirmOpen}
        setOpen={setConfirmOpen}
        title={STATIC_TEXT.confirmationTitle}
        description={STATIC_TEXT.deleteWarning}
        handleOk={handleDelte}
      />
      <DialogComponent
        isOpen={isSuccessOpen}
        setOpen={setSuccessOpen}
        title={STATIC_TEXT.informationTitle}
        description={STATIC_TEXT.deleteSuccessMessage}
        handleOk={() => handleSuccess()}
      />
    </>
  );
};
