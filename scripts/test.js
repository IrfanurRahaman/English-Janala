
const syno = ['age' , 'gander' , 'education'];

const synoElement = (arr) => {
    const getSynonyms = arr.map((Element) =>`<span class = "btn">${Element}</span>`)
    // return (getSynonyms.join(" "));
    console.log(getSynonyms.join(" "))
}

synoElement(syno)

