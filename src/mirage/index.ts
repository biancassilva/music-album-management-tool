import { createServer, Model, Factory } from "miragejs"
import { UserOutput } from "../api/types/user"
import { Artist } from "../api/types/artist"

export function makeServer() {
	createServer({
		models: {
			user: Model.extend<Partial<UserOutput>>({}),
			artist: Model.extend<Partial<Artist>>({}),
			tag: Model.extend<Partial<Artist>>({})
		},

		factories: {
			user: Factory.extend<Partial<UserOutput>>({
				// default values for user
			}),
			artist: Factory.extend<Partial<Artist>>({
				// default values for artist
			})
		},
		seeds(server) {
			server.create("user", {
				id: "1",
				name: "John Doe",
				age: "30",
				subscriber: "1",
				realname: "John Doe",
				bootstrap: "0",
				playcount: "100",
				artist_count: "50",
				playlists: "5",
				track_count: "300",
				album_count: "20",
				image: [],
				registered: { unixtime: "1707242696", "#text": 1707242696 },
				country: "USA",
				gender: "m",
				url: "https://www.last.fm/user/johndoe",
				type: "user"
			})
			server.create("artist", {
				id: "1",
				ytUrl: "https://www.youtube.com/watch?v=vnhKaCjCIqM",
				rank: 1,
				name: "Radiohead"
			})
			server.create("artist", {
				id: "2",
				ytUrl: "https://www.youtube.com/watch?v=1G4isv_Fylg",
				rank: 2,
				name: "Coldplay"
			})
			server.create("artist", {
				id: "3",
				ytUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
				rank: 3,
				name: "Queen"
			})
			server.create("artist", {
				id: "4",
				ytUrl: "https://www.youtube.com/watch?v=NCtzkaL2t_Y",
				rank: 4,
				name: "The Beatles"
			})
			server.create("artist", {
				id: "5",
				ytUrl: "https://www.youtube.com/watch?v=bpOSxM0rNPM",
				rank: 5,
				name: "Arctic Monkeys"
			})
			server.create("artist", {
				id: "6",
				ytUrl: "https://www.youtube.com/watch?v=Y5fBdpreJiU",
				rank: 6,
				name: "The Killers"
			})
		},

		routes() {
			this.namespace = "api"

			this.get("/users", (schema) => {
				return schema.all("user")
			})

			this.get("/users/:id", (schema, request) => {
				const id = request.params.id
				return schema.find("user", id)
			})

			this.get("/artists", (schema, request) => {
				if (request.queryParams.search) {
					const searchTerm = request.queryParams.search[0].toLowerCase()
					return schema
						.all("artist")
						.filter((artist) => artist?.name?.toLowerCase().includes(searchTerm))
				} else {
					return schema.all("artist")
				}
			})

			this.get("/artists/:id", (schema, request) => {
				const id = request.params.id
				return schema.find("artist", id)
			})

			this.put("/artists/:id", (schema, request) => {
				console.log("PUT")
				const newAttrs = JSON.parse(request.requestBody)
				const id = request.params.id
				const artist = schema.find("artist", id)
				artist?.update(newAttrs)
				return new Response(null, { status: 204 }) // Return a valid response
			})

			this.post("/artists", (schema, request) => {
				console.log("POST")
				const newArtist = JSON.parse(request.requestBody)
				return schema.create("artist", newArtist)
			})

			this.delete("/artists/:id", (schema, request) => {
				const id = request.params.id
				const artist = schema.find("artist", id)
				artist?.destroy()
				return new Response(null, { status: 200 }) // Return a valid response
			})
		}
	})
}
