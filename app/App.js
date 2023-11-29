import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
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
    const date = new Date(currentDate.getTime() + i * 30 * 60 * 1000); // Adiciona 30 minutos a cada iteração
    simulatedData.push({
      date: date.toISOString(),
      value: parseFloat(randomValue),
    });

    // Simulação do ventilador ligado por 4 horas no total
    if (i >= 2 && i < 8) {
      fanOnTime += 0.5; // A cada 30 minutos
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

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.chartContainer}>
          <View style={styles.bigContainer}>
            <View style={styles.statusContainer}>
              <Icon
                style={styles.statusImg}
                name={fanData.fanStatus ? "power" : "power-off"}
                size={60}
                color={fanData.fanStatus ? "black" : "black"}
              />
              <Text style={styles.statusTitle}>Status</Text>
              <Text style={styles.statusText}>
                {fanData.fanStatus ? "Ligado" : "Desligado"}
              </Text>
            </View>

            <View style={styles.timeContainer}>
              <Icon
                name="access-time"
                size={60}
                color="#FFD700"
                style={styles.timeImg}
              />
              <Text style={styles.timeTitle}>Horas Ligadas</Text>
              <Text style={styles.timeText}>
                {fanData.fanOnTime.toFixed(2)} horas
              </Text>
            </View>
          </View>

          {/* Gráfico de Temperatura */}
          <LineChart
            data={{
              labels: fanData.data.map((item) =>
                new Date(item.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              ),
              datasets: [
                {
                  data: fanData.data.map((item) => item.value),
                },
              ],
            }}
            width={350}
            height={200}
            yAxisLabel="°C"
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chartStyle}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
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

  chartContainer: {
    display: "flex",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statusContainer: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    height: 200,
    width: 200,
    backgroundColor: "#FFD700",
  },
  statusImg: {
    paddingRight: 90,
  },
  statusTitle: {
    fontSize: 15,
  },
  statusText: {
    fontSize: 20,
    marginLeft: 10,
  },
  timeContainer: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    height: 200,
    width: 200,
    backgroundColor: "black",
  },
  timeImg: {
    paddingRight: 90,
  },
  timeTitle: {
    fontSize: "15",
    color: "#FFD700",
  },
  timeText: {
    fontSize: 20,
    marginLeft: 10,
    color: "#FFD700",
  },
});

export default App;
