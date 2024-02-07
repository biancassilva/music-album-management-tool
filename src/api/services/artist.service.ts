import { AxiosError } from "axios"
import { errorHandler } from "../errorHandler"
import { request } from "../request"
import { Artist, ArtistOutput, ArtistPayload } from "../types/artist"
import { GenericObject } from "../types/common"

const API_ROUTE = "/api/artists"

export class ArtistService {
	public async findAll(search: string): Promise<ArtistOutput> {
		try {
			const { data } = await request.get(API_ROUTE, {
				params: {
					search
				}
			})
			return data
		} catch (error) {
			throw new Error(errorHandler(error as AxiosError))
		}
	}

	public async findById(id: string): Promise<Artist> {
		try {
			const { data } = await request.get(`${API_ROUTE}/${id}`)
			return data.artist
		} catch (error) {
			throw new Error(errorHandler(error as AxiosError))
		}
	}

	public async create(data: ArtistPayload): Promise<ArtistOutput> {
		console.log("chamou o create")
		try {
			const response = await request.post(API_ROUTE, data)
			return response.data
		} catch (error) {
			throw new Error(errorHandler(error as AxiosError))
		}
	}

	public async update(data: ArtistPayload): Promise<ArtistOutput> {
		console.log("enter here")
		try {
			const response = await request.put(`${API_ROUTE}/${data.id}`, data)
			return response.data
		} catch (error) {
			throw new Error(errorHandler(error as AxiosError))
		}
	}

	public async delete(id: string): Promise<GenericObject> {
		try {
			const { data } = await request.delete(`${API_ROUTE}/${id}`)
			return data
		} catch (error) {
			throw new Error(errorHandler(error as AxiosError))
		}
	}
}
