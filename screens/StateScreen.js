import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const StateScreen = () => {
  const nav = useNavigation();
  const [data, setData] = useState({});
  const [expanded, setExpanded] = useState({});
  const [averageMHI, setAverageMHI] = useState({});
  const [saePOV, setSAEPOV] = useState({});
  const [saePOVALL, setSAEPOVALL] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.census.gov/data/timeseries/poverty/saipe?time=2022&for=county:*&in=state:*&key=d43aae5fc3c0d64d56fd18cfaa382ddc8aaf85af&get=STABREV,NAME,SAEMHI_PT,SAEPOVALL_PT,SAEPOVRTALL_PT");
      const json = await response.json();
      const counties = {};
      const median_list = {};
      const averages = {};
      const saes = {};
      const saesPOVALL_list = {};

      for (let inc = 1; inc < json.length; inc++) {
        const state = json[inc][0];
        const county = json[inc][1];
        const median = Number(json[inc][2]);
        const sae = Number(json[inc][3]);
        const saeALL = Number(json[inc][4]);

        if (!counties[state]) {
          counties[state] = [];
          median_list[state] = [];
          averages[state] = { total: 0, count: 0 };
          saes[state] = { total: 0, count: 0 };
          saesPOVALL_list[state] = { total: 0, count: 0 };
        }
        counties[state].push(county);
        median_list[state].push([county, median]);
        averages[state].total += median;
        averages[state].count += 1;
        saes[state].total += sae;
        saes[state].count += 1;
        saesPOVALL_list[state].total += saeALL;
        saesPOVALL_list[state].count += 1;
      }

      for (const state in averages) {
        averages[state] = Math.round(averages[state].total / averages[state].count);
      }
      for (const state in saes) {
        saes[state] = Math.round(saes[state].total / saes[state].count);
      }
      for (const state in saesPOVALL_list) {
        saesPOVALL_list[state] = Math.round(saesPOVALL_list[state].total / saesPOVALL_list[state].count);
      }

      setAverageMHI(averages);
      setSAEPOV(saes);
      setSAEPOVALL(saesPOVALL_list);
      setData(counties);
    } catch (e) {
      console.log("Error is: " + e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const dropdown = (state) => {
    setExpanded((prev) => ({ ...prev, [state]: !prev[state] }));
  };
  const handleNav = (state) =>{
    let tempCounties = data[state];
    nav.navigate("County", { counties: tempCounties, pass: state });
  }
  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={Object.keys(data)}
        keyExtractor={(state) => state}
        renderItem={({ item: state }) => (
          <View style={styles.container}>
            <TouchableOpacity style={styles.stateButton} onPress={() => dropdown(state)}>
              <Text style={styles.text}>{expanded[state] ? '▼' : '►'} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stateButton} onPress={() => handleNav(state)}>
              <Text style={styles.text}>{state}</Text>
            </TouchableOpacity>
            {expanded[state] && (
              <View>
                <Text>Average median household income: ${averageMHI[state]}</Text>
                <Text>SAEPOVALL_PT: ${saePOV[state]}</Text>
                <Text>SAEPOVRTALL_PT: ${saePOVALL[state]}</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

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
    alignSelf: 'center'
  }
});

export default StateScreen;
