
document.addEventListener("DOMContentLoaded", () => 
{
    const url = `http://localhost:3000/quotes?_embed=likes`
    const likesUrl = `http://localhost:3000/likes`
    const quotesUrl = `http://localhost:3000/quotes/`
   
   //rendering the quotes on index
    fetch(url)
    .then(response => response.json())
    .then(quotes => renderQuotes(quotes))
    // gets all the quotes
function renderQuotes(quotes){
    quotes.forEach( quote => renderQuote(quote))
}

//displays individual quote 
function renderQuote(quote) {

    let ul =document.querySelector("ul#quote-list")
    let li = document.createElement("li")
    li.className = "quote-card"
    const blockquote = document.createElement("blockquote")
    blockquote.className = "blockquote"
        const pTag = document.createElement("p")
        pTag.className = "mb-0"
        pTag.innerText = quote.quote
        const footerTag = document.createElement("footer")
        footerTag.className = "blockquote-footer"
        const brTag = document.createElement("br")
        const successButtonTag = document.createElement("button")
        successButtonTag.className = "btn-success"
        successButtonTag.innerText = "Likes:"
    
    const spanTag  = document.createElement("span")
    if(quote.likes.length > 0){
     spanTag.innerText = quote.likes.length}
    else{
        spanTag.innerText = 0
    }

    successButtonTag.addEventListener("click", (e) => {
    
    likeButton(spanTag,quote)
    
    })
    const deleteButtonTag = document.createElement("button")
    deleteButtonTag.className = "btn-danger"
    deleteButtonTag.innerText = "Delete"
    deleteButtonTag.addEventListener("click", (e) => {
    
    deleteButton(li,quote)
    
    
        })

    

    li.append(blockquote)
    blockquote.append(pTag,footerTag,brTag,successButtonTag,deleteButtonTag)
    successButtonTag.append(spanTag)
    ul.append(li)
    
}   
function likeButton(spanTag,quote){
fetch(likesUrl, 
    {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
            body: JSON.stringify
        ({
            quoteId: quote.id 
           
        })
        
        
    })
    
    .then (response => response.json())
    .then (data => {spanTag.innerText = parseInt(spanTag.innerText) + 1} )  
}

function deleteButton (li, quote){
fetch(quotesUrl+quote.id, {

    method: "DELETE"
   
})
.then (response => response.json())
.then (data=> li.remove())
}

form = document.querySelector("form#new-quote-form")
form.addEventListener("submit", (e)=> {
e.preventDefault()


fetch(quotesUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body:JSON.stringify({
        quote: e.target[0].value ,
        author:  e.target[1].value,
        likes: 0
    })
    
    
})
.then (response => response.json())
.then( newQuote => renderQuote(newQuote))
form.reset()

})
})