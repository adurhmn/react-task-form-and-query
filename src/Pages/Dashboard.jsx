//Third party imports
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

//Local imports
import SearchBar from "../components/SearchBar";
import MovieCardBox from "../components/MovieCardBox";
import { useGetMovies } from "../hooks/queryHooks";
import NavBar from "../components/NavBar";
import Loading from "../Utils/Loading";

const Dashboard = () => {
  const { params } = useSelector((s) => s.query);
  const { data, isLoading, isFetching } = useGetMovies(params);

  return (
    <Box>
      <NavBar />
      <Box sx={{ m: "80px 0", textAlign: "center" }}>
        <SearchBar sx={{ width: "600px" }} />
      </Box>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <MovieCardBox movieData={data.results} />
      )}
    </Box>
  );
};

export default Dashboard;
