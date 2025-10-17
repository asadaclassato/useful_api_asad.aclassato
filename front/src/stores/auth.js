import { apiClient } from "@/services/api";
import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";
import router from "@/router";
import { useToast } from "vue-toastification";

const toast = useToast();




export const useAuthStore = defineStore('auth', {
    state: () => ({
        name: '',
        password: '',
        email: '',
        isLoggingIn: false,
        isRegisterIn: false,
        errors: {
            email: [],
            password: [],
            name: []
        },
        token: ''
    }),
    actions: {
         /* async login() {
            await axios.post(`http://localhost:8000/api/users/login`)
        }, */
        async login() {
            this.isLoggingIn = true
            const data = {
                email: this.email,
                password: this.password,
            }
            const url = import.meta.env.VITE_API_BASE_URL
            const newUrl = url.slice(0, -4)
            try {
                await axios.get(newUrl + '/sanctum/csrf-cookie', { withCredentials: true }).then(async (response) => {
                    try {
                        let response = await apiClient.post("/login", data);
                        console.log(response.data)
                        sessionStorage.setItem('id', response.data.user.id);

                        this.errors = {
                            email: [],
                            password: [],
                            name: []
                            
                        }
                        router.push("/")
                        toast.success("Connexion reussie")
                    } catch (error) {
                        if (error instanceof AxiosError && error.response?.status === 422) {
                            this.errors = error.response.data.errors;
                            this.errors.email = error.response.data.errors.email;
                            this.errors.password = error.response.data.errors.password;
                        } else {
                            console.error('API Error:', error);
                        }
                    }
                })
            } catch (error) {
                console.log(error)
                toast.error("Une erreur est survenue")
            } finally {
                this.isLoggingIn = false
            }

        },

        async register() {
            this.isRegisterIn = true
            const data = {
                username: this.username,
                email: this.email,
                password: this.password,
            }
            const url = import.meta.env.VITE_API_BASE_URL
            try {
                await axios.get(url + '/sanctum/csrf-cookie', { withCredentials: true }).then(async (response) => {
                    try {
                        let response = await apiClient.post("/register", data);
//                         console.log(response);
//                          console.log(response.data)
                        sessionStorage.setItem('id', response.data.user.id);
                        router.push('/');
                        toast.success("Bienvenue !")
                        
                        this.errors = {
                            email: [],
                            password: [],
                            name: []
                        }
                    } catch (error) {
                        if (error instanceof AxiosError && error.response?.status === 422) {
                            this.errors = error.response.data.errors;
                            this.errors.email = error.response.data.errors.email;
                            this.errors.password = error.response.data.errors.password;
                            this.errors.name = error.response.data.errors.name;
                        } else {
                            console.error('API Error:', error);
                        }
                    }
                })
            } catch (error) {
                toast.error("Une erreur est survenue")
                console.log(error)
            } finally {
                this.isRegisterIn = false
            }
        },
    }

}
)
