//Third party imports
import { Typography, styled, Box } from "@mui/material";

//Local imports
import MovieCard from "./MovieCard";

const StyledBox = styled(Box)`
  width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 50px;
  justify-content: center;
`;

const MovieCardBox = (props) => {
  const { movieData } = props;

  if (movieData === null)
    return (
      <Typography color="primary" variant="h5" textAlign="center">
        API limit reached! 😔
      </Typography>
    );

  if (movieData?.length === 0)
    return (
      <Typography color="primary" variant="h5" textAlign="center">
        No movie found! 😔
      </Typography>
    );

  return (
    <StyledBox>
      {movieData.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          year={movie.description}
          plot={movie.plot}
          stars={movie.stars}
          image={movie.image}
          imdbRating={movie.imDbRating}
        />
      ))}
    </StyledBox>
  );
};

export default MovieCardBox;
