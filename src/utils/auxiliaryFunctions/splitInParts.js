export function splitInParts(arrayToSplit, n){
    let finalArray = []
    let i = 0;
    while(i<arrayToSplit.length){
        if(i+n > arrayToSplit.length){
            finalArray.push(arrayToSplit.slice(i));
        }
        else{
            finalArray.push(arrayToSplit.slice(i, i+n));
        }
        i=i+n;
    }
    return finalArray
    
}