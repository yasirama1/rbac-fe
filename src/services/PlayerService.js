import Api from './Api'
// const querystring = require('querystring');

export const indexPlayers = (data) => {
	return Api().get(`players`, data)
}
export const deletePlayer = (id) => {
	return Api().delete(`player/${id}`)
}
export const addPlayer = (data) => {
	return Api().post('player', data)
}
