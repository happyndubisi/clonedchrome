let myLead=[]
let saveInput= document.getElementById("save-input")
let inputEl = document.getElementById("input-el")
let ulEl= document.getElementById("ul")
let deleteBtn= document.getElementById("delete")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
let tabBtn = document.getElementById("tab")

if (leadsFromLocalStorage){
    myLead = leadsFromLocalStorage
    render(myLead)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLead.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLead) )
        render(myLead)
    })
})

function render(leads){
let listItem=""
for (let i=0; i<leads.length; i++){
listItem += `
<li>
<a target='_blank' href='${leads[i]}'>
${leads[i]}
</a>
</li>
`
}
ulEl.innerHTML = listItem
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLead = [];
    render(myLead);
})

saveInput.addEventListener("click", function(){
    myLead.push(inputEl.value)
inputEl.value= ""
localStorage.setItem("mylead", JSON.stringify(myLead))
render(myLead)
})
