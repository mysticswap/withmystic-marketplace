export const useHideComponent = (id: string) => {
  const component = document?.getElementById(id);

  if (component != null && !component.classList.contains("hide")) {
    component?.classList.add("hide");
  }
};
