$(document).ready(() => {
    $('#brand').on('click', () => {
        if(window.location.pathname.includes('index.html') || '/kocamanlar/'.includes(window.location.pathname)) {
            window.location.href = './index.html'
        } else {
            window.location.href = '../index.html'
        }
    })
})
