import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

const AppointmentScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const availableDates = [
    { date: '8 Temmuz', day: 'Pazartesi' },
    { date: '9 Temmuz', day: 'Salı' },
    { date: '10 Temmuz', day: 'Çarşamba' },
    { date: '11 Temmuz', day: 'Perşembe' },
    { date: '12 Temmuz', day: 'Cuma' },
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const trainers = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      specialty: 'Fitness & Vücut Geliştirme',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      specialty: 'Pilates & Yoga',
      rating: 4.9,
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Randevu Al</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarih Seçin</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.dateContainer}>
              {availableDates.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateCard,
                    selectedDate === item.date && styles.selectedDate
                  ]}
                  onPress={() => setSelectedDate(item.date)}
                >
                  <Text style={styles.dayText}>{item.day}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saat Seçin</Text>
          <View style={styles.timeContainer}>
            {timeSlots.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeCard,
                  selectedTime === time && styles.selectedTime
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={styles.timeText}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eğitmen Seçin</Text>
          {trainers.map((trainer) => (
            <TouchableOpacity key={trainer.id} style={styles.trainerCard}>
              <View style={styles.trainerInfo}>
                <Text style={styles.trainerName}>{trainer.name}</Text>
                <Text style={styles.trainerSpecialty}>{trainer.specialty}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>⭐ {trainer.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Randevu Onayla</Text>
        </TouchableOpacity>
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
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  dateContainer: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
  },
  dateCard: {
    width: 100,
    padding: theme.spacing.md,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: theme.colors.primary,
  },
  dayText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: theme.spacing.xs,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  timeCard: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  },
  selectedTime: {
    backgroundColor: theme.colors.primary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  trainerCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  trainerInfo: {
    gap: theme.spacing.xs,
  },
  trainerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trainerSpecialty: {
    color: theme.colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  bookButton: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  bookButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppointmentScreen; 