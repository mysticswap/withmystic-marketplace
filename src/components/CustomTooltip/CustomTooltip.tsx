import { Tooltip, createTheme, ThemeProvider } from "@mui/material";
import { ReactElement } from "react";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
type Props = {
  text: string;
  children: ReactElement;
};

const CustomTooltip = ({ text, children }: Props) => {
  const { client } = useGlobalContext();
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: client?.styles?.bodyBackground,
            color: client?.styles?.primaryColor,
            fontSize: "18px",
            padding: "10px 20px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "22px",
            fontFamily: client?.fonts?.fontFamily,
            border: `1px solid ${client?.styles?.primaryColor}`,
          },
          arrow: {
            color: client?.styles?.bodyBackground,
            [`&::before`]: {
              color: client?.styles?.bodyBackground,
              border: `1px solid ${client?.styles?.primaryColor}`,
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
