import { defineStore } from 'pinia'

export const useRegistrationCertStore = defineStore('registrationCertStore', {
    state: () => {
        return {
            id: '',
            regDate: '',
            expiredDate: '',
            center: '',
        }
    },
    getters: {
        registrationCert() {
            return JSON.parse(localStorage.getItem("cert"))
        }
    },
    actions: {
        setRegistrationCertInfo(info) {
            if(info !== null) {
                localStorage.setItem("cert", info)
            }
        },
        removeCert() {
            localStorage.removeItem("cert")
        }
    }
})