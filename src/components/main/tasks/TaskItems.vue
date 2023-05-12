<template>
	<div
		@click="showUpToggle =! showUpToggle"
		class="item_container-content"
	>
		<h4 class="item_container-title"> 
			{{props.item.taskName}}
		</h4>
	</div>

	<div class="edit_form" v-if="showUpToggle">
		<div class="edit_form-input">
			<!-- task name form -->
			<div class="edit_form-taskname">
				<input id="tn" type="text" v-model="newTaskInfor.taskName" :placeholder="props.item.taskName" required/>
			</div>

			<!-- description form -->
			<div>
				<textarea class="edit_form-des" id="des" type="text" v-model="newTaskInfor.description" :placeholder="props.item.description"></textarea>
			</div>
		</div>
		
		<div class="edit_form-options">
			<!-- select priority from -->
			<div class="edit_priority">
				<p class="option_box-title">
					priority:
				</p>
				<select class="edit_priority-option" id="priority" v-model="newTaskInfor.priority">
					<option class="option_box-title" disabled selected value="">{{props.item.priority}}</option>
					<option class="option_box-title" value="low">Low</option>
					<option class="option_box-title" value="normal">Normal</option>
					<option class="option_box-title" value="high">High</option>
				</select>
			</div>

			<!-- category -->
			<div class="edit_category">
				<p class="option_box-title"> 
					list:	
				</p>
				<select class="edit_category-options" v-model="newTaskInfor.category">
					<option class="option_box-title"  disabled selected value="">{{props.item.category}}</option>
					<option class="option_box-title" v-for="option in getTypes" :key="option" :value="option.name">
						{{ option.name }}
					</option>
				</select>
			</div>

			<!-- date -->
			<div class="edit_date">
				<p class="option_box-title">dealine: {{props.item.deadline}}</p>
				<input class="option_box-date" type="date" v-model='newTaskInfor.deadline'/>
			</div>

			<!-- action -->
			<div class="action_edit">
				<button class="action_edit-done" @click="updateHandle()">Add task</button>
				<button class="action_edit-del" @click="deleteHandle(props.item.id)">Delete</button>
			</div>
		</div>
	</div>

</template>

<script>
	import { useStore } from 'vuex'
	import { computed, ref, reactive } from 'vue'

	export default {
		props: ['item'],
		setup(props) {
			const store = useStore()
			const showUpToggle = ref(false)
			const newTaskInfor = reactive({
				id: props.item.id,
				taskName: props.item.taskName,
				description: props.item.description,
				priority: props.item.priority,
				category: props.item.category,
				deadline: props.item.deadline,
			})

			// get types
			const getTypes = computed(() => {
				return store.getters.getTypes
			})

			const infoTask = computed(() => {
				return store.getters.getInfoTask
			})

			const updateHandle = () => {
				for (let i in newTaskInfor) {
					if (newTaskInfor[i] === '') {
						newTaskInfor[i] = props.item[i]
					}
				}
				store.dispatch('updateTask', newTaskInfor)
			}

			const deleteHandle = (id) => {
				store.dispatch('deleteTask', id)
			}

			return {
				props,
				showUpToggle,
				infoTask,
				newTaskInfor,
				updateHandle,
				deleteHandle,
				getTypes
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './taskItems.scss';
</style>