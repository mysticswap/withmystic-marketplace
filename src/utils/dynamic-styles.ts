import { addOpacity } from ".";
import { ClientObject } from "../types/dynamic-system.types";

export const changeStyles = (client: ClientObject) => {
  const rootElement = document.querySelector(":root") as HTMLElement;

  const customPropertyMap: { [x: string]: string } = {
    "--ms-mp-primary-color": client?.styles?.primaryColor,
    "--ms-mp-primary-transparent": addOpacity(
      client?.styles?.primaryColor,
      0.25
    ),
    "--ms-mp-primary-color-dark": client?.styles?.primaryDarkShade,
    "--ms-mp-text-color": client?.styles?.textColor,
    "--ms-mp-body-background": client?.styles?.bodyBackground,
    "--ms-mp-trait-background-color": addOpacity(
      client?.styles?.primaryColor,
      0.1
    ),
    "--ms-mp-trait-border-color": addOpacity(client?.styles?.primaryColor, 0.5),
    "--ms-mp-trait-hover-color": addOpacity(client?.styles?.primaryColor, 0.25),
    "--ms-mp-card-border-radius": client?.styles?.cardBorderRadius,
    "--ms-mp-card-border-color": client?.styles?.cardBorderColor,
    "--ms-mp-controlbar-hover": client?.styles?.controlBarHoverColor,
  };

  for (const property in customPropertyMap) {
    if (customPropertyMap[property] !== undefined) {
      rootElement.style.setProperty(property, customPropertyMap[property]);
    }
  }
};
