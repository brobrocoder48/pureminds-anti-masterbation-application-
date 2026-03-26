import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../theme';
import { ActivityCard } from '../components/ActivityCard';
import { ACTIVITIES, CATEGORIES, getRandomActivity } from '../data/activities';
import { logActivityCompletion } from '../utils/storage';

export const ActivitiesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);

  const filteredActivities = selectedCategory 
    ? ACTIVITIES.filter(a => a.category === selectedCategory)
    : ACTIVITIES;

  const handleUrgeButton = () => {
    const activity = getRandomActivity();
    setSuggestedActivity(activity);
  };

  const handleActivityComplete = async (activity) => {
    Alert.alert(
      "Complete Activity",
      `Did you finish "${activity.title}"?`,
      [
        { text: "Not yet", style: "cancel" },
        { 
          text: "Yes, I did it!", 
          onPress: async () => {
            const success = await logActivityCompletion(activity.id);
            if (success) {
              setSuggestedActivity(null);
              Alert.alert("Awesome job!", "Activity logged. Stay strong.");
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Panic/Urge Button */}
        <TouchableOpacity 
          style={[styles.urgeButton, SHADOWS.large]}
          activeOpacity={0.9}
          onPress={handleUrgeButton}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.urgeGradient}
            start={{x:0, y:0}} end={{x:1, y:1}}
          >
            <Text style={styles.urgeIcon}>🔥</Text>
            <View>
              <Text style={styles.urgeTitle}>Feeling an Urge?</Text>
              <Text style={styles.urgeSubtitle}>Tap here for a random distraction</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Suggested Activity Banner */}
        {suggestedActivity && (
          <View style={styles.suggestionContainer}>
            <Text style={styles.sectionTitle}>Try This Right Now:</Text>
            <ActivityCard 
              activity={suggestedActivity} 
              onPress={handleActivityComplete}
            />
            <TouchableOpacity onPress={() => setSuggestedActivity(null)}>
              <Text style={styles.dismissText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>Browse Activities</Text>
        
        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          <TouchableOpacity 
            style={[styles.filterChip, !selectedCategory && styles.filterChipActive]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[styles.filterText, !selectedCategory && styles.filterTextActive]}>All</Text>
          </TouchableOpacity>
          
          {Object.values(CATEGORIES).map(cat => (
            <TouchableOpacity 
              key={cat}
              style={[styles.filterChip, selectedCategory === cat && styles.filterChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.filterText, selectedCategory === cat && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* List */}
        <View style={styles.listContainer}>
          {filteredActivities.map((activity) => (
            <ActivityCard 
              key={activity.id} 
              activity={activity} 
              onPress={handleActivityComplete} 
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
  urgeButton: {
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  urgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  urgeIcon: {
    fontSize: 40,
    marginRight: SPACING.md,
  },
  urgeTitle: {
    color: '#FFF',
    fontSize: 20,
    ...FONTS.bold,
  },
  urgeSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 2,
  },
  suggestionContainer: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.surfaceLight,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  dismissText: {
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.sm,
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.textPrimary,
    ...FONTS.bold,
    marginBottom: SPACING.md,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textSecondary,
    ...FONTS.medium,
  },
  filterTextActive: {
    color: '#FFF',
    ...FONTS.bold,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  }
});
