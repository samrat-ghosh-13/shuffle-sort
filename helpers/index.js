/**
 * @name htmlCollectionToArray
 * @param htmlItems
 * @description takes HTMLCollection as input and returns an array of items
 * @returns none
 */
const htmlCollectionToArray = (htmlItems) => {
	let itemsArr = [];
	for (let i in htmlItems) {
		if (htmlItems[i].nodeType === 1) {
			// validating the node is an element node, the nodeType property will return 1
			itemsArr.push(htmlItems[i]);
		}
	}
	return itemsArr;
};

/**
 * @name htmlCollectionToArray
 * @params list
 * @description takes items, list and renders the items on DOM
 * @returns none
 */
const renderItems = (list, items) => {
	const fragment = document.createDocumentFragment();
	for (let i = 0; i < items.length; i++) {
		fragment.appendChild(items[i]);
	}
	list.appendChild(fragment);
};

/**
 * @name shuffle
 * @param none
 * @description handles shuffling of DOM nodes
 * @returns none
 */
const shuffle = () => {
	let list = document.getElementById("items");
	let items = list?.childNodes;
	let itemsArr = htmlCollectionToArray(items);
	let randomItemsArr = itemsArr
		.map((item) => {
			return {
				item,
				randomNumber: Math.ceil(Math.random() * 10000),
			};
		})
		.sort((a, b) => a.randomNumber - b.randomNumber)
		.map(({ item }) => item);

	renderItems(list, randomItemsArr);
};

/**
 * @name sort
 * @param none
 * @description handles sorting of DOM nodes
 * @returns none
 */
const sort = () => {
	let list = document.getElementById("items");
	let items = list?.childNodes;
	let itemsArr = htmlCollectionToArray(items);

	itemsArr.sort((a, b) => a.innerHTML - b.innerHTML);

	renderItems(list, itemsArr);
};
