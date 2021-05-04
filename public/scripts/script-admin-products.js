$(document).ready(() => {
    $('td').on('click', (e) => {
        const checkboxes = $('input[type="checkbox"]')
        if(Array.from(checkboxes).includes(e.target)){
            return;
        }
        window.location.href = './admin-product-details.html'
    })

    $('th input[type="checkbox"]').on('click', () => {
        const checkboxes = $('td input[type="checkbox"]')
        Array.from(checkboxes).forEach(checkbox => {
            checkbox.checked = !checkbox.checked;
        })
    })
})
