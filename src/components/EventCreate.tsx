import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IListItem, ICategory } from "../types";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NavBar from "./NavBar";
import { BASE_URL } from "../consts/config";
import { STATIC_TEXT } from "../consts/staticText";
import DialogComponent from "./modal/DialogComponent";
import { endOfDay, startOfDay } from "date-fns";

// This component is used for Event create and update
export const EventCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<IListItem>({
    id: 0,
    title: "",
    description: "",
    enddatetime: endOfDay(new Date()).toString(),
    startdatetime: startOfDay(new Date()).toString(),
    image_path: "",
    location: "",
    price: 0,
    price_unit: "DKK",
    category_id: 0,
  });

  const [category, setCategoty] = useState<ICategory[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const url = `${BASE_URL}/events/${id}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setForm(data);
      });
  }, [id]);

  useEffect(() => {
    const url = `${BASE_URL}/category`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCategoty(data);
      });
  }, []);

  const updateForm = (prop: string, value: any) => {
    setForm((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  };

  const handleImageChange = (event: any) => {
    console.log(event.target.files);
    updateForm("image_path", URL.createObjectURL(event.target.files[0]));
  };

  const handleSave = () => {
    const requestOptions = {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    };
    const url = id ? `${BASE_URL}/events/${id}` : `${BASE_URL}/events`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setForm(data);
        setOpen(true);
      });
  };

  return (
    <>
      <NavBar />
      <Grid container spacing={2} columnGap={1} my={2} mx={3}>
        <Grid item xs={11}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">
              {id ? STATIC_TEXT.titleUpdateEvent : STATIC_TEXT.titleCreatEvent}
            </Typography>
            <Box display="flex">
              <Button
                variant="outlined"
                sx={{ marginRight: 2 }}
                onClick={handleSave}
              >
                {id ? STATIC_TEXT.btnUpdate : STATIC_TEXT.btnCreate}
              </Button>
              <Button variant="outlined" onClick={() => navigate("/")}>
                {STATIC_TEXT.btnCancel}
              </Button>
            </Box>
          </Box>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label={STATIC_TEXT.lblTitle}
            value={form.title}
            required={true}
            onChange={(event) => updateForm("title", event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            select
            label={STATIC_TEXT.lblCategory}
            required={true}
            value={form.category_id}
            onChange={(event) =>
              updateForm("category_id", event.target.value.toString())
            }
            fullWidth
          >
            {category.map((item: ICategory) => (
              <MenuItem key={item.key} value={item.key}>
                {item.value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={5}>
          <TextField
            label={STATIC_TEXT.lblPrice}
            value={form.price}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {form.price_unit}
                </InputAdornment>
              ),
            }}
            onChange={(event) => updateForm("price", event.target.value)}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label={STATIC_TEXT.lblLocation}
            required={true}
            value={form.location}
            onChange={(event) => updateForm("location", event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label={STATIC_TEXT.lblStartDate}
              sx={{ width: "100%" }}
              value={new Date(form.startdatetime)}
              onChange={(value) => updateForm("startdatetime", value)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={5}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label={STATIC_TEXT.lblEndDate}
              sx={{ width: "100%" }}
              value={new Date(form.enddatetime)}
              onChange={(value) => updateForm("enddatetime", value)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={10}>
          <TextField
            label={STATIC_TEXT.lblDescription}
            required={true}
            value={form.description}
            onChange={(event) => updateForm("description", event.target.value)}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" flexDirection="column">
            <Typography marginBottom={1}>{STATIC_TEXT.lblImageForEvent}</Typography>
            <Box mt={1} mb={2}>
              <input type="file" onChange={handleImageChange} />
            </Box>
            {form.image_path && (
              <img
                src={form.image_path}
                alt={STATIC_TEXT.txtNotFound}
                height="300px"
                width="300px"
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <DialogComponent
        isOpen={isOpen}
        setOpen={setOpen}
        title={STATIC_TEXT.informationTitle}
        description={
          id
            ? STATIC_TEXT.updateSuccessMessage
            : STATIC_TEXT.createSuccessMessage
        }
        showCancel={false}
        handleOk={() => navigate("/")}
      />
    </>
  );
};
