import {CollectionStrategy} from './collection-strategy';

/**
* A strategy for iterating a template n number of times.
*/
export class NumberStrategy extends CollectionStrategy {
  /**
  * Return the strategies collection observer. In this case none.
  */
  getCollectionObserver() {
    return;
  }

  /**
  * Process the provided Number.
  * @param value The Number of how many time to iterate.
  */
  processItems(value) {
    let viewFactory = this.viewFactory;
    let viewSlot = this.viewSlot;
    let childrenLength = viewSlot.children.length;
    let i;
    let ii;
    let overrideContext;
    let view;
    let viewsToRemove;

    value = Math.floor(value);
    viewsToRemove = childrenLength - value;

    if (viewsToRemove > 0) {
      if (viewsToRemove > childrenLength) {
        viewsToRemove = childrenLength;
      }

      for (i = 0, ii = viewsToRemove; i < ii; ++i) {
        viewSlot.removeAt(childrenLength - (i + 1), true);
      }

      return;
    }

    for (i = childrenLength, ii = value; i < ii; ++i) {
      overrideContext = this.createFullOverrideContext(i, i, ii);
      view = viewFactory.create();
      view.bind(overrideContext.bindingContext, overrideContext);
      viewSlot.add(view);
    }

    this.updateOverrideContexts(0);
  }
}
