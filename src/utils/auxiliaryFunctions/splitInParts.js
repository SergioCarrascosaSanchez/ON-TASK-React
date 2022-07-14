export function splitInParts(arrayToSlit, n){
    let finalArray = []
    let i = 0;
    while(i<arrayToSlit.length){
        if(i+n > arrayToSlit.length){
            finalArray.push(arrayToSlit.slice(i));
        }
        else{
            finalArray.push(arrayToSlit.slice(i, i+n));
        }
        i=i+n;
    }
    return finalArray
}