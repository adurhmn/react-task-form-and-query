import { styled } from "@mui/material";
import { keyframes } from "@emotion/react";

const loadanimation = keyframes`
  0% {
      transform: scaleY(1);
    }
    
    50% {
        transform: scaleY(2);
    }
    
    100% {
        transform: scaleY(1);
    }    
    `;

const Loader = styled("div")`
  display: flex;
  width: 10rem;
  justify-content: space-around;
  align-items: center;
  margin: 10rem auto;
`;

const Particle1 = styled("span")`
  width: 1rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  display: inline-block;
  animation: ${loadanimation} 0.5s ease-in-out infinite;
`;

const Particle2 = styled("span")`
  width: 1rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  display: inline-block;
  animation: ${loadanimation} 0.5s ease-in-out 0.25s infinite;
`;

const Particle3 = styled("span")`
  width: 1rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  display: inline-block;
  animation: ${loadanimation} 0.5s ease-in-out infinite;
`;

const Loading = () => {
  return (
    <Loader>
      <Particle1 />
      <Particle2 />
      <Particle3 />
    </Loader>
  );
};

export default Loading;
