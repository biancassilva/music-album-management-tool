import { useMemo, useReducer, useState } from "react"
import Card from "../../../components/Card/Card"
import Input from "../../../components/Input/Input"
import RadioGroup from "../../../components/RadioGroup/RadioGroup"
import Button from "../../../components/Button/Button"
import { ArtistPayload } from "../../../api/types/artist"

type Props = {
	createArtist: (artist: ArtistPayload) => void
}

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

const QuickAddForm = ({ createArtist }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [formFields, setFormFields] = useState<ArtistPayload>({
		name: "",
		ytUrl: "",
		rank: undefined
	})

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
			createArtist(artist)
			setFormFields({ name: "", ytUrl: "", rank: undefined })
		}
	}

	const radioOptions = useMemo(
		() =>
			[...Array(10).keys()].map((index) => ({
				value: `${index + 1}`,
				label: `${index + 1}`,
				id: `option-${index + 1}`
			})),
		[]
	)

	const { artistNameError, musicVideoError, ratingError } = state

	return (
		<Card title='Quick add'>
			<div className='flex flex-col gap-4 my-5'>
				<Input
					type='text'
					label='Artist Name'
					error={artistNameError || ""}
					value={formFields.name}
					onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
				/>
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
					handleSelected={(value) =>
						setFormFields({ ...formFields, rank: parseInt(value) })
					}
				/>
				<div className='flex justify-end mt-2'>
					<Button onClick={handleAdd} label='Add' />
				</div>
			</div>
		</Card>
	)
}

export default QuickAddForm
