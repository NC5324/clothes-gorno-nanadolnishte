$(document).ready(async() => {
    const id = Number(localStorage.getItem('PRODUCT_ID'))
    const clothing = await getClothingById(id)

    const images = document.querySelector('.images')
    images.querySelector('#image-0').style.backgroundImage = `url("${(clothing.Images.length > 0 ? clothing.Images[0].path : 'assets/placeholder.jpg')}")`
    await clothing.Images.shift()
    clothing.Images.forEach(image => {
        const secondaryImg = document.createElement('div')
        secondaryImg.setAttribute('class', 'secondary-image')
        secondaryImg.style.backgroundImage = `url("${image.path}")`
        document.getElementById('secondary-images').appendChild(secondaryImg)
    })

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

    const suggested = await filterClothes(10, 1, [clothing.Tags[0].id])
    suggested.rows.forEach(item => {
        const clone = document.getElementById('template-suggestion').content.cloneNode(true)
        //Add title of the item
        clone.querySelector('article > h2').textContent = item.title

        //Adjust thumbnail
        clone.querySelector('img')
            .setAttribute('src', (item.Images.length > 0 ? item.Images[0].path : 'assets/placeholder.jpg'))

        //Add prices of the item
        //Display old price and discount only if there is a discount
        const discountCondition = item.price2 && (item.price < item.price2)
        const comparisonPrice = clone.querySelector('.item-price h2:first-of-type')
        const discountTag = clone.querySelector('.promotion')
        if(discountCondition) {
            comparisonPrice.innerHTML = `${item.price2} <span class="currency">лв.</span>`
            discountTag.querySelector('span').textContent = `-${100 - Math.floor(item.price / item.price2 * 100)}%`
        } else {
            comparisonPrice.style.display = 'none'
            discountTag.style.display = 'none'
        }
        //Add price
        clone.querySelector('.item-price h2:last-of-type').innerHTML = `${item.price} <span class="currency">лв.</span>`

        //Add data-id attribute that contains the ID of the item
        clone.querySelector('article').setAttribute('data-id', item.id)

        //Add link to product details page
        clone.querySelector('article').addEventListener('click', () => {
            localStorage.setItem('PRODUCT_ID', item.id)
            window.location.href = `/details.html`
        })

        //Append item-card to the browse tab
        document.querySelector('.suggestions').appendChild(clone)
    })

    document.querySelector('.btn-cart').addEventListener('click', () => {
        const cart = localStorage.getItem('CART_ITEMS') ? JSON.parse(localStorage.getItem('CART_ITEMS')) : {}
        cart[`${id}`] = {
            item: clothing,
            count: Object.keys(cart).includes(`${id}`) ? cart[`${id}`].count + 1 : 1
        }
        localStorage.setItem('CART_ITEMS', JSON.stringify(cart))
    })
})
