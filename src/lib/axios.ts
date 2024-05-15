import _axios from "axios";

const axios = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // baseURL: 'http://127.0.0.1:8000',
    withCredentials: false

})

axios.interceptors.request.use(async (config) => {
    config.headers["Authorization"] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTU2MjIwNTUsImV4cCI6MTcxNTYyNTY1NSwibmJmIjoxNzE1NjIyMDU1LCJqdGkiOiJlb01WSjZuZFBkb3ludkNiIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.JErsP2AEuS_hWU0s1t8sK4CS2v0HsOCb03rqumxpxxQ`
    // config.headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    config.headers["ngrok-skip-browser-warning"] = "true"

    return config
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use((response) => {
    return response
}, async err => {
    if (err.response?.status == 401) {
        // const response = await getRefreshToken(user?.access_token) as any
        // console.log("Update TOKEN", response?.access_token);
        // const { update } = useSession()


        // update({ access_token: response?.access_token })
        // return axios(err.config)
    }
    return Promise.reject(err);
})

export default axios