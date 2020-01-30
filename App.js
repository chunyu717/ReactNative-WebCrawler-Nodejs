/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Image,
  // TouchableHighlight,
  // Modal,
} from 'react-native';

import {
  // Header,
  // LearnMoreLinks,
  // DebugInstructions,
  // ReloadInstructions,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// import DisplayModal from './components/DisplayModal';
import DialogInput from 'react-native-dialog-input';

function Separator() {
  return <View style={styles.separator} />;
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loaded: false,
      isAlertVisible: false,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getEvent(), 10000);
  }

  componentWillUnmount() {
    this.timer = null; // here...
  }

  async getEvent() {
    try {
      let response = await fetch('https://hosenmassage.ddns.net/api/listEvent');
      let responseJson = await response.json();
      if (
        responseJson &&
        responseJson.message &&
        responseJson.message[0].title !== '---'
      ) {
        this.setState({dataSource: responseJson.message});
      }
    } catch (error) {
      console.warn(error);
    }
  }

  submit() {
    console.warn('submit');
  }

  render() {
    const {navigate} = this.props.navigation;

    const items = this.state.dataSource.map((item, key) => (
      <View key={item.index} /*style={{backgroundColor: 'blue'}} */>
        <Text style={styles.text2}> {item.index} 診 </Text>
        <Text style={styles.text}>{item.title}</Text>
        <Button
          title="主動叫號通知"
          onPress={() => this.setState({isAlertVisible: true})}
        />
        <Separator key={1000 + item.index} />
      </View>
    ));

    return (
      <SafeAreaView style={styles.container}>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%'}}
          source={require('./img/logo_9030.jpg')}
        />

        {items}

        <Separator />
        <View>
          <View style={styles.fixToText}>
            <Button
              title="Left button"
              onPress={() => Alert.alert('Left button pressed')}
            />
            <Button
              title="Right button"
              onPress={() => navigate('Profile', {name: 'Jane'})}
            />
          </View>
          <DialogInput
            isDialogVisible={this.state.isAlertVisible}
            title={'Login'}
            message={'Enter your name'}
            hintInput={'hint for the input'}
            submitInput={inputText => {
              this.submit(inputText);
            }}
            closeDialog={() => this.setState({isAlertVisible: false})}
          />
        </View>
        {/* <DisplayModal
            //image = { Krunal }
            //data = "Krunal"
            display = { this.state.display }
          /> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
  // engine: {
  //   position: 'absolute',
  //   right: 0,
  // },
  // body: {
  //   backgroundColor: Colors.white,
  // },
  // sectionContainer: {
  //   //marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.black,
  // },
  // sectionDescription: {
  //   //marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
  container: {
    flex: 1,
    //paddingTop: -50,
    marginTop: 5,
    //marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 40,
    //color: "#FFF",
    textAlign: 'center',
    color: Colors.black,
  },
  text2: {
    fontSize: 40,
    //color: "#FFF",
    backgroundColor: '#FFFF00',
    textAlign: 'center',
    color: Colors.black,
  },
});

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Home', {name: 'Jane'})}
      />
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
