import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../config/appConfig';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Fit</Text>
          <Text style={styles.subtitle}>Size nasıl yardımcı olabilirim?</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('Workout')}
          >
            <Icon name="dumbbell" size={32} color={COLORS.primary} />
            <Text style={styles.optionTitle}>Spor Programı</Text>
            <Text style={styles.optionDesc}>
              Egzersizlerinizi takip edin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('Nutrition')}
          >
            <Icon name="food-apple" size={32} color={COLORS.primary} />
            <Text style={styles.optionTitle}>Diyet Programı</Text>
            <Text style={styles.optionDesc}>
              Beslenmenizi yönetin
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Konular</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Stres</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Anksiyete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Depresyon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>İlişkiler</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Günlük İpuçları</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Nefes Egzersizi</Text>
            <Text style={styles.tipText}>
              Günde 5 dakika derin nefes egzersizi yaparak stresinizi azaltın.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.background,
    opacity: 0.8,
  },
  optionsContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    padding: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  optionDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 5,
  },
  categoriesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoryCard: {
    padding: 15,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  tipsContainer: {
    padding: 20,
  },
  tipCard: {
    padding: 15,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tipText: {
    color: COLORS.textSecondary,
  },
});

export default HomeScreen; 