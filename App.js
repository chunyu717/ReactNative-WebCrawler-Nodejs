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
  TouchableHighlight,
  Modal,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//import Ticker from "react-native-ticker";
//const phantom = require('phantom'); // import module 
//import phantom from "phantom" // import module 
//import cheerio from 'react-native-cheerio'
//import phantom from 'phantom'
//const puppeteer = require('puppeteer');

import DisplayModal from './components/DisplayModal';
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
    this.timer = setInterval(()=> this.getEvent(), 10000);
  }

  componentWillUnmount() {
    this.timer = null; // here...
  }

  async getEvent() {
    // fetch('https://122.116.214.159/api/listEvent', {})
    // //fetch('https://hosenmassage.ddns.net/api/listEvent', {})
    // .then((response) => {
    //   // 這裡會得到一個 ReadableStream 的物件 , 可以透過 blob(), json(), text() 轉成可用的資訊
    //   return response.json(); 
    // }).then((jsonData) => {
    //   if( jsonData.message[0].title !== '---' ) {
    //     this.setState( {dataSource: jsonData.message  }   )
    //   }
    // }).catch((err) => {
    //   console.warn('錯誤:', err);
    // });

    try {
      console.warn('aaa');
      let response = await fetch(
        'https://hosenmassage.ddns.net/api/listEvent',
        //'http://122.116.214.159/api/listEvent',
      );
      console.warn('bbb');
      let responseJson = await response.json();
      if( responseJson && responseJson.message && responseJson.message[0].title !== '---' ) {
         this.setState( {dataSource: responseJson.message  }   )
      }
      console.warn('ccc');
    } catch (error) {
      console.warn('eee');
      //console.warn(error);
    }

    // fetch('https://122.116.214.159/api/listEvent', {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     "Connection": "close",
    //   }
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   if( responseJson && responseJson.message && responseJson.message[0].title !== '---' ) {
    //     this.setState( {dataSource: responseJson.message  }   )
    //   }
    //   console.warn('bbb');
    // })
    // .catch((error) => {
    //   console.error(error);
    // });;

  }

  submit() {
    console.warn('submit');
  }

  render() {
    const {navigate} = this.props.navigation;

    const items = this.state.dataSource.map((item, key) =>
        <View key={item.index} /*style={{backgroundColor: 'blue'}} */>
          <Text style={styles.text2} > {item.index} 診 </Text>
          <Text style={styles.text} >
            {item.title}
          </Text>
          <Button
            title=  "主動叫號通知"
            //onPress={() => Alert.alert('Simple Button pressed')}
            onPress={ () => this.setState({isAlertVisible: true}) }
          />
          <Separator key={ 1000 + item.index} />
        </View>
    );

    return (
      <SafeAreaView style={styles.container} >
        <Image
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
              //onPress={() => Alert.alert('Right button pressed')}
              onPress={() => navigate('Profile', {name: 'Jane'})}
            />
          </View>
          <DialogInput isDialogVisible={this.state.isAlertVisible}
                     title={"Login"}
                     message={"Enter your name"}
                     hintInput ={"hint for the input"}
                     submitInput={ (inputText) => {this.submit(inputText)} }
                     closeDialog={ () => this.setState({isAlertVisible:false}) }>
         </DialogInput>
        </View>
        
        {/* <DisplayModal 
            //image = { Krunal }
            //data = "Krunal"
            display = { this.state.display }
          /> */}
      </SafeAreaView>
    );
  }
};


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
    backgroundColor: "#FFFF00" ,
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

App = createAppContainer(MainNavigator);

export default App;
