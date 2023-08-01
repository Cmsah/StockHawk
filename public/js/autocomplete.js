
const input = document.querySelector('#SymbolInput');
const date = document.querySelector('#date');
const price = document.querySelector('#price');
try{
    input.addEventListener("input",onInput);
    date.addEventListener("input",getPrice);
}catch(e){
    console.log(e);
}
// let stockList = [];
// getCompanyticker();

// async function getCompanyticker(){
//     const url = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=BSE&format=json';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '0d5d409da5msh78df6ac2c654d57p15f0ffjsn65d1618ff218',
//             'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
//         }
//     };
    
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result.data);
//         stockList = result.data.map((stock)=>{
//             return stock.symbol;
//         })
//         console.log(stockList);
//     } catch (error) {
//         console.error(error);
//     }
// }

async function onInput(){
   // before creating the new dropdown delete the old one
   removeDropdown();

  // making the input case insensitive
  const val = input.value.toLowerCase();
  if(val.length === 0) return;

    const url = `https://twelve-data1.p.rapidapi.com/symbol_search?symbol=${val}&outputsize=30`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0d5d409da5msh78df6ac2c654d57p15f0ffjsn65d1618ff218',
            'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        result = await response.json();
        console.log(result); 
        console.log(result.data);
        // only adding the symbols of the stock to the result
        match = result.data.map((stock)=>{
            return stock.symbol;
        })
    } catch (error) {
        console.error(error);
    }
  createDropdown(match);
}

function createDropdown(match){
    
    const ul = document.createElement("ul");
    ul.className = "autocomplete-list";
    ul.id = "dropdownlist";
    for(let i = 0; i < Math.min(10,match.length); i++){
        const stock = match[i];
        const li = document.createElement("li");
        const stockbtn = document.createElement("button");
        // console.log(stock);
        stockbtn.innerHTML = stock;
        stockbtn.addEventListener("click",clickstockbtn);
        li.appendChild(stockbtn);
        ul.appendChild(li);

    }
 
    document.querySelector("#SymbolSearch").appendChild(ul)
}
function clickstockbtn(e){
    // default behavior of a btn is to submit a form so prevent that
    e.preventDefault();

    // target:element that triggers the event
    const btn = e.target;
    input.value = btn.innerHTML;
    
    removeDropdown();
}
function removeDropdown(){
     const ul = document.querySelector("#dropdownlist");
     if(ul) ul.remove();
}

// for putting the correct price for the date
async function getPrice(e){
    console.log('getprice');
    console.log(e.target.value);
    console.log(input.value);
    const date = e.target.value;
    const symbol = input.value;
    if(!symbol){
        alert("Please enter a Symbol before entering the date");
    }
    const url = `https://twelve-data1.p.rapidapi.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&format=json&date=${date}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0d5d409da5msh78df6ac2c654d57p15f0ffjsn65d1618ff218',
            'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        price.value = result.values[0].close;
    } catch (error) {
        console.error(error);
    }
}