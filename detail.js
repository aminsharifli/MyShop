let detail = document.getElementById('detail')

let link = new URLSearchParams(location.search)
let id = link.get('id')

fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data => {
        detail.innerHTML = `
            <img src="${data.image}">
            <div class="detayYazi">
                <h2>${data.title}</h2>
                <p><b>Qiymet:</b> $${data.price}</p>
                <p><b>Kateqoriya:</b> ${data.category}</p>
                <p><b>Aciqlama:</b> ${data.description}</p>
                <p><b>Reytinq:</b> ${data.rating.rate}</p>
            </div>
        `
    })