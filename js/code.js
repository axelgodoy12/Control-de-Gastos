const formu = document.getElementById("formi")

formu.addEventListener('submit', (event) => {
        event.preventDefault();

        let transaccionFormData = new FormData(formu);
        let transaccionObj = convertirFormDataToObj(transaccionFormData);
        // console.log(transaccionObj);
        if (isValidTransaccionForm(transaccionObj)) {
            saveTransaccionObj(transaccionObj);
            insertRowInTransaccionTable(transaccionObj);
            formu.reset();
        } else {
            //mostrar error
        }
    }
)

document.addEventListener("DOMContentLoaded", function(event){
    draw_category();
    let transaccionObjArray = JSON.parse(localStorage.getItem("transaccionData"))
    transaccionObjArray.forEach(
        function(transaccionArray) {
            insertRowInTransaccionTable(transaccionArray)
        })
})

function draw_category() {
    let allCategories = [
        "Comida", "Alquiler", "Hobby", "Joda", "Salario"
    ]
    for (let index = 0; index < allCategories.length; index++) {
        insertCategory(allCategories[index]);
    }
}

function insertCategory(category) {
    const selectElement = document.getElementById("categoria");
    let htmlToInsert = `<option> ${category} </option>`;
    selectElement.insertAdjacentHTML("beforeend", htmlToInsert);
}

function isValidTransaccionForm(transaccionObj) {
    let = isValidForm = true;
    if (!transaccionObj["selector"]){
        alert("Debes elegir un tipo de ingreso o egreso");
        isValidForm = false;
    }
    if (!transaccionObj["descript"]) {
        alert("Te falto la descripcion");
        isValidForm = false;
    }
    if (!transaccionObj["transaccion"]) {
        alert("Debes ingresar un monto");
        isValidForm = false;
    } else if (transaccionObj["transaccion"] < 0) {
        alert("No debes ingresar numeros negativos");
        isValidForm = false;
    }
    if (!transaccionObj["categoria"]) {
        alert("Elige una categoria o agrega una")
        isValidForm = false;
    }
    return isValidForm;
}

function getNewTransaccionId() {
    let lastTransaccionId = localStorage.getItem("lastTransaccionId") || "-1";
    let NewTransaccionId = JSON.parse(lastTransaccionId) + 1;
    localStorage.setItem("lastTransaccionId", JSON.stringify(NewTransaccionId))
    return NewTransaccionId;
}

function convertirFormDataToObj(transaccionFormData){
    let selector = transaccionFormData.get("selector");
    let descript = transaccionFormData.get("descript");
    let transaccion = transaccionFormData.get("transaccion");
    let categoria = transaccionFormData.get("categoria");
    let transaccionId = getNewTransaccionId();
    return {
        "selector": selector,
        "descript": descript,
        "transaccion": transaccion,
        "categoria": categoria,
        "transaccionId": transaccionId,
    }
}

function insertRowInTransaccionTable (transaccionObj){
    let transaccionTableRef = document.getElementById("transaccionTable");
    
    let newTransaccionRowRef = transaccionTableRef.insertRow(-1);
    
    newTransaccionRowRef.setAttribute("data-transaccion-Id", transaccionObj["transaccionId"]);
    
    let newTransaccionCellref = newTransaccionRowRef.insertCell(0);
    newTransaccionCellref.textContent = transaccionObj["selector"];
    
    newTransaccionCellref = newTransaccionRowRef.insertCell(1);
    newTransaccionCellref.textContent = transaccionObj["descript"];
    
    newTransaccionCellref = newTransaccionRowRef.insertCell(2);
    newTransaccionCellref.textContent = transaccionObj["transaccion"];
    
    newTransaccionCellref = newTransaccionRowRef.insertCell(3);
    newTransaccionCellref.textContent = transaccionObj["categoria"];

    let newDeleteCell = newTransaccionRowRef.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    newDeleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        let transaccionRow = event.target.parentNode.parentNode;
        let transaccionId2 = transaccionRow.getAttribute("data-transaccion-Id");
        transaccionRow.remove();
        DeleteTransaccionObj(transaccionId2);

    })
}

// Le paso como parametro el transaccionId de la transaccion
// que quiero eliminar
function DeleteTransaccionObj(transaccionId){
    // Obtengo las transaccion de mi "base de datos"
    // DESCONVIERTO DE JSON A OBJETO
    let transaccionObjArray = JSON.parse(localStorage.getItem("transaccionData"))
    // Busco el indice o posicion de la transaccio que 
    // quiero eliminar
    let transaccionIndexArray = transaccionObjArray.findIndex(element => element.transaccionId == transaccionId);7
    // Elimino la transaccion o el elemento de esa posicion
    transaccionObjArray.splice(transaccionIndexArray, 1);
    // convierto de objeto a JSON
    let TransaccionArrayJSON = JSON.stringify(transaccionObjArray);
    // GUARDO MI ARRAY EN LOCALSTORAGE
    localStorage.setItem("transaccionData", TransaccionArrayJSON); 

}

function saveTransaccionObj(transaccionObj){
    let myTransaccionArray = JSON.parse(localStorage.getItem("transaccionData")) || [];
    myTransaccionArray.push(transaccionObj);
    // CONVIERTO MY ARRAY A JS
    let TransaccionArrayJSON = JSON.stringify(myTransaccionArray);
    // GUARDO MI ARRAY EN LOCALSTORAGE
    localStorage.setItem("transaccionData", TransaccionArrayJSON); 
} 




const button = document.querySelector("boton1");  
const h2El = document.querySelector("h2");  
const bgEl = document.querySelector("section");  
const hexColorEl = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];  
 boton1.addEventListener("click", () => {  
  let color = "#";  
  color += Math.random().toString(16).slice(2, 8).toUpperCase();  
  bgEl.style.backgroundColor = color;  
  h2El.innerText = color;  
 });  


const display1El = document.querySelector(".display-1");  
 const display2El = document.querySelector(".display-2");  
 const tempResultEl = document.querySelector(".temp-result");  
 const numbersEl = document.querySelectorAll(".number");  
 const operationEl = document.querySelectorAll(".operation");  
 const equalEl = document.querySelector(".equal");  
 const clearAllEl = document.querySelector(".all-clear");  
 const clearLastEl = document.querySelector(".last-entity-clear");  
 let dis1Num = "";  
 let dis2Num = "";  
 let result = null;  
 let lastOperation = "";  
 let haveDot = false;  
 numbersEl.forEach((number) => {  
  number.addEventListener("click", (e) => {  
   if (e.target.innerText === "." && !haveDot) {  
    haveDot = true;  
   } else if (e.target.innerText === "." && haveDot) {  
    return;  
   }  
   dis2Num += e.target.innerText;  
   display2El.innerText = dis2Num;  
   // console.log();  
  });  
 });  
 operationEl.forEach((operation) => {  
  operation.addEventListener("click", (e) => {  
   if (!dis2Num) return;  
   haveDot = false;  
   const operationName = e.target.innerText;  
   if (dis1Num && dis2Num && lastOperation) {  
    mathOperation();  
   } else {  
    result = parseFloat(dis2Num);  
   }  
   clearVar(operationName);  
   lastOperation = operationName;  
   console.log(result);  
  });  
 });  
 function clearVar(name = "") {  
  dis1Num += dis2Num + " " + name + " ";  
  display1El.innerText = dis1Num;  
  display2El.innerText = "";  
  dis2Num = "";  
  tempResultEl.innerText = result;  
 }  
 function mathOperation() {  
  if (lastOperation === "x") {  
   result = parseFloat(result) * parseFloat(dis2Num);  
  } else if (lastOperation === "+") {  
   result = parseFloat(result) + parseFloat(dis2Num);  
  } else if (lastOperation === "-") {  
   result = parseFloat(result) - parseFloat(dis2Num);  
  } else if (lastOperation === "/") {  
   result = parseFloat(result) / parseFloat(dis2Num);  
  } else if (lastOperation === "%") {  
   result = parseFloat(result) % parseFloat(dis2Num);  
  }  
 }  
 // operation();  
 equalEl.addEventListener("click", () => {  
  if (!dis2Num || !dis1Num) return;  
  haveDot = false;  
  mathOperation();  
  clearVar();  
  display2El.innerText = result;  
  tempResultEl.innerText = "";  
  dis2Num = result;  
  dis1Num = "";  
 });  
 clearAllEl.addEventListener("click", () => {  
  dis1Num = "";  
  dis2Num = "";  
  display1El.innerText = "";  
  display2El.innerText = "";  
  result = "";  
  tempResultEl.innerText = "";  
 });  
 clearLastEl.addEventListener("click", () => {  
  display2El.innerText = "";  
  dis2Num = "";  
 });  
 window.addEventListener("keydown", (e) => {  
  if (  
   e.key === "0" ||  
   e.key === "1" ||  
   e.key === "2" ||  
   e.key === "3" ||  
   e.key === "4" ||  
   e.key === "5" ||  
   e.key === "6" ||  
   e.key === "7" ||  
   e.key === "8" ||  
   e.key === "9" ||  
   e.key === "."  
  ) {  
   clickButtonEl(e.key);  
   // console.log(e.key)  
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {  
   clickOperation(e.key);  
  } else if (e.key === "*") {  
   clickOperation("x");  
   // console.log(e.key)  
  } else if (e.key == "Enter" || e.key === "=") {  
   clickEqual();  
  }  
  // console.log(e.key)  
 });  
 function clickButtonEl(key) {  
  numbersEl.forEach((button) => {  
   if (button.innerText === key) {  
    button.click();  
   }  
  });  
 }  
 function clickOperation(key) {  
  operationEl.forEach((operation) => {  
   if (operation.innerText === key) {  
    operation.click();  
   }  
  });  
 }  
 function clickEqual() {  
  equalEl.click();  
 }  