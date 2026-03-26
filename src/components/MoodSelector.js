import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../theme';

const MOODS = [
  { id: 'terrible', emoji: '😢', label: 'Terrible', color: COLORS.moodTerrible },
  { id: 'bad', emoji: '😟', label: 'Bad', color: COLORS.moodBad },
  { id: 'neutral', emoji: '😐', label: 'Okay', color: COLORS.moodNeutral },
  { id: 'good', emoji: '🙂', label: 'Good', color: COLORS.moodGood },
  { id: 'great', emoji: '😊', label: 'Great', color: COLORS.moodGreat },
];

export const MoodSelector = ({ selectedMood, onSelect }) => {
  return (
    <View style={styles.container}>
      {MOODS.map((mood) => {
        const isSelected = selectedMood === mood.id;
        
        return (
          <TouchableOpacity
            key={mood.id}
            activeOpacity={0.7}
            onPress={() => onSelect(mood.id)}
            style={[
              styles.moodButton,
              isSelected && { borderColor: mood.color, backgroundColor: mood.color + '15' },
              isSelected && SHADOWS.glow,
              isSelected && { shadowColor: mood.color }
            ]}
          >
            <Text style={[
              styles.emoji,
              isSelected && { opacity: 1, transform: [{ scale: 1.2 }] }
            ]}>
              {mood.emoji}
            </Text>
            <Text style={[
              styles.label,
              isSelected && { color: mood.color, ...FONTS.bold }
            ]}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  moodButton: {
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 50,
  },
  emoji: {
    fontSize: 28,
    marginBottom: SPACING.xs,
    opacity: 0.6,
  },
  label: {
    fontSize: 10,
    color: COLORS.textSecondary,
    ...FONTS.medium,
  }
});
