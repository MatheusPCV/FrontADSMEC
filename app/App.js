import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const getRandomFloat = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

const generateRandomData = () => {
  const simulatedData = [];
  const currentDate = new Date();
  let fanOnTime = 0;

  for (let i = 0; i < 10; i++) {
    const randomValue = getRandomFloat(20, 30);
    const date = new Date(currentDate.getTime() + i * 30 * 60 * 1000);
    simulatedData.push({
      date: date.toISOString(),
      value: parseFloat(randomValue),
    });

    if (i >= 2 && i < 8) {
      fanOnTime += 0.5;
    }
  }

  return { data: simulatedData, fanOnTime, fanStatus: fanOnTime > 0 };
};

const App = () => {
  const [fanData, setFanData] = useState({
    data: [],
    fanOnTime: 0,
    fanStatus: false,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    try {
      const result = generateRandomData();
      setFanData(result);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>API Fetcher</Text>
      <Button title="Fetch Data" onPress={fetchData} />
      <View style={styles.gap}></View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <View style={styles.bigContainer}>
          <View style={styles.blockContainer}>
            <View style={styles.timeContainer}>
              <Icon name="access-time" size={60} color="#000" style={styles.timeImg} />
              <Text style={styles.timeTitle}>Horas Ligadas</Text>
              <Text style={styles.timeText}>{fanData.fanOnTime.toFixed(2)} Horas</Text>
            </View>
          </View>

          <View style={styles.blockContainer}>
            <View style={styles.temperatureContainer}>
              <Icon name="thermostat" size={60} color="#000" style={styles.temperatureImg} />
              <Text style={styles.temperatureTitle}>Temperatura Atual</Text>
              <Text style={styles.temperatureText}>
                {fanData.data.length > 0 ? fanData.data[0].value.toFixed(2) : "-"} °C
              </Text>
            </View>
          </View>

          <View style={styles.blockContainer}>
            <View style={styles.statusContainer}>
              <Icon
                style={styles.statusImg}
                name={fanData.fanStatus ? "power" : "power-off"}
                size={60}
                color={fanData.fanStatus ? "#000" : "#000"}
              />
              <Text style={styles.statusTitle}>Status</Text>
              <Text style={styles.statusText}>{fanData.fanStatus ? "Ligado" : "Desligado"}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  blockContainer: {
    width: "45%", // Ajuste conforme necessário
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  temperatureContainer: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
    height: 200,
    backgroundColor: "#FFD700",
    borderRadius: 16,
    overflow: "hidden",
  },
  temperatureImg: {
    paddingRight: 90,
  },
  temperatureTitle: {
    fontSize: 15,
    color: "#000",
  },
  temperatureText: {
    fontSize: 20,
    marginLeft: 10,
    color: "#000",
    fontWeight: "bold",
  },
  gap: {
    marginBottom: 20,
  },
  statusContainer: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
    height: 200,
    backgroundColor: "black",
    borderRadius: 16,
    overflow: "hidden",
  },
  statusImg: {
    paddingRight: 90,
    color: "#FFD700",
  },
  statusTitle: {
    fontSize: 15,
    color: "#FFD700",
  },
  statusText: {
    fontSize: 20,
    marginLeft: 10,
    color: "#FFD700",
    fontWeight: "bold",
  },
  timeContainer: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
    height: 200,
    backgroundColor: "#FFD700",
    borderRadius: 16,
    overflow: "hidden",
  },
  timeImg: {
    paddingRight: 90,
  },
  timeTitle: {
    fontSize: 15,
    color: "#000",
  },
  timeText: {
    fontSize: 20,
    marginLeft: 10,
    color: "#000",
    fontWeight: "bold",
  },
});

export default App;
