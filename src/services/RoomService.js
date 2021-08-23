import Api from './Api'

export const indexRooms = (id) => {
	return Api().get(`rooms`)
}
export const deleteRoom = (id) => {
	return Api().delete(`room/${id}`)
}
export const addRoom = (data) => {
	return Api().post('room', data)
}
export const addPlayersToRoom = (data) => {
	return Api().post(`room/players`, data)
}
export const kickPlayer = (roomId, playerId) => {
	return Api().delete(`room/${roomId}/player/${playerId}`)
}
