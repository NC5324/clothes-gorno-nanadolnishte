$(document).ready(async() => {
    const id = Number(localStorage.getItem('PRODUCT_ID'))
    const clothing = await getClothingById(id)

    const images = document.querySelector('.images')
    images.querySelector('#image-0').style.backgroundImage = `url("${(clothing.Images.length > 0 ? clothing.Images[0].path : 'assets/placeholder.jpg')}")`
    console.log(images)

    //Adjust details section
    const details = document.getElementById('template-details-section').content.cloneNode(true)
    //Add title of the clothing
    details.querySelector('h1').textContent = clothing.title

    //Add prices of the clothing
    //Display old price and discount only if there is a discount
    const discountCondition = clothing.price2 && (clothing.price < clothing.price2)
    const comparisonPrice = details.querySelector('h2:first-of-type')
    if(discountCondition) {
        comparisonPrice.innerHTML = `${clothing.price2} <span class="currency">лв.</span>`
    } else {
        comparisonPrice.style.display = 'none'
    }
    //Add price
    details.querySelector('h2:last-of-type').innerHTML = `${clothing.price} <span class="currency">лв.</span>`

    //Add description
    details.querySelector('.description').textContent = clothing.description

    //Add the adjusted details section to the main-content
    document.querySelector('.product-details').appendChild(details)

    // //TODO: Add suggested items
    // const suggested =

    $('.browse-item').on('click', (ev) => {
        localStorage.setItem('PRODUCT_ID', 102)
        window.location.href = `/details.html`
    })
})
