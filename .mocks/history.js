import { createMemoryHistory } from "history"

export const mockHistory = (path) => {
	const history = createMemoryHistory()
	history.push(path)
	return history
}