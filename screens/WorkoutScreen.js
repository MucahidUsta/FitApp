import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { COLORS } from '../config/appConfig';

const workoutData = [
  {
    id: '1',
    name: 'Üst Vücut Programı',
    duration: '45 dk',
    difficulty: 'Orta',
    exercises: ['Bench Press', 'Pull-ups', 'Shoulder Press']
  },
  {
    id: '2',
    name: 'Alt Vücut Programı',
    duration: '40 dk',
    difficulty: 'Zor',
    exercises: ['Squat', 'Deadlift', 'Lunges']
  }
];

const WorkoutScreen = () => {
  const renderWorkoutCard = ({ item }) => (
    <TouchableOpacity style={styles.workoutCard}>
      <Text style={styles.workoutName}>{item.name}</Text>
      <View style={styles.workoutDetails}>
        <Text style={styles.detailText}>🕒 {item.duration}</Text>
        <Text style={styles.detailText}>💪 {item.difficulty}</Text>
      </View>
      <View style={styles.exerciseList}>
        {item.exercises.map((exercise, index) => (
          <Text key={index} style={styles.exerciseItem}>
            • {exercise}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Antrenman Programları</Text>
      </View>
      <FlatList
        data={workoutData}
        renderItem={renderWorkoutCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: theme.spacing.md,
  },
  workoutCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    elevation: 2,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  workoutDetails: {
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  detailText: {
    color: theme.colors.textSecondary,
  },
  exerciseList: {
    marginTop: theme.spacing.md,
  },
  exerciseItem: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
});

export default WorkoutScreen; 