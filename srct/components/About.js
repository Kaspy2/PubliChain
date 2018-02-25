import React from 'react';
import {Link} from 'react-router-dom';
export default 
class About extends React.Component {
 render () {
   return (
     <div>
       About
       <Link to="/">
        <button>Go Home</button>
       </Link>
       <Link to="/articles">
        <button>Articles</button>
       </Link>
       <Link to="/view">
        <button>View Stuff</button>
       </Link>
     </div>
   )
 }
}