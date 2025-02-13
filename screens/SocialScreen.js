import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

const SocialScreen = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const posts = [
    {
      id: '1',
      user: {
        name: 'Mehmet Yılmaz',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      content: 'Bugün bench press\'te yeni rekor! 💪 100kg x 5 tekrar',
      likes: 24,
      comments: 8,
      timestamp: '2 saat önce',
      achievement: 'Yeni PR'
    },
    {
      id: '2',
      user: {
        name: 'Ayşe Kaya',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      content: '30 günlük squat challenge tamamlandı! 🎉',
      likes: 45,
      comments: 12,
      timestamp: '4 saat önce',
      achievement: '30 Gün Challenge'
    }
  ];

  const challenges = [
    {
      id: '1',
      title: '100 Şınav Challenge',
      participants: 156,
      daysLeft: 5,
      reward: '500 Puan'
    },
    {
      id: '2',
      title: '10K Koşu Maratonu',
      participants: 89,
      daysLeft: 12,
      reward: '1000 Puan'
    }
  ];

  const renderPost = (post) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
        </View>
        {post.achievement && (
          <View style={styles.achievementBadge}>
            <Text style={styles.achievementText}>{post.achievement}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.postContent}>{post.content}</Text>
      
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text>👍 {post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>💬 {post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>📤 Paylaş</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderChallenge = (challenge) => (
    <TouchableOpacity key={challenge.id} style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <Text style={styles.challengeTitle}>{challenge.title}</Text>
        <Text style={styles.challengeReward}>{challenge.reward}</Text>
      </View>
      
      <View style={styles.challengeStats}>
        <Text style={styles.challengeParticipants}>
          👥 {challenge.participants} Katılımcı
        </Text>
        <Text style={styles.challengeDaysLeft}>
          ⏰ {challenge.daysLeft} Gün Kaldı
        </Text>
      </View>
      
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Katıl</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Topluluk</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}
        >
          <Text style={styles.tabText}>Akış</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'challenges' && styles.activeTab]}
          onPress={() => setActiveTab('challenges')}
        >
          <Text style={styles.tabText}>Meydan Okumalar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {activeTab === 'feed' ? (
          <View style={styles.feedContainer}>
            {posts.map(renderPost)}
          </View>
        ) : (
          <View style={styles.challengesContainer}>
            {challenges.map(renderChallenge)}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fabButton}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  tab: {
    flex: 1,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontWeight: '500',
    color: theme.colors.text,
  },
  feedContainer: {
    padding: theme.spacing.md,
  },
  postCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  userName: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  achievementBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  achievementText: {
    color: theme.colors.background,
    fontSize: 12,
    fontWeight: '500',
  },
  postContent: {
    marginBottom: theme.spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface,
    paddingTop: theme.spacing.sm,
  },
  actionButton: {
    padding: theme.spacing.sm,
  },
  challengesContainer: {
    padding: theme.spacing.md,
  },
  challengeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  challengeReward: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  challengeParticipants: {
    color: theme.colors.textSecondary,
  },
  challengeDaysLeft: {
    color: theme.colors.textSecondary,
  },
  joinButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  joinButtonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  fabButton: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    fontSize: 24,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
});

export default SocialScreen; 