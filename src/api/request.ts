import axios from "axios"

export const request = axios.create({})

request.defaults.headers.common["Content-Type"] = "application/json"
