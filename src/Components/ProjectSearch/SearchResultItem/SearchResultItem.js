import React from 'react';
import { Link } from 'react-router-dom';


function SearchResultItem(props) {
  //need to facilitate a createdBy prop
  let formattedDate = new Date(props.dateCreated)
  let description = '';
  if (props.description.length > 200) {
    description = props.description.slice(0, 196) + '...';
  } else {
    description = props.description
  }
  return (
    <li key={props.id} className='project-search-result-item'>
      <h4>{props.title}</h4>
      <Link to={`/projects/visitor/${props.id}`}>View Project</Link>
      <p>{description}</p>
      <span className='project-sri-date'>Created: {formattedDate.toDateString().slice(3)}</span>
    </li>
  )

}

export default SearchResultItem;