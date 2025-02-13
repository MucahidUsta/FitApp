import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../config/appConfig';

// Ekranlar
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import NutritionScreen from '../screens/NutritionScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import MessagesScreen from '../screens/MessagesScreen';
import AppointmentScreen from '../screens/AppointmentScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Ana Sayfa':
              iconName = 'home';
              break;
            case 'Antrenman':
              iconName = 'dumbbell';
              break;
            case 'Beslenme':
              iconName = 'food-apple';
              break;
            case 'İlerleme':
              iconName = 'chart-line';
              break;
            case 'Profil':
              iconName = 'account';
              break;
            case 'Sıralama':
              iconName = 'trophy';
              break;
            case 'Mesajlar':
              iconName = 'message';
              break;
            case 'Randevu':
              iconName = 'calendar';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
      <Tab.Screen name="Antrenman" component={WorkoutScreen} />
      <Tab.Screen name="Beslenme" component={NutritionScreen} />
      <Tab.Screen name="İlerleme" component={ProgressScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Sıralama" component={LeaderboardScreen} />
      <Tab.Screen name="Mesajlar" component={MessagesScreen} />
      <Tab.Screen name="Randevu" component={AppointmentScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;