async function filterClothes(perPage, currentPage, categories) {
    const request = {
        perPage: perPage,
        currentPage: currentPage,
        categories: categories
    }
    try {
        return await $.ajax(`${API_URL}/clothes/filter`, {
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            contentType: 'application/json',
            data: JSON.stringify(request)
        })
    }
    catch(err) {
        console.log(err)
    }
}

$(document).ready(() => {
    const selectedTags = []
    selectedTags.push(JSON.parse(localStorage.getItem('NAV_CATEGORY')).id)
    document.querySelector('.filters h1').textContent = JSON.parse(localStorage.getItem('NAV_CATEGORY')).title

    const perPage = 10
    let currentPage = 1
    let paginationSet = false

    document.addEventListener('filter', async(ev) => {
        document.querySelector('.browse').innerHTML = ''
        //For each clothes data returned from the server append an item-card element to the browsing section
        const data = await filterClothes(
            ev.detail.perPage,
            ev.detail.currentPage,
            ev.detail.selectedTags
        )
        const clothes = data.rows
        clothes.forEach(clothing => {
            const clone = document.getElementById('template-item-card').content.cloneNode(true)
            //Add title of the clothing
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

            //Add data-id attribute that contains the ID of the clothing
            clone.querySelector('article').setAttribute('data-id', clothing.id)

            //Add link to product details page
            clone.querySelector('article').addEventListener('click', () => {
                localStorage.setItem('PRODUCT_ID', clothing.id)
                window.location.href = `/details.html`
            })

            //Append item-card to the browse tab
            document.querySelector('.browse').appendChild(clone)
        })

        //Add pagination buttons and click event handlers to them
        if(!paginationSet) {
            const pageCount = Math.ceil(data.totalCount / ev.detail.perPage)
            for(let i = 1; i<=pageCount; i++) {
                const paginationBtn = document.createElement('div')
                paginationBtn.setAttribute('class', 'pagination-btn')
                paginationBtn.textContent = `${i}`

                //add click event handler to the new pagination button
                //and dispatch a filter event
                paginationBtn.addEventListener('click', () => {
                    currentPage = i
                    document.dispatchEvent(new CustomEvent('filter', {
                        detail: {
                            perPage: ev.detail.perPage,
                            currentPage: i,
                            selectedTags: ev.detail.selectedTags
                        }
                    }))
                })

                document.querySelector('.pagination-numbers').appendChild(paginationBtn)
            }
            //add click event handler to the left/right pagination buttons
            //and dispatch a filter event
            $('.pagination > .pagination-btn:first-of-type').add('.pagination > .pagination-btn:last-of-type').on('click', (ev) => {
                const magicNumber = Number(ev.currentTarget.getAttribute('data-magic'))
                document.dispatchEvent(new CustomEvent('filter', {
                    detail: {
                        perPage: perPage,
                        currentPage: (magicNumber < 0 ?
                            Math.max(currentPage + magicNumber, 1) :
                            Math.min(currentPage + magicNumber, pageCount)),
                        selectedTags: selectedTags
                    }
                }))
            })
            paginationSet = true
        }
    })

    document.dispatchEvent(new CustomEvent('filter', {
        detail: {
            perPage: perPage,
            currentPage: currentPage,
            selectedTags: selectedTags
        }
    }))
})
