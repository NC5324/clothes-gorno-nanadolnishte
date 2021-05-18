$(document).ready(async() => {

    const tags = await getAllTags()
    const selectedTags = Array.from(tags).map(tag => tag.id)
    const perPage = 10
    let currentPage = 1
    let paginationSet = false

    const data = await getAllOrders()
    data.forEach(d => {
        const clone = document.getElementById('template-item').content.cloneNode(true)
        clone.querySelector('.sender').innerHTML = `<span>Изпратена от:</span>${d.sender}`
        console.log(clone.querySelector('.sender').innerHTML)
        clone.querySelector('.id').innerHTML = `<span>ID:</span>${d.id}`
        clone.querySelector('.address').innerHTML = `<span>Адрес:</span>${d.address}`
        clone.querySelector('.phone').innerHTML = `<span>Телефон:</span>${d.phone}`
        clone.querySelector('.notes').innerHTML = `<span>Бележки:</span>${d.notes}`

        console.log(clone.querySelector('tr'))
        document.querySelector('#data tbody').appendChild(clone)
    })
})
