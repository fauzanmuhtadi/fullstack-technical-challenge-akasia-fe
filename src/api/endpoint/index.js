const BASE_URL = process.env.VUE_APP_BASE_URL_V1_API
const endpoint = {
  user: `${BASE_URL}/user`,
  avatar: `${BASE_URL}/user/avatar`
}

export default endpoint
