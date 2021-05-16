async function getAllClothes() {
    try {
        const response =  await $.get(`${API_URL}/clothes/all`)
        return Array.from(response)
    } catch(err) {
        console.log(err.name)
    }
}

async function filterClothes(perPage, currentPage, categories) {
    const request = {
        perPage: perPage,
        currentPage: currentPage,
        categories: categories
    }
    try {
        const response = await $.ajax(`${API_URL}/clothes/filter`, {
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            contentType: 'application/json',
            data: JSON.stringify(request)
        })
        return Array.from(response.rows)
    }
    catch(err) {
        console.log(err)
    }
}

$(document).ready(async() => {
    //For each clothes data returned from the server append an item-card element to the browsing section
    const selectedTags = []
    selectedTags.push(JSON.parse(localStorage.getItem('NAV_CATEGORY')).id)
    const clothes = await filterClothes(
        10,
        1,
        selectedTags
    )
    document.querySelector('.filters h1').textContent = JSON.parse(localStorage.getItem('NAV_CATEGORY')).title

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
