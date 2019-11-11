// // DisplayModal.js

// import React from 'react'
// import { Modal, View, Image, TextInput, StyleSheet, Text, Button } from 'react-native';

// //const [value, onChangeText] = React.useState('Useless Placeholder');

// const DisplayModal = (props) => (
//     // state = {
//     //     modalVisible: false,
//     //   }
    
//     //   setModalVisible(visible) {
//     //     this.setState({modalVisible: visible});
//     //   }
//   <Modal visible={ props.display } animationType = "slide" 
//          onRequestClose={ () => console.log('closed') }>>
//     <View style={{marginTop: 22}}>
//             <View>
//               <Text>Hello World!</Text>

//               {/* <TouchableHighlight
//                 onPress={() => {
//                   this.setModalVisible(!this.state.modalVisible);
//                 }}>
//                 <Text>Hide Modal</Text>
//               </TouchableHighlight> */}
//             </View>
//           </View>
//   </Modal>
// )

// // const styles = StyleSheet.create({
// //   image: {
// //     marginTop: 20,
// //     marginLeft: 90,
// //     height: 200,
// //     width: 200
// //   },
// //   text: {
// //     fontSize: 20,
// //     marginLeft: 150
// //   }
// // })

export default DisplayModal;

import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

class DisplayModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={ this.props.display }
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}