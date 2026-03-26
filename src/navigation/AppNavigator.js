import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, FONTS } from '../theme';

// Import Screens
import { HomeScreen } from '../screens/HomeScreen';
import { ActivitiesScreen } from '../screens/ActivitiesScreen';
import { BreatheScreen } from '../screens/BreatheScreen';
import { JournalScreen } from '../screens/JournalScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { EmergencyScreen } from '../screens/EmergencyScreen';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const TabIcon = ({ name, color, focused }) => {
  let emoji = '🏠';
  if (name === 'Activities') emoji = '🎯';
  if (name === 'Breathe') emoji = '🧘';
  if (name === 'Journal') emoji = '📓';
  if (name === 'Progress') emoji = '📈';

  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconFocused]}>
      <Text style={[styles.iconText, { opacity: focused ? 1 : 0.6 }]}>{emoji}</Text>
    </View>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: COLORS.background, shadowColor: 'transparent', elevation: 0 },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { ...FONTS.bold, fontSize: 20 },
        tabBarStyle: {
          backgroundColor: COLORS.tabBarBg,
          borderTopColor: COLORS.tabBarBorder,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: COLORS.tabActive,
        tabBarInactiveTintColor: COLORS.tabInactive,
        tabBarIcon: ({ color, focused }) => <TabIcon name={route.name} color={color} focused={focused} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'PureMinds' }} />
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Breathe" component={BreatheScreen} />
      <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={MainTabs} />
        {/* Full screen modal for emergency */}
        <RootStack.Screen 
          name="EmergencyModal" 
          component={EmergencyScreen} 
          options={{ presentation: 'fullScreenModal', animation: 'fade' }} 
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  iconText: {
    fontSize: 22,
  }
});
