<template>
    <Game />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Game from '@/components/Game.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    Game,
  },
});
</script>
