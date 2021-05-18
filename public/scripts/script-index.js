const slides = ['url("assets/placeholder.jpg")', 'url("assets/placeholder.jpg")', 'url("assets/placeholder.jpg")']
const slideText = ['Lorem ipsum', 'Dolor sit amet', 'Je suis baguette']
const slideDots = ['slide-1', 'slide-2', 'slide-3']
let index = 0;
let timer;

function adjustSlideshow(index) {
    const text = $('.slide-content h1')[0]
    const dots = $('.i-dot')
    text.textContent = slideText[index]
    for(let i=0; i<3; i++) {
        if(i === index) {
            dots[i].setAttribute('class', 'far fa-circle i-dot')
            $(dots[i]).css('font-size', '12px')
        } else {
            dots[i].setAttribute('class', 'fas fa-circle i-dot')
            $(dots[i]).css('font-size', '8px')
        }
    }
    const slideshow = $('.slideshow')
    slideshow.css('background', `${slides[index]} no-repeat center`)
    slideshow.css('background-size', 'contain')

    clearInterval(timer)
    timer = window.setInterval(slideToRight, 4000)
}

function slideToRight() {
    index++;
    if(index >= slides.length) {
        index = index - slides.length;
    }
    adjustSlideshow(index)

}

function slideToLeft() {
    index--;
    if(0 > index) {
        index = slides.length + index;
    }
    adjustSlideshow(index)
}

function slideToSpecific(target) {
    index = Number(target.getAttribute('id').split('-')[1])-1
    adjustSlideshow(index)
}

$(document).ready(async() => {
    timer = window.setInterval(slideToRight, 4000)

    adjustSlideshow(index)

    $('#slide-right').on('click', () => {
        slideToRight()
        console.log(index)
    })

    $('#slide-left').on('click', () => {
        slideToLeft()
        console.log(index)
    })

    $('.i-dot').on('click', (ev) => {
        slideToSpecific(ev.currentTarget)
    })

    const tags = await getAllTags()
    tags.forEach(tag => {
        const clone = document.getElementById('template-collection-item').content.cloneNode(true)
        clone.querySelector('img').setAttribute('alt', tag.title)
        clone.querySelector('h2').textContent = tag.title
        clone.querySelector('.collections-item').setAttribute('data-tag', JSON.stringify(tag))
        document.querySelector('.collections-content').appendChild(clone)
    })

    $('.collections-item').on('click', (ev) => {
        const tag = ev.currentTarget.getAttribute('data-tag')
        localStorage.setItem('NAV_CATEGORY', tag)
        window.location.href = `/browse.html`
    })
})
