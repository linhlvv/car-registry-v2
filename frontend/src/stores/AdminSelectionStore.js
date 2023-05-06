import { defineStore } from 'pinia'

export const useAdminSelectionStore = defineStore('adminSelectionStore', {
    state: () => {
        return {
            condition: true
        }
    },
    getters: {
        getSelection() {
            return localStorage.getItem('selection')
        },
        getVerified() {
            return this.condition
        }
    },
    actions: {
        setSelection(select, selectName) {
            localStorage.setItem('selection', JSON.stringify({selection: select, selectName: selectName}))
            const localStoreSelect = JSON.parse(localStorage.getItem('selection'))
            if((localStoreSelect.selection === 1 || localStoreSelect.selection === 2) && localStoreSelect.selectName === "") {
                console.log('set false');
                this.condition = false
                localStorage.setItem('adminSelectionVerified', false)
            } else {
                console.log('set true');
                this.condition = true
                localStorage.setItem('adminSelectionVerified', true)
            }
        }
    }
})