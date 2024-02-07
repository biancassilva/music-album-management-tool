import { useMemo } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
	const { user } = useAuth()
	const navigate = useNavigate()

	const avatar_image = ""
	const user_initials = useMemo(() => {
		const splited = user?.realname.split(" ")
		if (splited?.length === 1) return splited[0].charAt(0).toUpperCase()
		if (splited?.length === 2)
			return (
				splited[0].charAt(0).toUpperCase() + splited[1].charAt(0).toUpperCase()
			)
	}, [user])

	return (
		<div className='flex h-16 w-full justify-between items-center bg-gradient-to-r from-[#df2a61] to-[#682d87]'>
			<div
				className='text-white font-bold text-lg cursor-pointer ml-6'
				onClick={() => navigate("/")}>
				Music Management Tool
			</div>
			<div className=' items-center mr-10 hidden md:flex'>
				<span className='text-white'>{user?.realname}</span>
				{!avatar_image ? (
					<div
						className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ml-2`}>
						<span className='text-black font-bold'>{user_initials}</span>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default Navbar
