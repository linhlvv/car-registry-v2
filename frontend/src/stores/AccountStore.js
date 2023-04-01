import { defineStore } from 'pinia'

export const useAccountStore = defineStore('accountStore', {
  state: () => {
    return {
      email: '',
    }
  },
  getters: {
    getToken() {
      return localStorage.getItem('token')
    }
  },
  actions: {
    authenticate(token, email) {
      if(token !== undefined) {
        this.email = email
      }
      console.log(`accountStore email: ${email}`);
      localStorage.setItem("token", token)
    }

  }
})
