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
    let nameSave = hoveredDiv.textContent;
    console.log(nameSave);
   // hoveredDiv.innerHTML = "<input name='productId' type='submit' value='Add to cart' class='productSubmit'></input>";
   hoveredDiv.innerHTML = `<input type='hidden' name='productName' value='${nameSave}'></input>`;
   hoveredDiv.innerHTML += "<input type='image' value='232' src='./images/addToCart.png' class='submitToCart'></input>";
 }