import { Container, createTheme, ThemeProvider } from "@mui/material";
import { CookiesProvider } from "react-cookie";
import MainContent from "./MainContent.tsx";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const MainLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <Container maxWidth="md" sx={{ my: 12 }}>
          <MainContent />
        </Container>
      </CookiesProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
