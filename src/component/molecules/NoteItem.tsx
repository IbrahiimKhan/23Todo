/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';

export default function NoteItem({task, deleteNote}: any) {
  const navigation = useNavigation();
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{task.title}</Text>
        <Text>{task.content}</Text>
      </View>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('AddNote', {task})}
      />
      <Button title="X" onPress={deleteNote} color="red" />
    </View>
  );
}
