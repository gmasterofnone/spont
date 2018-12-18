import React, { Component } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import BackgroundGeolocation from "react-native-background-geolocation";



import DarkStyles from '../../styles/DarkStyles.json';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      location: ''
    }
  }

  componentDidMount() {
    BackgroundGeolocation.onLocation(this.onLocation, this.onError);
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 1,
      // Application config
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://yourserver.com/locations',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      headers: {              // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
     

      if (state.enabled) {
        console.log(state)
        ////
        // 3. Start tracking!
        //
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }

  onLocation(location) {
    console.log('[location] -', location);
  }
  onError(error) {
    console.warn('[location] ERROR -', error);
  }

  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }

  render() {
    return(
      <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
        <MapView
          provider={ PROVIDER_GOOGLE }
          style={ styles.container }
          customMapStyle={ DarkStyles }
          showsUserLocation = {true}
          initialRegion={{
            latitude: 39.7392,
            longitude: -104.9953,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    )
  }
}



const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    }
});
