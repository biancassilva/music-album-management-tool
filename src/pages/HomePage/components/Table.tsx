import Card from "../../../components/Card/Card"
import Button from "../../../components/Button/Button"
import Input from "../../../components/Input/Input"
import { Artist } from "../../../api/types/artist"
import { useNavigate } from "react-router-dom"
import Table from "../../../components/Table/Table"
import TableActions from "../../../components/TableActions/TableActions"
import { GridColDef } from "@mui/x-data-grid"
import { useCallback } from "react"

type Props = {
	artists: Artist[]
	isLoading: boolean
	deleteRow: (id: string) => void
	onSearch: (search: string) => void
}

const CustomTable = ({ artists, isLoading, deleteRow, onSearch }: Props) => {
	const navigate = useNavigate()

	const handleSearch = useCallback(
		(str: string) => {
			const delayDebounceFn = setTimeout(() => {
				onSearch(str)
			}, 1000)
			return () => clearTimeout(delayDebounceFn)
		},
		[onSearch]
	)

	const tableColumns: GridColDef[] = [
		{
			field: "name",
			flex: 1,
			headerName: "Name",
			renderCell(params) {
				return (
					<div
						className='flex justify-center cursor-pointer'
						onClick={() => navigate(`/c/artist?id=${params.row.id}`)}>
						{params.row.name}
					</div>
				)
			}
		},
		{
			field: "rank",
			width: 100,
			headerName: "Rating",
			renderCell(params) {
				return <div className='flex justify-center'>{params.row.rank}</div>
			}
		},
		{
			field: "actions",
			headerName: "",
			width: 200,
			disableColumnMenu: true,
			sortable: false,
			renderCell(params) {
				return <TableActions handleDelete={deleteRow} row={params.row} />
			}
		}
	]

	return (
		<Card
			title='My artists'
			actionButton={
				<Button onClick={() => navigate("/c/artist")} icon='plus'></Button>
			}>
			<div className='pt-4 pb-8'>
				<Input label='Search' onChange={(e) => handleSearch(e.target.value)} />
			</div>
			<Table data={artists ?? []} columns={tableColumns} {...{ isLoading }} />
		</Card>
	)
}

export default CustomTable
