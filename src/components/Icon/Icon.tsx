import { Icon } from "@iconify/react"

type Props = {
	name: string
	size: number
	color: string
	classNames?: string
	onClick?: () => void
}

const CustomIcon = ({ name, size, color, classNames, onClick }: Props) => {
	return (
		<Icon
			icon={`mdi:${name}`}
			width={size}
			height={size}
			{...{ color, onClick }}
			className={classNames}
		/>
	)
}

export default CustomIcon
