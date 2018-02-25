import React, {Component} from 'react';
import InputPreview from '../components/InputPreview';
import {connect} from 'react-redux';
import {setMessage} from '../actions/message';
import {Link} from 'react-router-dom';
import "../components/css/style.less";
class App extends Component {
  _onChange = (value) => {
    this.props.dispatch(setMessage(value))
  }
  render () {
    const {message} = this.props.messageReducer;
    return (
      <div>
        
        <Link to="/authors">
        <button>Upload your creation</button>
        </Link>
        <Link to="/view">
        <button>Publications</button>
        </Link>
      </div>
    )
  }
}
export default connect(state => state)(App);

//<InputPreview value={message} onChange={this._onChange}/>