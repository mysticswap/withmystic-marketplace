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
            backgroundColor: "#ffffff",
            color: "#086abc",
            fontSize: "18px",
            padding: "10px 20px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "22px",
            fontFamily: "Poppins",
            border: `1px solid #086abc`,
          },
          arrow: {
            color: "#ffffff",
            [`&::before`]: {
              color: "#ffffff",
              border: `1px solid #086abc`,
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
