$(document).ready(async() => {
    const tags = await getAllTags()
    tags.forEach(tag => {
        const clone = document.getElementById('template-tag').content.cloneNode(true)
        clone.querySelector('span').textContent = tag.title
        clone.querySelector('article').setAttribute('data-id', tag.id)
        document.getElementById('in-ctg-all').appendChild(clone)
    })

    const fileInput = $('.in-file')
    let id = 1
    const files = {}

    $('.image-action').on('click', (ev) => overlayClickHandler(ev))

    fileInput.on('change', (ev) => fileInputHandler(ev))

    //submit new product
    $('#submit').on('click', () => {
        const request = new FormData()
        const keys = Object.keys(files)
        keys.forEach(key => {
            request.append('foo', files[key])
        })
        const categories = []
        const selectedTags = document.getElementById('in-ctg-selected').querySelectorAll('article')
        selectedTags.forEach(tag => {
            categories.push(tag.getAttribute('data-id'))
        })
        request.append('categories', JSON.stringify(categories))
        request.append('title', document.getElementById('in-title').value)
        request.append('description', document.getElementById('in-desc').value)
        request.append('price2', document.getElementById('in-cmp-price').value)
        request.append('price', document.getElementById('in-price').value)
        $.ajax({
            url: `${API_URL}/admin/create`,
            data: request,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data) {
                alert(data)
                resetForm()
            }
        })
    })

    //cancel for new product
    $('#cancel').on('click', () => resetForm())

    $('.ctg-add').on('click', (ev) => tagClickHandler(ev))

    function resetForm() {
        window.location.reload()
    }

    function tagClickHandler(ev) {
        const parent = ev.currentTarget.parentElement
        const clone = ev.currentTarget.cloneNode(true)
        clone.addEventListener('click', (ev) => tagClickHandler(ev))
        if(parent.id === 'in-ctg-all') {
            clone.classList.replace('ctg-add', 'ctg-selected')
            clone.querySelector('i').setAttribute('class', 'fas fa-minus-circle')
            document.getElementById('in-ctg-selected').prepend(clone)
            ev.currentTarget.remove()
        } else if(parent.id === 'in-ctg-selected') {
            clone.classList.replace('ctg-selected', 'ctg-add')
            clone.querySelector('i').setAttribute('class', 'fas fa-plus-circle')
            document.getElementById('in-ctg-all').prepend(clone)
            ev.currentTarget.remove()
        }
        console.log(ev.currentTarget, ev.currentTarget.parentElement)
    }

    function fileInputHandler(ev) {
        const parent = $(ev.target).parent()[0]
        const parentId = parent.getAttribute('id')

        const file = ev.target.files[0]
        if(file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if(parentId === 'image-1') {
                    id = id + 1
                    files[`image-${id}`] = file
                    let newImage = document.getElementById('template-secondary-image').content.cloneNode(true)
                    newImage.querySelector('.secondary-image').style.backgroundImage = `url("${reader.result}")`
                    newImage.querySelector('.secondary-image').setAttribute('id', `image-${id}`)
                    document.getElementById('secondary-images').append(newImage)

                    newImage = document.getElementById(`image-${id}`)
                    newImage.querySelector('.image-action').addEventListener('click', (ev) => overlayClickHandler(ev))
                    newImage.addEventListener('change', (ev) => fileInputHandler(ev))

                    newImage.querySelector('.image-action span').textContent = 'Редактирай снимка'
                    newImage.querySelector('.image-action').classList.replace('opacity-100', 'opacity-0')
                } else {
                    files[parentId] = file
                    parent.style.backgroundImage = `url("${reader.result}")`
                    parent.querySelector('.image-action span').textContent = 'Редактирай снимка'
                    parent.querySelector('.image-action').classList.replace('opacity-100', 'opacity-0')
                }
            }
            reader.readAsDataURL(file)
        }
    }

    function overlayClickHandler(ev) {
        const parent = $(ev.currentTarget).parent()[0]
        parent.querySelector('.in-file').click()
    }
})
