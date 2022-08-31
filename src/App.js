import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import theme from "./ui/theme";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import store from "./store/store";
import { Provider } from "react-redux";
import Validation from "./components/Validation";
import Dashboard from "./Pages/Dashboard";
import Wishlist from "./Pages/Wishlist";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={<Validation children={<Dashboard />} />}
              />
              <Route
                path="/wishlist"
                element={<Validation children={<Wishlist />} />}
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
