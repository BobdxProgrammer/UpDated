import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DonationLocationsScreen from '../screens/DonationLocationsScreen';
import HelpScreen from '../screens/HelpScreen';
import CountyScreen from '../screens/CountyScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import StateScreen from '../screens/StateScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DetailScreen from '../screens/DetailScreen';


const Stack = createNativeStackNavigator();


const App = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    // Sample data including county names, poverty rates, and clothing need index
    const json = [
      { county: "Burlington NJ", latitude: 37.7749, longitude: -122.4194, povertyRate: 15.2, clothingNeedIndex: 0.3 },
      { county: "Camden NJ", latitude: 37.7849, longitude: -122.4294, povertyRate: 20.5, clothingNeedIndex: 0.7 },
      { county: "Atlantic NJ", latitude: 37.7949, longitude: -122.4394, povertyRate: 10.1, clothingNeedIndex: 0.2 },
      { county: "Alleghany PA", latitude: 37.8049, longitude: -122.4494, povertyRate: 25.0, clothingNeedIndex: 0.9 },
      { county: "Adams", latitude: 37.8149, longitude: -122.4594, povertyRate: 18.3, clothingNeedIndex: 0.5 },
    ];
    setData(json);
  }, []);


  const getPinColor = (povertyRate) => {
    if (povertyRate < 15) return 'green';
    if (povertyRate < 20) return 'yellow';
    if (povertyRate < 25) return 'orange';
    return 'red';
  };


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Map" options={{ title: 'County Map' }}>
          {({ navigation }) => (
            <View style={styles.container}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 37.7749,
                  longitude: -122.4194,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
              >
                {data.map((county, index) => (
                  <Marker
                    key={index}
                    coordinate={{ latitude: county.latitude, longitude: county.longitude }}
                    pinColor={getPinColor(county.povertyRate)}
                    onPress={() => {
                      navigation.navigate('Detail', {
                        countyName: county.county,
                        povertyRate: county.povertyRate,
                        clothingNeedIndex: county.clothingNeedIndex,
                      });
                    }}
                  />
                ))}
              </MapView>
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="DonationLocations" component={DonationLocationsScreen} />
        <Stack.Screen name="Help" component={HelpScreen}/>
        <Stack.Screen name="County" component={CountyScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="States" component={StateScreen}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default App;





