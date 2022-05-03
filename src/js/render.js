import { removeAll, isWebp } from "./utilities/functions.js"
import Parallax from 'parallax-js'

isWebp()

// Паралакс героев
// const parallaxHeroMan = new Parallax(document.querySelector('.hero-man'))
// const parallaxHeroWoman = new Parallax(document.querySelector('.hero-woman'))
// new Parallax(document.querySelector('.msl__title'))
// new Parallax(document.querySelector('.msl__sphere'))


if (window.innerWidth > 768) {
    new Parallax(document.querySelector('.msl__fenix'))
    
    // Паралакс фона на главной при скролле
    const mainBg = document.querySelector('.main__bg img')
    
    mainBg.style.top = window.scrollY / 4 + 'px'
    
    document.addEventListener('scroll', function(){
      mainBg.style.top = window.scrollY / 4 + 'px'
    });
}

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
        hoverElem.style.display = 'none'
    })
}

// Табы в карточках в разделе "Топ игроков"
tabs()
function tabs() {
    const tabElems = document.querySelectorAll('[data-tab]')

    for (let i = 0; i < tabElems.length; i++) {
        const tab = tabElems[i];
        const btnElems = tab.querySelectorAll('[data-tab-btn]')
        const allCards = tab.querySelectorAll('[data-tab-card]')
    
        for (let i = 0; i < btnElems.length; i++) {
            const btn = btnElems[i];

            btn.addEventListener('click', e => {
                const btnData = btn.dataset.tabBtn
                const cardElems = tab.querySelectorAll(`[data-tab-card=${btnData}]`)

                removeAll(btnElems, '_active')
                removeAll(allCards, '_show')

                btn.classList.add('_active')
                tabRoller()

                if (btnData === 'all') {
                    for (let i = 0; i < allCards.length; i++) {
                        const card = allCards[i];
                        
                        card.classList.add('_show')
                    }
                }
                else {
                    for (let i = 0; i < cardElems.length; i++) {
                        const card = cardElems[i];
                        
                        card.classList.add('_show')
                    }
                }
            })
        }
    }

    window.addEventListener('resize', e => {
        tabRoller()
    })
}

// Ползунок у табов
tabRoller()
function tabRoller() {
    const roller = document.querySelector('.news__tabs-roller'),
          tabActive = document.querySelector('.news__tab._active')

    roller.style.width = tabActive.clientWidth - parseInt(window.getComputedStyle(tabActive).paddingRight) - parseInt(window.getComputedStyle(tabActive).paddingLeft) + 'px' // Определяем ширину ползунка
    roller.style.left = tabActive.offsetLeft + parseInt(window.getComputedStyle(tabActive).paddingRight) + 'px' // Определяем отступ слева у ползунка
}

// Текстовые поля
// Плейсхолдер текстовых полей
labelTextfield()
function labelTextfield() {
    const textfieldElems = document.querySelectorAll('.tf')

    for (let i = 0; i < textfieldElems.length; i++) {
        const textfield = textfieldElems[i];
        const input = textfield.querySelector('input, textarea')
        const label = textfield.querySelector('label')

        if (input.value != '') {
            label.classList.add('_change-label')
        }

        input.addEventListener('focus', e => {
            label.classList.add('_change-label')
        })
        
        input.addEventListener('blur', e => {
            if (input.value === '') {
                label.classList.remove('_change-label')
            }
        })
    }
}

window.addEventListener('click', e => {
    const target = e.target

    if (target.nodeName == 'INPUT') {
        textfieldRemoveError(target.closest('.tf'))
    }
})

const formSignIn = document.querySelector('#form-sign-in')
const signInInputElems = formSignIn.querySelectorAll('.tf input[data-tf-required]')

formSignIn.addEventListener('submit', async e => {
    let validForm = true
    e.preventDefault()
    
    // Проверка на пустоту
    signInInputElems.forEach(input => {
        if (textfieldEmpty(input)) {
            validForm = false
        }
    })
    
    if (validForm === false) {
        console.log('Форма не до конца заполнена!')
        return
    }

    const formData = new FormData(formSignIn)
    const formAction = formSignIn.getAttribute('action')

    const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
    })

    if (response.ok) {
        resetForm(formSignIn)
    }
    else {

        setTimeout(e => {

            console.error("Ошибка HTTP: " + response.status)
        }, 2000)
    }
})

function resetForm(form) {
    form.reset()

    const tfElems = form.querySelectorAll('.tf')

    for (let i = 0; i < tfElems.length; i++) {
        const tf = tfElems[i]
        const tfLabel = tf.querySelector('label')
        
        tfLabel.classList.remove('_change-label')
    }
}

// Если пустое поле...
function textfieldEmpty(textfield) {
    if (textfield.value.trim() == '') {
        textfieldAddError(textfield.closest('.tf'), 'Поле не должно быть пустым')
        return true
    }
}

// Добавить ошибку
function textfieldAddError(textfield, errorText) {
    textfield.dataset.textfieldError = errorText
    textfield.classList.add('_textfield-error')
}

// Удалить ошибку
function textfieldRemoveError(textfield) {
    textfield.removeAttribute('data-textfield-error')
    textfield.classList.remove('_textfield-error')
}