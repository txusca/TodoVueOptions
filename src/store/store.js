import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  actions: {
    add(todo) {
      if (Array.isArray(todo)) return this.todos.push(...todo);
      return this.todos.push(todo);
    },
    async addTodosFetch() {
      try {
        const response = await fetch('https://localhost:7109/api/Todos');
        const data = await response.json();
        this.add(data);
      } catch (err) {
        console.log(err);
      }
    },
    async addTodoFetch(data) {
      try {
        const response = await fetch('https://localhost:7109/api/Todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const dataJson = await response.json();
        this.add(dataJson);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async deleteTodoFetch(id) {
      try {
        const response = await fetch(`https://localhost:7109/api/Todos/${id}`, {
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
          `https://localhost:7109/api/Todos/${todo.id}`, // Corrigido para https
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
        const request = await fetch(
          `https://localhost:7109/api/Todos/${todo.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );
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
