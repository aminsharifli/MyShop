let cards = document.getElementById('cards')
let sebetList = document.getElementById('sebetList')
let sebetSayi = document.getElementById('sebetSayi')
let yekun = document.getElementById('yekun')
let sebet = document.getElementById('sebet')
let qaraFon = document.getElementById('qaraFon')

let mehsullar = []
let sebetArr = []

function dataGetir() {
    cards.innerHTML = ''

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            mehsullar = data
            for (let i = 0; i < data.length; i++) {
                cards.innerHTML += `
                    <div class="card">
                        <div class="cardImg">
                            <img src="${data[i].image}" onclick="detayaGet(${data[i].id})">
                        </div>
                        <div class="cardBody">
                            <h3 onclick="detayaGet(${data[i].id})">${data[i].title}</h3>
                            <p>$${data[i].price}</p>
                            <button onclick="sebeteAt(${data[i].id})">Sebete at</button>
                        </div>
                    </div>
                `
            }
        })
}

dataGetir()

function sebeteAt(id) {
    let tapildi = false
    for (let i = 0; i < sebetArr.length; i++) {
        if (sebetArr[i].id == id) {
            sebetArr[i].say++
            tapildi = true
        }
    }
    if (tapildi == false) {
        sebetArr.push({
            id: id,
            say: 1
        })
    }
    sebetiGoster()
}

function sebetiGoster() {
    sebetList.innerHTML = ''
    sebetSayi.innerHTML = sebetArr.length
    let cem = 0
    for (let i = 0; i < sebetArr.length; i++) {
        for (let j = 0; j < mehsullar.length; j++) {
            if (sebetArr[i].id == mehsullar[j].id) {
                cem += mehsullar[j].price * sebetArr[i].say
                sebetList.innerHTML += `
                    <div class="sebetItem">
                        <img src="${mehsullar[j].image}">
                        <div class="sebetMelumat">
                            <h4>${mehsullar[j].title}</h4>
                            <p>$${mehsullar[j].price} x ${sebetArr[i].say}</p>
                            <div class="sayBtn">
                                <button onclick="azalt(${sebetArr[i].id})">-</button>
                                <span>${sebetArr[i].say}</span>
                                <button onclick="artir(${sebetArr[i].id})">+</button>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    }

    yekun.innerHTML = cem.toFixed(2)
    if (sebetArr.length == 0) {
        sebetList.innerHTML = 'Sebet bosdur'
        yekun.innerHTML = '0.00'
    }
}

function artir(id) {
    for (let i = 0; i < sebetArr.length; i++) {
        if (sebetArr[i].id == id) {
            sebetArr[i].say++
        }
    }
    sebetiGoster()
}

function azalt(id) {
    for (let i = 0; i < sebetArr.length; i++) {
        if (sebetArr[i].id == id) {
            sebetArr[i].say--
            if (sebetArr[i].say <= 0) {
                sebetArr.splice(i, 1)
            }
        }
    }

    sebetiGoster()
}
function sebetAc() {
    sebet.classList.toggle('active')
    qaraFon.classList.toggle('active')
}
function detayaGet(id) {
    location.href = `detail.html?id=${id}`
}