import logo from "../assets/todolist-logo.png";
import { Box, styled } from "@mui/material";
import Typography from "@mui/material/Typography";

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Brand = ({ height = 300 }) => {
  return (
    <StyledBox>
      <img src={logo} alt="React logo" height={height} />
      <Typography variant="h4" gutterBottom>
        My TODO List
      </Typography>
      {/*
        <Typography variant="subtitle1" color="textSecondary" textAlign="center">Built with MongoDB + NodeJS + Express + Vite + React</Typography>
*/}
    </StyledBox>
  );
};

export default Brand;
