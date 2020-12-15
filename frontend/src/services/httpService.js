
const apiUrl = 'http://localhost:3001/api';
const options = { mode: 'cors'};

export function getLocations() {
	return fetch(`${apiUrl}/locations?act=getall`, options);
	//return content;
}

export function addLocation(url) {
	return fetch(`${apiUrl}/locations?act=add&${url}`, options);
}

export function deleteLocation(id) {
	return fetch(`${apiUrl}/locations?act=delete&id=${id}`, options);
}

export function getProducts() {
	return fetch(`${apiUrl}/products?act=getall`, options);
	//return content;
}