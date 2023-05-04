function injectHTML(list) {
  console.log("fired injectHTML");
  const target = document.querySelector("#restaurant_list");
  target.innerHTML = "";
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  });
}

function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  });
  function cutRestaurantList(list) {
    console.log("fired cut list");
    const range = [...Array(15).keys()];
    return (newArray = range.map((item) => {
      const index = getRandomIntInclusive(0, list.length - 1);
      return list[index];
    }));
  }

  /*
      filter
    */
}




async function mainEvent() {
  // the async keyword means we can make API requests
  const mainForm = document.querySelector(".main_form"); // This class name needs to be set on your form before you can listen for an event on it
  const loadDataButton = document.querySelector("#data_load");
  const clearDataButton = document.querySelector("#data_clear");
  const generateListButton = document.querySelector("#generate");
  const textField = document.querySelector("#resto");

  const loadAnimation = document.querySelector("#data_load_animation");
  loadAnimation.style.display = "none";
  generateListButton.classList.add = ("hidden");

  const carto = initMap();

  const storedData = localStorage.getItem('storedData');
  let parsedData = JSON.parse(storedData);
 
  if (parsedData?.length > 0) {
    generateListButton.classList.remove('hidden');
  }

  // Add a querySelector that targets your filter button here

  
  let currentList = []; // this is "scoped" to the main event function

  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something

    // This prevents your page from becoming a list of 1000 records from the county, even if your form still has an action set on it
    submitEvent.preventDefault();

    // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
    console.log("Loading data");
    loadAnimation.style.display = "inline-block";

    /*
        ## GET requests and Javascript
          We would like to send our GET request so we can control what we do with the results
          Let's get those form results before sending off our GET request using the Fetch API
      
        ## Retrieving information from an API
          The Fetch API is relatively new,
          and is much more convenient than previous data handling methods.
          Here we make a basic GET request to the server using the Fetch method to the county
      */

    // Basic GET request - this replaces the form Action
    const results = await fetch(
      "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
    );

    // This changes the response from the GET into data we can use - an "object"
    const storedList = await results.json();
    localStorage.setItem('StoredData',JSON.stringify(storedList));
    parsedData = storedList;
   

    loadAnimation.style.display = "none";
    //console.table(storedList);

    /*
        This array initially contains all 1,000 records from your request,
        but it will only be defined _after_ the request resolves - any filtering on it before that
        simply won't work.
      */
   
  });

    
    
    generateListButton.addEventListener("click", (event) => {
    console.log("generate new list");
    currentList = cutRestaurantList(storedList);
    console.log(currentList);
    injectHTML(currentList);
    markerPlace(currentList, carto);
    });

    textField.addEventListener("input", (event) => {
      console.log("input", event.target.value);
      const newList = filterList(currentList, event.target.value);
      console.log(newList);
      injectHTML(newList);
      markerPlace(newList, carto);
    });

    const formData = new FormData(mainForm);
    const formProps = Object.fromEntries(formData);

    console.log(formProps);
    const newList = filterList(currentList, event.target.value);
    injectHTML(currentList);

    console.log(newList);
    injectHTML(newList);
  
  /*
      Now that you HAVE a list loaded, write an event listener set to your filter button
      it should use the 'new FormData(target-form)' method to read the contents of your main form
      and the Object.fromEntries() method to convert that data to an object we can work with
      When you have the contents of the form, use the placeholder at line 7
      to write a list filter
      Fire it here and filter for the word "pizza"
      you should get approximately 46 results
    */
}

function initMap(){
const carto = L.map('map').setView([38.9, -76.93], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(carto);
return carto;
}

function markerPlace(array, map) {
console.log('array for markers', array);

map.eachLayer((layer) => {
  if (layer instanceof L.Marker) {
    layer.remove();
  }
});


array.forEach((resto) => {
  console.log('markerPlace' , item);
  const {coordinates} = item.geocoded_column_1;

  L.marker([coordinates[1], coordinates[0]]).addTo(map);
})
}
clearDataButton.addEventListener("click", (event) => {
console.log('clear browers data');
localStorage.clear();
console.log('localStorage Check', localStorage.getItem('storedData'))
})


/*
    This adds an event listener that fires our main event only once our page elements have loaded
    The use of the async keyword means we can "await" events before continuing in our scripts
    In this case, we load some data when the form has submitted
  */
document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests