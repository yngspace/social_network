import useAxios from './composables/useApi'

const axios = useAxios((config) => {
  if (!config) config = {}
  if (!config.headers) config.headers = {}
  if (localStorage.auth) config.headers.token = 'jwt ' + localStorage.auth

  return config
})

export default axios
