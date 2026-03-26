import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../theme';
import { StreakCounter } from '../components/StreakCounter';
import { ProgressRing } from '../components/ProgressRing';
import { getStreak, initStorageIfEmpty, getCompletedActivitiesCount } from '../utils/storage';
import { getRandomQuote } from '../data/quotes';

export const HomeScreen = ({ navigation }) => {
  const [streak, setStreak] = useState(0);
  const [quote, setQuote] = useState('');
  const [activitiesCount, setActivitiesCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    await initStorageIfEmpty();
    const currentStreak = await getStreak();
    const count = await getCompletedActivitiesCount();
    
    setStreak(currentStreak);
    setActivitiesCount(count);
    
    // Only update quote daily or on first load
    if (!quote) setQuote(getRandomQuote());
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  // Calculate generic weekly goal progress (e.g., target 5 activities/week)
  // For MVP, just a dummy calculation based on total
  const weeklyTarget = 5;
  const progress = Math.min((activitiesCount % weeklyTarget) / weeklyTarget, 1) || 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.subtitle}>Stay strong today.</Text>

        <View style={styles.streakContainer}>
          <StreakCounter days={streak} />
        </View>

        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>"{quote}"</Text>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={[styles.actionBox, SHADOWS.small]} 
            onPress={() => navigation.navigate('Breathe')}
          >
            <LinearGradient colors={['#1C2140', '#141830']} style={styles.actionGradient}>
              <Text style={styles.actionIcon}>🧘</Text>
              <Text style={styles.actionTitle}>Breathe</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionBox, SHADOWS.small]}
            onPress={() => navigation.navigate('Journal')}
          >
            <LinearGradient colors={['#1C2140', '#141830']} style={styles.actionGradient}>
              <Text style={styles.actionIcon}>📓</Text>
              <Text style={styles.actionTitle}>Log Mood</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.fullWidthAction, SHADOWS.small]}
          onPress={() => navigation.navigate('Activities')}
        >
          <LinearGradient 
            colors={[COLORS.primaryDark, COLORS.primary]} 
            start={{x:0, y:0}} end={{x:1, y:1}}
            style={styles.fullWidthGradient}
          >
            <View style={styles.fullWidthContent}>
              <View>
                <Text style={styles.fullWidthTitle}>Find an Activity</Text>
                <Text style={styles.fullWidthSubtitle}>Divert your mind now</Text>
              </View>
              <Text style={styles.actionIconLarge}>🚀</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.statsCard}>
          <View style={styles.statsInfo}>
            <Text style={styles.statsTitle}>Weekly Goal</Text>
            <Text style={styles.statsSubtitle}>{activitiesCount % weeklyTarget}/{weeklyTarget} activities</Text>
          </View>
          <ProgressRing 
            progress={progress} 
            size={80} 
            strokeWidth={8} 
            color={COLORS.success} 
          />
        </View>

      </ScrollView>

      {/* EMERGENCY FAB */}
      <TouchableOpacity 
        style={[styles.fab, SHADOWS.glow, { shadowColor: COLORS.danger }]}
        onPress={() => navigation.navigate('EmergencyModal')} // defined in root nav
      >
        <LinearGradient
          colors={['#FF416C', '#FF4B2B']}
          style={styles.fabGradient}
        >
          <Text style={styles.fabIcon}>🚨</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACING.md,
    paddingBottom: 100, // padding for FAB
  },
  greeting: {
    fontSize: 28,
    color: COLORS.textPrimary,
    ...FONTS.bold,
    marginTop: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    ...FONTS.medium,
    marginBottom: SPACING.lg,
  },
  streakContainer: {
    alignItems: 'center',
  },
  quoteCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginVertical: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  quoteText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.textPrimary,
    ...FONTS.bold,
    marginBottom: SPACING.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  actionBox: {
    flex: 1,
    height: 100,
    borderRadius: RADIUS.md,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  actionGradient: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: SPACING.xs,
  },
  actionTitle: {
    color: COLORS.textPrimary,
    ...FONTS.semibold,
    fontSize: 14,
  },
  fullWidthAction: {
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
  },
  fullWidthGradient: {
    padding: SPACING.lg,
  },
  fullWidthContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fullWidthTitle: {
    color: '#FFF',
    fontSize: 18,
    ...FONTS.bold,
  },
  fullWidthSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  actionIconLarge: {
    fontSize: 36,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  statsInfo: {
    flex: 1,
  },
  statsTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    ...FONTS.bold,
    marginBottom: 4,
  },
  statsSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  fabGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: 28,
  }
});
