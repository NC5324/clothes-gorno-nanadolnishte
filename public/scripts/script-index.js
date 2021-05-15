const slides = ['url("assets/slide1.jpg")', 'url("assets/slide2.png")', 'url("assets/slide3.png")']
const slideText = ['Безплатна доставка и монтаж', 'Доказано качество | 15+ години на пазара', 'Индивидуални поръчки по цветове и размери по ваш избор']
const slideDots = ['slide-1', 'slide-2', 'slide-3']
let index = 0;
let timer;

let categories = [
    {
        title: 'Холни гарнитури',
        thumbnail: './assets/divan3.jpg'
    },
    {
        title: 'Спални комплекти',
        thumbnail: './assets/spalnii.jpg'
    },
    {
        title: 'Трапезарии',
        thumbnail: './assets/trapezarii.jpg'
    },
    {
        title: 'Детски стаи',
        thumbnail: './assets/detski.jpg'
    },
    {
        title: 'Дивани',
        thumbnail: './assets/divani.jpg'
    },
    {
        title: 'Секции',
        thumbnail: './assets/sekcii.jpg'
    }
]

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
    slideshow.css('background', `${slides[index]} no-repeat center 100%`)
    slideshow.css('background-size', 'cover')

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

$(document).ready(() => {
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

    categories.forEach(x => {
        const item = document.querySelector('#template-collection-item').content.cloneNode(true)
        item.querySelector('img').setAttribute('src', x.thumbnail)
        item.querySelector('h2').textContent = x.title
        document.querySelector('.collections-content').appendChild(item)
    })

    $('.collections-item').on('click', () => {
        window.location.href = '/browse.html'
    })
})
