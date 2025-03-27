<script>
import { mapState } from 'pinia';
import TodoEmpty from './components/TodoEmpty.vue';
import TodoForm from './components/TodoForm.vue';
import TodoItems from './components/TodoItems.vue';
import { useTodoStore } from './store/store';

export default {
  name: 'App',
  computed: {
    ...mapState(useTodoStore, ['todos']),
    todoStore() {
      return useTodoStore();
    },
  },
  created() {
    this.todoStore.fetchTodos();
  },
  components: {
    TodoForm,
    TodoItems,
    TodoEmpty
  }
}
</script>

<template>
  <div class="bg-gray-800 h-screen">
    <div class="px-3 py-10 md:px-10">
      <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
        <TodoForm />
        <TodoItems />
        <TodoEmpty v-if="todos.length === 0" />
      </div>
    </div>
  </div>
</template>