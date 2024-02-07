import { useNavigate } from "react-router-dom"
import CustomIcon from "../Icon/Icon"

type Props = {
	row: {
		name: string
		id: string
		ytUrl: string
	}
	handleDelete: (id: string) => void
}

const TableActions = ({ row, handleDelete }: Props) => {
	const navigate = useNavigate()

	const handleYoutubeClick = () => window.open(row.ytUrl, "_blank")

	return (
		<div className='flex gap-4 w-full justify-center'>
			<CustomIcon
				name='youtube'
				size={25}
				color='#682D87'
				onClick={() => handleYoutubeClick()}
				classNames='cursor-pointer'
			/>
			<CustomIcon
				name='edit'
				size={25}
				color='#682D87'
				classNames='cursor-pointer'
				onClick={() => navigate(`/c/artist?id=${row.id}`)}
			/>
			<CustomIcon
				name='delete'
				size={25}
				color='#682D87'
				classNames='cursor-pointer'
				onClick={() => handleDelete(row.id)}
			/>
		</div>
	)
}

export default TableActions
