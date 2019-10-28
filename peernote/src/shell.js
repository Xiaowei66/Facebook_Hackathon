import React from 'react';
import Header from './components/Header';
import { Container } from 'native-base';
import Footer from './components/Footer';
import Textbox from './components/Textbox';

class Shell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Keyword: ''
    };
  }

  changeKeyWord = val => {
    this.setState({ Keyword: val });
  };

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <Header content={'PeerNote'} />
        <Textbox word={'Keyword Input'} changeKeyWord={this.changeKeyWord} />
        <Footer keyword={this.state.Keyword} />
      </Container>
    );
  }
}

export default Shell;
