<template>
  <div class="hello">
    <div class="time"><Timer ref="timer" @start="hookStartTimer" @stop="hookStopTimer"/></div>
    <div class="tablo" :class="{'success':answerSucc,'error':answerErr}">
      <div class="number">{{numOne.text}}</div>
      <div class="number">{{numTwo.text}}</div>
    </div>
    <div
      class="pretime"
      v-if="(pretiming>0)&&gaming"
    >
      {{pretiming}}
    </div>
    <div
      class="description"
      v-if="!gaming"
    >
      <h2>Правила игры:</h2>
      <p class="text">Выбрать большее значение справа или слева клавишей <span>
          <ArrowLeftIcon style="height:20px; color:green" />
        </span> или <span>
          <ArrowRightIcon style="height:20px; color:green" />
        </span>. Если показанные значения между собой равны, нажмите клавишу
        <ArrowDownIcon style="height:20px; color:green" />
      </p>
    </div>
    <div class="footer">
      <div v-if="!gaming"><button
          class="bstart"
          @click="BeginGame"
        >Начали!</button></div>
      <div v-else>
        <div
          class="control"
          v-if="activatedKey"
        >
          <button
            class="bcursor"
            @click="PressArrow('ArrowLeft')"
          >
            <ArrowLeftIcon style="height:20px" />
          </button>
          <button
            class="equle"
            @click="PressArrow('ArrowDown')"
          >
            <MenuAlt4Icon style="height:20px" />
          </button>
          <button
            class="bcursor"
            @click="PressArrow('ArrowRight')"
          >
            <ArrowRightIcon style="height:20px" />
          </button>
        </div>
      </div>

    </div>
    
  </div>
  <div
      class="tablo-result"
      v-if="endGame"
    >
      <div class="result-desc">
        <div class="caption">
          <div class="icon" @click="endGame=false">
            <XIcon style="height:20px" />
          </div>
          <div class="title">Результат игры</div>
        </div>
        <table>
          <tbody>
            <tr>
              <td class="dcap">Очки</td>
              <td>{{stars}}</td>
            </tr>
            <tr>
              <td class="dcap">Верно</td>
              <td>{{answers}}</td>
            </tr>
            <tr>
              <td class="dcap">Ошибок</td>
              <td>{{errors}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, onMounted, Ref, ref } from "vue";
import { INums } from "../classes/Nums";
import { Compare, GetNumbers } from "../classes/getnumbers";
import router from "@/router";
import store from "@/store";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  MenuAlt4Icon,
  XIcon
} from "@heroicons/vue/outline";
import Timer from './Timer.vue'
export default defineComponent({
  name: "Game",
  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowDownIcon,
    MenuAlt4Icon,
    XIcon, Timer
  },
  setup(props,context) {
    const timer:Ref<any> = ref(null)
    const beginValue = { id: 0, text: " ", value: 0, range: 0 };
    const answerSucc = ref(false);
    const answerErr = ref(false);
    const gaming = ref(false);
    const pretiming = ref(3);
    const numOne: Ref<INums> = ref(beginValue);
    const numTwo: Ref<INums> = ref(beginValue);
    const activatedKey = ref(false);
    const endGame = ref(false);
    var stars:Ref<number> = ref(0);
    var answers:Ref<number> = ref(0)
    var errors:Ref<number> = ref(0)
    let duration: number = 30;
    let intervPre: number;
    
    
    const counter = computed(()=>{

    })
    function BeginGame() {
      stars.value = 1
      answers.value = 0
      errors.value = 0
      gaming.value = true;
      intervPre = setInterval(() => {
        pretiming.value -= 1;
        if (pretiming.value == 0) {
          MainPart();
          clearInterval(intervPre);
        }
      }, 1000);
    }

    function MainPart() {
      //старт таймера
      timer.value.setTimer(50)
      timer.value.startTimer()
    }

    function hookStartTimer(){
      // игра пошла
      document.addEventListener("keydown", HookKeys);
      activatedKey.value = true;
      ShowNumbersPart(1);
    }
    function hookStopTimer(){
      EndGame();
      // показать результаты
      endGame.value = true
    }
    function HookKeys(event: KeyboardEvent) {
      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowDown"
      ) {
        PressArrow(event.key);
      } else if (event.key === "Escape") {
        timer.value.stopTimer()
      }
    }
    function PressArrow(key: string) {
      let s = Compare(numOne.value, numTwo.value, key);
      if (s > 0) {
        answers.value ++
        stars.value = stars.value + s;
        answerSucc.value = true;
        answerErr.value = false;
      } else {
        stars.value = (stars.value + s)<0?0:(stars.value + s)
        errors.value ++
        answerSucc.value = false;
        answerErr.value = true;
      }
      
      setTimeout(ShowNumbersPart, 100, stars.value);
    }
    
    function ShowNumbersPart(stars: number) {
      answerSucc.value = false;
      answerErr.value = false;
      const nums = GetNumbers(stars);
      numOne.value = nums.numOne;
      numTwo.value = nums.numTwo;
      console.log(numOne.value.text, numTwo.value.text)
      console.log(numOne.value.value, numTwo.value.value)
    }
    
    function EndGame() {
      // концовка игры
      document.removeEventListener("keydown", HookKeys);
      gaming.value = false;
      activatedKey.value = false;
      pretiming.value = 3;
      numOne.value = beginValue;
      numTwo.value = beginValue;
      answerSucc.value = false;
      answerErr.value = false;
      
      
    }
    
    return {
      gaming,
      BeginGame,
      pretiming,
      numOne,
      numTwo,
      answerSucc,
      answerErr,
      PressArrow,
      hookStartTimer,hookStopTimer,
      activatedKey,
      endGame,
      stars, counter, timer, answers, errors
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: relative;
  min-width: 580px;
  max-width: 720px;
  min-height: 400px;
  margin: 0 auto;
  height: 100%;
  
}
.time{
  position: absolute;
  top: -4rem;
  right:1rem;
}
.tablo {
  display: flex;
  justify-content: space-around;
}
p{
  padding: 0 2rem;
}
.tablo-result {
  position: absolute;
  top:0rem;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ddecddd5;
}
.number {
  font-size: 4rem;
  padding: 0.3rem 1rem;
}
.success {
  border: solid 1px #107e10;
  background-color: #7beb7b;
}
.error {
  border: solid 1px #c02c0e;
  background-color: #f09797;
}
.description {
  margin-top: 2rem;
  color: rgb(32, 32, 56);
}
.description h3 {
  color: rgb(1, 1, 141);
}
.description p {
  font-size: 1.5rem;
}
.footer {
  margin-bottom: 2rem;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.bstart {
  padding: 1rem 2rem;
  font-size: 2rem;
  border: solid 2px #107e10;
  border-radius: 10px;
  overflow: hidden;
  background-color: #caf8ca;
  cursor: pointer;
}
.bcursor {
  padding: 1rem 2rem;
  font-size: 2rem;
  border: solid 2px #89a9e4;
  border-radius: 10px;
  overflow: hidden;
  background-color: #262ea3;
  cursor: pointer;
  color: aliceblue;
}
.equle {
  padding: 1rem 2rem;
  font-size: 2rem;
  border: solid 2px #89a9e4;
  border-radius: 10px;
  overflow: hidden;
  background-color: #0973dd;
  cursor: pointer;
  color: aliceblue;
  margin: 0rem 2rem;
}
.control {
  display: flex;
  justify-content: center;
}
.pretime {
  position: absolute;
  top: 10 rem;
  font-size: 14rem;
  width: 100%;
  color: red;
  z-index: 3;
}
.result-desc {
  
  width: 24rem;
  border: solid 2px rgb(101, 200, 151);
  border-radius: 10px;
  margin: 8rem auto;
  overflow: hidden;
  background-color: rgb(246, 254, 255);
}
.result-desc table {
  margin: 1rem;
}
.icon {
  position: absolute;
  top: 0.9rem;
  right: 1rem;
  cursor: pointer;
}
.caption {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  border-bottom: solid 2px rgb(101, 200, 151);
}
.title {
  font-size: 1.5rem;
}
.dcap {
  width: 8rem;
  height: 2rem;
}
</style>




