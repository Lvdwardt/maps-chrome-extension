import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/content/injected/bringBackMaps');

async function bringBackMaps() {
  // find the map
  const dirs = document.getElementsByClassName('dirs');
  // or find the map image: <img class="lu-fs" height="80" id="lu_map" src="... />
  const mapImage = document.getElementById('lu_map');
  //if the map is not found, then return
  if ((!dirs || dirs.length === 0) && !mapImage) {
    return;
  }
  //find the location, it has a data-url that starts with /maps
  const location = document.querySelector('[data-url^="/maps"]');

  //location is an anchor tag, we need the href attribute
  const locationUrl = location?.getAttribute('href');

  let newLocationUrl;

  if (locationUrl) {
    if (locationUrl.includes('/maps/dir/')) {
      newLocationUrl = locationUrl.replace('/maps/dir/', '/maps/place').split('/data')[0];
    } else if (locationUrl.includes('/maps/place/')) {
      newLocationUrl = locationUrl;
    }
  }

  //get the search query, by finding the first textarea element on the page
  const textareas = document.querySelector('textarea');
  const search = textareas?.getAttribute('value'); //value of the textarea

  if (!newLocationUrl) {
    newLocationUrl = `https://www.google.com/maps/search/?api=1&query=${search}`;
  }

  //if the div is found, then add an event listener
  if (dirs.length > 0) {
    //add an event listener to the div
    dirs[0].addEventListener('click', () => {
      //if the div is clicked, then navigate to the google maps page
      window.location.href = sanitizeUrl(newLocationUrl);
    });
    //add a cursor pointer to the div
    dirs[0].setAttribute('style', 'cursor: pointer;');
  }
  if (mapImage) {
    //add an event listener to the image
    mapImage.addEventListener('click', () => {
      //if the div is clicked, then navigate to the google maps page
      window.location.href = sanitizeUrl(newLocationUrl);
    });
    //add a cursor pointer to the div
    mapImage.setAttribute('style', 'cursor: pointer;');
  }
}

void bringBackMaps();

// remove breaking info from the url.
const sanitizeUrl = (url: string) => {
  // find instances of ,+
  const amountOfMatches = url.match(/,+/g)?.length;
  let newUrl = url;
  if (amountOfMatches && amountOfMatches > 1) {
    newUrl = url.replace(/\/place\/.*?,\+/, '/place/');
  }
  return newUrl;
};
