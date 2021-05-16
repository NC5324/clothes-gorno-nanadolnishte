const API_URL = 'http://localhost:3000/api'

async function getAllTags() {
    try {
        const response = await $.get(`${API_URL}/tags/all`)
        return Array.from(response)
    } catch(err) {
        console.log(err.name)
    }
}

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
})
