import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Keyboard,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { MoodSelector } from '../components/MoodSelector';
import { saveJournalEntry, getJournalEntries } from '../utils/storage';

const PROMPTS = [
  "What triggered your urge today, and how did you overcome it?",
  "How clear is your mind feeling right now compared to day 1?",
  "What is one positive thing you accomplished today?",
  "If you relapsed, what went wrong and how will you prevent it next time?",
  "What are you most grateful for in your life right now?"
];

export const JournalScreen = () => {
  const [mood, setMood] = useState('neutral');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);
  const [prompt, setPrompt] = useState(PROMPTS[0]);

  const loadEntries = async () => {
    const data = await getJournalEntries();
    setEntries(data || []);
  };

  useFocusEffect(
    useCallback(() => {
      loadEntries();
      // Pick a random prompt daily (simplified here)
      const dateString = new Date().toDateString();
      const promptIndex = dateString.charCodeAt(0) % PROMPTS.length;
      setPrompt(PROMPTS[promptIndex]);
    }, [])
  );

  const handleSave = async () => {
    if (!note.trim() && mood === 'neutral') {
      Alert.alert("Empty Entry", "Please write something or select a mood.");
      return;
    }

    const entry = { mood, note, prompt };
    await saveJournalEntry(entry);
    
    setNote('');
    setMood('neutral');
    Keyboard.dismiss();
    loadEntries(); // Refresh list
  };

  const getEmojiForMood = (m) => {
    const map = { terrible: '😢', bad: '😟', neutral: '😐', good: '🙂', great: '😊' };
    return map[m] || '😐';
  };

  const renderEntry = ({ item }) => {
    const date = new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
    
    return (
      <View style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryDate}>{date}</Text>
          <Text style={styles.entryEmoji}>{getEmojiForMood(item.mood)}</Text>
        </View>
        {item.note ? (
          <Text style={styles.entryNote}>{item.note}</Text>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.composer}>
          <Text style={styles.promptLabel}>Prompt of the day</Text>
          <Text style={styles.prompt}>{prompt}</Text>
          
          <MoodSelector selectedMood={mood} onSelect={setMood} />
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write your thoughts here..."
              placeholderTextColor={COLORS.textMuted}
              multiline
              textAlignVertical="top"
              value={note}
              onChangeText={setNote}
            />
          </View>
          
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>SAVE ENTRY</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Past Entries</Text>
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            renderItem={renderEntry}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No journal entries yet. Start writing!</Text>
            }
          />
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  composer: {
    marginBottom: SPACING.lg,
  },
  promptLabel: {
    color: COLORS.primary,
    ...FONTS.bold,
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  prompt: {
    color: COLORS.textPrimary,
    ...FONTS.semibold,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    height: 120,
    marginBottom: SPACING.md,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    padding: SPACING.md,
    fontSize: 15,
    ...FONTS.regular,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    ...FONTS.bold,
    fontSize: 14,
    letterSpacing: 1,
  },
  historyContainer: {
    flex: 1,
  },
  historyTitle: {
    color: COLORS.textSecondary,
    ...FONTS.semibold,
    fontSize: 18,
    marginBottom: SPACING.md,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
  entryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  entryDate: {
    color: COLORS.textMuted,
    fontSize: 12,
    ...FONTS.medium,
  },
  entryEmoji: {
    fontSize: 20,
  },
  entryNote: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: SPACING.xs,
  },
  emptyText: {
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.xl,
    fontStyle: 'italic',
  }
});
