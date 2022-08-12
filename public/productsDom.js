let hoveredDiv;
let hoveredSave;

Array.from(document.getElementsByClassName("gridItem")).forEach((elem)=>{
    elem.addEventListener("mouseleave", restoreProduct);
    elem.addEventListener("mouseenter", productHover);
});

function restoreProduct(e){
    document.getElementById(e.target.id).innerHTML = hoveredSave;
}

 function productHover(e){
    hoveredDiv = document.getElementById(e.target.id);
    hoveredSave = hoveredDiv.innerHTML;
   // hoveredDiv.innerHTML = "<input name='productId' type='submit' value='Add to cart' class='productSubmit'></input>";
   hoveredDiv.innerHTML = `<input type='hidden' name='productId' value='${e.target.id}'></input>`;
   hoveredDiv.innerHTML += "<input type='image' value='232' src='./images/addToCart.png' class='submitToCart'></input>";
 }