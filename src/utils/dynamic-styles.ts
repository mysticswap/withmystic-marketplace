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
    "--ms-mp-button-border-radius": client?.styles?.buttonBorderRadius,
    "--ms-mp-font-family": client?.fonts?.fontFamily,
  };

  for (const property in customPropertyMap) {
    if (customPropertyMap[property] !== undefined) {
      rootElement.style.setProperty(property, customPropertyMap[property]);
    }
  }
};

export const addLinks = (client: ClientObject) => {
  const links = client?.fonts?.fontLinks;
  if (links) {
    document.head.innerHTML += links;
  }
};

export const updateMetadata = (client: ClientObject) => {
  const existingTags = document.head.querySelectorAll(
    'meta[property^="og:"], meta[name^="twitter:"]'
  );
  if (existingTags.length === 0 && client?.htmlTitle) {
    const tags = ` <meta property="og:title" content="${client?.htmlTitle}" />
                    <meta property="og:description" content="${client?.htmlTitle}" />
                    <meta property="og:image" content="${client?.logoUrl}" />
                    <meta property="og:url" content="https://${client?.hostname}" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="${client?.htmlTitle}" />
                    <meta name="twitter:description" content="${client?.htmlTitle}" />
                    <meta name="twitter:image" content="${client?.logoUrl}" />`;
    document.head.innerHTML += tags;
  }
};
