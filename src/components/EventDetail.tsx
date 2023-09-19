import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICategory, IListItem } from "../types";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import NavBar from "./NavBar";
import { BASE_URL } from "../consts/config";
import DialogComponent from "./modal/DialogComponent";
import { STATIC_TEXT } from "../consts/staticText";

// This component is used to show Event details
export const EventDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<IListItem>();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const url = `${BASE_URL}/events/${id}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);

  useEffect(() => {
    const url = `${BASE_URL}/category`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);

  if (!data) return <>{STATIC_TEXT.txtNoIdFound}</>;

  return (
    <>
      <NavBar />
      <Box m={5}>
        <Typography variant="h4" gutterBottom>
          {data.title}
        </Typography>
        <Divider />
        <Box display="flex" my={2} justifyContent="center">
          <img
            src={data.image_path}
            alt={data.title}
            width={500}
            height={400}
          />
          <Box ml={5}>
            <Grid container>
              <Grid item xs={2}>
                <Typography sx={{ fontWeight: 700 }}>
                  {STATIC_TEXT.txtStartDt}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {new Date(data.startdatetime)
                    .toLocaleString("en-GB")
                    .slice(0, -3)}{" "}
                  CET
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontWeight: 700 }}>
                  {STATIC_TEXT.txtEndDt}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {new Date(data.enddatetime)
                    .toLocaleString("en-GB")
                    .slice(0, -3)}{" "}
                  CET
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontWeight: 700 }}>
                  {STATIC_TEXT.lblDescription}:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{data.description}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontWeight: 700 }}>
                  {STATIC_TEXT.lblCategory}:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {
                    category.find(
                      (item) => Number(item.key) === data.category_id
                    )?.value
                  }
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontWeight: 700 }}>
                  {STATIC_TEXT.lblLocation}:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{data.location}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontWeight: 700 }}>
                  {STATIC_TEXT.lblPrice}:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {data.price === 0
                    ? STATIC_TEXT.txtFree
                    : `${data.price} ${data.price_unit}`}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Button
                  sx={{ marginTop: 2 }}
                  variant="outlined"
                  onClick={() => setOpen(true)}
                >
                  {STATIC_TEXT.btnRegister}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <DialogComponent
        isOpen={isOpen}
        setOpen={setOpen}
        title={STATIC_TEXT.informationTitle}
        description={STATIC_TEXT.registerSuccessMessage}
        showCancel={false}
        handleOk={() => {}}
      />
    </>
  );
};
