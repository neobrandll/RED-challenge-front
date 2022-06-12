import { createTheme } from "@material-ui/core/styles";
import { colors } from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.brandRed,
    },
    secondary: {
      main: colors.brandBlack,
    },
  },
});

export default theme;
