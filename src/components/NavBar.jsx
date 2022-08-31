//Third party imports
import { Typography, Button, styled, Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";

//Third party imports
import { useGetAuthData, usePostAuthData } from "../hooks/queryHooks";
import { authSliceActions } from "../store/authSlice";
import { querySliceActions } from "../store/querySlice";

const NavBox = styled(Box)`
  padding: 15px;
  color: white;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  display: flex;
  gap: 30px;
  align-items: center;
`;

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "sx",
})`
  text-transform: uppercase;
  text-decoration: none;
  color: ${(props) => (props.isActive ? "lightgrey" : "white")};
  font-size: 15px;
  transition: color 0.2s;

  &:hover {
    color: #b3b3b3;
  }
`;

const NavBar = () => {
  const { mutate } = usePostAuthData();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();

  return (
    <NavBox>
      <Typography variant="h6" component="p" color="primary.light">
        Movie Store
      </Typography>
      <StyledLink to="../wishlist" isActive={pathname === "/wishlist"}>
        Wishlist
      </StyledLink>
      <StyledLink to="../dashboard" isActive={pathname === "/dashboard"}>
        Dashboard
      </StyledLink>
      <Button
        onClick={() => {
          mutate({ sessionExists: false, authenticatedUser: null });
          queryClient.setQueryData(useGetAuthData.queryKey, () => ({
            sessionExists: false,
            authenticatedUser: null,
          }));
          dispatch(
            authSliceActions.setAuthdata({
              sessionExists: false,
              authenticatedUser: null,
            })
          );
          dispatch(querySliceActions.resetFilter());
          dispatch(querySliceActions.setTitle(""));
        }}
        sx={{ ml: "auto", color: "white" }}
      >
        Logout
      </Button>
    </NavBox>
  );
};

export default NavBar;
