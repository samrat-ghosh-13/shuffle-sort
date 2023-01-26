/**
 * @name htmlCollectionToArray
 * @param htmlItems
 * @description takes HTMLCollection as input and returns an array of items
 * @returns Array containing HTML Items that can be used to sort and shuffle items
 */
const htmlCollectionToArray = (htmlItems) => {
	let itemsArr = [];
	Array.from(htmlItems).forEach((item) => {
		if (item.nodeType === 1) {
			// validating the node is an element node, 
			// the nodeType property will return 1
			itemsArr.push(item);
		}
	});
	return itemsArr;
};

/**
 * @name renderItems
 * @params list
 * @description takes items, list and renders the items on DOM
 * @returns none
 */
const renderItems = (list, items) => {
	const fragment = new DocumentFragment();
	items.forEach((item) => {
		fragment.appendChild(item);
	});
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

	itemsArr.sort((a, b) => a.innerText - b.innerText);

	renderItems(list, itemsArr);
};
