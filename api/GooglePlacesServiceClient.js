import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, TextInput } from 'react-native';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDhxA3CKtamkzvd-gyK0ewUDb7wDAWdHNc';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchPlaces = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Clothing Donation Center in New Jersey&key=${GOOGLE_PLACES_API_KEY}`
            );
      
            if (!response.ok) {
              throw new Error('Unable to retrieve clothing donation centers in the provided area !!');
            }
      
            const data = await response.json();
            setPlaces(data.results);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
      
        useEffect(() => {
          fetchPlaces();
        }, []);

        return (
            <View style={{ flex: 1, padding: 20 }}>
              <Button title="Fetch Places" onPress={fetchPlaces} />
              {loading && <ActivityIndicator size="large" color="#0000ff" />}
              {error && <Text style={{ color: 'red' }}>{error}</Text>}
              <FlatList
                data={places}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    <Text>{item.formatted_address}</Text>
                  </View>
                )}
              />
            </View>
          );
        };
        
        export default App;