const myProducts = [{
    id: 1,
    name: "Jacket",
    price: "100$",
    quantity: 7
},
{
    id: 2,
    name: "Shoes",
    price: "60$",
    quantity: 17
},
{
    id: 3, name: "Window",
    price: "200$",
    quantity: 120
},
{
    id: 4,
    name: "Computer",
    price: "850$",
    quantity: 31
},
{
    id: 5,
    name: "iphone",
    price: "1100$",
    quantity: 52
},
{
    id: 6,
    name: "Car",
    price: "12000$",
    quantity: 3
},
{
    id: 7,
    name: "Airplane",
    price: "13$",
    quantity: 7
},
{
    id: 8,
    name: "Ship",
    price: "14$",
    quantity: 3
}
];

function buildProducts(){
    let table = `<form method="POST">`;
    table += `<div class='grid-container'>`;

    myProducts.forEach((product)=>{
        table += `<div id='${product.id}' class='gridItem'><label class='productName'>${product.name}</label><br>`;
        table += ` | Price: ${product.price} |`;
        table += `</div>`
    });

    table += `</div></form>`;
    table += `<script src='productsDom.js'></script>`;

    return table;   
}

module.exports = {buildProducts};