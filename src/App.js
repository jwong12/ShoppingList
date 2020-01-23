import React, { Component } from 'react';
import GroceryItem from './GroceryItem';
import './App.css';

const GROCERY_OBJECTS = []; // JS objects: item description and date

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groceries: [],
      itemDescription: '',
      isButtonDisabled: false
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ itemDescription: value });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleClickAddItem();
    }
  }

  handleClickAddItem = () => {
    if(this.state.itemDescription.trim() !== '' && this.state.isButtonDisabled === false) {
      const object = { description: this.state.itemDescription, date: new Date() };
      GROCERY_OBJECTS.push(object);

      this.setState({ 
        groceries: GROCERY_OBJECTS,
        itemDescription: '',
        isButtonDisabled: true
      });
      // set timeout to prevent repeated keys in the grocery list
      setTimeout(() => this.setState({ isButtonDisabled: false }), 1000);
    }    
  }

  handleClickRemoveItem = (date) => {
    for(let i = 0; i < GROCERY_OBJECTS.length; i++) {
      if(GROCERY_OBJECTS[i].date === date) {
        GROCERY_OBJECTS.splice(i, 1);
        this.setState({ groceries: GROCERY_OBJECTS });
      }
    }  
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
            placeholder="Enter Item"
          />
          <button onClick={this.handleClickAddItem}>Add to Shopping List</button>
        </div>
        <div id="items-container">
          <ul>
            {groceries.map((grocery) => 
                <GroceryItem 
                  key={grocery.date}
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