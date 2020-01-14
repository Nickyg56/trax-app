import React from 'react';
import './ProjectSearch.css';
import SearchResultItem from './SearchResultItem/SearchResultItem';
import io from 'socket.io-client';
import ProjectServices from '../../Services/ProjectServices';

class ProjectSearch extends React.Component {

  state = {
    loaded: false,
    projectSearchQuery: null,
    searchResults: [],
  }

  formatQueryString(string) {
    return string.split(' ').join('%20')
  }

  handleInputChange = e => {
    e.preventDefault();
    console.log(e.target.value)

    let queryString = e.target.value
    if (queryString.length > 0) {
      queryString = this.formatQueryString(queryString)
    } else {
      this.setState({
        searchResults: [],
      })
      return;
    }
    this.socket.on('project search active', this.updateSearchResults)

    ProjectServices.handleProjectSearch(queryString)
  }

  makeSearchResultItems = results => {
    return results.map((result, i) => {
      return (
        <SearchResultItem 
        key={i}
        id={result.id}
        title={result.title}
        description={result.description}
        dateCreated={result.dateCreated}
        />
      )
    })
  }

  componentDidMount() {
    this.socket = io('http://localhost:8000')
  }

  updateSearchResults = async (results) => {
    console.log(results)
    if (results.length !== this.state.searchResults.length) {
      let newResults = this.makeSearchResultItems(results)
      this.setState({
        searchResults: newResults,
      })
    }
  }





  render() {
    const { searchResults } = this.state;

    let resultItems;
    if (searchResults.length > 0) {
      resultItems = searchResults
    }
    return (
      <div className='project-search'>
          <input
            type='text'
            id='project-search-input'
            name='search'
            placeholder='search projects...'
            onChange={e => this.handleInputChange(e)}
          />
        
        <ul className='search-results-list'>
          {resultItems}
        </ul>
      </div>
    )
  }
}

export default ProjectSearch;