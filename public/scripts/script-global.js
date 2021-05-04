$(document).ready(() => {
    $('#brand').on('click', () => {
        if(window.location.pathname.includes('index.html') || '/kocamanlar/'.includes(window.location.pathname)) {
            window.location.href = './'
        } else {
            window.location.href = '../'
        }
    })

    $('.nav-link').add('.footer-nav-link').on('click', () => {
        window.location.href = './browse'
    })
})
