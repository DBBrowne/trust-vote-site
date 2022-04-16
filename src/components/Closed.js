import React from 'react';
import { ReactComponent as Logo } from '../logo.svg';
import Countdown from './countdown/Countdown';
import { Message } from 'semantic-ui-react';
import { DashTrustVote } from 'dash-vote-tally';

let announceDate = new Date(process.env.REACT_APP_VOTING_RESULT_DATE);
let announceEpoch = announceDate.valueOf();
let announcePretty = announceDate
  .toISOString()
  .replace('T', ', at ')
  .replace(/\.\d+/, '');

// Show votes if we're past the result date
let now = Date.now();
let showVotes = now > announceEpoch;

// Build a lookup table of candidate ids => display names
function buildDisplayNameMap(candidates) {
  let candidateIdMap = {};
  candidates.forEach(function (c) {
    let displayName = c.name;
    if (c.handle.length > 0) {
      displayName += ` (${c.handle})`;
    }
    candidateIdMap[c.handle] = displayName;
  });
  return candidateIdMap;
}

class Closed extends React.Component {
  state = {
    votes: [],
    candidates: [],
    mnlist: [],
    tallies: [],
  };

  componentDidMount = async function () {
    let me = this;
    let baseUrl = process.env.REACT_APP_API_URL;
    return Promise.all([
      DashTrustVote.getJson(`${baseUrl}/api/votes`),
      DashTrustVote.getJson(`${baseUrl}/api/candidates`),
      DashTrustVote.getJson(`${baseUrl}/api/mnlist`),
    ]).then(async function ([votes, candidates, mnlist]) {
      let tallies = await DashTrustVote.tally({ votes, candidates, mnlist });
      me.setState({
        votes,
        candidates,
        mnlist,
        tallies,
      });
    });
  };

  render() {
    let me = this;
    return (
      <div className="ui container" style={{ marginTop: '20px' }}>
        <Logo style={{ width: '200px', height: 'auto', marginTop: '20px' }} />

        <Message>
          <Message.Header>Voting is now Closed</Message.Header>
          <p>
            We've received the votes and will publish the results soon. Thanks
            to everyone for taking the time and effort to vote!
          </p>
        </Message>
        <p>
          Voting results will be published on {announcePretty}:
          <br />
          <strong>
            <Countdown
              target={announceEpoch}
              donemsg={'The Results are official!'}
            />
          </strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>Votes</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {me.state.tallies.map(function (tally) {
              let displayNames = buildDisplayNameMap(me.state.candidates);
              // show **** instead of name
              let name = displayNames[tally.handle];
              let link = tally.link;
              if (!showVotes) {
                link = '-';
                name = name
                  .split('')
                  .map(function () {
                    return '*';
                  })
                  .join('');
              }
              return (
                <tr>
                  <td>{tally.total}</td>
                  <td>{name}</td>
                  <td>{link}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Closed;
