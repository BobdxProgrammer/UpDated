import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";


const DonationLocationsScreen = ({ route }) => {
  const { centers } = route.params;


  const renderCenter = ({ item }) => (
    <View style={styles.center}>
      {item.photos && item.photos.length > 0 && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=AIzaSyDhxA3CKtamkzvd-gyK0ewUDb7wDAWdHNc`
          }}
          style={styles.image}
        />
      )}
      <Text style={styles.centerName}>{item.name}</Text>
      <Text>Status: {item.business_status}</Text>
      <Text>Address: {item.formatted_address}</Text>
      <Text>Opening Hours: {item.opening_hours ? (item.opening_hours.open_now ? 'Open Now' : 'Closed') : 'N/A'}</Text>
      <Text>User Ratings: {item.user_ratings_total} ratings</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donation Centers</Text>
      <FlatList
        data={centers}
        keyExtractor={(item) => item.place_id}
        renderItem={renderCenter}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  center: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  centerName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
});


export default DonationLocationsScreen;





