if (window.innerWidth <= 920) {
    const header = document.querySelector(".header");
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".menu");
    const headerHeightDefault = header.clientHeight;
    const headerEmpty = document.querySelector(".header__empty");
    let menuActive = false;

    // Задаем высоту заглушке равную высоте меню
    headerEmpty.style.height = menu.clientHeight + "px";

    burger.addEventListener("click", (e) => {
        const menuHeight = menu.clientHeight;
        const headerHeight = header.clientHeight;

        if (!menuActive) {
            header.style.maxHeight = menuHeight + headerHeight + "px";
            burger.classList.add('_activeAnim')

            setTimeout(e => {
                burger.classList.remove('_deactive')
                burger.classList.add('_active')
                burger.classList.remove('_activeAnim')
            }, 300)
            menuActive = true;
        } else {
            header.style.maxHeight = headerHeightDefault + "px";
            burger.classList.add('_deactiveAnim')
            
            setTimeout(e => {
                burger.classList.remove('_active')
                burger.classList.add('_deactive')
                burger.classList.remove('_deactiveAnim')
            }, 400)
            menuActive = false;
        }
    });
}
