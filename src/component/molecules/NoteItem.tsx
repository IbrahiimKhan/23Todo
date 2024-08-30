/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function NoteItem({task, deleteNote}: any) {
  const navigation = useNavigation();
  return (
    <View style={styles.itemContainer}>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{task.title}</Text>
        <Text>{task.content}</Text>
      </View>
      <View style={styles.actionContainer}>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('AddNote', {task})}
        />
        <Button title="X" onPress={deleteNote} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 5,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
