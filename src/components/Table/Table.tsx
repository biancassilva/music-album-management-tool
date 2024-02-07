import { DataGrid, GridColDef } from "@mui/x-data-grid"
import React from "react"

interface ReactDataTableProps {
	data: any[]
	columns: GridColDef[]
	isLoading?: boolean
	totalItems?: number
}

const Table: React.FC<ReactDataTableProps> = ({
	data,
	columns,
	totalItems,
	isLoading
}) => {
	return (
		<DataGrid
			rows={data ?? []}
			columns={columns}
			disableDensitySelector
			hideFooter
			getRowId={(row) => row.id ?? row._id}
			autoHeight
			sx={{
				"& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
					display: "none"
				},
				"& .MuiDataGrid-virtualScroller": {
					minHeight: "500px",
					backgroundColor: "#fff"
				}
			}}
			initialState={{
				pagination: {
					paginationModel: { pageSize: 10 }
				}
			}}
			disableColumnSelector
			sortingMode='client'
			rowCount={totalItems}
			pageSizeOptions={[10, 20, 30, 50, 100]}
			loading={isLoading}
			disableRowSelectionOnClick
			disableVirtualization
		/>
	)
}

export default Table
