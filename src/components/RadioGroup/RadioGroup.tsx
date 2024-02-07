import { useCallback, useEffect, useState } from "react"

type Options = {
	value: string
	label: string
	id: string
}

type InputRadioProps = {
	title?: string
	radioOptions: Options[]
	error?: string
	handleSelected?: (value: string) => void
	defaultSelected?: string
}

const RadioGroup = ({
	title,
	radioOptions,
	error,
	handleSelected,
	defaultSelected
}: InputRadioProps) => {
	const [selectedValue, setSelectedValue] = useState<string>()

	useEffect(() => {
		setSelectedValue(defaultSelected)
	}, [defaultSelected])

	const isChecked = useCallback(
		(value: string) => selectedValue === value,
		[selectedValue]
	)

	return (
		<div className='flex flex-col gap-1'>
			<label className='block mb-1 text-sm font-medium text-gray-900'>
				{title}
			</label>
			<div className='flex gap-5'>
				{radioOptions?.map((option) => (
					<div className='flex items-center' key={option.id}>
						<input
							type='radio'
							id={option.id}
							value={option.value}
							onChange={(e) => {
								setSelectedValue(e.target.defaultValue)
								handleSelected?.(e.target.defaultValue)
							}}
							checked={isChecked(option.value)}
							className='accent-[#df2a61] h-4 w-4 border-gray-300 rounded-md focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-blue-500 focus:border-blue-500'
						/>
						<label
							className='ml-2 text-sm font-medium text-gray-900'
							htmlFor={option.id}>
							{option.label}
						</label>
					</div>
				))}
			</div>
			{error ? <span className='text-red-500 text-xs'>{error}</span> : null}
		</div>
	)
}

export default RadioGroup
