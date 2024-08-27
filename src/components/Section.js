class Section {
  constructor({ items, renderer }, sectionSelector) {
    // items should be the initialCards array
    // renderer is a function to be called on each item
    //  so it needs to do what renderCard does
    // sectionSelector is selector for the card list

    // in constructor, just assign stuff to this object
    this._items = items;
    this._renderer = renderer;
    this._sectionSelector = sectionSelector;

    // and select the section element
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  // adds an item to the DOM
  addItem(item) {
    this._sectionSelector.prepend(item);
  }
}

export default Section;
