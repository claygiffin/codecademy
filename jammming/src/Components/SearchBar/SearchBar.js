import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e){
    this.setState({
      term: e.target.value
    });
  }

  handleSearch(e){
    this.props.onSearch(this.state.term);
    e.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.handleSearch} >SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
