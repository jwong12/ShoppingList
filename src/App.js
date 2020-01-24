import React, { Component } from 'react';
import GroceryItem from './GroceryItem';
import './App.css';

const GROCERY_OBJECTS = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groceries: [],
      item: '',
      isButtonDisabled: false,
      sort: 'timestamp'
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleClickAddItem();
    }
  }

  handleClickAddItem = () => {
    if(this.state.item.trim() !== '' && this.state.isButtonDisabled === false) {
      const object = { description: this.state.item, date: new Date() };
      GROCERY_OBJECTS.push(object);

      this.setState({ 
        groceries: GROCERY_OBJECTS,
        item: '',
        isButtonDisabled: true
      });
      // setTimeout to prevent duplicate keys in the grocery list
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

  componentDidUpdate(prevProps, prevState) {
    const { sort } = this.state;

    if(prevState.sort !== sort) {
      if(sort === "ascending") {
        GROCERY_OBJECTS.sort((a, b) => {
          if(a.description > b.description) return 1;
          if(b.description > a.description) return -1;
          return 0;
        });

      } else if(sort === "descending") {
        GROCERY_OBJECTS.sort((a, b) => {
          if(b.description > a.description) return 1;
          if(a.description > b.description) return -1;
          return 0;
        });        

      } else {
        GROCERY_OBJECTS.sort((a, b) => a.date - b.date);
      }

      this.setState({ groceries: GROCERY_OBJECTS });
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
            name="item"
            value={this.state.item}
            onChange={this.handleChange} 
            onKeyPress={this.handleKeyPress}
            placeholder="Enter Item"
          />
          <button onClick={this.handleClickAddItem}>Add to Shopping List</button>
        </div><br/>
        <div id="side-container">
          <span id="total">Total Items: {GROCERY_OBJECTS.length}</span>
          <label id="sort">Sort by: </label>
          <select 
            name="sort"
            value={this.state.sort}
            onChange={this.handleChange}
          >
            <option value="timestamp">Timestamp</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
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