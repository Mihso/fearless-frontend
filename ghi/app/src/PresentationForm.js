import React from 'react';

class PresentationForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        presenterName:'',
        companyName:'',
        presenterEmail:'',
        synopsis:'',
        title: '',
        conferences: []};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleConferenceChange = this.handleConferenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};
    data.presenter_name = data.presenterName;
    data.presenter_email = data.presenterEmail;
    data.company_name = data.companyName;
    delete data.presenterName;
    delete data.presenterEmail;
    delete data.companyName;
    delete data.conferences;

    console.log(data.conference)
    let locationUrl = `http://localhost:8000${data.conference}presentations/`;
    console.log(locationUrl)
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
    const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation);
            const cleared = {
              presenterName:'',
              companyName:'',
              presenterEmail:'',
              synopsis:'',
              title: '',
              conference: '',
              };
            this.setState(cleared);
        }
}

handleNameChange(event){
    const value = event.target.value;
    this.setState({presenterName: value});
}

handleCompanyChange(event){
    const value = event.target.value;
    this.setState({companyName: value});
}
handleEmailChange(event){
    const value = event.target.value;
    this.setState({presenterEmail: value});
}
handleSynopsisChange(event){
    const value = event.target.value;
    this.setState({synopsis: value});
}
handleTitleChange(event){
    const value = event.target.value;
    this.setState({title: value});
}

handleConferenceChange(event){
    const value = event.target.value;
    this.setState({conference: value});
}

async componentDidMount(){
    const url = 'http://localhost:8000/api/conferences/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
        this.setState({conferences: data.conferences});
      }
    }

    render(){
        return(
          <div className="container">
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new presentation</h1>
                <form onSubmit={this.handleSubmit} id="create-presentation-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} value={this.state.presenterName} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                    <label htmlFor="presenter_name">Presenter name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleEmailChange} value={this.state.presenterEmail} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" />
                    <label htmlFor="presenter_email">Presenter email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleCompanyChange} value={this.state.companyName} placeholder="Company Name" required type="text" name="company_name" id="company_name" className="form-control" />
                    <label htmlFor="company_name">Company Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleTitleChange} value={this.state.title} placeholder="Title" required type="text" name="title" id="title" className="form-control" />
                    <label htmlFor="title">Title</label>
                  </div>
                  <div className="mb-3">
                    <label  htmlFor="synopsis" className="form-label">Synopsis</label>
                    <textarea onChange={this.handleSynopsisChange} value={this.state.synopsis} className="form-control" id="synopsis" rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                  <select onChange={this.handleConferenceChange} value={this.state.conference} required id="conference" name = "conference" className="form-select">
                      <option value="">Choose a conference</option>
                      {this.state.conferences.map(conference => {
                        return(
                          <option key={conference.href} value={conference.href}>
                          {conference.name}
                          </option>  
                        );
                      })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        );
    }
}

export default PresentationForm;