<template>
  <div class="hello">
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
      <p class="text">Выбрать большее число клавишей <span>
          <ArrowLeftIcon style="height:20px" />
        </span> или <span>
          <ArrowRightIcon style="height:20px" />
        </span>, если значения равны клавиша
        <ArrowDownIcon style="height:20px" />
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
          </tbody>
        </table>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, onMounted, reactive, Ref, ref } from "vue";
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

export default defineComponent({
  name: "Game",
  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowDownIcon,
    MenuAlt4Icon,
    XIcon
  },
  setup() {
    
    const beginValue = { id: 1, text: "_", value: 0, range: 1 };
    const answerSucc = ref(false);
    const answerErr = ref(false);
    const gaming = ref(false);
    const pretiming = ref(3);
    const numOne: Ref<INums> = ref(beginValue);
    const numTwo: Ref<INums> = ref(beginValue);
    const activatedKey = ref(false);
    const endGame = ref(false);
    var stars:Ref<number> = ref(0);
    let duration: number = 30;
    let intervPre: number;
    let intervGame: number;
    let intervShow: number;
    function BeginGame() {
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
      // старт часов
      duration = 30;
      intervGame = setInterval(() => {
        duration -= 1;
        //console.log(duration)
        if (duration <= 0) {
          EndGame();
          clearInterval(intervGame);
          // показать результаты
          endGame.value = true
        }
      }, 1000);
      // игра пошла
      document.addEventListener("keydown", HookKeys);
      activatedKey.value = true;
      ShowNumbersPart();
    }
    function HookKeys(event: KeyboardEvent) {
      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowDown"
      ) {
        PressArrow(event.key);
      } else if (event.key === "Escape") {
        console.log("Escape game");
        duration = 0;
      }
    }
    function PressArrow(key: string) {
      let s = Compare(numOne.value, numTwo.value, key);
      if (s > 0) {
        stars.value = stars.value + s;
        answerSucc.value = true;
        answerErr.value = false;
      } else {
        answerSucc.value = false;
        answerErr.value = true;
      }
      setTimeout(ShowNumbersPart, 100, stars);
    }

    
    function ShowNumbersPart(stage?: number) {
      answerSucc.value = false;
      answerErr.value = false;
      const nums = GetNumbers(stage);
      numOne.value = nums.numOne;
      numTwo.value = nums.numTwo;
    }
    function EndGame() {
      // концовка игры
      console.log("Game over");
      clearInterval(intervShow);
      clearInterval(intervGame);
      document.removeEventListener("keydown", HookKeys);
      gaming.value = false;
      activatedKey.value = false;
      pretiming.value = 3;
      numOne.value = beginValue;
      numTwo.value = beginValue;
      answerSucc.value = false;
      answerErr.value = false;
      store.commit("SET_STARS", stars);
    }
    onMounted(() => {
      duration = 30;
    });
    onActivated(() => {
      console.log("activated");
    });
    return {
      gaming,
      BeginGame,
      pretiming,
      numOne,
      numTwo,
      answerSucc,
      answerErr,
      PressArrow,
      activatedKey,
      endGame,
      stars
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: relative;
  min-width: 640px;
  min-height: 400px;
  margin: 0 auto;
  height: 100%;
}
.tablo {
  display: flex;
  justify-content: space-around;
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




