$(document).ready(() => {
    $('#brand').on('click', () => {
        window.location.href = '/'
    })

    $('.nav-link').add('.footer-nav-link').on('click', (ev) => {
        window.location.href = `/browse/${ev.currentTarget.getAttribute('data-code')}`
    })
})
