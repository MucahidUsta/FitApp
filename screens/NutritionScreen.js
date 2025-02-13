import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

const NutritionScreen = () => {
  const [dailyCalories, setDailyCalories] = useState({
    target: 2500,
    consumed: 1850,
    remaining: 650
  });

  const [meals, setMeals] = useState([
    {
      id: '1',
      name: 'Kahvaltı',
      calories: 450,
      foods: ['Yulaf', 'Muz', 'Protein Tozu']
    },
    {
      id: '2',
      name: 'Öğle Yemeği',
      calories: 650,
      foods: ['Tavuk Göğsü', 'Pirinç', 'Salata']
    }
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Beslenme Takibi</Text>
        </View>

        <View style={styles.calorieCard}>
          <Text style={styles.calorieTitle}>Günlük Kalori Takibi</Text>
          <View style={styles.calorieStats}>
            <View style={styles.calorieStat}>
              <Text style={styles.calorieValue}>{dailyCalories.consumed}</Text>
              <Text style={styles.calorieLabel}>Alınan</Text>
            </View>
            <View style={styles.calorieStat}>
              <Text style={styles.calorieValue}>{dailyCalories.remaining}</Text>
              <Text style={styles.calorieLabel}>Kalan</Text>
            </View>
            <View style={styles.calorieStat}>
              <Text style={styles.calorieValue}>{dailyCalories.target}</Text>
              <Text style={styles.calorieLabel}>Hedef</Text>
            </View>
          </View>
        </View>

        <View style={styles.mealsSection}>
          <Text style={styles.sectionTitle}>Günlük Öğünler</Text>
          {meals.map(meal => (
            <View key={meal.id} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
              </View>
              <View style={styles.foodList}>
                {meal.foods.map((food, index) => (
                  <Text key={index} style={styles.foodItem}>• {food}</Text>
                ))}
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
  calorieCard: {
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    elevation: 2,
  },
  calorieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  calorieStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  calorieStat: {
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  calorieLabel: {
    color: theme.colors.textSecondary,
  },
  mealsSection: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  mealCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealCalories: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  foodList: {
    marginTop: theme.spacing.sm,
  },
  foodItem: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
});

export default NutritionScreen; 