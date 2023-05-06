import { defineStore } from 'pinia'

export const useAdminSelectionStore = defineStore('adminSelectionStore', {
    state: () => {
        return {
            selection: null,
            specific: null,
        }
    },
    getters: {
        selection() {
            return localStorage.getItem('selection')
        }
    },
    actions: {
        setSelection(select, selectName) {
            localStorage.setItem('selection', JSON.stringify({selection: select, selectName: selectName}))
        }
    }
})