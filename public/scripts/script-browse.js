async function getAllClothes() {
    try {
        const response =  await $.get(`${API_URL}/clothes/all`)
        return Array.from(response)
    } catch(err) {
        console.log(err.name)
    }
}

$(document).ready(async() => {
    //For each clothes data returned from the server append an item-card element to the browsing section
    const clothes = await getAllClothes()
    clothes.forEach(clothing => {
        const clone = document.getElementById('template-item-card').content.cloneNode(true)
        //Add title of the clothing
        clone.querySelector('h2').textContent = clothing.title

        //Add prices of the clothing
        //Display old price and discount only if there is a discount
        const discountCondition = clothing.price2 && (clothing.price < clothing.price2)
        const comparisonPrice = clone.querySelector('h3:first-of-type')
        const discountTag = clone.querySelector('.promotion')
        if(discountCondition) {
            comparisonPrice.innerHTML = `${clothing.price2} <span class="currency">лв.</span>`
            discountTag.querySelector('span').textContent = `-${100 - Math.floor(clothing.price / clothing.price2 * 100)}%`
        } else {
            comparisonPrice.style.display = 'none'
            discountTag.style.display = 'none'
        }
        //Add price
        clone.querySelector('h3:last-of-type').innerHTML = `${clothing.price} <span class="currency">лв.</span>`

        //Add data-id attribute that contains the ID of the clothing
        clone.querySelector('article').setAttribute('data-id', clothing.id)

        //Append item-card to the browse tab
        document.querySelector('.browse').appendChild(clone)
    })

    $('.browse-item').on('click', (ev) => {
        localStorage.setItem('PRODUCT_ID', ev.currentTarget.getAttribute('data-id'))
        window.location.href = `/details.html`
    })
})
