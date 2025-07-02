//Fetch the items from the JSON file
function loaditems() {
  return fetch("./data/data.json")
    .then((Response) => console.log(Response))
    .then((json) => json.items);
}

// main
loaditems()
  .then((items) => {
    console.log(items);
    //displayItems(items);
    //setEventListners(items)
  })
  .catch(console.log);
