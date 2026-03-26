import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { BreathingCircle } from '../components/BreathingCircle';
import { BREATHING_PATTERNS } from '../data/breathingPatterns';

export const BreatheScreen = () => {
  const [selectedPattern, setSelectedPattern] = useState(BREATHING_PATTERNS[0]);
  const [isActive, setIsActive] = useState(false);

  const toggleSession = () => {
    setIsActive(!isActive);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Breathe</Text>
        <Text style={styles.subtitle}>Center yourself and let the urge pass.</Text>
      </View>

      <View style={styles.circleContainer}>
        <BreathingCircle 
          pattern={selectedPattern} 
          isActive={isActive} 
        />
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[
            styles.mainButton, 
            { backgroundColor: isActive ? COLORS.danger : COLORS.primary }
          ]}
          onPress={toggleSession}
        >
          <Text style={styles.mainButtonText}>
            {isActive ? 'STOP SESSION' : 'START SESSION'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Select Pattern</Text>
        
        <ScrollView style={styles.patternScroll}>
          {BREATHING_PATTERNS.map((pattern) => (
            <TouchableOpacity 
              key={pattern.id}
              style={[
                styles.patternCard,
                selectedPattern.id === pattern.id && { borderColor: pattern.color }
              ]}
              onPress={() => !isActive && setSelectedPattern(pattern)}
              disabled={isActive}
            >
              <View style={[styles.colorDot, { backgroundColor: pattern.color }]} />
              <View style={styles.patternInfo}>
                <Text style={styles.patternName}>{pattern.name}</Text>
                <Text style={styles.patternDesc}>{pattern.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  title: {
    fontSize: 28,
    color: COLORS.textPrimary,
    ...FONTS.bold,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    ...FONTS.medium,
    marginTop: 4,
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  controlsContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
  },
  mainButton: {
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: -SPACING.lg - 20, // Overlap the border
    alignSelf: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  mainButtonText: {
    color: '#FFF',
    ...FONTS.bold,
    letterSpacing: 1,
    fontSize: 16,
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    ...FONTS.semibold,
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: SPACING.md,
    marginLeft: SPACING.xs,
  },
  patternScroll: {
    maxHeight: 200,
  },
  patternCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.md,
  },
  patternInfo: {
    flex: 1,
  },
  patternName: {
    color: COLORS.textPrimary,
    ...FONTS.semibold,
    fontSize: 16,
  },
  patternDesc: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  }
});
