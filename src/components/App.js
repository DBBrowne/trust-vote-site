import React from 'react';

import Countdown from './countdown/Countdown';
import CandidateSelector from './CandidateSelector';
import Logo from '../logo.svg';
import VoteMessage from './VoteMessage';

const announcementUrl = process.env.REACT_APP_ANNOUNCEMENT_URL;

// voting end date, less 1 millisecond for display clarity.
const votingEnd = new Date(new Date(process.env.REACT_APP_VOTING_END_DATE) - 1);

const endDateOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
};
const endTimeOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'UTC',
  timeZoneName: 'short',
};
const votingEndDateString = votingEnd.toLocaleString('en-US', endDateOptions);
const votingEndTimeString = votingEnd.toLocaleString('en-US', endTimeOptions);

class App extends React.Component {
  state = { payload: '', voteMessageVisible: false, activeStep: 1 };

  setMessage = (message) => {
    this.setState({ payload: message });
    this.moveToStep(2);
  };

  moveToStep = (stepNumber) => {
    let voteMessageVisible = false;
    switch (stepNumber) {
      case 1:
        voteMessageVisible = false;
        break;
      case 2:
        voteMessageVisible = true;
        break;
      default:
        break;
    }

    this.setState({
      voteMessageVisible,
      activeStep: stepNumber,
    });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '20px' }}>
        <Logo style={{ width: '200px', height: 'auto', marginTop: '20px' }} />
        <p>
          This voting tool is hosted by the Dash Incubator, the Trust Protector
          provided URL (vote.dashtrust.org) is provided for convenience.
        </p>
        <p>
          Read about the process on the <strong>Dash Newsroom</strong>
          : <br />
          <a href={announcementUrl}>{announcementUrl}</a>
        </p>
        <p>
          Voting ends on {votingEndDateString}, at {votingEndTimeString}:
          <br />
          <strong>
            <Countdown target={votingEnd} />
          </strong>
        </p>
        <p>The Trust Protectors are not hosting or running this election.</p>
        <p>
          The{' '}
          <a href="https://github.com/dashhive/trust-vote-site/blob/master/README.md">
            source code
          </a>{' '}
          of this election site is available at{' '}
          <a href="https://github.com/dashhive/trust-vote-site/blob/master/README.md">
            https://github.com/dashhive/trust-vote-site
          </a>
          .
        </p>
        {/*
        <iframe
          width="280"
          height="158"
          src="https://www.youtube-nocookie.com/embed?listType=playlist&list=PLZaEVINf2Bq98JzEWSX339MpOccqb4WZP"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        */}
        <p>
          For help <strong>signing votes and/or auditing</strong>, watch this
          playlist:
          <br />
          <a href="https://www.youtube.com/playlist?list=PLZaEVINf2Bq98JzEWSX339MpOccqb4WZP">
            https://www.youtube.com/playlist?list=PLZaEVINf2Bq98JzEWSX339MpOccqb4WZP
          </a>
        </p>
        <CandidateSelector
          label="1. Choose your candidate(s), (select as many as you want):"
          setMessage={this.setMessage}
          shouldDim={!(this.state.activeStep === 1)}
          twoStep={this.moveToStep}
        />
        <VoteMessage
          label="2. Sign Message Using MN Voting Key"
          payload={this.state.payload}
          visible={this.state.voteMessageVisible}
        />
      </div>
    );
  }
}

export default App;
