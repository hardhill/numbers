import { INums } from "./Nums";

export function GetNumbers(st:number){
    var numOne:INums
    var numTwo:INums
    numOne = {text:"1",value:1}
    numTwo = {text:"2",value:2}
    if(st>=1 && st<4){
       numOne = GenerateNum(numOne)
       numTwo = GenerateNum(numTwo)
    }
    return {numOne,numTwo}
}
export function Compare(n1:INums,n2:INums,key:string){
    let result = 0
    if((n1.value>n2.value)&&key==="ArrowLeft"){
        result = 1
    }else if((n1.value<n2.value)&&key==="ArrowRight"){
        result = 1
    }else if ((n1.value == n2.value) && key === "ArrowDown"){
        result = 1
    }
    return result
}
function GenerateNum(num:INums):INums{
    let n = num.value
    while(n == num.value){
        n = RandInt(1,11)
    }
    return {value:n,text:n.toString()}
}

function RandInt(min:number, max:number){
     return Math.floor(Math.random() * (max - min)) + min;
}