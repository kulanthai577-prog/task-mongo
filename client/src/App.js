import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import CrudPage from "./Crudpage";

function App(){
  return(
     <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                       <Link to="/" className="navbar-brand">Food CRUD App</Link>
                        <button className="navbar-toggle" type="button" data-bs-toggler="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                        aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active" aria-current="page">Home</Link>
    
                                </li>
                                <li className="nav-item">
                                     <Link to="/crud" className="nav-link">ManageFood</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/crud" element={<CrudPage/>}/>
                </Routes>
            </div>
        </Router>
  )
}


export default App;