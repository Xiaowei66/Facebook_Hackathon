import React, { Component } from 'react';
import { View } from 'react-native';
import { Footer, FooterTab, Button, Text } from 'native-base';
import Dialog from 'react-native-dialog';
import axios from 'axios';

class FooterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommenting: false,
      val: ''
    };
  }

  toggleDialog = () => {
    const { isCommenting } = this.state;
    this.setState({ isCommenting: !isCommenting });
  };

  submitComment = () => {
    axios
      .post('http://127.0.0.1:5000/addTranslation', {
        text: this.props.keyword,
        trans: this.state.val
      })
      .then(response => console.log(response.data));
    this.toggleDialog();
  };

  changeComment = val => this.setState({ val: val });

  render() {
    const { isCommenting } = this.state;
    return (
      <View>
        <View>
          <Dialog.Container visible={isCommenting}>
            <Dialog.Title>Add User Comment</Dialog.Title>
            <Dialog.Description>
              Please Enter your comment on the translation.
            </Dialog.Description>
            <Dialog.Input
              onChangeText={this.changeComment}
              value={this.state.value}
            />
            <Dialog.Button label="Cancel" onPress={this.toggleDialog} />
            <Dialog.Button label="Submit" onPress={this.submitComment} />
          </Dialog.Container>
        </View>
        <Footer style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <FooterTab>
            <Button onPress={this.toggleDialog}>
              <Text>Add User Comments</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

export default FooterBar;
