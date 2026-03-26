import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  RefreshControl
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../theme';
import { Badge } from '../components/Badge';
import { getStreak, getLongestStreak, getCompletedActivitiesCount } from '../utils/storage';

export const ProgressScreen = () => {
  const [streak, setStreak] = useState(0);
  const [longest, setLongest] = useState(0);
  const [activitiesCount, setActivitiesCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    const s = await getStreak();
    const l = await getLongestStreak();
    const a = await getCompletedActivitiesCount();
    setStreak(s);
    // Longest streak is either the saved longest or the current one if it's currently longer
    setLongest(Math.max(s, l));
    setActivitiesCount(a);
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  }, []);

  const milestones = [
    { days: 1, title: 'Day One' },
    { days: 3, title: 'Getting Started' },
    { days: 7, title: 'One Week' },
    { days: 14, title: 'Two Weeks' },
    { days: 30, title: 'One Month' },
    { days: 90, title: 'Brain Reboot' },
    { days: 180, title: 'Half Year' },
    { days: 365, title: 'One Year' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        <Text style={styles.headerTitle}>Your Journey</Text>
        
        {/* Stats Summary */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{longest}</Text>
            <Text style={styles.statLabel}>Longest Streak</Text>
          </View>
        </View>
        
        <View style={[styles.statBox, styles.statBoxFull]}>
            <Text style={[styles.statValue, { color: COLORS.accent }]}>{activitiesCount}</Text>
            <Text style={styles.statLabel}>Healthy Activities Completed</Text>
        </View>

        <Text style={styles.sectionTitle}>Milestones</Text>
        
        <View style={styles.badgesGrid}>
          {milestones.map((m) => (
            <Badge 
              key={m.days.toString()} 
              days={m.days} 
              title={m.title} 
              achieved={streak >= m.days} 
            />
          ))}
        </View>

      </ScrollView>
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
  },
  headerTitle: {
    fontSize: 28,
    color: COLORS.textPrimary,
    ...FONTS.bold,
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    marginHorizontal: SPACING.sm / 2,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  statBoxFull: {
    flex: 'none',
    width: '100%',
    marginHorizontal: 0,
    marginBottom: SPACING.xl,
  },
  statValue: {
    fontSize: 36,
    color: COLORS.primaryLight,
    ...FONTS.extrabold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    ...FONTS.medium,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.textPrimary,
    ...FONTS.bold,
    marginBottom: SPACING.md,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    paddingVertical: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  }
});
