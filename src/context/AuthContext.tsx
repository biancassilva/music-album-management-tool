import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { authService } from "../api/services"
import { UserOutput } from "../api/types/user"

interface AuthContextData {
	user: UserOutput | null
}

type AuthProviderTypes = {
	children: JSX.Element
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderTypes) => {
	const [user, setUser] = useState<any | null>(null)

	const getUserInfo = async () => {
		const data = await authService.userInfo("1")
		if (data) setUser(data)
	}
	useEffect(() => {
		getUserInfo()
	}, [])

	const authProviderValue = useMemo(() => ({ user }), [user])

	return (
		<AuthContext.Provider value={authProviderValue}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	return context
}
