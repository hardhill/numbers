import { INums } from "./Nums";

export function GetNumbers(st?:number){
    var numOne:INums
    var numTwo:INums
    numOne = {id:1,text:"1",value:1,range:1}
    numTwo = {id:2,text:"2",value:2,range:1}
    return {numOne,numTwo}
}
export function Compare(n1:INums,n2:INums){
    let result = 0
    if(n1.value>n2.value){
        result = n1.range
    }
    return result
}