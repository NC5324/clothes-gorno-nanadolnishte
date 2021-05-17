$(document).ready(async() => {

    const tags = await getAllTags()
    const selectedTags = Array.from(tags).map(tag => tag.id)
    const perPage = 10
    let currentPage = 1
    let paginationSet = false

    document.addEventListener('filter', async(ev) => {
        document.querySelector('#customers tbody').innerHTML = ''
        //For each clothes data returned from the server append an item-card element to the browsing section
        const data = await filterClothes(
            ev.detail.perPage,
            ev.detail.currentPage,
            ev.detail.selectedTags
        )
        const clothes = data.rows
        clothes.forEach(clothing => {
            const clone = document.getElementById('template-item').content.cloneNode(true)
            clone.querySelector('.title').innerHTML = `<span>Продукт:</span>${clothing.title}`
            clone.querySelector('.category').innerHTML = `<span>В категория:</span>${tags.find(x => x.id === clothing.Tags[0].id).title}`
            clone.querySelector('img')
                .setAttribute('src',
                    (clothing.Images.length > 0 ? clothing.Images[0].path : 'assets/placeholder.jpg'))

            document.querySelector('#customers tbody').appendChild(clone)

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
    })

    document.dispatchEvent(new CustomEvent('filter', {
        detail: {
            perPage: perPage,
            currentPage: currentPage,
            selectedTags: selectedTags
        }
    }))

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
