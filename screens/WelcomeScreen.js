import { useNavigation } from '@react-navigation/native'; // Updated import to the correct path
import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';

const WelcomeScreen = () => {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <Image 
        source={{ uri: 'https://your-image-url-here.jpg' }} // Use a direct image URL
        style={styles.image} 
      />
      <Text style={styles.subtitle}>
        This app uses historical data from the American Consumer Survey and Census Organization of the United States to identify families in low-income areas who face challenges in fulfilling their basic needs. It predicts clothing needs based on artificial intelligence and machine learning. The app also provides options to donate clothing based on several factors.
      </Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => nav.navigate("States")} 
        accessibilityLabel="Proceed to State screen"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#A020F0',
    paddingTop: 50,
  },
  welcome: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#CBC3E3',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8f662b',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%', // Make the image responsive
    height: 200, // Set a fixed height
    resizeMode: 'cover', // Maintain aspect ratio
    marginBottom: 20, // Add some margin for spacing
  },
  button: {
    backgroundColor: '#8f662b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
