<template>

    <header class="nav__container">
        <RouterLink to="/" class="tittle">Notes App</RouterLink>
                
        <div  v-if="store.token === null"  class="actions__container">
            <RouterLink   to="/login" class="login">Login</RouterLink>
            <RouterLink to="/register" class="register">Register</RouterLink>        
        </div> 

        <div  v-else  class="actions__container__lougout">           
            <button class="Logout" @click="handleLogOut">Log out</button>            
        </div> 
    </header>
         
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';


const store = useUserStore()
const router = useRouter()

const handleLogOut = () => {

    setTimeout(() => {
        store.deleteData()
        router.push('/login')    
    }, 800);
    
}


</script>

<style scoped>

    .nav__container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #111827;
        height: 80px;
        color: white;
        width: 100%;
    }

    .actions__container{        
        width: 45%;
        display: flex;
        gap: 10px
    }
    .actions__container__lougout{
        width: 40%;
        display: flex;
        justify-content: space-around;        
    }
    a{
        text-decoration: none;
        color: white;
        font-size: 12px;
        width: 60px;
        text-align: center;
        border-radius: 5px;
        padding:5px;
    }

    .tittle{        
        width: max-content;
        text-align: center;
        font-size: 18px;
        padding-left: 10px;
    }
    .login{
        background-color: #374151;
    }

    .register{
        background-color: #3B82F6;        
    }

    
    .Logout{
        text-decoration: none;
        color: white;
        font-size: 12px;
        width: 60px;
        text-align: center;
        border: none;
        border-radius: 5px;
        padding:5px;
        background-color: #374151;
        cursor: pointer;
    }
    

    @media(min-width:550px) {
        .actions__container{        
            width: 30%;
        }

        .actions__container__lougout{
            width: 30%;            
        }
    }

    @media(min-width:768px) {
        .actions__container{        
            width: 25%;           
        }

        a{       
            font-size: 15px;     
            width: 70px;   
        }        

        .tittle{            
            font-size: 25px;
            padding-left: 25px;
        }

        .actions__container__lougout{            
            width: 25%;            
        }


        .Logout{
            
            font-size: 15px;
            width: 70px;
            
        }
    


    }


    @media(min-width:1100px) {
        
        .actions__container{        
            width: 20%;     
                  
        }

        a{       
            font-size: 20px;     
            width: 90px;   
        }        

        .tittle{            
            font-size: 30px;            
        }


        .actions__container__lougout{
            
            width: 25%;            
        }


        .Logout{
            
            font-size: 17px;
            width: 80px;
            
        }
    


    }


</style>