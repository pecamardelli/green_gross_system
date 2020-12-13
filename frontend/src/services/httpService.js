
const apiUrl = 'http://localhost:3001/api';
const options = { mode: 'cors'};

export function getLocations() {
	return fetch(`${apiUrl}/locations?act=getall`, options);
	//return content;
}

export function getProducts() {
	return fetch(`${apiUrl}/products?act=getall`, options);
	//return content;
}