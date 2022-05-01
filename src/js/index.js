import { find, findAll, removeAll, bodyLock } from "./utilities/functions.js"
import "./render.js"
import "./menu.js"
import "./modals.js"

// Стрелка "Наверх"
document.querySelector(".back-to-top").addEventListener("click", (e) => {
    window.scrollBy(0, -window.scrollY)
})