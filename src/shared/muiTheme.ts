import { createMuiTheme } from "@material-ui/core/styles";
import { colors } from "./colors";

const theme = createMuiTheme({
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
