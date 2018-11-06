const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; //get data from Local Storage

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value; //form element
    const item = {
        text,
        done: false
    };

    items.push(item);
    populateList(items, itemsList); 

    //save to Local Storage, can only put strings! 
    localStorage.setItem('items', JSON.stringify(items));

    this.reset(); //clean the form
}

function populateList(plates = [], platesList) {
    platesList.innerHTML =  plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ' '} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join(''); //one string
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;//skip this unless it's an input
    //set done
    const el = e.target;
    const index = el.dataset.index;

    items[index].done = !items[index].done; //change the property
    localStorage.setItem('items', JSON.stringify(items)); //store it
    populateList(items, itemsList); //visually update the page

}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList); 