import { doc, query, collection, onSnapshot, where, setDoc, updateDoc, deleteDoc } from "firebase/firestore"
import db from '../firebase/init.js'

import { createStore } from 'vuex'

import { v4 as uuidv4 } from "uuid"; // random id

export default createStore({
  state() {
    return {
      listTask: [],
      dateToday: null,
      title: 'Today',
      types: [],
      showUp: false,
    }
  },
  getters: {
    getTitle(state) {
      return state.title
    },
    getTasks(state) {
      return state.listTask
    },
    getTypes(state){
      return state.types
    },
    getToggleAction(state) {
      return state.toggleAction
    },
    getDateToday(state) {
      return state.dateToday
    },
    getShowUp(state) {
      return state.showUp
    }
  },
  mutations: {
    getTimestampToday(state) {
      const today = new Date()
      state.dateToday = today.toLocaleDateString()
    },

    setTaskList(state, payload) {
      state.listTask = []
      state.listTask = payload
    },

    setTitle(state, payload) {
      state.title = payload
    },

    setTypes(state, payload) {
      state.types = []
      state.types = payload
    },

    setShowUp(state) {
      state.showUp = false
      state.showUp = true
    },

  },
  actions: {    

    // Get tasks today
    async getTasksAction(context, payload) {

      if (payload === 'Today') {
        await onSnapshot(query(collection(db, "store"), where('deadline', '==', context.state.dateToday)),
          (snap) => {
            const docs = []
            snap.forEach((doc) => {
              docs.push(doc.data())
          })

          context.commit('setTaskList', [...docs])
        })

      }
       
      if (payload === 'Comming') {
        await onSnapshot(query(collection(db, "store"), where('deadline', '!=', context.state.dateToday)),
          (snap) => {
            const docs = []
            snap.forEach((doc) => {
              docs.push(doc.data())
          })
          context.commit('setTaskList', [...docs])
        })
      }
    },

    // Get type list
    async getCategoryAction(context) {

      await onSnapshot(query(collection(db, "category")),
        (snap) => {
          const docs = []
          snap.forEach((doc) => {
            docs.push(doc.data())
        })

        context.commit('setTypes', [...docs])
      })
    },

    // Get task by type
    async getTaskByTypesAction(context, payload) {

      await onSnapshot(query(collection(db, "store"), where('category', '==', payload)),
        (snap) => {
          const docs = []
          snap.forEach((doc) => {
            docs.push(doc.data())
        })

        context.commit('setTaskList', [...docs])
      })
    },

    // Add a new task action
    async addNewTaskAction(context, payload) {
      let deadline = payload.deadline
      const id = uuidv4()

      if (deadline === '') {
        deadline = context.state.dateToday
      }

      const dateFormat = new Date(deadline)

      await setDoc(doc(db, 'store', id), {
        id: id,
        taskName: payload.taskName,
        description: payload.description,
        priority: payload.priority,
        category: payload.category,
        deadline: dateFormat.toLocaleDateString(),
        dateCreate: context.state.dateToday
      })
    },

    // update task
    async updateTask(context, payload) {
      const dateFormat = new Date(payload.deadline)

      await updateDoc(doc(db, 'store', `${payload.id}`), {
        taskName: payload.taskName,
        description: payload.description,
        priority: payload.priority,
        category: payload.category,
        deadline: dateFormat.toLocaleDateString(),
      })
    },

    // delete task
    async deleteTask(context, payload) {
      await deleteDoc(doc(db, 'store', payload))
    },

    // Set title
    setTitle(context, payload) {
      context.commit('setTitle', payload)
    },

  },
  modules: {
  }
})
