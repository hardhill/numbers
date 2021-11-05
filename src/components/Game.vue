<template>
  <div class="hello">
    <div class="tablo">
      <div class="number" :class="{'success':answerSucc,'error':answerErr}">{{numOne.text}}</div>
      <div class="number" :class="{'success':answerSucc,'error':answerErr}">{{numTwo.text}}</div>
    </div>
    <div class="pretime" v-if="(pretiming>0)&&gaming">
      {{pretiming}}
    </div>
    <div class="description" v-if="!gaming">
      <h3>Правила игры:</h3>
      <p>Выбрать большее число стрелками , если значения равны стрелка вверх или вниз </p>
    </div>
    <div class="footer">
      <div v-if="!gaming"><button class="bstart" @click="BeginGame">Начали!</button></div>
      <div v-else>
        <div class="control">
          <button></button>
          <button>=</button>
          <button></button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, onMounted, Ref, ref } from 'vue';
import {INums} from '../classes/Nums'
import {Compare, GetNumbers} from '../classes/getnumbers'
import router from '@/router';

export default defineComponent({
  name: 'Game',
  setup(){
    var stars = 0
    const beginValue = {id:1,text:'_',value:0,range:1}
    const answerSucc = ref(false)
    const answerErr = ref(false)
    const gaming = ref(false)
    const pretiming = ref(3)
    const numOne:Ref<INums> = ref(beginValue)
    const numTwo:Ref<INums> = ref(beginValue)
    let duration:number = 30
    let intervPre:number
    let intervGame:number
    let intervShow:number
    function BeginGame(){
      gaming.value = true
      intervPre = setInterval(()=>{
        pretiming.value -=1
        if(pretiming.value == 0){
          MainPart()
          clearInterval(intervPre)
        }
      },1000)
    }
    function MainPart(){
      // старт часов
      duration = 30
      intervGame = setInterval(()=>{
        duration -= 1
        //console.log(duration)
        if(duration <= 0){
          EndGame()
          clearInterval(intervGame)
          router.push('about')
        }
      },1000)
      // игра пошла
      document.addEventListener("keydown",HookKeys)
      
     ShowNumbersPart()
      
    }
    function HookKeys(event:KeyboardEvent){
        if(event.key === "ArrowLeft"){
          let s = Compare(numOne.value,numTwo.value)
          if(s>0){
            stars = stars + s
            answerSucc.value = true
            answerErr.value = false
          }
          else{
            answerSucc.value = false
            answerErr.value = true
          }
          setTimeout(ShowNumbersPart,100,stars)
          
        }else if(event.key === "ArrowRight"){
          let s = Compare(numTwo.value,numOne.value) 
          if(s>0){
            stars = stars + s
            answerSucc.value = true
            answerErr.value = false
          }else{
            answerSucc.value = false
            answerErr.value = true
          }
          setTimeout(ShowNumbersPart,100,stars)
        }else if(event.key === "ArrowDown"){
          
          setTimeout(ShowNumbersPart,100)
        }else if(event.key === "Escape"){
          console.log("Escape game")
          duration = 0
        }
    }
    function ShowNumbersPart(stage?:number){
      answerSucc.value = false
      answerErr.value = false
      const nums = GetNumbers(stage)
      numOne.value = nums.numOne
      numTwo.value = nums.numTwo
    }
    function EndGame(){
      // концовка игры
      console.log("Game over")  
      clearInterval(intervShow)
      clearInterval(intervGame)
      document.removeEventListener("keydown",HookKeys)
      gaming.value = false
      pretiming.value = 3
      numOne.value = beginValue
      numTwo.value = beginValue
      answerSucc.value = false
      answerErr.value = false
    }
    onMounted(()=>{
      duration = 30
      
    })
    onActivated(()=>{
      console.log('activated')
    })
    return {gaming, BeginGame, pretiming, numOne, numTwo, answerSucc, answerErr, }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  position: relative;
  min-width: 640px;
  min-height: 400px;
  margin: 0 auto;
  height: 100%;
}
.tablo{
  display: flex;
  justify-content: space-around;
}
.number{
  font-size: 4rem;
  padding: 0.3rem 1rem;
}
.success{
  border: solid 2px #107e10;
}
.error{
  border: solid 2px #c02c0e
}
.description{
  margin-top: 2rem;
  color: rgb(32, 32, 56);
}
.description h3{
  color: blue;
}
.footer{
  margin-bottom: 2rem;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.bstart{
  padding: 1rem 2rem;
  font-size: 2rem;
}
.control{
  display: flex;
  justify-content: center;
}
.pretime{
  position: absolute;
  top: 10 rem;
  font-size: 14rem;
  width: 100%;
  color: red;
  z-index: 3;
}
</style>




