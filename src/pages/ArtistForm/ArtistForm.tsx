import Card from "../../components/Card/Card"
import Input from "../../components/Input/Input"
import { useNavigate, useSearchParams } from "react-router-dom"
import RadioGroup from "../../components/RadioGroup/RadioGroup"
import { useEffect, useMemo, useReducer, useState } from "react"
import TextArea from "../../components/TextArea/TextArea"
import Button from "../../components/Button/Button"
import { ArtistPayload } from "../../api/types/artist"
import { useMutation, useQuery } from "@tanstack/react-query"
import { artistService } from "../../api/services"

type State = {
	artistNameError: string | null
	musicVideoError: string | null
	ratingError: string | null
}

type Action =
	| { type: "SET_ARTIST_NAME_ERROR"; payload: string | null }
	| { type: "SET_MUSIC_VIDEO_ERROR"; payload: string | null }
	| { type: "SET_RATING_ERROR"; payload: string | null }

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_ARTIST_NAME_ERROR":
			return { ...state, artistNameError: action.payload }
		case "SET_MUSIC_VIDEO_ERROR":
			return { ...state, musicVideoError: action.payload }
		case "SET_RATING_ERROR":
			return { ...state, ratingError: action.payload }
		default:
			return state
	}
}

const initialState: State = {
	artistNameError: null,
	musicVideoError: null,
	ratingError: null
}

const ArtistForm = () => {
	const [searchParams] = useSearchParams()
	const artistId = searchParams.get("id")

	const navigate = useNavigate()

	const { isLoading, data: artistData } = useQuery({
		queryKey: ["artistsData"],
		queryFn: () => artistService.findById(artistId || ""),
		enabled: !!artistId
	})

	const [state, dispatch] = useReducer(reducer, initialState)
	const [formFields, setFormFields] = useState<ArtistPayload>({
		name: "",
		ytUrl: "",
		rank: undefined,
		tags: [],
		description: ""
	})

	const { artistNameError, musicVideoError, ratingError } = state

	const radioOptions = useMemo(
		() =>
			[...Array(10).keys()].map((index) => ({
				value: `${index + 1}`,
				label: `${index + 1}`,
				id: `option-${index + 1}`
			})),
		[]
	)

	const createArtist = useMutation({
		mutationFn: (artist: ArtistPayload) => {
			return artistService.create(artist).then(() => navigate("/"))
		}
	})

	const updateArtist = useMutation({
		mutationFn: (artist: ArtistPayload) => {
			return artistService.update(artist).then(() => navigate("/"))
		}
	})

	useEffect(() => {
		if (artistData) {
			setFormFields({
				...artistData
			})
		}
	}, [artistData])

	const handleAdd = () => {
		// Validate form fields
		if (!formFields.name) {
			dispatch({
				type: "SET_ARTIST_NAME_ERROR",
				payload: "Artist name is required"
			})
		} else {
			dispatch({ type: "SET_ARTIST_NAME_ERROR", payload: null })
		}

		if (!formFields.ytUrl) {
			dispatch({
				type: "SET_MUSIC_VIDEO_ERROR",
				payload: "Music video is required"
			})
		} else {
			dispatch({ type: "SET_MUSIC_VIDEO_ERROR", payload: null })
		}

		if (!formFields.rank) {
			dispatch({ type: "SET_RATING_ERROR", payload: "Rating is required" })
		} else {
			dispatch({ type: "SET_RATING_ERROR", payload: null })
		}

		if (
			!/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]{11}$/i.test(
				formFields.ytUrl
			)
		) {
			dispatch({
				type: "SET_MUSIC_VIDEO_ERROR",
				payload: "Please enter a valid youtube url"
			})
			return
		}

		// If all fields are valid, create the artist
		if (formFields.name && formFields.ytUrl && formFields.rank) {
			const artist: ArtistPayload = {
				...formFields
			}
			artistId ? updateArtist.mutate(artist) : createArtist.mutate(artist)
		}
	}

	if (isLoading)
		return <div className='mt-5 text-lg'>Loading artist data...</div>

	return (
		<Card title={artistId ? "Edit artist" : "New artist"}>
			<div className='text-gray-500 text-sm mb-4 text-center uppercase mt-4 font-bold'>
				Artist Information
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='flex flex-col gap-4'>
					<Input
						type='text'
						label='Artist Name'
						error={artistNameError || ""}
						value={formFields.name}
						onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
					/>
					<TextArea
						label='Description'
						value={formFields.ytUrl}
						onChange={(e) =>
							setFormFields({ ...formFields, description: e.target.value })
						}
					/>
				</div>
				<div className='flex flex-col gap-4'>
					<Input
						type='text'
						label='Favorite Music Video (Youtube)'
						error={musicVideoError || ""}
						value={formFields.ytUrl}
						onChange={(e) => setFormFields({ ...formFields, ytUrl: e.target.value })}
					/>
					<RadioGroup
						title='Rating'
						{...{ radioOptions }}
						error={ratingError || ""}
						defaultSelected={`${formFields.rank}`}
						handleSelected={(value) =>
							setFormFields({ ...formFields, rank: parseInt(value) })
						}
					/>
				</div>
			</div>
			<div className='flex justify-end my-4 gap-2'>
				<Button type='cancel' onClick={() => navigate("/")} label='Cancel' />
				<Button onClick={handleAdd} label={artistId ? "Save" : "Create"} />
			</div>
		</Card>
	)
}

export default ArtistForm
