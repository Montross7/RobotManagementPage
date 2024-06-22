import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import MainPage from "./components/MainPage";

import { worker } from "./mocks/browser";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3961F8",
      dark: "#133BD3",
      light: "#B8DDFF",
    },
    secondary: {
      main: "#0091FF",
      dark: "#00457A",
      light: "#D7EEFF",
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "32px",
      letterSpacing: "0px",
    },
  },
});

function App() {
  worker.start();
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
