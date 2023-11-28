import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu App React Native</Text>

      <View style={styles.cardsContainer}>
        <Card>
          <Text>Conteúdo do Card 1</Text>
        </Card>

        <Card>
          <Text>Conteúdo do Card 2</Text>
        </Card>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99],
              },
            ],
          }}
          width={300}
          height={200}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: "center",
  },
});

export default App;
