import type { PlasmoGetStyle } from "plasmo"
 
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = `
    p {
      background-color: #36393e;
    }
  `
  return style
}