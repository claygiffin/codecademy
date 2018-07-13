import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleTermChange(e){
    this.setState({
      term: e.target.value
    });
  }

  handleSearch(e){
    if(this.state.term){
      this.props.onSearch(this.state.term);
      e.preventDefault();
    }
  }

  handleKeyPress(e){
    if(e.key === 'Enter') {
      this.handleSearch(e);
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input 
          placeholder="Enter A Song, Album, or Artist" 
          onChange={this.handleTermChange} 
          onKeyPress={this.handleKeyPress}
          defaultValue={localStorage.getItem('searchTerm')} 
        />
        <a onClick={this.handleSearch} >SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
