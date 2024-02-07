export interface Artist {
	id: string
	ytUrl: string
	rank: number
	name: string
	description?: string
	tags?: string[]
}

export interface ArtistOutput {
	artists: Artist[]
}

export interface ArtistPayload {
	id?: string
	name: string
	rank?: number
	ytUrl: string
	description?: string
	tags?: string[]
}
