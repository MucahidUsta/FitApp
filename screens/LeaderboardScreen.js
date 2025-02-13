import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

const LeaderboardScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const leaderboardData = [
    {
      id: '1',
      name: 'Mehmet Yılmaz',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      points: 2500,
      rank: 1,
    },
    {
      id: '2',
      name: 'Ayşe Kaya',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      points: 2350,
      rank: 2,
    },
    // ... diğer kullanıcılar
  ];

  const renderLeaderboardItem = ({ item, index }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.rank}>#{item.rank}</Text>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.points}>{item.points} puan</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sıralama</Text>
      </View>

      <View style={styles.periodSelector}>
        <TouchableOpacity 
          style={[styles.periodButton, selectedPeriod === 'weekly' && styles.selectedPeriod]}
          onPress={() => setSelectedPeriod('weekly')}
        >
          <Text style={styles.periodButtonText}>Haftalık</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.periodButton, selectedPeriod === 'monthly' && styles.selectedPeriod]}
          onPress={() => setSelectedPeriod('monthly')}
        >
          <Text style={styles.periodButtonText}>Aylık</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.periodButton, selectedPeriod === 'allTime' && styles.selectedPeriod]}
          onPress={() => setSelectedPeriod('allTime')}
        >
          <Text style={styles.periodButtonText}>Tüm Zamanlar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={leaderboardData}
        renderItem={renderLeaderboardItem}
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
  periodSelector: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  periodButton: {
    flex: 1,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  selectedPeriod: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  periodButtonText: {
    color: theme.colors.text,
    fontWeight: '500',
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
  },
  points: {
    color: theme.colors.primary,
  },
});

export default LeaderboardScreen; 