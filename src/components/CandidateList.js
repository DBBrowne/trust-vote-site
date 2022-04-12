import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import './CandidateList.css';

function checkboxLabel (label, link, handle) {
  return (
    <label>
      {label}
      {link && (
        <a href={link} target={'profile-' + handle}>
            &nbsp;Profile
        </a>
      )}
    </label>
  );
}

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
          onChange={onChange}
          // does not work with this structure, as semantic-ui-react's approach to checkboxes causes the checked DOM value to be changed only after a re-render, not when the user clicks on the label.
          label={checkboxLabel(label, link, handle)}
        />
      );
    }
  );
  return <div className="candidate-list">{ballotOptions}</div>;
};

export default CandidateList;
