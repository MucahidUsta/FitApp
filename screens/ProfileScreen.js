import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

const ProfileScreen = () => {
  const userProfile = {
    name: 'Ahmet Yılmaz',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    level: 'Fitness Uzmanı',
    points: 2500,
    followers: 245,
    following: 180,
    achievements: [
      { id: 1, title: '30 Gün Challenge', icon: '🏃‍♂️' },
      { id: 2, title: 'Güç Kralı', icon: '💪' },
      { id: 3, title: 'Erken Kuş', icon: '🌅' },
    ],
    stats: {
      workouts: 156,
      calories: '45,230',
      hours: 180
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.level}>{userProfile.level}</Text>
          
          <View style={styles.socialStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.followers}</Text>
              <Text style={styles.statLabel}>Takipçi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.following}</Text>
              <Text style={styles.statLabel}>Takip</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.points}</Text>
              <Text style={styles.statLabel}>Puan</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Başarılar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.achievementsContainer}>
              {userProfile.achievements.map(achievement => (
                <View key={achievement.id} style={styles.achievementCard}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İstatistikler</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>{userProfile.stats.workouts}</Text>
              <Text style={styles.statsLabel}>Antrenman</Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>{userProfile.stats.calories}</Text>
              <Text style={styles.statsLabel}>Kalori</Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>{userProfile.stats.hours}</Text>
              <Text style={styles.statsLabel}>Saat</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Profili Düzenle</Text>
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
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  level: {
    fontSize: 16,
    color: theme.colors.background,
    opacity: 0.8,
  },
  socialStats: {
    flexDirection: 'row',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  statLabel: {
    color: theme.colors.background,
    opacity: 0.8,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  achievementCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    width: 100,
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  achievementTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: theme.colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginHorizontal: theme.spacing.xs,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statsLabel: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  editButton: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  editButtonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 