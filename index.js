let myLeads = [];
// console.log("(should be a string) myLeads array is " + myLeads);
// myLeads = JSON.parse(myLeads) // myLeads goes from string into object (array in this case);
// console.log("(just called parse) myLeads array is " + myLeads);
// myLeads.push("www.examplelead.com");
// console.log("(just pushed another value) myLeads array is " + myLeads);
// myLeads = JSON.stringify(myLeads);
// console.log(typeof myLeads);

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#tab-btn");

// localStorage.clear();
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); //AT THE START OF EVERY REFRESH
console.log(leadsFromLocalStorage);

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    console.log("leadsFromLocalStorage is "+ leadsFromLocalStorage);
    console.log("myLeads is "+ myLeads);
    render(myLeads);
}

const tabs = [
    {url: "https://github.com/EricLi35"}
]

tabBtn.addEventListener("click" , function() {
    // console.log(tabs[0].url);
    
    
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // });
    
    chrome.tabs.query({active: true , currentWindow: true} , function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads" , JSON.stringify(myLeads));
        render(myLeads);    
    });
})

function render(leads) {
    let listItems = "";
    for(let i = 0 ; i < leads.length ; i++) {
        // ulEl.innerHTML += "<li>" + leads[i] + "</li>";
        // ulEl.innerHTML += `<li>${leads[i]}</li>`;
        // Option 1

        // listItems += "<li><a target='_blank' href='" + leads[i] + "'>" + leads[i] + "</a></li>" ;
        listItems += "<li><a target='_blank' href='"+leads[i]+"'>" + leads[i] + "</a></li>";
        // console.log(listItems);
        // Option 2
        
        // let li = document.createElement("li");
        // li.textContent = leads[i];
        // ulEl.append(li);
        // Option 3
    }
    
    ulEl.innerHTML = listItems;
    // Option 2

    // console.log("List item is " + listItems);
}

// localStorage.setItem("myName" , "Eric");
// let name2 = localStorage.getItem("myName");
// console.log("localStorage.getItem(myName) is " + name2); 
// localStorage.clear();

deleteBtn.addEventListener("dblclick" , function(){
    localStorage.clear();
    myLeads = [];
    ulEl.innerHTML = "";
});


inputBtn.addEventListener("click" , function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads" , JSON.stringify(myLeads));

    // console.log("myLeads array is" + myLeads);
    
    render(myLeads);
    console.log("myLeads is " + localStorage.getItem("myLeads"));
    console.log("leadsFromLocalStorage is " + leadsFromLocalStorage);
});