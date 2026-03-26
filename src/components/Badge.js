import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

export const Badge = ({ days, achieved, title }) => {
  const isGold = days >= 90;
  const isSilver = days >= 30 && days < 90;
  const isBronze = days >= 7 && days < 30;

  let colors = [COLORS.surfaceLight, COLORS.surface];
  let icon = '🌱';
  let glow = null;

  if (achieved) {
    if (isGold) {
      colors = ['#FFD700', '#FFA500']; // Gold
      icon = '🏆';
      glow = { shadowColor: '#FFD700', shadowOpacity: 0.6, shadowRadius: 10, elevation: 8 };
    } else if (isSilver) {
      colors = ['#E0E0E0', '#9E9E9E']; // Silver
      icon = '🥈';
      glow = { shadowColor: '#E0E0E0', shadowOpacity: 0.6, shadowRadius: 8, elevation: 6 };
    } else if (isBronze) {
      colors = ['#CD7F32', '#A0522D']; // Bronze
      icon = '🥉';
      glow = { shadowColor: '#CD7F32', shadowOpacity: 0.6, shadowRadius: 8, elevation: 6 };
    } else {
      colors = [COLORS.primary, COLORS.primaryDark];
      icon = '⭐';
      glow = SHADOWS.glow;
    }
  }

  return (
    <View style={[styles.container, !achieved && styles.unachievedContainer]}>
      <LinearGradient
        colors={colors}
        style={[styles.badgeBase, achieved ? glow : null]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.icon, !achieved && styles.grayscaleIcon]}>{icon}</Text>
      </LinearGradient>
      
      <View style={styles.textContainer}>
        <Text style={[styles.days, !achieved && styles.unachievedText]}>
          {days} Days
        </Text>
        {title && (
          <Text style={[styles.title, !achieved && styles.unachievedText]}>
            {title}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: SPACING.md,
    width: 80,
  },
  unachievedContainer: {
    opacity: 0.5,
  },
  badgeBase: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: SPACING.sm,
  },
  icon: {
    fontSize: 32,
  },
  grayscaleIcon: {
    opacity: 0.2, // Rough approximation of grayscale since we can't easily filter emoji
  },
  textContainer: {
    alignItems: 'center',
  },
  days: {
    color: COLORS.textPrimary,
    fontSize: 14,
    ...FONTS.bold,
  },
  title: {
    color: COLORS.textSecondary,
    fontSize: 10,
    ...FONTS.medium,
    textAlign: 'center',
    marginTop: 2,
  },
  unachievedText: {
    color: COLORS.textMuted,
  }
});
