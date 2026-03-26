import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence, 
  withRepeat,
  withDelay,
  Easing,
  runOnJS,
  cancelAnimation
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.6;

export const BreathingCircle = ({ 
  pattern, // { inhale, hold, exhale, holdEmpty, color }
  isActive, 
  onSessionComplete 
}) => {
  const [phaseText, setPhaseText] = useState('Ready');
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    if (!isActive) {
      cancelAnimation(scale);
      cancelAnimation(opacity);
      scale.value = withTiming(1);
      opacity.value = withTiming(0.5);
      setPhaseText('Ready');
      return;
    }

    const triggerHaptic = (type = 'Light') => {
      if (type === 'Light') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (type === 'Medium') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const updateText = (text) => setPhaseText(text);

    const runBreathingCycle = () => {
      // 1. Inhale
      runOnJS(updateText)('INHALE');
      runOnJS(triggerHaptic)('Medium');
      scale.value = withTiming(1.5, { duration: pattern.inhale, easing: Easing.inOut(Easing.ease) });
      opacity.value = withTiming(1, { duration: pattern.inhale, easing: Easing.inOut(Easing.ease) });

      let currentDelay = pattern.inhale;

      // 2. Hold (Full)
      if (pattern.hold > 0) {
        setTimeout(() => {
          if (!isActive) return;
          runOnJS(updateText)('HOLD');
          runOnJS(triggerHaptic)('Light');
        }, currentDelay);
        currentDelay += pattern.hold;
      }

      // 3. Exhale
      setTimeout(() => {
        if (!isActive) return;
        runOnJS(updateText)('EXHALE');
        runOnJS(triggerHaptic)('Medium');
        scale.value = withTiming(1, { duration: pattern.exhale, easing: Easing.inOut(Easing.ease) });
        opacity.value = withTiming(0.5, { duration: pattern.exhale, easing: Easing.inOut(Easing.ease) });
      }, currentDelay);
      currentDelay += pattern.exhale;

      // 4. Hold (Empty)
      if (pattern.holdEmpty > 0) {
        setTimeout(() => {
          if (!isActive) return;
          runOnJS(updateText)('HOLD');
          runOnJS(triggerHaptic)('Light');
        }, currentDelay);
        currentDelay += pattern.holdEmpty;
      }

      return currentDelay;
    };

    // Initial cycle
    const cycleDuration = runBreathingCycle();

    // Setup interval for subsequent cycles
    const interval = setInterval(() => {
      if (isActive) runBreathingCycle();
    }, cycleDuration);

    return () => {
      clearInterval(interval);
    };
  }, [isActive, pattern]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      {/* Outer animated circle */}
      <Animated.View style={[styles.circleOuter, animatedStyle]}>
        <LinearGradient
          colors={[pattern.color, COLORS.background]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      
      {/* Inner static circle with text */}
      <View style={[styles.circleInner, { borderColor: pattern.color }]}>
        <Text style={styles.text}>{phaseText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: CIRCLE_SIZE * 2,
  },
  circleOuter: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    overflow: 'hidden',
  },
  circleInner: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    ...FONTS.bold,
    letterSpacing: 4,
  }
});
