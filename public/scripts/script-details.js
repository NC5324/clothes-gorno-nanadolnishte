$(document).ready(() => {
    $('.browse-item').on('click', (ev) => {
        localStorage.setItem('PRODUCT_ID', `${0}`)
        window.location.href = `/public/details.html}`
    })
})
