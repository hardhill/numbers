import { INums } from "./Nums";

export function GetNumbers(st:number){
    var numOne:INums
    var numTwo:INums
    numOne = {id:1,text:"1",value:1,range:1}
    numTwo = {id:2,text:"2",value:2,range:1}
    if(st>=1 && st<4){
       numOne = GenerateNum(numOne)
       numTwo = GenerateNum(numTwo)
    }
    return {numOne,numTwo}
}
export function Compare(n1:INums,n2:INums,key:string){
    let result = 0
    if((n1.value>n2.value)&&key==="ArrowLeft"){
        result = n1.range
    }else if((n1.value<n2.value)&&key==="ArrowRight"){
        result = n1.range
    }else if ((n1.value == n2.value) && key === "ArrowDown"){
        result = n1.range
    }
    return result
}
function GenerateNum(num:INums):INums{
    let n = num.value
    while(n == num.value){
        n = RandInt(1,11)
    }
    return {id:1,range:num.range,value:n,text:n.toString()}
}

function RandInt(min:number, max:number){
     return Math.floor(Math.random() * (max - min)) + min;
}