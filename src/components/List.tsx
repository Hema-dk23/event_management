import { useCallback, useContext, useEffect, useState } from "react";
import { EventCard } from "./EventCard";
import {
  Pagination,
  Box,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Chip,
  MenuItem,
  Popper,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";
import type { ICategory, IListItem } from "../types";
import { Search } from "@mui/icons-material";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../consts/config";
import { DAY_FILTER, STATIC_TEXT } from "../consts/staticText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { prepareUrl } from "../helper/utils";

// This component shows list of events and uses EventCard component to show each Card
const List = () => {
  const { userRole } = useContext(UserContext);
  const navigate = useNavigate();

  const [list, setList] = useState<IListItem[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchString, setSearchString] = useState("");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [poperData, setPoperData] = useState<any>([]);
  const [categoryFilter, setCategoryFilter] = useState(7);
  const [dateFilter, setDateFilter] = useState(1);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const url = `${BASE_URL}/category`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.unshift({ key: 7, value: STATIC_TEXT.txtAnyCategory });
        setCategory(data);
      });
  }, []);
  const fetchData = useCallback(() => {
    const url = prepareUrl(
      pageNumber,
      categoryFilter,
      searchString,
      dateFilter
    );

    fetch(url)
      .then((response) => {
        setTotalCount(Number(response.headers.get("X-Total-Count")) || 0);
        return response.json();
      })
      .then((data) => {
        setList(data);
      });
  }, [pageNumber, categoryFilter, searchString, dateFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageNumber(page);
  };

  const handleSearch = (searchString: string) => {
    setPageNumber(1);
    setSearchString(searchString);
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setPoperData(category);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleTimeFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setPoperData(DAY_FILTER);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleMenuItem = (key: number, value: string) => {
    setAnchorEl(null);
    if (poperData[0].value === STATIC_TEXT.txtAnyCategory) {
      setCategoryFilter(key);
    } else {
      setDateFilter(key);
    }
  };

  const handleRefreshData = () => {
    if (pageNumber === 1) {
      fetchData();
    } else {
      setPageNumber(1);
    }

  }

  return (
    <>
      <NavBar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        my={1}
        mr={1}
      >
        <Chip
          icon={<KeyboardArrowDownIcon />}
          label={
            DAY_FILTER.find((item) => Number(item.key) === dateFilter)?.value
          }
          color={dateFilter !== 1 ? "primary" : "default"}
          onClick={handleTimeFilterClick}
          sx={{ fontSize: 16, width: "150px" }}
        />

        <Chip
          icon={<KeyboardArrowDownIcon />}
          label={
            category.find((item) => Number(item.key) === categoryFilter)?.value
          }
          color={categoryFilter !== 7 ? "primary" : "default"}
          onClick={handleCategoryClick}
          sx={{ mx: 2, fontSize: 16, width: "150px" }}
        />
        <TextField
          placeholder={STATIC_TEXT.phSearch}
          variant="outlined"
          onChange={(event) => handleSearch(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
          size="small"
          sx={{ marginRight: 2 }}
        />
        {userRole === "ROLE_ADMIN" && (
          <Button variant="outlined" onClick={() => navigate("/create")}>
            Create
          </Button>
        )}
      </Box>
      <Grid container spacing={1} marginLeft={2}>
        {list.map((item: IListItem) => (
          <Grid item xs={3} key={item.id}>
            <EventCard data={item} refreshData={handleRefreshData} />
          </Grid>
        ))}
      </Grid>
      {list.length === 0 && (
        <Box display="flex" justifyContent="center" mt={20}>
          <Typography variant="h2">{STATIC_TEXT.txtNoEventFound}</Typography>
        </Box>
      )}
      <Box width="100%" display="flex" justifyContent="center">
        {totalCount > 8 && (
          <Pagination
            page={pageNumber}
            defaultPage={1}
            count={Math.ceil(totalCount / 8)}
            onChange={handlePageChange}
            size="small"
          />
        )}
      </Box>
      <Popper open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          {poperData.map((item: ICategory) => (
            <MenuItem
              key={item.key}
              value={item.value}
              onClick={() => handleMenuItem(Number(item.key), item.value)}
            >
              {item.value}
            </MenuItem>
          ))}
        </Box>
      </Popper>
    </>
  );
};

export default List;
