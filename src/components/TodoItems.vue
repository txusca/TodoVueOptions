<script>
import { useTodoStore } from '@/store/store';
import { mapState } from 'pinia';
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoItems',
  data() {
    return {
      todoStore: useTodoStore()
    }
  },
  components: {
    TodoItem
  },
  computed: {
    ...mapState(useTodoStore, ['todos'])
  },
}
</script>

<template>
  <div class="space-y-2">
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>