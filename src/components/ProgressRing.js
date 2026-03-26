import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { COLORS, FONTS } from '../theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ProgressRing = ({ 
  progress = 0, // 0 to 1
  size = 120, 
  strokeWidth = 12, 
  color = COLORS.primary,
  label = '',
  sublabel = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const center = size / 2;
  
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    // Ensure progress is between 0 and 1
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    animatedProgress.value = withTiming(clampedProgress, {
      duration: 1500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [progress, animatedProgress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (circumference * animatedProgress.value);
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={{ width: size, height: size }}>
      <Svg style={StyleSheet.absoluteFill}>
        {/* Background Track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={COLORS.surfaceLight}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Arc */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          originX={center}
          originY={center}
          rotation="-90" // Start from top
        />
      </Svg>
      
      {/* Center Text */}
      <View style={[styles.textContainer, StyleSheet.absoluteFill]}>
        {!!label && <Text style={styles.label}>{label}</Text>}
        {!!sublabel && <Text style={styles.sublabel}>{sublabel}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 28,
    ...FONTS.bold,
  },
  sublabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    ...FONTS.medium,
    marginTop: 2,
  }
});
