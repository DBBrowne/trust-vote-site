import React from 'react';
import {
  Form,
  TextArea,
  Label,
  Segment,
  Button,
  Divider,
  Message,
  Input,
} from 'semantic-ui-react';
import copy from 'clipboard-copy';
import dashcore from '@dashevo/dashcore-lib';
import request from '../apis/dtevote';

class VoteMessage extends React.Component {
  state = {
    address: '',
    signature: '',
    successMessage: '',
    errorMessage: '',
    votingAddrMessage: '',
    votingAddrError: '',
  };

  copyToClipboard = (event) => {
    copy(this.props.payload);
  };

  clearMessages = () => {
    this.setState({
      successMessage: '',
      errorMessage: '',
    });
  };

  validateFieldLengths = () => {
    let ok = true;
    if (!this.state.address.length > 0) {
      ok = false;
    }
    if (!this.state.signature.length > 0) {
      ok = false;
    }

    return ok;
  };

  submitVote = async (event) => {
    const { payload } = this.props;
    const { signature, address } = this.state;

    this.clearMessages();
    if (!this.validateFieldLengths()) {
      return this.setState({ errorMessage: 'Fields cannot be empty' });
    }

    const dashnet = process.env.REACT_APP_DASH_NETWORK || 'testnet';
    const isValidAddr = dashcore.Address.isValid(address, dashnet);
    if (!isValidAddr) {
      return this.setState({
        errorMessage: `Invalid Dash Address (not ${dashnet})`,
      });
    }

    const msg = dashcore.Message(payload);
    let isValidSig = false;
    try {
      // This will throw an error if signature isn't in a valid format.
      isValidSig = msg.verify(address, signature);
      console.log('isValidSig: ', isValidSig);
    } catch (err) {
      console.log('got error checking valid sig');
    }
    if (!isValidSig) {
      return this.setState({ errorMessage: 'Invalid Message Signature' });
    }

    // TODO: cancel early / what if promise waits for http timeout?

    const resp = await request
      .post('/api/vote', {
        addr: address,
        msg: payload,
        sig: signature,
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMessage: err.message,
        });
      });
    if (!resp) {
      return;
    }

    if (resp.status >= 200 && resp.status <= 299) {
      console.log('success: ', resp.data);
      this.setState({
        successMessage: resp.data.message,
      });
    }
    if (resp.status >= 400 && resp.status <= 599) {
      console.log('error: ', resp.data);
      this.setState({
        errorMessage: resp.data.message,
      });
    }
  };

  onAddressChange = async (event) => {
    let addr = event.target.value.trim();
    this.setState({ address: addr });

    if (!addr) {
      this.setState({ votingAddrMessage: '', votingAddrError: '' });
      return;
    }

    const addrs = await request
      .get('/api/votingaddresses')
      .then(function (resp) {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMessage: err.message,
        });
      });

    if (addrs.includes(addr)) {
      this.setState({
        votingAddrMessage: 'Voting Address is Registered',
        votingAddrError: '',
      });
      return;
    }

    // just warn
    window.alert('that voting address is not a currently registered');
    this.setState({
      votingAddrMessage: '',
      votingAddrError: 'that voting address is not a currently registered',
    });
  };

  onSignatureChange = (event) => {
    this.setState({ signature: event.target.value.trim() });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { payload, visible } = this.props;
    if (!visible) {
      return null;
    }

    return (
      <Segment>
        <Label as="a" ribbon>
          {this.props.label}
        </Label>

        <Divider hidden />
        <Form>
          <TextArea disabled value={payload} />
        </Form>
        <Button className="ui primary" onClick={this.copyToClipboard}>
          Copy to Clipboard
        </Button>

        <Divider hidden />

        <Form onSubmit={this.onFormSubmit}>
          <Input
            fluid
            placeholder="Masternode Voting Address"
            value={this.state.address}
            onChange={this.onAddressChange}
          />
          {this.state.votingAddrMessage.length > 0 && (
            <Message
              success
              header="Note"
              content={this.state.votingAddrMessage}
            />
          )}
          {this.state.votingAddrError.length > 0 && (
            <Message
              error
              header="Warning"
              content={this.state.votingAddrError}
            />
          )}
          <Input
            fluid
            placeholder="Message Signature"
            value={this.state.signature}
            onChange={this.onSignatureChange}
          />
          <Button className="ui primary" onClick={this.submitVote}>
            Submit Vote
          </Button>
        </Form>

        {this.state.successMessage.length > 0 && (
          <Message
            success
            header="Success"
            content={this.state.successMessage}
          />
        )}

        {this.state.errorMessage.length > 0 && (
          <Message error header="Error" content={this.state.errorMessage} />
        )}
      </Segment>
    );
  }
}

export default VoteMessage;
