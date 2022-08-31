//Third party imports
import { Typography, Box } from "@mui/material";
import styled from "@emotion/styled/macro";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";

//Local imports
import { usePatchMovieCache, usePatchWatchList } from "../hooks/queryHooks";
import { authSliceActions } from "../store/authSlice";

FavoriteIcon = styled(FavoriteIcon)`
  font-size: 40px;
  transition: font-size 0.2s;
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: red;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

FavoriteBorderIcon = styled(FavoriteBorderIcon)`
  font-size: 40px;
  transition: font-size 0.2s;
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: red;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

const Movie = styled(Box)`
  height: 500px;
  position: relative;
  overflow: hidden;
  font-weight: 600;
  box-shadow: 0 10px 20px blue;
  background-color: blue;
`;

const MoviePoster = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
`;

const Description = styled("div")`
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 20px;
  background-color: #000000ce;
  color: white;
  position: absolute;
  bottom: 0px;
  left: 0px;
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  ${Movie}:hover & {
    transform: translateY(0);
  }
`;
/* background-color: ${({ theme }) => theme.palette.primary.main}; */

const Backdrop = styled(Box)`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  background: linear-gradient(to top, #000000be 0%, transparent 40%);

  ${Movie}:hover & {
    background: none;
  }
`;

const Title = styled("span")`
  /* font-weight: bold; */
  text-decoration: underline;
`;

const MovieCard = (props) => {
  const { id, image, title, year, imdbRating, stars, plot } = props;

  const {
    watchlist,
    authdata: { authenticatedUser },
  } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const { mutate } = usePatchWatchList();
  const { mutate: cacheData } = usePatchMovieCache();

  return (
    <Movie>
      <MoviePoster src={image} alt="movie-poster" loading="lazy" />
      <Description>
        <Typography
          variant="h6"
          fontWeight="bold"
          textTransform="uppercase"
          className="movie-title"
        >
          {title} {year}
        </Typography>
        <Typography variant="subtitle1">
          <Title>IMDB:</Title>&nbsp;
          {imdbRating}/10
        </Typography>
        <Typography variant="body2">
          <Title>Stars:</Title>&nbsp;
          {stars}
        </Typography>
        <Typography variant="body2">
          <Title>Plot:</Title>&nbsp;{plot}
        </Typography>
      </Description>
      <Backdrop>
        {watchlist.includes(id) ? (
          <FavoriteIcon
            onClick={() => {
              //remove from watchlist
              const updatedWatchlist = watchlist.filter(
                (movieId) => movieId !== id
              );
              mutate({
                username: authenticatedUser,
                watchlist: updatedWatchlist,
              });
              dispatch(authSliceActions.setWatchlist(updatedWatchlist));
            }}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={() => {
              const updatedWatchlist = [...watchlist, id];
              mutate({
                username: authenticatedUser,
                watchlist: updatedWatchlist,
              });
              dispatch(authSliceActions.setWatchlist(updatedWatchlist));

              //Caching liked movie data in local db.
              //Refetching each liked movie will make a lot of api calls, since the free api is limited to
              //only 100 calls perday, I cache the data. I know this is not a solid approach.
              //This approach works solid if local db is not manipulated manually
              cacheData({
                id,
                title,
                year,
                plot,
                stars,
                image,
                imdbRating,
              });
            }}
          />
        )}
      </Backdrop>
    </Movie>
  );
};

export default MovieCard;
