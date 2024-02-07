import { AxiosError } from "axios"

//TODO: Add a toast component to show the error message
export const errorHandler = (error: AxiosError) => {
	console.log(error)
	const errorCodeMessage: Record<string, string> = {
		404: "The requested resource could not be found.",
		default: "Something went wrong, please try again."
	}
	const response: any = error.response
	const customError =
		errorCodeMessage[response.data.message.toString()] || errorCodeMessage.default
	return customError
}
