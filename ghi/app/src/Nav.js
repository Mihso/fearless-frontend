import {Link} from 'react-router-dom';
function Nav(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">Conference GO!</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" id="location-link" aria-current="page" to="locations">New location</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="conference-link" aria-current="page" to="conferences">New conference</Link>
              </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="new-presentation.html">New presentation</Link>
            </li>
            <li className="nav-item">
            <Link type="button" to="attendees" className="btn btn-primary btn-lg px-4 gap-3">Primary button</Link>
            </li>
          </ul>
          </div>
          </div>
          </nav>
    );
}

export default Nav;