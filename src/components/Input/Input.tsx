import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
}

const Input = ({ label, error, onChange, value, ...props }: InputProps) => {
	return (
		<div className='flex flex-col gap-1'>
			<label className='block mb-1 text-sm font-medium text-gray-900'>
				{label}
			</label>
			<input
				className={`border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 ${
					error ? "border-red-500" : ""
				}`}
				{...{ onChange, props, value }}
			/>
			{error ? <span className='text-red-500 text-xs'>{error}</span> : null}
		</div>
	)
}

export default Input
