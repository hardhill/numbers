<template>
  <div class="about">
    
    <div class="result-desc">
      <div class="caption">
        <div class="icon"><router-link to="/"> <ArrowLeftIcon style="height:20px"/></router-link></div>
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
<script>
import store from "@/store";
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { ArrowLeftIcon } from '@heroicons/vue/solid'

export default defineComponent( {
  components:{
    ArrowLeftIcon
  },
    setup(){
      const stars = ref(0)
      onMounted(()=>{
        stars.value = store.getters['GET_STARS']
      })
      return {stars}
    }
})
</script>
<style scoped>
.result-desc{
  width: 24rem;
  border: solid 2px rgb(101, 200, 151);
  border-radius: 10px;
  margin: 0 auto;
  overflow: hidden;
}
.result-desc table{
  margin: 1rem;
}
.icon{
  
  position: absolute;
  top: 0.9rem;
  left: 1rem;
}
.caption{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  border-bottom: solid 2px rgb(101, 200, 151);
}
.title{
  font-size: 1.5rem;
}
.dcap{
  width: 8rem;
  height: 2rem;
}
</style>
  
