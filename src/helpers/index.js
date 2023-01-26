const debounce = (func, delay = 100) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
};

const htmlCollectionToArray = (list) => {
	const items = [];
	Array.from(list).forEach((item) => {
		items.push(item);
	});
	return items;
};

const renderItemsToDom = (id, items, accesskey) => {
	const fragment = new DocumentFragment();
	items.forEach((item) => {
		fragment.appendChild(item);
	});
	id.accessKey = accesskey;
	id.appendChild(fragment);
};

const shuffle = () => {
	const id = document.getElementById("numbers");
	const items = htmlCollectionToArray(id?.childNodes);
	const shuffledItems = items
		.map((item) => {
			return {
				item,
				randomNumber: Math.ceil(Math.random() * 1000),
			};
		})
		.sort((a, b) => a.randomNumber - b.randomNumber)
		.map(({ item }) => item);

	renderItemsToDom(id, shuffledItems, "shuffled");
};

const debounceShuffle = debounce(() => shuffle(), 300);

const sort = () => {
	const id = document.getElementById("numbers");

	if (id.accessKey !== "sorted") {
		const items = htmlCollectionToArray(id?.childNodes);
		const sortedItems = items.sort((a, b) => a.innerText - b.innerText);

		renderItemsToDom(id, sortedItems, "sorted");
	}
};

const render = () => {
	const id = document.getElementById("root");

	const items = {
		header: {
			className: "header",
			text: "Shuffle and Sort",
		},
		contents: {
			className: "contents",
			buttons: {
				className: "contents__buttons",
				items: [
					{
						className: "contents__buttons__btn",
						text: "Shuffle",
						onclick: () => {
							debounceShuffle();
						},
					},
					{
						className: "contents__buttons__btn",
						text: "Sort",
						onclick: () => {
							sort();
						},
					},
				],
			},
			numbers: {
				className: "contents__items",
				items: [
					{
						className: "contents__items__item",
						text: "1",
						ariaLabel: "One",
					},
					{
						className: "contents__items__item",
						text: "2",
						ariaLabel: "Two",
					},
					{
						className: "contents__items__item",
						text: "3",
						ariaLabel: "Three",
					},
					{
						className: "contents__items__item",
						text: "4",
						ariaLabel: "Four",
					},
					{
						className: "contents__items__item",
						text: "5",
						ariaLabel: "Five",
					},
					{
						className: "contents__items__item",
						text: "6",
						ariaLabel: "Six",
					},
					{
						className: "contents__items__item",
						text: "7",
						ariaLabel: "Seven",
					},
					{
						className: "contents__items__item",
						text: "8",
						ariaLabel: "Eight",
					},
					{
						className: "contents__items__item",
						text: "9",
						ariaLabel: "Nine",
					},
				],
			},
		},
		footer: {
			className: "footer",
			text: "Shuffle & Sort with ❤️ by Samrat",
		},
	};

	// creating header
	let headerElement = document.createElement("header");
	headerElement.innerText = items.header.text;
	headerElement.className = items.header.className;
	id.appendChild(headerElement);

	// creating contents section
	let contentsElement = document.createElement("main");
	contentsElement.className = items.contents.className;
	id.appendChild(contentsElement);

	// creating button section
	let buttonContainer = document.createElement("section");
	buttonContainer.className = items.contents.buttons.className;
	contentsElement.appendChild(buttonContainer);

	// creating numbers section
	let numbersContainer = document.createElement("section");
	numbersContainer.id = "numbers";
	numbersContainer.accessKey = "sorted";
	numbersContainer.className = items.contents.numbers.className;
	contentsElement.appendChild(numbersContainer);

	// creating buttons
	let buttonsFragment = new DocumentFragment();
	items.contents.buttons.items.forEach((item) => {
		let buttonElement = document.createElement("button");
		buttonElement.onclick = item.onclick;
		buttonElement.innerText = item.text;
		buttonElement.className = item.className;
		buttonElement.name = item.text;
		buttonsFragment.appendChild(buttonElement);
	});
	buttonContainer.appendChild(buttonsFragment);

	// creating numbers
	let numbersFragment = new DocumentFragment();
	items.contents.numbers.items.forEach((item) => {
		let pElement = document.createElement("p");
		let divElement = document.createElement("div");
		pElement.innerText = item.text;
		pElement.ariaLabel = item.ariaLabel;
		divElement.className = `${item.className} ${item.className}--${item.text}`;
		divElement.tabIndex = 0;
		divElement.appendChild(pElement);
		numbersFragment.appendChild(divElement);
	});
	numbersContainer.appendChild(numbersFragment);

	// creating footer
	let footerElement = document.createElement("footer");
	footerElement.innerText = items.footer.text;
	footerElement.className = items.footer.className;
	id.appendChild(footerElement);
};

window.onload = () => {
	render();
};
