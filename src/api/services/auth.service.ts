import { AxiosError } from "axios"
import { errorHandler } from "../errorHandler"
import { request } from "../request"
import { UserOutput } from "../types/user"

const API_ROUTE = "/api/users"

export class AuthService {
	public async userInfo(id: string): Promise<UserOutput> {
		try {
			const { data } = await request.get(`${API_ROUTE}/${id}`)
			return data.user
		} catch (error) {
			throw new Error(errorHandler(error as AxiosError))
		}
	}
}
