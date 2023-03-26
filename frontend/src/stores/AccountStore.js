
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('accountStore', {
  state: () => {
    return {
      email: '',

    }
  },
  getters: {

  },
  actions: {
    authenticate(data) {
      if(data !== undefined) {
        this.email = data.email
      }
      console.log(`accountStore email: ${this.email}`);
    }

  }
})
