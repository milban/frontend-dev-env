import "./app.css";
import mainStore from "./constant/mainStore0.jpg";
import tenkb from './constant/10kb.jpg';

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
        <img src="${mainStore}" />
        <img src="${tenkb}" />
    `;
});
