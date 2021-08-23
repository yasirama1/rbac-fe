const axiosLoaded = require('axios')
const { toast } =  require("react-toastify");

let Api = () => {
	var axios = axiosLoaded.create({
		// baseURL: 'http://localhost:8080/api/1.0'
		baseURL: 'http://157.175.84.3/api/1.0'
		
	})

	axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.getItem('jwt');
	axios.interceptors.response.use((response) => response, (error) => {
		// whatever you want to do with the error
		toast.error(error.response.data.error)
		throw error;
	  });
	return axios;
}
export default Api