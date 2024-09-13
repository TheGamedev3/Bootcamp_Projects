// Aaron Binay
// 8/11/2024




// Use all sorting algorithms, 1,2,3,4, etc...
const sortingAlgorithms = [bubble, selection, insertion, merge, quick, radix];


function TestSort(algorithmNumber, array, digit = 0) {


    if(verify(array, algorithmNumber, digit)){console.log("Already correct!"); return array;}
    algorithmNumber-=1;
    if (algorithmNumber >= -1 && algorithmNumber < sortingAlgorithms.length) {
        let new_array = sortingAlgorithms[algorithmNumber](array, digit)
        if(verify(new_array, algorithmNumber, digit)){console.log("Verified!");}
        else{{console.log("Something went wrong...!");}}
        console.log(new_array);
    } else {
        console.log("Invalid Function!");
    }
}


// Debugging


// Use the "TestSort" function to verify each function in the sortingAlgorithms array
TestSort(1, [3,1,7,4,6,9,7,2,8]); // Example, Testing Bubble Sort (1)


// 0 = ones, 1 = tens, 2 = hundreds, etc
TestSort(6, [3, 40, 320, 111, 21, 878], 1); // Example, Testing Radix Sort (6), by sorting the tens digit




// (other functions)
function verify(array, algorithmNumber = 0, digit = 0) {


    if(array.length <= 1){return true;}


    if(algorithmNumber == 5){
        // do a radix check
        let greatest = array[0];
        for (let i = 1; i < array.length; i++) {
            if(get_radix_rank(array[i], digit) < get_radix_rank(greatest, digit)){return false;}
            greatest = array[i];
        }


        return true
    }
    let greatest = array[0];
    for (let i = 1; i < array.length; i++) {
        if(array[i] < greatest){return false;}
        greatest = array[i];
    }


    return true
}
function compare(array, A, B) {
    return array[A] > array[B]
}
function swap(array, A, B) {
    let a = array[A];
    array[A] = array[B];
    array[B] = a;
}


// sorting algorithms
function bubble(array) {


    function traverseBackwards(){


        let perfect = true
        for (let i = array.length - 2; i >= 0; i--) {
            if(compare(array, i, i+1)){
                swap(array, i, i+1)
                perfect = false
            }
        }
        if(!perfect){traverseBackwards();}
    }


    traverseBackwards();


    return array;
}
function selection(array) {


    let least = 0
    let at = 0
    function traverseBackwards(){


        let perfect = true
        for (let i = array.length - 1; i >= at; i--) {
            if(i == array.length-1){least = i; perfect = false}
            else{
                if(compare(array, least, i)){
                    least = i
                    perfect = false
                }
            }
        }
        if(!perfect){
            let leastest = array[least]
            array.splice(least,1)
            array.splice(at, 0, leastest);
            at++;
            traverseBackwards();
        }
    }


    traverseBackwards();


    return array;
}
function insertion(array) {


    let new_array = [array[0]];


    for (let i = 1; i < array.length; i++) {
        let sorting = array[i];
        let skip = false
        for (let i2 = 0; i2 < new_array.length; i2++) {
            if(new_array[i2] >= sorting){
                new_array.splice(i2, 0, sorting);
                skip = true;
                break;
            }
        }
        if(skip){continue;}
        new_array.push(sorting);
    }


    return new_array
}
function merge(array) {


    function get_values(ary,A,B){return ary.slice(A, B + 1);}


    function merging(ary,re){
        if(ary.length == 1){
            return ary
        }
        if(ary.length == 2){if(compare(ary,0,1)){
            swap(ary,0,1)}
            return ary
        }


        let median = Math.floor(ary.length / 2);
        let listA = merging(get_values(ary,0,median),re+1)
        console.log("A"+re, listA)
        let listB = merging(get_values(ary,median+1,ary.length-1),re+1)
        console.log("B"+re, listB)


        for (let i = 0; i < listA.length; i++) {
            if(listB.length == 0){
                console.log("merge"+re, listA)
                return listA
            }
            if(listA[i] >= listB[0]){
                listA.splice(i,0,listB[0])
                listB.splice(0,1)
            }
        }
        for (let i = 0; i < listB.length; i++) {
            listA.push(listB[i])
        }


        console.log("merge"+re, listA)
        return listA
    }
    return merging(array,0)
}
function quick(array) {
   
    function partition(i1, i2) {
        if(i1 >= i2){return}
        let pivot = array[i1]
        let left = i1
        for (let i = i1+1; i <= i2; i++) {
            if(array[i] < pivot){
                left++;
                swap(array,i,left)
            }
        }
        swap(array,i1,left)
        partition(i1, left-1)
        partition(left+1,i2)
    }
    partition(0, array.length-1)


    return array
}


function get_radix_rank(number, digit){
    let placeValues = number.toString().split("");
    let place = placeValues.length-1-digit
    if(place < 0){return 0}
    return placeValues[place]
}
function radix(array, digit) {
    let buckets = {}
    for (let i = 0; i < array.length; i++) {
        let value = array[i]
        let rank = get_radix_rank(value,digit)
        console.log(value,"=",rank)
        if(buckets[rank] == null){buckets[rank] = []}
        buckets[rank].push(value)
    }
    let new_array = []
    Object.values(buckets).forEach(list=>{
        new_array = new_array.concat(list)
    })
    return new_array
}


