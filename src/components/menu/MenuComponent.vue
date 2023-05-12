<template>
  <div class="menu_wrapper col-3 col-s-2" >
    <span class="menu_icon_toggle">
      <button class="icon_toggle" @click="showMenu =! showMenu">
        <font-awesome-icon icon="fa-solid fa-bars" size="4x" style="color: #2e3436;" />
      </button>
    </span>

    <div :class="{showUp: showMenu}" class="dis-none">
      <div class="menu_header">
        <div class="menu_tilte">
          <span class="menu_tilte_text">
            <h1>Menu</h1>
          </span>
        </div>
        <input class="search" type="text" placeholder="search" />
      </div>

      <div class="menu_main">
        <div class="tasks">
          <div class="tasks_title">
            <h4>Tasks</h4>
          </div>
          <div class="tasks_actions">
            <button class="action_btn" @click="getTasksHandle('Today')">
              Today
            </button>
            <button class="action_btn" @click="getTasksHandle('Comming')">
              Comming
            </button>
          </div>
        </div>

        <div class="list">
          <div class="list_title">
            <h4>List</h4>
          </div>
          <div class="list_actions">
            <div v-for="item in getTypes" :key="item">
              <button class="action_btn" @click="getTaskByCategoryHandle(item.name)">{{item.name}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>  
  import { useStore } from 'vuex'
  import { computed, ref } from 'vue'
  export default {
    setup() {
      const store = useStore()
      const showMenu = ref(false)

      // get category 
      const getTypes = computed(() => {
        return store.getters.getTypes
      })

      // dispatch to get tasks today
      const getTasksHandle = (title) => {
        store.commit('setTitle', title)
        store.dispatch('getTasksAction', title)
      }

      const getTaskByCategoryHandle = (type) => {
        store.commit('setTitle', type)
        store.dispatch('getTaskByTypesAction', type)
      }

      return {
        getTasksHandle,
        getTypes,
        getTaskByCategoryHandle,
        showMenu
      }
    }
  }
</script>

<style scoped lang="scss">
  @import './menu.scss'
  
</style>