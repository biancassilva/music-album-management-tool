import { AxiosError } from "axios"
import { errorHandler } from "../errorHandler"
import { request } from "../request"
import { TagOutput } from "../types/tag"

export class TagService {
	public async findAll(): Promise<TagOutput> {
		try {
			const { data } = await request.get("/tags")
			return data.topartists
		} catch (error) {
			throw new Error(errorHandler(error as AxiosError))
		}
	}
}
