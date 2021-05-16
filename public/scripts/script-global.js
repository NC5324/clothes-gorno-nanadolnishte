const API_URL = 'http://localhost:3000/api'

$(document).ready(() => {
    $('#brand').on('click', () => {
        window.location.href = '/index.html'
    })

    $('.nav-link').add('.footer-nav-link').on('click', () => {
        localStorage.setItem('CATEGORY_ID', `${0}`)
        window.location.href = `/browse.html`
    })
})
