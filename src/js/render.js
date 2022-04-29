// hover-эффект у таблицы с рейтингом
const table = document.querySelector('.rating__table')
const rowElems = table.querySelectorAll('tbody tr:not(:first-child)')
const hoverElem = document.querySelector('.rating-hover')
const rating = document.querySelector('.rating')

for (let i = 0; i < rowElems.length; i++) {
    const row = rowElems[i];
    
    row.addEventListener('mouseenter', e => {        
        const ratingPageY = window.scrollY + rating.getBoundingClientRect().top
        const rowPageY = window.scrollY + row.getBoundingClientRect().top
        
        hoverElem.style.top = rowPageY - ratingPageY + 'px'
        hoverElem.style.display = 'block'
    })

    row.addEventListener('mouseleave', e => {
        // console.log('mouseleave')
        hoverElem.style.display = 'none'
    })
}