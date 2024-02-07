import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../../components/Footer/Footer"

const MainLayout: React.FC = () => {
	return (
		<div className='flex flex-col w-full min-h-screen'>
			<Navbar />
			<main className='flex-1 py-4 mx-auto'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default MainLayout
