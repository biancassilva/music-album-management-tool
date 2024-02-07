interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
}

const TextArea = ({ label, error, ...props }: InputProps) => {
	return (
		<div className='flex flex-col gap-1'>
			<label className='block mb-1 text-sm font-medium text-gray-900'>
				{label}
			</label>
			<textarea
				id='message'
				rows={4}
				className={`border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 ${
					error ? "border-red-500" : ""
				}`}
				{...{ props }}></textarea>
		</div>
	)
}

export default TextArea
