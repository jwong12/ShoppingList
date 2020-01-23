import React, { Component } from 'react';
import GroceryItem from './GroceryItem';
import './App.css';

const GROCERY_OBJECTS = []; // JS objects: item description, timestamp, etc...

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groceries: [],
      itemDescription: ''
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ itemDescription: value });
    // console.log(e.target);
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleClickAddItem();
    }
  }

  handleClickAddItem = () => {
    if(this.state.itemDescription.trim() !== '') {
      const object = { description: this.state.itemDescription, date: new Date() };
      // console.log(object); // delete this line
      GROCERY_OBJECTS.push(object);

      this.setState({ 
        groceries: GROCERY_OBJECTS,
        itemDescription: ''
      });
    }    
  }

  handleClickRemoveItem = (item) => {
    for(let i = 0; i < GROCERY_OBJECTS.length; i++) {
      if(GROCERY_OBJECTS[i].description === item) {
        GROCERY_OBJECTS.splice(i, 1);
        this.setState({ groceries: GROCERY_OBJECTS });
      }
    }  
    // console.log(GROCERY_OBJECTS); // delete this
  }

  render() {
    const { groceries } = this.state;

    return (
      <div className="App">
        <h1>Shopping List</h1>
        <div>
          <input 
            type="text"
            value={this.state.itemDescription}
            onChange={this.handleChange} 
            onKeyPress={this.handleKeyPress}
          />
          <button onClick={this.handleClickAddItem}>Add to Shopping List</button>
        </div>
        <div id="items-container">
          <ul>
            {groceries.map((grocery) => 
                <GroceryItem 
                  key={grocery.description}
                  item={grocery.description}
                  date={grocery.date}
                  onClick={this.handleClickRemoveItem}
                />              
            )}
          </ul>
        </div>
      </div>
    );
  }  
}

export default App;