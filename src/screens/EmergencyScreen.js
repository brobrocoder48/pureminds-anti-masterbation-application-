import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';

export const EmergencyScreen = ({ navigation }) => {
  // Trigger strong haptic feedback constantly to break thought patterns
  useEffect(() => {
    const interval = setInterval(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (actionRoute) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Close modal then navigate to the specific tab
    navigation.goBack();
    if (actionRoute) {
      setTimeout(() => {
        navigation.navigate(actionRoute);
      }, 300);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.emergencyGradientStart, COLORS.emergencyGradientEnd]}
      style={styles.container}
      start={{x:0, y:0}} end={{x:1, y:1}}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeBtnText}>✕ Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.alertIcon}>🚨</Text>
          <Text style={styles.title}>EMERGENCY MODE</Text>
          <Text style={styles.subtitle}>
            Don't act on the urge. Your brain is lying to you right now. 
            This feeling will pass. Do not give in.
          </Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionBtn, styles.primaryAction]} 
              onPress={() => handleAction('Breathe')}
            >
              <Text style={styles.actionIcon}>🧘</Text>
              <View>
                <Text style={[styles.actionBtnText, styles.primaryActionText]}>Breathe Now</Text>
                <Text style={[styles.actionBtnSub, styles.primaryActionSub]}>Start guided 4-7-8 breathing</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionBtn, styles.secondaryAction]} 
              onPress={() => handleAction('Activities')}
            >
              <Text style={styles.actionIcon}>🏃‍♂️</Text>
              <View>
                <Text style={styles.actionBtnText}>Find Distraction</Text>
                <Text style={styles.actionBtnSub}>Pick an alternative activity</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionBtn, styles.dangerAction]} 
              onPress={() => handleAction('Journal')}
            >
              <Text style={styles.actionIcon}>📓</Text>
              <View>
                <Text style={styles.actionBtnText}>Log This Urge</Text>
                <Text style={styles.actionBtnSub}>Why are you feeling this?</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: SPACING.md,
    alignItems: 'flex-end',
  },
  closeBtn: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  closeBtnText: {
    color: '#FFF',
    ...FONTS.bold,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertIcon: {
    fontSize: 72,
    marginBottom: SPACING.md,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    ...FONTS.extrabold,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    ...FONTS.medium,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: SPACING.xxl,
  },
  actionsContainer: {
    width: '100%',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  primaryAction: {
    backgroundColor: '#FFFFFF',
  },
  actionIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 18,
    ...FONTS.bold,
  },
  actionBtnSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 2,
  },
});

styles.primaryActionText = {
  ...styles.actionBtnText,
  color: COLORS.primaryDark
};
styles.primaryActionSub = {
  ...styles.actionBtnSub,
  color: COLORS.textMuted
};
