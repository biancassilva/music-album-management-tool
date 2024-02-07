import { AuthService } from "./auth.service"
import { ArtistService } from "./artist.service"
import { TagService } from "./tag.service"

export const authService = new AuthService()
export const artistService = new ArtistService()
export const tagService = new TagService()
