import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { theme } from '../theme/theme';

const ProgressScreen = () => {
  const [selectedMetric, setSelectedMetric] = useState('weight');
  
  const progressData = {
    weight: {
      labels: ['1 Haz', '8 Haz', '15 Haz', '22 Haz', '29 Haz', '6 Tem'],
      data: [85, 84, 83.5, 82.8, 82, 81.5],
      unit: 'kg'
    },
    bodyFat: {
      labels: ['1 Haz', '15 Haz', '29 Haz', '6 Tem'],
      data: [22, 21, 20, 19.5],
      unit: '%'
    },
    muscle: {
      labels: ['1 Haz', '15 Haz', '29 Haz', '6 Tem'],
      data: [35, 35.5, 36, 36.5],
      unit: '%'
    }
  };

  const measurements = [
    { date: '6 Tem 2024', weight: 81.5, bodyFat: 19.5, muscle: 36.5 },
    { date: '29 Haz 2024', weight: 82, bodyFat: 20, muscle: 36 },
    { date: '15 Haz 2024', weight: 83.5, bodyFat: 21, muscle: 35.5 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>İlerleme Takibi</Text>
        </View>

        <View style={styles.metricsContainer}>
          <TouchableOpacity 
            style={[styles.metricButton, selectedMetric === 'weight' && styles.selectedMetric]}
            onPress={() => setSelectedMetric('weight')}
          >
            <Text style={styles.metricButtonText}>Kilo</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.metricButton, selectedMetric === 'bodyFat' && styles.selectedMetric]}
            onPress={() => setSelectedMetric('bodyFat')}
          >
            <Text style={styles.metricButtonText}>Yağ Oranı</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.metricButton, selectedMetric === 'muscle' && styles.selectedMetric]}
            onPress={() => setSelectedMetric('muscle')}
          >
            <Text style={styles.metricButtonText}>Kas Kütlesi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: progressData[selectedMetric].labels,
              datasets: [{
                data: progressData[selectedMetric].data
              }]
            }}
            width={350}
            height={220}
            chartConfig={{
              backgroundColor: theme.colors.surface,
              backgroundGradientFrom: theme.colors.surface,
              backgroundGradientTo: theme.colors.surface,
              decimalPlaces: 1,
              color: () => theme.colors.primary,
              labelColor: () => theme.colors.textSecondary,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Ölçüm Geçmişi</Text>
          {measurements.map((measurement, index) => (
            <View key={index} style={styles.measurementCard}>
              <Text style={styles.measurementDate}>{measurement.date}</Text>
              <View style={styles.measurementDetails}>
                <View style={styles.measurementItem}>
                  <Text style={styles.measurementLabel}>Kilo</Text>
                  <Text style={styles.measurementValue}>{measurement.weight} kg</Text>
                </View>
                <View style={styles.measurementItem}>
                  <Text style={styles.measurementLabel}>Yağ Oranı</Text>
                  <Text style={styles.measurementValue}>{measurement.bodyFat}%</Text>
                </View>
                <View style={styles.measurementItem}>
                  <Text style={styles.measurementLabel}>Kas Kütlesi</Text>
                  <Text style={styles.measurementValue}>{measurement.muscle}%</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.md,
  },
  metricButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
  selectedMetric: {
    backgroundColor: theme.colors.primary,
  },
  metricButtonText: {
    color: theme.colors.text,
    fontWeight: '500',
  },
  chartContainer: {
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  chart: {
    marginVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  historyContainer: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  measurementCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  measurementDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  measurementDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  measurementItem: {
    alignItems: 'center',
  },
  measurementLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  measurementValue: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.primary,
  },
});

export default ProgressScreen; 