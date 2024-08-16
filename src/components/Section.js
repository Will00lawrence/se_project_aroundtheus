class Section {
  constructor({ items, renderer }, sectionSelector) {
    // items should be the initialCards array
    // renderer is a function to be called on each item
    //  so it needs to do what renderCard does
    // sectionSelector is selector for the card list

    // in constructor, just assign stuff to this object
    this._items = items;

    // and select the section element
  }

  // doesn't take an argument
  renderItems() {
    // iterate through items array
    // calling renderer on each item
  }

  addItem() {
    // adds an item to the DOM
  }
}

export default Section;
