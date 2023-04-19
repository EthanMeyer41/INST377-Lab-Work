/* eslint-disable max-len */

/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/*
  ## Utility Functions
    Under this comment place any utility functions you need - like an inclusive random number selector
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#restaurant_list');
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  });
}
  /*
  ## JS and HTML Injection
    There are a bunch of methods to inject text or HTML into a document using JS
    Mainly, they're considered "unsafe" because they can spoof a page pretty easily
    But they're useful for starting to understand how websites work
    the usual ones are element.innerText and element.innerHTML
    Here's an article on the differences if you want to know more:
    https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext

  ## What to do in this function
    - Accept a list of restaurant objects
    - using a .forEach method, inject a list element into your index.html for every element in the list
    - Display the name of that restaurant and what category of food it is
*/
function filterList(list, query) {

  return list.filter( (item) => {
    const lowercaseName = item.name.toLowerCase();
    const lowercaseQuery = query.toLowerCase();
    return lowercaseName.includes(lowercaseQuery);
  })

}

function processRestaurants(list) {
  console.log('fired restaurants list');

  /*
    ## Process Data Separately From Injecting It
      This function should accept your 1,000 records
      then select 15 random records
      and return an object containing only the restaurant's name, category, and geocoded location
      So we can inject them using the HTML injection function

      You can find the column names by carefully looking at your single returned record
      https://data.princegeorgescountymd.gov/Health/Food-Inspection/umjn-t2iz

    ## What to do in this function:

    - Create an array of 15 empty elements (there are a lot of fun ways to do this, and also very basic ways)
    - using a .map function on that range,
    - Make a list of 15 random restaurants from your list of 100 from your data request
    - Return only their name, category, and location
    - Return the new list of 15 restaurants so we can work on it separately in the HTML injector
  */
}

function cutRestaurantList(list){
  console.log('Fired cut list');
  const range= [...Array(15).keys()];
  return newArray = range.map((item) => {
     const index = getRandomIntInclusive(0, list.length - 1);
     return list[index];
  })
 }

async function mainEvent() { // the async keyword means we can make API requests
  const mainForm = document.querySelector('.main_form'); 
  const filterButton = document.querySelector('#filter_button');
  const loadDataButton = document.querySelector('#data_load');
  const generateButton = document.querySelector('#generate');

  const loadAnimation = document.querySelector('data_load_animation');
  loadAnimation.style.display = 'none';
  
  let currentList = []; 
  
  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener('click', async (submitEvent) => { 
    
    
    submitEvent.preventDefault(); 
    
   
    console.log('Loading data');
    loadAnimation.style.display = 'inline-block'; 

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
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    // This changes the response from the GET into data we can use - an "object"
    currentList = await results.json();
    loadAnimation.style.display = 'none';

    /*
      This array initially contains all 1,000 records from your request,
      but it will only be defined _after_ the request resolves - any filtering on it before that
      simply won't work.
    */

    console.table(currentList); 
  });

  filterButton.addEventListener('click', (event) => {
    console.log("Clicked FilterButton")


    const formData = new FormData(mainForm);
    const formProps = Object.fromEntries(formData);

    console.log(formProps);
    const newList = filterList(currentList, formProps.resto);
    injectHTML(newList);
    console.log(newList);
    
  })

  generateButton.addEventListener('click', (event) => {
    console.log('Generate New List');
    const restaurantList = cutRestaurantList(currentList)
    console.log(restaurantList)
    injectHTML(restaurantList);
  })

const formData = new FormData(mainForm)
const formProps = Object.fromEntries(formData)

console.log(formProps)
const newList = filterList(currentList, formProps.resto)
injectHTML(currentList)

console.log(newList)
injectHTML(newList)
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

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); 
