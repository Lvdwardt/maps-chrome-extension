import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/content/injected/bringBackMapsButton');

async function bringBackMapsButton() {
  const trc = document.querySelector('[data-id="trc"]');
  if (!trc) {
    return;
  }

  const list = trc?.querySelector('[role="list"]');

  if (!list || !list?.children) {
    return;
  }

  const editableChild = list?.children[list.children.length > 3 ? list.children.length - 3 : 0] as HTMLElement;

  let mapsChild: HTMLElement;
  for (const child of list.children) {
    if (child.innerHTML.includes('Maps') || child.innerHTML.includes('Map')) {
      mapsChild = child as HTMLElement;
      break;
    }
  }

  const textareas = document.querySelector('textarea');
  const search = textareas?.getAttribute('value');

  if (mapsChild) {
    const a = mapsChild.querySelector('a');
    a?.setAttribute('href', `https://maps.google.com/maps?q=${encodeURI(search)}`);
    const textElement = mapsChild.querySelector('span') ?? mapsChild.querySelector('div');
    if (!textElement) {
      return;
    }
    textElement.innerHTML = 'Maps';
    return;
  } else if (editableChild) {
    const clone = editableChild.cloneNode(true) as HTMLElement;
    const a = clone.querySelector('a');
    a?.setAttribute('href', `https://maps.google.com/maps?q=${encodeURI(search)}`);
    const textElement = clone.querySelector('span') ?? clone.querySelector('div');
    if (!textElement) {
      return;
    }
    textElement.innerHTML = 'Maps';

    //append the clone to the div with attribute list
    // add the clone on the second to last place, which is just before :more
    list.insertBefore(clone, list.children[list.children.length - 1]);
  }
}

void bringBackMapsButton();
