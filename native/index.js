import React, { Component } from 'react';
import fs from 'fs-extra';
import {
  render,
  Window,
  App,
  TextInput,
  Dialog,
  Menu,
  Box,
} from 'proton-native';
import { Provider } from 'react-redux';

class Mcopy extends Component {
  state = { text: '' };

  save() {
    const filename = Dialog('Save');
    if (filename) {
      fs.writeFileSync(filename, this.state.text);
    }
  }

  open() {
    const filename = Dialog('Open');
    if (filename) {
      let data = fs.readFileSync(filename);
      this.setState({ text: data });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (typeof nextState.text === 'string') return false;
    // nextState is set from input
    else return true; // nextState is set from file
  }

  render() { 
    return (

      <App onShouldQuit={() => console.log('Quitting')}>
        <Menu label="File">
          <Menu.Item type="Item" onClick={() => this.open()}>
            Open
          </Menu.Item>
          <Menu.Item type="Item" onClick={() => this.save()}>
            Save
          </Menu.Item>
          <Menu.Item type="Quit" />
        </Menu>
        <Window
          onClose={() => console.log('Closing')}
          title="mcopy-native"
          size={{ w: 800, h: 600 }}
        >
          <Box>
            <TextInput
              onChange={text => this.setState({ text })}
              multiline={true}
            >
              {this.state.text}
            </TextInput>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Mcopy />);