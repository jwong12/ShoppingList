import React, { Component } from 'react';

class GroceryItem extends Component {
    formatTimestamp = () => {
        const { date } = this.props;
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let time;

        if (date.getHours() > 0 && date.getHours() < 12) {
            time = `${date.getHours()}:${minute} AM`;

        } else if (date.getHours() === 0){
            time = `12:${minute} AM`;

        } else if (date.getHours() === 12) {
            time = `12:${minute} PM`;

        } else {
            time = `${date.getHours() - 12}:${minute} PM`;
        }

        const timestamp = `${months[date.getMonth()]} ${date.getDate()} ${time}`;
        // console.log(timestamp);
        // console.log('formatTimestamp(): ' + this.props.date.toString());
        return timestamp;
    }

    render() {
        return(
            <li>
                <div className="item-wrapper">
                    <span>{this.props.item}</span>
                    <div>
                        <span className="time">{this.formatTimestamp()}</span>
                        <button onClick={() => this.props.onClick(this.props.date)}>Delete</button>
                    </div>                    
                </div>                
            </li>
        );
    }
}

export default GroceryItem;