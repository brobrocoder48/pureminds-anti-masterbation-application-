import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  STREAK_START_DATE: '@pureminds_streak_start',
  JOURNAL_ENTRIES: '@pureminds_journal',
  COMPLETED_ACTIVITIES: '@pureminds_activities',
  LONGEST_STREAK: '@pureminds_longest_streak',
  TOTAL_CLEAN_DAYS: '@pureminds_total_clean',
};

// --- STREAK MANAGEMENT ---

export const getStreak = async () => {
  try {
    const startDateStr = await AsyncStorage.getItem(KEYS.STREAK_START_DATE);
    if (!startDateStr) return 0;

    const startDate = new Date(startDateStr);
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays;
  } catch (e) {
    console.error('Error getting streak', e);
    return 0;
  }
};

export const startStreak = async () => {
  try {
    const now = new Date().toISOString();
    await AsyncStorage.setItem(KEYS.STREAK_START_DATE, now);
    return true;
  } catch (e) {
    console.error('Error starting streak', e);
    return false;
  }
};

export const resetStreak = async () => {
  try {
    // First, save current streak if it's the longest
    const currentStreak = await getStreak();
    const longestStreakStr = await AsyncStorage.getItem(KEYS.LONGEST_STREAK);
    const longestStreak = longestStreakStr ? parseInt(longestStreakStr, 10) : 0;
    
    if (currentStreak > longestStreak) {
      await AsyncStorage.setItem(KEYS.LONGEST_STREAK, currentStreak.toString());
    }

    // Reset start date to now
    const now = new Date().toISOString();
    await AsyncStorage.setItem(KEYS.STREAK_START_DATE, now);
    return true;
  } catch (e) {
    console.error('Error resetting streak', e);
    return false;
  }
};

export const getLongestStreak = async () => {
  try {
    const longestStr = await AsyncStorage.getItem(KEYS.LONGEST_STREAK);
    return longestStr ? parseInt(longestStr, 10) : 0;
  } catch (e) {
    return 0;
  }
};

// --- JOURNAL MANAGEMENT ---

export const saveJournalEntry = async (entry) => {
  try {
    const existingStr = await AsyncStorage.getItem(KEYS.JOURNAL_ENTRIES);
    const existing = existingStr ? JSON.parse(existingStr) : [];
    
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...entry
    };
    
    const updated = [newEntry, ...existing];
    await AsyncStorage.setItem(KEYS.JOURNAL_ENTRIES, JSON.stringify(updated));
    return newEntry;
  } catch (e) {
    console.error('Error saving journal', e);
    return null;
  }
};

export const getJournalEntries = async () => {
  try {
    const entriesStr = await AsyncStorage.getItem(KEYS.JOURNAL_ENTRIES);
    return entriesStr ? JSON.parse(entriesStr) : [];
  } catch (e) {
    console.error('Error getting journal', e);
    return [];
  }
};

// --- ACTIVITY TRACKING ---

export const logActivityCompletion = async (activityId) => {
  try {
    const existingStr = await AsyncStorage.getItem(KEYS.COMPLETED_ACTIVITIES);
    const existing = existingStr ? JSON.parse(existingStr) : [];
    
    const newEntry = {
      id: Date.now().toString(),
      activityId,
      date: new Date().toISOString(),
    };
    
    const updated = [newEntry, ...existing];
    await AsyncStorage.setItem(KEYS.COMPLETED_ACTIVITIES, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Error logging activity', e);
    return false;
  }
};

export const getCompletedActivitiesCount = async () => {
  try {
    const existingStr = await AsyncStorage.getItem(KEYS.COMPLETED_ACTIVITIES);
    const existing = existingStr ? JSON.parse(existingStr) : [];
    return existing.length;
  } catch (e) {
    return 0;
  }
};

// INITIALIZATION
export const initStorageIfEmpty = async () => {
  const startDate = await AsyncStorage.getItem(KEYS.STREAK_START_DATE);
  if (!startDate) {
    await startStreak();
  }
};
