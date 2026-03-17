let detail = document.getElementById('detail')

let link = new URLSearchParams(location.search)
let id = link.get('id')

fetch(`https://69b9b534b3dcf7e0b4bb045d.mockapi.io/mal/mallar/${id}`)
    .then(res => res.json())
    .then(data => {
        detail.innerHTML = `
            <img src="${data.image}">
            <div class="detayYazi">
                <h2>${data.title}</h2>
                <p><b>Qiymet:</b> $${data.price}</p>
            </div>
        `
    })