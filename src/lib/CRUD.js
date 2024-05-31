import axios from 'axios'

// Axios istemcisini oluşturur ve yapılandırır
const createNetworkClient = () => {
  const network = axios.create({
    baseURL: 'https://fakestoreapi.com/'
  })

  // İstekleri yakalama ve token ekler
  network.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('loggedIn')
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  })

  // Yanıtları yakalama ve 401 durumunda yönlendirir
  network.interceptors.response.use(null, (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('loggedIn')
      location.href = '/auth/login'
    }
    return Promise.reject(error)
  })

  return network
}

// HTTP isteklerini yapan fonksiyonlar
const network = createNetworkClient()

const getData = async (path) => {
  return await network.get(path).then((r) => r.data)
}

const postData = async (path, body) => {
  return await network.post(path, body).then((r) => r.data)
}

const putData = async (path, body) => {
  return await network.put(path, body).then((r) => r.data)
}

const patchData = async (path, body) => {
  return await network.patch(path, body).then((r) => r.data)
}

const deleteData = async (path, body) => {
  return await network({
    method: 'DELETE',
    data: body,
    url: path
  }).then((r) => r.data)
}

// Fonksiyonları dışa aktarır
export { getData, postData, putData, patchData, deleteData }
