import { defineStore } from 'pinia'
import type { IUserStore } from '@/interfaces/IStoreUser'
import type { IUserLogin } from '@/interfaces/IUserLogin'
import type { IUserRegister } from '@/interfaces/IUserRegister'
import axios from 'axios'
import { CoColumns } from 'oh-vue-icons/icons'

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
      
      await axios.post(url+'/user/login/',data)
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

      const url = import.meta.env.VITE_HOST       
      
      await axios.post(url+'/user/register/',data)
            .then(response => {
                this.error = null                
                this.token = response.data.token
                this.username = response.data.user.username                
            })
            .catch(error => {                                
                this.token=null
                this.error = error.response.data.detail                                          

                if(error.response.data.error.non_field_errors){
                  this.error = 'Email alredy exist'
                  return
                }


                if(error.response.data.error){
                  this.error = error.response.data.error.username[0]
                }

                                                  
            })
      
    },

    deleteData () {
      this.token=null
      this.error=null
      this.username=null
    }
  },
  persist:true

})
