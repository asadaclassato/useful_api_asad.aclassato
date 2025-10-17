import Connexion from '@/views/Connexion.vue';
import axios from 'axios';
import router from '@/router';
import { useToast } from "vue-toastification";

const toast = useToast();

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL+ "/api",
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

    },
})

apiClient.interceptors.response.use((response)=>{
  return response;
}, error => {
  if(error.response && error.response.status === 401){
    toast.error("Vous n'etes pas connecté!")
    router.push('/connexion')
  }else if(error.response && error.response.status === 403){
    toast.error(error.response.data.message)
  } else {
    return Promise.reject(error);
  }
})

async function apiRequest(method, element,
    { data = {}, id = null, params = {} } = {}
) {
    try {
        let link = '/' + element + '/'
      if (id) link += '/' + id
    //   if (method.toLowerCase() === 'get') {
    //     params = { per_page: 100, ...params }
    //   }
      const config = { params }

      let response
      switch (method.toLowerCase()) {
        case 'get':
          response = await apiClient.get(link, config)
          break
        case 'post':
          response = await apiClient.post(link, data, config)
          break
        case 'put':
          response = await apiClient.put(link, data, config)
          break
        case 'patch':
          response = await apiClient.patch(link, data, config)
          break
        case 'delete':
          response = await apiClient.delete(link, { data, ...config })
          break
        default:
          throw new Error('Méthode HTTP non supportée')
      }
  
      return response
    } catch (error) {
      if (error.response?.status === 403) {
        return {
          error: true,
          status: 403,
          message: "Accès refusé : vous n'avez pas les permissions nécessaires",
        }
      }
  
      return {
        error: true,
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message || 'Erreur inconnue',
      }
    }
  }
  
  export { apiRequest, apiClient }