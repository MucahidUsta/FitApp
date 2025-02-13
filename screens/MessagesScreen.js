import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

const MessagesScreen = () => {
  const messages = [
    {
      id: '1',
      user: {
        name: 'Ali Yılmaz',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      lastMessage: 'Yarınki antrenman için hazır mısın?',
      timestamp: '10:30',
      unread: true,
    },
    {
      id: '2',
      user: {
        name: 'Zeynep Demir',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      lastMessage: 'Grup dersinde görüşürüz!',
      timestamp: 'Dün',
      unread: false,
    },
  ];

  const renderMessage = ({ item }) => (
    <TouchableOpacity style={styles.messageItem}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text 
          style={[styles.lastMessage, item.unread && styles.unreadMessage]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mesajlar</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.newMessageButton}>
        <Text style={styles.newMessageButtonText}>Yeni Mesaj</Text>
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
  listContainer: {
    padding: theme.spacing.md,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: theme.spacing.md,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  lastMessage: {
    color: theme.colors.textSecondary,
  },
  unreadMessage: {
    color: theme.colors.text,
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },
  newMessageButton: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  newMessageButtonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
});

export default MessagesScreen; 