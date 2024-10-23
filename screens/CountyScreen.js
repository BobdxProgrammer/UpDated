import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';

const CountyScreen = () => {
  const nav = useNavigation();
  const route = useRoute();
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [countiesMHI, setCountiesMHI] = useState({});
  const [countiesPOV, setCountiesPOV] = useState({});
  const [countiesPOVALL, setCountiesPOVALL] = useState({});
  const [state, setState] = useState("");
  const [counties, setCounties] = useState([]);
  const [selectedcounty, setSelectedCounty] = useState([]);
  const [selectedstate, setSelectedState] = useState([]);
  const [chosenCounty, setChosenCounty] = useState("");

  const fetchData = async () => {
    try {
      setState(route.params?.pass);
      setCounties(route.params?.counties);
      
      const response = await fetch("https://api.census.gov/data/timeseries/poverty/saipe?time=2022&for=county:*&in=state:*&key=d43aae5fc3c0d64d56fd18cfaa382ddc8aaf85af&get=STABREV,NAME,SAEMHI_PT,SAEPOVALL_PT,SAEPOVRTALL_PT");
      const json = await response.json();
      
      const countiesMHI_list = {};
      const countiesPOV_list = {};
      const countiesPOVALL_list = {};
      json.forEach((item, index) => {
        if (index > 0) { // Skip header row
          const countyName = item[1];
          setSelectedCounty(route.params?.countyName);
          const stateAbbrev = item[0];
          setSelectedState(route.params?.stateAbbrev);
          const combinedKey = `${countyName}_${stateAbbrev}`;
          countiesMHI_list[combinedKey] = item[2];
          countiesPOV_list[combinedKey] = item[3];
          countiesPOVALL_list[combinedKey] = item[4];
        }
      });

      setCountiesMHI(countiesMHI_list);
      setCountiesPOV(countiesPOV_list);
      setCountiesPOVALL(countiesPOVALL_list);
      setData(json);
    } catch (e) {
      console.log("Error is: " + e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route.params?.pass]);

  const toggleDropdown = (item) => {
    setExpanded(prev => ({ ...prev, [item]: !prev[item] }));
    let temp_item = item; //Set temp variable to store current item DO NOT DO setChosenCounty(item). Doing so stores previous item.
    setChosenCounty(temp_item);
  };

  const handleNavigate = () => {
    nav.navigate('DonationLocations', { selectedcounty: chosenCounty, selectedstate: state });
  };

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity style={styles.stateButton} onPress={() => nav.navigate("States")}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={counties}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <TouchableOpacity style={styles.stateButton} onPress={() => toggleDropdown(item)}>
              <Text style={styles.text}>{expanded[item] ? '▼' : '►'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stateButton} onPress={() => nav.navigate("Need")}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
            {expanded[item] && (
              <View>
                <Text> Average median household income: ${countiesMHI[`${item}_${state}`]} </Text>
                <Text> Number of people in Poverty: {countiesPOV[`${item}_${state}`]} </Text>
                <Text> Poverty Rate: {countiesPOVALL[`${item}_${state}`]}% </Text>

                <Button  title="Find Donation Center"
                    style={styles.button} 
                    onPress={handleNavigate} 
                    accessibilityLabel="Find Donation Center"
                    accessibilityRole="button"
                >
                <Text style={styles.buttonText}>Find Donation Center</Text>
                </Button >
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "#A020F0",
    flex: 1,
    justifyContent: "center"
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 15,
    marginTop: 15
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    backgroundColor: '#A020F0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 100,
  },
  stateButton: {
    backgroundColor: '#A020F0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
  }
});

export default CountyScreen;
