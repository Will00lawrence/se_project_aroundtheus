class Section {
  constructor({ items, renderer }, sectionElement) {
    this._items = items;
    this._renderer = renderer;
    this._sectionElement = sectionElement;
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  // adds an item to the DOM
  addItem(item) {
    this._sectionElement.prepend(item);
  }
}

export default Section;
