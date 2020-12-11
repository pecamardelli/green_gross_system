
const apiUrl = 'http://localhost:3001/api?act=';
const options = { mode: 'cors'};

const content = [
	{
		id: 1,
		displayName: 'Vegetable1',
		price: 0.99
	},
	{
		id: 2,
		displayName: 'Vegetable2',
		price: 0.99
	},
	{
		id: 3,
		displayName: 'Vegetable3',
		price: 0.99
	},
	{
		id: 4,
		displayName: 'Vegetable4',
		price: 0.99
	},
	{
		id: 5,
		displayName: 'Vegetable5',
		price: 0.99
	},
	{
		id: 6,
		displayName: 'Fruit1',
		price: 0.99
	},
	{
		id: 7,
		displayName: 'Fruit2',
		price: 0.99
	},
	{
		id: 8,
		displayName: 'Fruit3',
		price: 0.99
	},
	{
		id: 9,
		displayName: 'Fruit4',
		price: 0.99
	},
	{
		id: 10,
		displayName: 'Fruit5',
		price: 0.99
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