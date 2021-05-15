$(document).ready(() => {
    $('.browse-item').on('click', () => {
        localStorage.setItem('PRODUCT_ID', `${0}`)
        window.location.href = `/details.html`
    })
})
