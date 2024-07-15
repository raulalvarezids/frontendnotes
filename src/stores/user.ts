import { defineStore } from 'pinia'
import type { IUserStore } from '@/interfaces/IStoreUser'
import type { IUserLogin } from '@/interfaces/IUserLogin'
import type { IUserRegister } from '@/interfaces/IUserRegister'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () : IUserStore => {

    return {      
      token:null,
      error:null,
      username:null
    }    
  },
  actions :{
    async login (data : IUserLogin)  {
      const url = import.meta.env.VITE_HOST       
      
      await axios.post(url+'user/login/',data)
            .then(response => {
                this.error = null                
                this.token = response.data.token
                this.username = response.data.user.username                
            })
            .catch(error => {                                
                this.token=null
                this.error = error.response.data.detail                      
            })

            
    },
    async register (data : IUserRegister)  {
      
    },

    deleteData () {
      this.token=null
      this.error=null
      this.username=null
    }
  },
  persist:true

})
