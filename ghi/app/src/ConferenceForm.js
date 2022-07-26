import React from 'react';

class ConferenceForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        name:'',
        starts:'',
        ends:'',
        description:'',
        maxPresentations: '',
        maxAttendees: '',
        locations: []};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePresentationChange = this.handlePresentationChange.bind(this);
    this.handleAttendeeChange = this.handleAttendeeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};
    data.max_presentations = data.maxPresentations;
    data.max_attendees = data.maxAttendees;
    delete data.maxPresentations;
    delete data.maxAttendees;
    delete data.locations;

    const locationUrl = 'http://localhost:8000/api/conferences/';
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
                name: '',
                starts: '',
                ends: '',
                description: '',
                maxPresentations: '',
                maxAttendees:'',
                location: '',
              };
            this.setState(cleared);
        }
}

handleNameChange(event){
    const value = event.target.value;
    this.setState({name: value});
}

handleStartChange(event){
    const value = event.target.value;
    this.setState({starts: value});
}
handleEndChange(event){
    const value = event.target.value;
    this.setState({ends: value});
}
handleDescriptionChange(event){
    const value = event.target.value;
    this.setState({description: value});
}
handlePresentationChange(event){
    const value = event.target.value;
    this.setState({maxPresentations: value});
}
handleAttendeeChange(event){
    const value = event.target.value;
    this.setState({maxAttendees: value});
}
handleLocationChange(event){
    const value = event.target.value;
    this.setState({location: value});
}

async componentDidMount(){
    const url = 'http://localhost:8000/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
        this.setState({locations: data.locations});
      }
    }

    render(){
        return(
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new Conference</h1>
                <form onSubmit={this.handleSubmit} id="create-conference-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleStartChange} value={this.state.starts} placeholder="Starts" required type="date" name = "starts" id="starts" className="form-control" />
                    <label htmlFor="starts">Start</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleEndChange} value={this.state.ends} placeholder="Ends" required type="date" name = "ends" id="ends" className="form-control" />
                    <label htmlFor="ends">End</label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea onChange={this.handleDescriptionChange} value={this.state.description} className="form-control" id="description" rows="3"></textarea>
                    </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handlePresentationChange} value={this.state.maxPresentations} required type="number" name="maxPresentations" id="maxPresentations" className="form-control" />
                    <label htmlFor="maxPresentations">Maximum Presentations</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleAttendeeChange} value={this.state.maxAttendees} required type="number" name="maxAttendees" id="maxAttendees" className="form-control" />
                    <label htmlFor="maxAttendees">Maximum Attendees</label>
                </div>
                  <div className="mb-3">
                    <select onChange={this.handleLocationChange} value={this.state.location} required id="location" name = "location" className="form-select">
                      <option value="">Choose a location</option>
                      {this.state.locations.map(location => {
                        return(
                          <option key={location.id} value={location.id}>
                          {location.name}
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
        );
    }
}

export default ConferenceForm;