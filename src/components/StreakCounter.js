import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  runOnJS
} from 'react-native-reanimated';
import { COLORS, FONTS, SHADOWS } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

export const StreakCounter = ({ days }) => {
  const [displayDays, setDisplayDays] = useState(0);
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animate in
    scale.value = withSpring(1, { damping: 12, stiffness: 100 });
    opacity.value = withSpring(1);
    
    // Quick, simple number incrementer effect
    if (days > 0 && displayDays === 0) {
      let current = 0;
      const step = Math.ceil(days / 20); // 20 frames roughly
      
      const interval = setInterval(() => {
        current += step;
        if (current >= days) {
          setDisplayDays(days);
          clearInterval(interval);
          
          // Little bounce when hits target
          scale.value = withSequence(
            withSpring(1.1, { damping: 10, stiffness: 400 }),
            withSpring(1, { damping: 10, stiffness: 400 })
          );
        } else {
          setDisplayDays(current);
        }
      }, 30);
      
      return () => clearInterval(interval);
    } else {
      setDisplayDays(days);
    }
  }, [days, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  // Determine glow color based on streak length
  const glowColor = days >= 30 ? COLORS.success : 
                    days >= 7 ? COLORS.primary : 
                    COLORS.secondary;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LinearGradient
        colors={[COLORS.surfaceLight, COLORS.surface]}
        style={[styles.circle, { shadowColor: glowColor }, SHADOWS.glow]}
      >
        <Text style={styles.number}>{displayDays}</Text>
        <Text style={styles.label}>
          {displayDays === 1 ? 'DAY' : 'DAYS'}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardHover,
  },
  number: {
    color: COLORS.textPrimary,
    fontSize: 72,
    ...FONTS.extrabold,
    lineHeight: 80, // Prevent cropping on some devices
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 18,
    ...FONTS.bold,
    letterSpacing: 2,
  }
});
