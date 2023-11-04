import { Tooltip, createTheme, ThemeProvider } from "@mui/material";
import { ReactElement } from "react";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
type Props = {
  text: string;
  children: ReactElement;
};

const CustomTooltip = ({ text, children }: Props) => {
  const { client } = useGlobalContext()!;
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: `white`,
            color: `${client.styles.primaryColor}`,
            fontSize: "18px",
            padding: "10px 20px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "22px",
            boxShadow: "0 2px 4px rgba(0,0,0,1)",
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
