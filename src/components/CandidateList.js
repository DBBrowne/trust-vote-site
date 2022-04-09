import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import './CandidateList.css';

// TODO: consider making this controlled (e.g. "checked" is dependent based on
// state in parent component (Which can be passed to this? Or will we need state
// in this own component?)
const CandidateList = (props) => {
  const { candidates, onChange } = props;
  const ballotOptions = candidates.map(
    ({ name, handle = '', trust_protector, link }) => {
      let label = name;
      if (handle.length > 0) {
        label = `${label} - ${handle}`;
      } else {
        handle = name;
      }
      if (trust_protector) {
        label = `${label} (Trust Protector)`;
      }
      /*
      if (link) {
        label = `${label} <a href="${link}">Profile</a>`;
      }
      */

      return (
        <Checkbox
          key={handle}
          value={handle}
          label={{
            children: (
              <>
                {label}
                {link && (
                  <>
                    {' '}
                    <a href={link} target={'profile-' + handle}>
                      Profile
                    </a>
                  </>
                )}
              </>
            ),
          }}
          onChange={onChange}
        />
      );
    }
  );
  return <div className="candidate-list">{ballotOptions}</div>;
};

export default CandidateList;
