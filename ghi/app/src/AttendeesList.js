function AttendeesList(props)
{
    return(
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Conference</th>
          </tr>
        </thead>
        <tbody>
          {/*for(let attendee of props.atttendees)
          {
            <tr>
              <td>{ attendee.name }</td>
              <td>{ attendee.conference }</td>
            </tr>
          }*/}
          {props.attendees.map(attendee => {
            return (
              <tr key={attendee.href}>
                <td>{attendee.name}</td>
                <td>{attendee.conference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    );
}

export default AttendeesList