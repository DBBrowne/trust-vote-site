import React from 'react';
import CandidateSelector from './CandidateSelector';
import VoteMessage from './VoteMessage';
import { ReactComponent as Logo } from '../logo.svg';

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
          <a href="https://newsroom.dash.org/preview/OwOkLMWwK7rTwVS6_lzcZQ">
            https://newsroom.dash.org/preview/OwOkLMWwK7rTwVS6_lzcZQ
          </a>
        </p>
        <p>The Trust Protectors are not hosting or running this election.</p>
        <CandidateSelector
          label="1. Choose your candidate(s), (select as many as you want):"
          setMessage={this.setMessage}
          shouldDim={!(this.state.activeStep === 1)}
          twoStep={this.moveToStep}
        />
        <VoteMessage
          label="2. Sign Message Using MN Collateral Key"
          payload={this.state.payload}
          visible={this.state.voteMessageVisible}
        />
      </div>
    );
  }
}

export default App;
