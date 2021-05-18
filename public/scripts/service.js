async function getClothingById(id) {
    try {
        let response = {}
        response = await $.get(`${API_URL}/clothes/${id}`)
        return response
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

async function getAllTags() {
    try {
        const response = await $.get(`${API_URL}/tags/all`)
        return Array.from(response)
    } catch(err) {
        console.log(err.name)
    }
}

async function getReviewsOfProduct(productId) {
    try {
        const response = await $.get(`${API_URL}/review/clothing/${productId}`)
        return Array.from(response)
    } catch(err) {
        console.log(err.name)
    }
}

async function submitReview(reviewRequest) {
    try {
        return await $.ajax(`${API_URL}/review/create`, {
            data: JSON.stringify(reviewRequest),
            contentType: 'application/json',
            type: 'POST'
        })
    } catch(err) {
        console.log(err.name)
    }
}

async function submitOrder(orderRequest) {
    try {
        await $.ajax(`${API_URL}/order/create`, {
            data: JSON.stringify(orderRequest),
            contentType: 'application/json',
            type: 'POST',
            success: function() {
                alert(`Благодарим ти за поръчката, ${orderRequest.sender}!`)
            }
        })
    } catch(err) {
        console.log(err.name)
    }
}

async function getAllOrders() {
    try {
        const response = await $.get(`${API_URL}/order/all`)
        return Array.from(response)
    } catch(err) {
        console.log(err.name)
    }
}
