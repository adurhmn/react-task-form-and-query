import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "red",
        },
      },
    },
  },
});

export default theme;
