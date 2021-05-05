function readURL(input) {
    if (input.files && input.files[0]) {
        console.log(input.files[0])
    }
}


$(document).ready(() => {
    $("#file-main").change(function() {
        const input = $("#file-main")[0]

        if (input.files && input.files[0]) {
            const reader = new FileReader()
            reader.readAsDataURL(input.files[0])
            reader.onload = function (e) {
                const req = new FormData()
                req.append('file', input.files[0])
                $.ajax({
                    url: `http://localhost:3000/api/test`,
                    type: 'POST',
                    data: req,
                    processData: false,
                    contentType: false,
                    success: (data) => {
                        console.log(data)
                    }
                })
                /*$.ajax({
                    url: `https://storage.bunnycdn.com/storage-kcmnlr-bg/${input.files[0].name}`,
                    type: 'PUT',
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        AccessKey: 'fcc60f3a-5dc5-40a1-92a4d183127d-0b75-4391'
                    },
                    success: (res) => {
                        console.log(res)
                    },
                    error: (err) => {
                        console.log(err)
                    },
                    data: e.target.result
                })*/
            }
        }
    })
})
