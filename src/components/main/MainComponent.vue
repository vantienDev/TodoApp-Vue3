<template>
	<div class="main col-9 col-s-9 col">
		<div class="main_title">
			<h1>{{title}}</h1>	
		</div>
		<div class="addTaskBox">
			<button class="addTaskBox-toggle" :class="{ mb: showUpToggle }" @click="showUpToggle =! showUpToggle">Add New Task</button>
			<div class="form" v-show="showUpToggle">
				<!-- task name form -->
				<div class="container_field">
					<div class="container_field-label">
						<label for="tn">Task name:</label>
					</div>
					<div class="container_field-input">
						<input id="tn" v-model="newTaskInfor.taskName" type="text" placeholder="Task Name..." required/>
					</div>
				</div>

				<!-- description form -->
				<div class="container_field">
					<div class="container_field-label">
						<label for="des">Description:</label>
					</div>
					<div>
						<textarea class="textarea_style" id="des" v-model="newTaskInfor.description" type="text" placeholder="Description..."></textarea>
					</div>
				</div>

				<!-- select priority from -->
				<div class="option_box">
					<p class="option_box-title">
						priority:
					</p>
					<select class="option_box-select" id="priority" v-model="newTaskInfor.priority" >
						<option class="option_box-title" disabled value="">priority</option>
						<option class="option_box-title" value="low">Low</option>
						<option class="option_box-title" value="normal">Normal</option>
						<option class="option_box-title" value="high">High</option>
					</select>
				</div>

				<!-- category -->
				<div class="option_box">
					<p class="option_box-title"> 
						list:	
					</p>
					<select class="option_box-select" v-model="newTaskInfor.category" >
						<option class="option_box-title" disabled value="">list</option>
						<option class="option_box-title" v-for="option in getTypes" :key="option" :value="option.name">
							{{ option.name }}
						</option>
					</select>
				</div>

				<!-- date -->
				<div  class="option_box">
					<p class="option_box-title">
						deadline:
					</p>
					<input class="option_box-date" type="date" v-model='newTaskInfor.deadline' />
				</div>

				<div class="action_form">
					<button class="action_edit-done" @click="addTaskHandle(newTaskInfor)">Add task</button>
					<button class="action_edit-del" @click="showUpToggle =! showUpToggle">Cancel</button>
				</div>
			</div>
		</div>

		<div class="list_container"> 
			<div class="item_container" v-show="showUpToggle == false" v-for="item in taskList" :key="item"> 
				<TaskItems :item="item"/>
			</div>
		</div>
		
	</div>
</template>

<script>

	import TaskItems from './tasks/TaskItems.vue'

	import { useStore } from 'vuex'
	import { computed, ref, reactive } from 'vue'

	export default {
		
		components: {
			TaskItems,
		},

		setup() {
			const store = useStore()
			const showUpToggle = ref(false)
			const newTaskInfor = reactive({
				taskName: '',
				description: '',
				priority: 'normal',
				category: 'tasks',
				deadline: ''
			})

			// get title
			const title = computed(() => {
				return store.getters.getTitle
			})

			// get tasks
			const taskList = computed(() => {
				return store.getters.getTasks
			})

			// get types
			const getTypes = computed(() => {
				return store.getters.getTypes
			})

			const addTaskHandle = (payload) => {
				store.dispatch('addNewTaskAction', payload)
			}

			return {
				title,
				taskList,
				showUpToggle,
				newTaskInfor,
				getTypes,
				addTaskHandle,
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './main.scss';
</style>