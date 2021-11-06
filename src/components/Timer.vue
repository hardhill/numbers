<template>
  <div>{{viewtime}}</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
    emits:['start','stop'],
    setup(props,{emit}){
        const starttime = ref(0)
        var interval:number
        
        const viewtime = computed(()=>{
            var sec_num = starttime.value
            var hours   = Math.floor(sec_num / 3600)
            var minutes = Math.floor(sec_num / 60) % 60
            var seconds = sec_num % 60

            return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
        })
        const setTimer = (value:number)=>{
            starttime.value = value
        }
        const startTimer = ()=>{
            
            var stTime = Date.now()
            var counter:number = starttime.value
            interval = setInterval(()=>{
                var curTime:number = Date.now()
                var sec = Math.floor((curTime - stTime)/1000)
               
                starttime.value = counter - sec
                if(sec>=counter){
                    clearInterval(interval)
                    emit('stop')
                }
            },100)
            emit('start')
        }
        const stopTimer = ()=>{
            clearInterval(interval)
            emit('stop')
        }
        return {viewtime, setTimer, startTimer, stopTimer}

    },

})
</script>

<style>

</style>