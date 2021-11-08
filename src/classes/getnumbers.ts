import { INums } from "./Nums";

export function Compare(n1:INums,n2:INums,key:string){
    let result = 0
    if((n1.value>n2.value)&&key==="ArrowLeft"){
        result = 1
    }else if((n1.value<n2.value)&&key==="ArrowRight"){
        result = 1
    }else if ((n1.value == n2.value) && key === "ArrowDown"){
        result = 1
    }else if((n1.value>n2.value)&&key!="ArrowLeft"){
        result = -3
    }else if((n1.value<n2.value)&&key!="ArrowRight"){
        result = -3
    }else if((n1.value == n2.value) && key != "ArrowDown"){
        result = -3
    }

    return result
}
export function GetNumbers(st:number){
    var numOne:INums
    var numTwo:INums
    numOne = {text:"1",value:1}
    numTwo = {text:"2",value:2}
    if(st>=1 && st<5){
       numOne = GenerateNum1(numTwo)
       numTwo = GenerateNum1(numOne)
    }else if(st>=5 && st<10){
       if(RandBool()){
           numOne = GenerateNum1()
           numTwo = GenerateSum1()
       } else{
           numOne = GenerateSum1()
           numTwo = GenerateNum1()
       }
    }else if(st>=10 && st<15){
        if(RandBool()){
            numOne = GenerateNum2()
            numTwo = GenerateSum2()
        } else{
            numOne = GenerateSum2()
            numTwo = GenerateNum2()
        }
    }else if(st>=15 && st<20){
        if(RandBool()){
            numOne = GenerateNum1()
            numTwo = GenerateDec1()
        } else{
            numOne = GenerateDec1()
            numTwo = GenerateNum1()
        }
    }else if(st>=20 && st<25){
        if(RandBool()){
            numOne = GenerateNum2()
            numTwo = GenerateDec2()
        } else{
            numOne = GenerateDec2()
            numTwo = GenerateNum2()
        }
    }else if(st>=25&&st<30){
        if(RandBool()){
            numOne = GenerateSum1()
            numTwo = GenerateDec1()
        } else{
            numOne = GenerateDec1()
            numTwo = GenerateSum1()
        }
    }else if(st>=30&&st<40){
        if(RandBool()){
            numOne = GenerateSum2()
            numTwo = GenerateDec2()
        } else{
            numOne = GenerateDec2()
            numTwo = GenerateSum2()
        }
    }else if(st>=40&&st<50){
        if(RandBool()){
            numOne = GenerateMult1()
            numTwo = GenerateDec2()
        } else{
            numOne = GenerateDec2()
            numTwo = GenerateMult1()
        }
    }else if (st>=50&&st<1000){
        if(RandBool()){
            numOne = GenerateDiv1()
            numTwo = GenerateDec1()
        } else{
            numOne = GenerateDec1()
            numTwo = GenerateDiv1()
        }
    }


    return {numOne,numTwo}
}

function GenerateNum1(num?:INums|undefined):INums{
    if(typeof(num) === 'undefined'){
        num = {value:1,text:'1'}
    }
    let n = num.value
    while(n == num.value){
        n = RandInt(1,11)
    }
    return {value:n,text:n.toString()}
}
function GenerateNum2(num?:INums|undefined){
    if(typeof(num) === 'undefined'){
        num = {value:1,text:'1'}
    }
    let n = num.value
    while(n == num.value){
        n = RandInt(11,21)
    }
    return {value:n,text:n.toString()}
}

function GenerateSum1():INums{
    let sum = RandInt(2,11)
    let m = RandInt(1,sum)
    let p = sum - m
    let txt = RandBool()?m.toString()+"+"+p.toString():p.toString()+"+"+m.toString()
    return {value:sum ,text:txt }
}

function GenerateSum2():INums{
    let sum = RandInt(11,21)
    let m = RandInt(9,sum)
    let p = sum - m
    let txt = RandBool()?m.toString()+"+"+p.toString():p.toString()+"+"+m.toString()
    return {value:sum ,text:txt }
}

function GenerateDec1():INums{
    let sum = RandInt(2,11)
    let m = RandInt(1,11)
    let p = sum + m
    let txt = p.toString()+"-"+m.toString()
    return {value:sum, text:txt}
}
function GenerateDec2():INums{
    let sum = RandInt(11,21)
    let m = RandInt(1,11)
    let p = sum + m
    let txt = p.toString()+"-"+m.toString()
    return {value:sum, text:txt}
}
function GenerateMult1(){
    const result:number = RandInt(11,21)
    let n:number = RandInt(2,10)
    let c:number = result % n
    let m = (result-c)/n
    // console.log('Result:',result, 'n:',n,'c:',c,'m:',m)
    
    let txt1:string = RandBool()? n.toString() + "*" + m.toString():m.toString()+"*"+n.toString()
   
    if(c>0){
        var txt:string = RandBool() ? txt1 + "+" + c.toString() : c.toString() + "+" + txt1
    }else{
        var txt = txt1
    }
    
    return {value:result,text:txt}
}
function GenerateDiv1(){
    const result = RandInt(2,11)
    let d = RandInt(2,10)
    let c = RandInt(1,11)
    let n = (result + c) * d
    let txt = "("+n.toString()+"/"+d.toString()+") - "+c.toString()
    return {value:result,text:txt}
}


//=======================================================================================================================================
function RandInt(min:number, max:number){
     return Math.floor(Math.random() * (max - min)) + min;
}

function RandBool():boolean{
    return Math.random()>0.5
}