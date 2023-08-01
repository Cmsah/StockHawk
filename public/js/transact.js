
const form = document.getElementById('add_investment');
function SuccessAlert() {
    if (form.checkValidity()) {
        alert("adding successful");
    }
}

// const delbtn = document.querySelector('#delbtn');
function delrow(e) {
    console.log('delrow');
    console.log(e.target.value);
    alert("transaction deleted successfully");
    var td = e.target.parentNode;
    console.log(ed);
    
    var tr = td.parentNode;
    tr.parentNode.removeChild(tr);
    console.log('row deleted successfully');
}

const curr = document.getElementsByTagName("tbody");
const rowlist = curr[0].children;

document.addEventListener("DOMContentLoaded", function() {
    currentPrice();
  });

async function currentPrice() {
    // console.log(curr.attributes.value);
    console.log("lsfjkslf");
    console.log(curr[0].children.length);
    // if(curr !== null){
        for (let i = 0; i < rowlist.length; i++) {
            console.log('inside the for loop');
            try {
                
                console.log(rowlist[i]);
                console.log(rowlist[i].querySelector("#currentPrice"));
                const currentPrice = rowlist[i].querySelector("#currentPrice");
                const symbol = currentPrice.getAttribute("value");
                console.log(symbol);
                
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '0d5d409da5msh78df6ac2c654d57p15f0ffjsn65d1618ff218',
                        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
                    }
                }; 
                const url = `https://twelve-data1.p.rapidapi.com/price?symbol=${symbol}&format=json&outputsize=30`;
                const response = await fetch(url, options);
                const result = await response.json();
                currentPrice.innerHTML = Math.round(result.price);
                console.log(result);
                if( Math.round(result.price))
                
            } catch (error) {
                console.log(error);
            }
        }
    
    

}

// if(window.location.pathname == '/'){
//     document.querySelectorondelete = document.querySelector(".table tbody td a.delete");
//     document.querySelectorondelete.click(function(){
//         var id = document.querySelector(this).attr("data-id")

//         var request = {
//             "url" : `http://localhost:3000/api/users/document.querySelector{id}`,
//             "method" : "DELETE"
//         }

//         if(alert("Do you really want to delete this record?")){
//             document.querySelector.ajax(request).done(function(response){
//                 alert("Data Deleted Successfully!");
//                 location.reload();
//             })
//         }

//     })
// }
// form.addEventListener('submit',async ()=>{
//     const register = {
//         email:email.value,
//         password:password.value

//     }
//     await fetch('/user/register',{
//         method:"POST",
//         body:JSON.stringify(register),
//         headers:{
//             "Content-Type": "application/json"
//         }
//     })
// })