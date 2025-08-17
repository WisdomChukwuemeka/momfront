import axios from 'axios'

// const myBaseUrl = 'http://localhost:8000/api'
const isDevelopment = import.meta.env.MODE === 'development'
const myBaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY
const api = axios.create({
    baseURL: myBaseUrl,  
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location.reload()
        }
        return Promise.reject(error)
    }
)

export const AuthAPI = {
   register: (formData) => api.post('/register/', formData),
    login: (credentials) => api.post('/login/', credentials),
}

export const CourseAPI = {
    
}


export default api