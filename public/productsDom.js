let hoveredDiv;
let hoveredSave;

Array.from(document.getElementsByClassName("gridItem")).forEach((elem)=>{
    elem.addEventListener("mouseleave", restoreProduct);
    elem.addEventListener("mouseenter", productHover);
    elem.addEventListener("click", addToCasket);
});

function restoreProduct(e){
    document.getElementById(e.target.id).innerHTML = hoveredSave;
}

 function productHover(e){
    hoveredDiv = document.getElementById(e.target.id);
    hoveredSave = hoveredDiv.innerHTML;
    hoveredDiv.innerHTML = "<input type='submit' value='Add to cart' class='productSubmit'></input>";
 }

 function addToCasket(e){
    alert(`Product has been added to cart`);
 }