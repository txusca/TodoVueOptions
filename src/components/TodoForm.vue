<script>
import { useTodoStore } from '@/store/store';

export default {
  name: 'TodoForm',
  computed: {
    todosStore() {
      return useTodoStore();
    },
  },
  data() {
    return {
      todo: '',
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.todo) return;
      try {
        await this.todosStore.fetchTodo({
          title: this.todo.trim(),
          completed: false,
        });
        this.todo = '';
      } catch (error) {
        console.error('Erro ao adicionar o todo:', error);
      }
    },
  },
}
</script>

<template>
  <form @submit.stop.prevent="handleSubmit"
    class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3">
    <input v-model.trim="todo" placeholder="Adicione um novo item ..." type="text"
      class="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3" />

    <button class="text-green-400 text-xs font-semibold focus:outline-none cursor-pointer" type="submit">
      ADICIONAR
    </button>
  </form>
</template>