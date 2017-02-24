const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
// items is either pulled from localStorage or an empty array
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
	// Stop the page from reloading
	e.preventDefault();
	const text = (this.querySelector('[name=item]')).value;
	const item = {
		text,
		done: false
	};

	items.push(item);
	populateList(items, itemsList);
	// Add items to localStorage
	localStorage.setItem('items', JSON.stringify(items));
	// Clear input
	this.reset();
}

function populateList(plates = [], platesList) {
	platesList.innerHTML = plates.map((plate, i) => {
		// ${plate.done ? 'checked' : ''} adds checked only if plate is done (done: true)
		return `
			<li>
				<input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} >
				<label for="item${i}">${plate.text}</label>
			</li>
		`;
	}).join('');
}

// Since <li> items don't exist we must attach event listener to the existing <ul> element and delegate it to its child(ren)
function toggleDone(e) {
	// skip this unless it's an input
	if (!e.target.matches('input')) return;
	const index = e.target.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

// on page load invoke populateList from localStorage (or an empty array if nothing is stored)
populateList(items, itemsList);