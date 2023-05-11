import { defineStore } from 'pinia'

export const useAdminSelectionStore = defineStore('adminSelectionStore', {
    state: () => {
        return {
            condition: true,
            selection: 0,
            option: ''
        }
    },
    getters: {
        getSelection() {
            return localStorage.getItem('selection')
        },
        getVerified() {
            return this.condition
        },
        getSelected() {
            if(this.selection === 0) {
                return 'all'
            } else if(this.selection === 1) {
                return 'region'
            } else {
                return 'center'
            }
        },
        getOptionSelected() {
            return this.option
        }
    },
    actions: {
        setSelection(select, selectName) {
            localStorage.setItem('selection', JSON.stringify({selection: select, selectName: selectName}))
            this.selection = select
            this.option = selectName
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