const API_URL = 'http://localhost:3000/api'

function adjustNavLink(tag, linkVersion) {
    //Create a nav-link clone from a template and adjust its attributes according to server data
    const clone = document.getElementById('template-nav-link').content.cloneNode(true).querySelector('a')
    clone.textContent = tag.title
    clone.setAttribute('data-tag', JSON.stringify(tag))

    //Adjust styling for main navigation and footer navigation
    clone.classList.replace('nav-link', linkVersion)

    return clone
}

$(document).ready(async() => {
    //Add each tag returned from server to the navigation links
    const tags = await getAllTags()
    tags.forEach(tag => {
        //Get nav-link template and adjust display title and data-id attributes
        const clone = adjustNavLink(tag, 'nav-link')

        //Add the adjusted nav-link to the main navigation
        document.querySelector('.nav').appendChild(clone)

        //Adjust the adjusted nav-link to the footer navigation
        const clone2 = adjustNavLink(tag, 'footer-nav-link')
        document.querySelector('.footer-section:first-of-type').appendChild(clone2)
    })

    $('#brand').on('click', () => {
        window.location.href = '/index.html'
    })

    $('.nav-link').add('.footer-nav-link').on('click', (ev) => {
        const tag = ev.currentTarget.getAttribute('data-tag')
        localStorage.setItem('NAV_CATEGORY', tag)
        window.location.href = `/browse.html`
    })

    const cartBtn = document.getElementById('cart-button')
    if(cartBtn) {
        cartBtn.addEventListener('click', () => {
            const cart = document.getElementById('cart')
            cart.style.display = (cart.style.display === 'flex' ? 'none' : 'flex')

            const cartItems = JSON.parse(localStorage.getItem('CART_ITEMS'))
            let totalPrice = 0
            if(cartItems) {
                document.querySelector('.cart-items main').innerHTML = ''
                Object.keys(cartItems).forEach(key => {
                    const clothing = cartItems[key].item
                    const clone = document.getElementById('template-cart-item').content.cloneNode(true)
                    clone.querySelector('h2').textContent = clothing.title

                    //Adjust thumbnail
                    clone.querySelector('img')
                        .setAttribute('src', (clothing.Images.length > 0 ? clothing.Images[0].path : 'assets/placeholder.jpg'))

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
                    totalPrice += clothing.price

                    //Add data-id attribute that contains the ID of the clothing
                    clone.querySelector('article').setAttribute('data-id', clothing.id)

                    //Add link to product details page
                    clone.querySelector('article').addEventListener('click', () => {
                        localStorage.setItem('PRODUCT_ID', clothing.id)
                        window.location.href = `/details.html`
                    })

                    document.querySelector('.cart-items main').appendChild(clone)
                })
            }
            document.querySelector('.cart-content footer h3:last-of-type').textContent = `${totalPrice} лв.`
        })
    }

    document.getElementById('cart').addEventListener('click', (ev) => {
        if(ev.target === ev.currentTarget) {
            ev.currentTarget.style.display = 'none'
        }
    })

    document.getElementById('exit-cart-button').addEventListener('click', () => {
        document.getElementById('cart').style.display = 'none'
    })
})
