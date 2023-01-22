const blue = "#7289da";
const grey = "#424549";
const darkGrey = "#36393e";
const darkestGrey = "#282b30";
const black = "#1e2124"
const prettyBlue = "#49536F"
const textColour = "#D4D8E3"
const textBorder = "#2b3041"

// imported theme from separate file
import { createTheme } from "@mui/material";

const palette = {
    primary: { main: grey },
    secondary: { main: prettyBlue },
    text: {main: textColour},
    info: {main: textBorder}
  };
  
declare module '@mui/material/styles' {
        interface ThemeOptions {
          [key: string]: any; // 
        }
    }

export const theme = createTheme({palette});