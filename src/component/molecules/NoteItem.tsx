import React from 'react';
import {Button, Text, View} from 'react-native';

export default function NoteItem({task, deleteTask, editTask}: any) {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{task.title}</Text>
        <Text>{task.content}</Text>
      </View>
      <Button title="Edit" onPress={() => editTask(task)} />
      <Button title="X" onPress={deleteTask} color="red" />
    </View>
  );
}
