export const storeSearches = (data) => {
    let pastSearches = [];
    if(localStorage.getItem('pastSearches')){
        pastSearches = JSON.parse(localStorage.getItem('pastSearches'))
        if(pastSearches.length === 3){
            pastSearches = pastSearches.slice(1);
            pastSearches.push(data);
        } else{
            pastSearches.push(data);
        }
    } else {
        pastSearches.push(data)
    }
    localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
}