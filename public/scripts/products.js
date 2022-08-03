const templates = require("./template.js");

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
]

let elements = "";
myProducts.forEach(element => {
    elements += templates.product(element.name, element.price, element.quantity)
});


module.exports = { elements };