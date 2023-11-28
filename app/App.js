import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
    simulatedData.push({ date: date.toISOString(), value: parseFloat(randomValue) });

    // Simulação do ventilador ligado por 4 horas no total
    if (i >= 2 && i < 8) {
      fanOnTime += 0.5; // A cada 30 minutos
    }
  }

  return { data: simulatedData, fanOnTime, fanStatus: fanOnTime > 0 };
};

const App = () => {
  const [fanData, setFanData] = useState({ data: [], fanOnTime: 0, fanStatus: false });
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    try {
      const result = generateRandomData();
      setFanData(result);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
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
          {/* Status do Ventilador */}
          <View style={styles.statusContainer}>
            <Icon name={fanData.fanStatus ? 'power-off' : 'power'} size={30} color={fanData.fanStatus ? 'green' : 'red'} />
            <Text style={styles.statusText}>{fanData.fanStatus ? 'Ligado' : 'Desligado'}</Text>
          </View>

          {/* Tempo Ligado do Ventilador */}
          <View style={styles.timeContainer}>
            <Icon name="clock" size={30} color="black" />
            <Text style={styles.timeText}>{fanData.fanOnTime.toFixed(2)} horas</Text>
          </View>

          {/* Gráfico de Temperatura */}
          <LineChart
            data={{
              labels: fanData.data.map((item) => new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
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
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
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
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 20,
    marginLeft: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default App;
