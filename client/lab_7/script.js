function injectHTML(list) {
    console.log("fired injectHTML");
    const target = document.querySelector("#restaurant_list");
    target.innerHTML = "";
    list.forEach((item) => {
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str;
    });
  }
  function filterList(array, filterInputValue) {
    const newArray = array.filter(item) => {
        const lowerCaseName = item.name.toLowerCase();
        const lowerCaseQuery = filterInputValue.toLowerCase();
        return lowerCaseName.includes(lowerCaseQuery)
    }
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
        Using the .filter array method, 
        return a list that is filtered by comparing the item name in lower case
        to the query in lower case
        Ask the TAs if you need help with this
      */
  }
  
  async function mainEvent() {
    // the async keyword means we can make API requests
    const mainForm = document.querySelector(".main_form"); // This class name needs to be set on your form before you can listen for an event on it
    const filterButton = document.querySelector("#filter_button");
    const loadDataButton = document.querySelector("#data_load");
    const generateListButton = document.querySelector("#generate");
    const textField = document.querySelector("#resto");
  
    const loadAnimation = document.querySelector("#data_load_animation");
    loadAnimation.style.display = "none";
    generateListButton.classList.add = "none";
  
    // Add a querySelector that targets your filter button here
  
    let storedList = [];
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
      storedList = await results.json();
      if (storedList.length > 0) {
        generateListButton.classList.remove("hidden");
      }
  
      loadAnimation.style.display = "none";
      console.table(storedList);
  
      /*
          This array initially contains all 1,000 records from your request,
          but it will only be defined _after_ the request resolves - any filtering on it before that
          simply won't work.
        */
      console.table(storedList);
    });
  
    filterButton.addEventListener("click", (event) => {
      console.log("clicked FilterButton");
  
      generateListButton.addEventListener("click", (event) => {
        console.log("generate new list");
        currentList = cutRestaurantList(storedList);
        console.log(currentList);
        injectHTML(currentList);
      });
  
      textField.addEventListener("input", (event) => {
        console.log("input", event.target.value);
        const newFilterList = filterList(currentList, event.target.value);
        console.log(newFilterList);
        injectHTML(newFilterList);
      });
  
      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
  
      console.log(formProps);
      const newList = filterList(currentList, event.target.value);
      injectHTML(currentList);
  
      console.log(newFilterList);
      injectHTML(newFilterList);
    });
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
  document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means w