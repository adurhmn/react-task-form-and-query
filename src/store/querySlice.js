import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterData: {
    fromDate: "",
    toDate: "",
    maxResults: 15,
    genre: [],
    language: [],
  },
  title: "",
  params: "&count=15", //default count
};

const querySlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    resetFilter(state) {
      state.filterData = {
        fromDate: "",
        toDate: "",
        maxResults: 15,
        genre: [],
        language: [],
      };
      state.params = "";
    },
    setFilter(state, { payload: filterData }) {
      state.filterData = filterData;
    },
    generateQueryParams(state) {
      //this is api specific. it has its own rules to structure params
      //so this might not make sense
      const { genre, language, fromDate, toDate, maxResults } =
        state.filterData;
      let params = "";
      state.title !== "" && (params += "&title=" + state.title);
      genre.length > 0 && (params += "&genres=" + genre.join(","));
      (fromDate || toDate) &&
        (params += "&release_date=" + fromDate + "," + toDate);
      language.length > 0 && (params += "&languages=" + language);
      maxResults && (params += "&count=" + Math.abs(maxResults));

      //change params
      state.params = params;
    },
    setTitle(state, { payload: title }) {
      state.title = title;
    },
  },
});

export const querySliceReducer = querySlice.reducer;
export const querySliceActions = querySlice.actions;
