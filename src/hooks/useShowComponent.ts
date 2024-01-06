export const useShowComponent = (id: string) => {
  const component = document?.getElementById(id);

  if (component != null) {
    component?.classList.remove("hide");
  }
};
