import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
const myBaseUrl = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY

const api = axios.create({
  baseURL: myBaseUrl,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.config.method !== 'get') {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

/* ====== NEW DJANGO ENDPOINTS ====== */
export const EventAPI = {
  create: (formData) => api.post('/events/', formData),
  list: () => api.get('/events/'),
  listing: () => api.get('/event_list/'),
  delete: (id) => api.delete(`/delete_event/${id}/`),
}

export const VideoAPI = {
  create: (formData) => api.post('/videos/', formData),
  list: () => api.get('/videos/'),
  delete: (id) => api.delete(`/delete_video/${id}/`),

}

export const MusicAPI = {
  create: (formData) => api.post('/music/', formData),
  list: () => api.get('/music/'),
}

export const BookAPI = {
  create: (formData) => api.post('/books/', formData),
  list: () => api.get('/books/'),
}

export const AboutAPI = {
  create: (data) => api.post('/about/', data),
  get: () => api.get('/about/'),
}

export const ContactAPI = {
  send: (data) => api.post('/contact/', data),
}

export const TestimonialAPI = {
  create: (formData) => api.post('/testimonials/', formData),
  list: () => api.get('/testimonials/'),
  delete: (id) => api.delete(`/delete_testimony/${id}/`),
}

export const ContentAPI = {
  list: () => api.get('/all_content/'),
}

export default api
