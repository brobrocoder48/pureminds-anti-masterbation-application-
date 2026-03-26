import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../theme';
import { CATEGORIES, DIFFICULTY } from '../data/activities';
import { LinearGradient } from 'expo-linear-gradient';

export const ActivityCard = ({ activity, onPress }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={() => onPress && onPress(activity)}
      style={[styles.card, SHADOWS.medium]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.emoji}>{activity.emoji}</Text>
          <Text style={styles.title} numberOfLines={1}>{activity.title}</Text>
        </View>
        <CategoryBadge category={activity.category} />
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {activity.description}
      </Text>
      
      <View style={styles.footer}>
        <View style={styles.meta}>
          <Text style={styles.metaIcon}>⏱️</Text>
          <Text style={styles.metaText}>{activity.duration}</Text>
        </View>
        <DifficultyBadge difficulty={activity.difficulty} />
      </View>
    </TouchableOpacity>
  );
};

const CategoryBadge = ({ category }) => {
  let color = COLORS.primary;
  
  switch(category) {
    case CATEGORIES.PHYSICAL: color = COLORS.danger; break;
    case CATEGORIES.CREATIVE: color = COLORS.accent; break;
    case CATEGORIES.MINDFULNESS: color = COLORS.success; break;
    case CATEGORIES.LEARNING: color = COLORS.info; break;
    case CATEGORIES.SOCIAL: color = COLORS.warning; break;
  }

  return (
    <View style={[styles.badge, { backgroundColor: color + '20', borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{category}</Text>
    </View>
  );
};

const DifficultyBadge = ({ difficulty }) => {
  let color = COLORS.success;
  let dots = "🟢";

  if (difficulty === DIFFICULTY.MEDIUM) {
    color = COLORS.warning;
    dots = "🟡";
  } else if (difficulty === DIFFICULTY.HARD) {
    color = COLORS.danger;
    dots = "🔴";
  }

  return (
    <View style={styles.difficultyContainer}>
      <Text style={styles.difficultyDots}>{dots}</Text>
      <Text style={[styles.difficultyText, { color }]}>{difficulty}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.sm,
  },
  emoji: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    ...FONTS.semibold,
    flex: 1,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
    paddingTop: SPACING.sm,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 14,
    marginRight: SPACING.xs,
  },
  metaText: {
    color: COLORS.textMuted,
    fontSize: 12,
    ...FONTS.medium,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    ...FONTS.bold,
    textTransform: 'uppercase',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyDots: {
    fontSize: 10,
    marginRight: 4,
  },
  difficultyText: {
    fontSize: 12,
    ...FONTS.bold,
  }
});
