var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// edit event
itemList.addEventListener('click', editItem);


// Add item
function addItem(e){
  e.preventDefault();

  // Get input value
  var newItem = document.getElementById('item').value;

  // Create new li element
  var li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
  // Add text node with input value
  li.appendChild(document.createTextNode(newItem));

  // Create del button element
  var deleteBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('X'));

  // Append button to li
  li.appendChild(deleteBtn);

  //create edit button element 
  var editBtn = document.createElement('button');

  //all classes to edit button 
  editBtn.className = 'btn btn-danger btn-sm float-right edit';

  //append text node
  editBtn.appendChild(document.createTextNode('edit'));
  
  //append button to li 
  li.appendChild(editBtn);
  
 
  // Append li to list
  itemList.appendChild(li);

  // Create item object
  var itemObject = {
    item: newItem
  };

  // Check if items exist in local storage
  var items = localStorage.getItem('items');
  if (items === null) {
    // No items in local storage, create a new array
    items = [];
  } else {
    // Parse the stored JSON string to get the items array
    items = JSON.parse(items);
  }

  // Add the new item object to the items array
  items.push(itemObject);

  // Convert the items array to JSON string and store it in local storage
  localStorage.setItem('items', JSON.stringify(items));
   //clear fields 
   nameInput.value="";
   emailInput.value="";
}

// Remove item
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
      if (confirm('Are You Sure?')) {
        var li = e.target.parentElement;
        itemList.removeChild(li);
  
        // Get the text content of the item
        var removedItem = li.firstChild.textContent;
  
        // Retrieve items from local storage
        var items = localStorage.getItem('items');
        if (items !== null) {
          // Parse the stored JSON string to get the items array
          items = JSON.parse(items);
  
          // Find the index of the item in the array
          var index = -1;
          for (var i = 0; i < items.length; i++) {
            if (items[i].item === removedItem) {
              index = i;
              break;
            }
          }
  
          // Remove the item from the array
          if (index !== -1) {
            items.splice(index, 1);
  
            // Store the updated items array back into local storage
            localStorage.setItem('items', JSON.stringify(items));
          }
        }
      }
    }
  }

  // Edit item
function editItem(e) {
    if (e.target.classList.contains('edit')) {
      var li = e.target.parentElement;
      var itemText = li.firstChild.textContent;
  
      // Populate the input field with the item text
      document.getElementById('item').value = itemText;
  
      // Remove the item from the list
      itemList.removeChild(li);
  
      // Remove the item from local storage
      var items = localStorage.getItem('items');
      if (items !== null) {
        items = JSON.parse(items);
        
        // Find the index of the item in the array
        var index = -1;
        for (var i = 0; i < items.length; i++) {
          if (items[i].item === itemText) {
            index = i;
            break;
          }
        }
  
        // Remove the item from the array
        if (index !== -1) {
          items.splice(index, 1);
  
          // Store the updated items array back into local storage
          localStorage.setItem('items', JSON.stringify(items));
        }
      }
    }
  }
  



