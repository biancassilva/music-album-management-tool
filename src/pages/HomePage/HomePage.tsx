import { artistService } from "../../api/services"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import QuickAddForm from "./components/QuickAddForm"
import TopFiveArtists from "./components/TopFive"
import CustomTable from "./components/Table"
import { ArtistPayload } from "../../api/types/artist"

const HomePage = () => {
	const [search, setSearch] = useState("")
	const {
		isLoading,
		data: topArtistsData,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ["artistsData", search],
		queryFn: () => artistService.findAll(search),
		enabled: true
	})

	const deleteArtist = useMutation({
		mutationFn: (id: string) => {
			return artistService.delete(id).finally(() => refetch())
		}
	})

	const createArtist = useMutation({
		mutationFn: (artist: ArtistPayload) => {
			return artistService.create(artist).finally(() => refetch())
		}
	})

	const topFiveArtists = useMemo(
		() =>
			topArtistsData?.artists
				.slice()
				.sort((a, b) => b.rank - a.rank)
				.slice(0, 5)
				.map((item) => ({ ...item })),
		[topArtistsData]
	)

	const handleDeleteRow = (id: string) => deleteArtist.mutate(id)

	const handleCreateArtist = (artist: ArtistPayload) =>
		createArtist.mutate(artist)

	return (
		<div className='mx-auto px-1 grid grid-cols-1 md:grid-cols-2 gap-2'>
			<CustomTable
				artists={topArtistsData?.artists ?? []}
				isLoading={isLoading || deleteArtist.isPending || isFetching}
				deleteRow={handleDeleteRow}
				onSearch={setSearch}
			/>
			<div className='flex flex-col gap-2'>
				<TopFiveArtists artists={topFiveArtists ?? []} />
				<QuickAddForm createArtist={handleCreateArtist} />
			</div>
		</div>
	)
}

export default HomePage
