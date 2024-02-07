import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import MainLayout from "./layouts/MainLayout/MainLayout"
import { AuthProvider } from "./context/AuthContext"
import ArtistForm from "./pages/ArtistForm/ArtistForm"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./api/config"

/**
 * The main component of the application.
 * Renders the application layout and routes.
 */
function App() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Routes>
						<Route path='/' element={<MainLayout />}>
							<Route path='/' element={<HomePage />} />
							<Route path='/c/artist' element={<ArtistForm />} />
						</Route>
					</Routes>
				</Router>
			</QueryClientProvider>
		</AuthProvider>
	)
}

export default App
