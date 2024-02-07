import Card from "../../../components/Card/Card"
import { Artist } from "../../../api/types/artist"
import { useNavigate } from "react-router-dom"

type Props = {
	artists: Artist[]
}

const TopFive = ({ artists }: Props) => {
	const navigate = useNavigate()
	return (
		<Card
			title='Top 5'
			actionButton={<span className='text-sm font-medium'>Highest rate</span>}>
			<div className='bg-[#E9E2E8] rounded-lg p-5 gap-2 flex flex-col mt-5'>
				{artists?.map((artist) => (
					<div
						key={artist.id}
						className='flex justify-between bg-white rounded-lg py-2 px-4 border border-gray-200 items-center text-[#652F87] font-bold hover:border-[#DF2A61] hover:text-[#DF2A61] cursor-pointer'
						onClick={() => navigate(`/c/artist?id=${artist.id}`)}>
						<span>{artist.name}</span>
						<span>{artist.rank}</span>
					</div>
				))}
			</div>
		</Card>
	)
}

export default TopFive
