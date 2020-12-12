
const apiUrl = 'http://localhost:3001/api?act=';
const options = { mode: 'cors'};

const content = [
	{
		id: 1,
		displayName: 'Broccoli',
		imageFile: 'broccoli.png',
		price: 0.99
	},
	{
		id: 2,
		displayName: 'Onion',
		imageFile: 'onion.png',
		price: 1.29
	},
	{
		id: 3,
		displayName: 'Carrot',
		imageFile: 'carrot.png',
		price: 0.79
	},
	{
		id: 4,
		displayName: 'Potato',
		imageFile: 'potato.png',
		price: 0.89
	},
	{
		id: 5,
		displayName: 'Tomato',
		imageFile: 'tomato.png',
		price: 1.39
	},
	{
		id: 6,
		displayName: 'Apples',
		imageFile: 'apples.png',
		price: 0.99
	},
	{
		id: 7,
		displayName: 'Oranges',
		imageFile: 'oranges.png',
		price: 1.19
	},
	{
		id: 8,
		displayName: 'Bananas',
		imageFile: 'bananas.png',
		price: 0.79
	},
	{
		id: 9,
		displayName: 'Berries',
		imageFile: 'berries.png',
		price: 2.99
	},
	{
		id: 10,
		displayName: 'Watermelon',
		imageFile: 'watermelon.png',
		price: 1.89
	}
];

function getAll() {
	//return fetch(`${apiUrl}getall`, options);
	return content;
}

function update(url) {
	return fetch(`${apiUrl}update&${url}`, options);
}

function add(url) {
	return fetch(`${apiUrl}add&${url}`, options);
}

function del(url) {
	return fetch(`${apiUrl}delete&${url}`, options);
}

export default { getAll, update, add, del };