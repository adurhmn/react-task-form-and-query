//Third party imports
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

//Local imports
import { useGetMovieCache } from "../hooks/queryHooks";
import MovieCardBox from "../components/MovieCardBox";
import NavBar from "../components/NavBar";
import Loading from "../Utils/Loading";

const Wishlist = () => {
  const { watchlist } = useSelector((s) => s.auth);
  const data = useGetMovieCache(watchlist);
  const [contentLoaded, setContendLoaded] = useState(false);

  useEffect(() => {
    const loaded = data.every(({ status }) => status === "success");
    setContendLoaded(loaded);
  }, [data]);

  return (
    <Box>
      <Box sx={{ mb: "100px" }}>
        <NavBar />
      </Box>
      {contentLoaded ? (
        <MovieCardBox movieData={data.map(({ data }) => data)} />
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default Wishlist;
