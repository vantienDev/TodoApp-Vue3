<template>
  <div class="wrapper">
    <Menu />
    <Main :task='task'/>
  </div>
</template>

<script>
  import Menu from './components/menu/MenuComponent.vue'
  import Main from './components/main/MainComponent.vue'

  import { useStore } from 'vuex'

  import { onBeforeMount } from 'vue'

  export default {
    components: {
      Menu,
      Main,
    },

    setup() {
      const store = useStore()

      // setup task for first render
      onBeforeMount(() => {
        store.commit('getTimestampToday') // get date time
        store.dispatch('getTasksAction', 'Today')
        store.dispatch('getCategoryAction')
      })

      return {
      }
    }
  }

</script>

<style lang="scss">
  @import './assets/globalStyle.scss';

  .wrapper {
    @include d-flex(space-between, flex-start);
    max-width: 100%;
    padding: 10px;
    background-color: $bg-color;
    color: $primary-color;
    font-family: sans-serif;
    height: 100vh;
  }
 
</style>
