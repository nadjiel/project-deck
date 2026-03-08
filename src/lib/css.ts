
export function getVariable(name: string) {
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
}

const css = {
  getVariable,
};

export default css;
