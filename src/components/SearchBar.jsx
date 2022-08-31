//Third party imports
import { TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";

//Local imports
import FilterModal from "./FilterModal";
import { querySliceActions } from "../store/querySlice";

const SearchBar = (props) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const titleRef = useRef();
  const dispatch = useDispatch();

  return (
    <Fragment>
      <TextField
        sx={props.sx}
        label="Search Movie"
        inputRef={titleRef}
        InputProps={{
          startAdornment: (
            <FilterAltIcon
              color="primary"
              fontSize="medium"
              sx={{ cursor: "pointer" }}
              onClick={() => setFilterOpen(true)}
            />
          ),
          endAdornment: (
            <SearchIcon
              color="primary"
              fontSize="large"
              onClick={() => {
                dispatch(
                  querySliceActions.setTitle(
                    titleRef.current.value.toLowerCase()
                  )
                );
                dispatch(querySliceActions.generateQueryParams());
              }}
              sx={{ cursor: "pointer" }}
            />
          ),
        }}
      />
      <FilterModal
        isOpen={filterOpen}
        closeModal={() => setFilterOpen(false)}
      />
    </Fragment>
  );
};

export default SearchBar;
