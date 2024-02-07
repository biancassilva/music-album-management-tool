import CustomIcon from "../Icon/Icon"

type Props = {
	onClick: () => void
	label?: string
	icon?: string
	type?: "submit" | "cancel"
}

const Button = ({ onClick, label, icon, type = "submit" }: Props) => {
	return (
		<button
			className={`${
				type === "submit"
					? "bg-gradient-to-r from-[#df2a61] to-[#682d87] text-white"
					: "bg-gray-200 text-black"
			} px-2 py-1 rounded-md text-sm`}
			onClick={onClick}>
			{label ? <span className='p-2'>{label}</span> : null}
			{icon ? <CustomIcon name={icon} size={20} color='white' /> : null}
		</button>
	)
}

export default Button
