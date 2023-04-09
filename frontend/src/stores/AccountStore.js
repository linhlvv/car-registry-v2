import { defineStore } from 'pinia'

export const useAccountStore = defineStore('accountStore', {
  state: () => {
    return {
      email: '',
      id: '',
    }
  },
  getters: {
    getToken() {
      return localStorage.getItem('token')
    },
    isAdmin() {
      const type = localStorage.getItem('userType')
      return (type === 1 ? true : false)
    },
    ID() {
      return localStorage.getItem('id')
    }
  },
  actions: {
    authenticate(token, email, id, userType) {
      if(token !== undefined) {
        this.email = email
      }
      console.log(`accountStore email: ${email}`);
      localStorage.setItem("token", token)
      this.id = id
      localStorage.setItem("id", id)
      localStorage.setItem("userType", userType)
    }

  }
})
