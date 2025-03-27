import { defineStore } from 'pinia';

const API_BASE_URL = 'https://localhost:7109/api/Todos';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  actions: {
    add(todo) {
      if (Array.isArray(todo)) return this.todos.push(...todo);
      return this.todos.push(todo);
    },
    async fetchTodos() {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch todos');
        const data = await response.json();
        this.todos = data;
      } catch (err) {
        console.error('Error fetching todos:', err);
      }
    },
    async fetchTodo(todo) {
      try {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo),
        });
        if (!response.ok) throw new Error('Failed to add todo');
        const data = await response.json();
        this.todos.push(data);
      } catch (err) {
        console.error('Error adding todo:', err);
      }
    },
    async deleteTodoFetch(id) {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.status);
        if (response.status === 204) {
          console.log('Todo deletado');
          this.todos = this.todos.filter((todo) => todo.id !== id);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async toggledFetch(todo) {
      const data = {
        title: todo.title,
        completed: !todo.completed,
      };
      try {
        const response = await fetch(
          `${API_BASE_URL}/${todo.id}`, // Corrigido para https
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          console.error(`Failed to update todo. Status: ${response.status}`);
          return;
        }
        const dataJson = await response.json();
        console.log('Todo updated:', dataJson);
        const index = this.todos.findIndex((value) => value.id === todo.id);
        console.log(index);
        if (index !== -1) {
          this.todos[index] = {
            ...this.todos[index],
            completed: dataJson.completed,
          };
        }
      } catch (error) {
        console.error('Error during toggledFetch:', error);
      }
    },
    async editFetch(todo) {
      const data = {
        title: todo.title,
        completed: todo.completed,
      };
      try {
        const request = await fetch(`${API_BASE_URL}/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!request.ok) {
          return;
        }
        const dataJson = await request.json();
        console.log('Todo updated:', dataJson);
        this.todos = this.todos.map((item) => {
          if (item.id === todo.id) {
            return { ...item, title: dataJson.title };
          }
          return item; // retornando o valor original se não for o item com o id correspondente
        });
      } catch (error) {
        console.error('Error during editFetch:', error);
      }
    },
  },
});
