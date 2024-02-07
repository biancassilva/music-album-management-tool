type Props = {
	children: JSX.Element | JSX.Element[] | string
	title: string
	actionButton?: JSX.Element
}

const Card = ({ children, title, actionButton }: Props) => {
	return (
		<div className='bg-white rounded-lg border border-gray-300 p-4'>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-bold text-[#652F87]'>{title}</h2>
				{actionButton}
			</div>
			<div className='bg-gray-300 h-px my-2'></div>
			{children}
		</div>
	)
}

export default Card
