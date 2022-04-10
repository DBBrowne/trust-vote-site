import React from 'react';
import { ReactComponent as Logo } from '../logo.svg';

let candidacyFormUrl = process.env.REACT_APP_CANDIDACY_FORM_URL;
let announcmentUrl = process.env.REACT_APP_ANNOUNCEMENT_URL;

class Apply extends React.Component {
  state = { payload: '', voteMessageVisible: false, activeStep: 1 };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '20px' }}>
        <Logo style={{ width: '200px', height: 'auto', marginTop: '20px' }} />
        <h2>Candidate Applications</h2>
        <p>Candidate Applications are Open.</p>
        <p>
          Read about the process on the <strong>Dash Newsroom</strong>
          : <br />
          <a href={announcmentUrl}>{announcmentUrl}</a>
        </p>
        <p>
          See the <strong>Dash Trust Protector Candidacy Form</strong>
          : <br />
          <a href={candidacyFormUrl}>{candidacyFormUrl}</a>
        </p>
        <h2>Election Schedule</h2>
        <p>Dash Trust Protectors 2022 Election Schedule</p>
        <ul>
          <li>
            March 22, 2022 – April 1, 2022, 11:59 PM UTC: Open applications
          </li>
          <li>
            April 2, 2022 – April 3, 2022: Finalize election page and candidate
            profiles
          </li>
          <li>April 4, 2022 – April 14, 2022: Open Masternode voting period</li>
          <li>April 15, 2022 – April 16, 2022: Vote tallying and validation</li>
          <li>April 17, 2022 – Results announced</li>
        </ul>
        <h2>Impartiality</h2>
        <p>
          This voting tool is hosted by the Dash Incubator, the Trust Protector
          provided URL (vote.dashtrust.org) is provided for convenience.
        </p>
        <p>The Trust Protectors are not hosting or running this election.</p>
      </div>
    );
  }
}

export default Apply;
