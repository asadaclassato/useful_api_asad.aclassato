<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useToast } from "vue-toastification";

/* document.getElementById('check').addEventListener('click', ) */


const toast = useToast();
/* const change = ref(false); */
const authstore = useAuthStore();
function login() {
    if (authstore.email.trim().length > 0 && authstore.password.trim().length > 0) {
        authstore.login()
    } else {
        toast.error("Veuillez remplir tous les champs", { timeout: 2000 });
    }
}
/* fonction pour l'inscription */
function register() {
    
        authstore.register()
   
}

</script>
<template>
    <div id="container" class="flex bg-gray-800 text-center">
        <div id="form_conn" class=" bg-gray-200 rounded-md h-screen flex w-auto">
            <div class="pl-10 pr-10 pt-20 ">
                <form action="" class="my-17">
                    <label for="" class="mt-2" >Nom</label>
                    <input type="text" name="name" id="" class="ml-3 pl-2 mt-4"><br>

                    <label for="" class="mt-2">Email</label>
                    <input type="email" name="email" id="" class="ml-3 pl-2 mt-4"><br>

                    <label for="" class="mt-2">Mot de passe</label>
                    <input type="password" name="password" id="" class="ml-3 pl-2 mt-4"><br>
                    <!-- <button type="submit" class="bg-gray-800 text-white rounded-md lg:w-200" @click.prevent="register()" >S'inscrire</button>
 -->
                     <button type="submit" @click.prevent="register()"
                        class="bg-blue-900 rounded-sm h-7 disabled:bg-gray-400 text-white mt-4 w-30"
                       >
                        <div v-if="authstore.isRegisterIn" class="flex items-center gap-3 ">
                            <div class="rounded-full w-5 h-5 border-3 border-t-transparent animate-spin">
                            </div>
                            Inscription...
                        </div>
                        <p v-else>S'inscrire</p>
                    </button> 

                </form>
            </div>
        </div>

    </div>
</template>

<style scoped></style>