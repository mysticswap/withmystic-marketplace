import { Tooltip, createTheme, ThemeProvider } from "@mui/material";
import { ReactElement } from "react";
type Props = {
  text: string;
  children: ReactElement;
};

const CustomTooltip = ({ text, children }: Props) => {
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "white",
            color: "#085abc",
            fontSize: "18px",
            padding: "10px 20px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "22px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          },
          arrow: {
            color: "white",
            [`&::before`]: {
              color: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            },
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Tooltip title={text} placement="top" arrow>
          {children}
        </Tooltip>
      </ThemeProvider>
    </>
  );
};

export default CustomTooltip;
