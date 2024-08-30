import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const DeleteSectionView = () => {
  return (
    <View style={styles.deleteContainer}>
    <Text style={styles.deleteLabel}>Delete account</Text>
    <Text style={styles.deleteDescription}>
      Your account will be permanently removed from the application. All your data will be lost.
    </Text>
    <TouchableOpacity style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Delete account</Text>
    </TouchableOpacity>
  </View>
  )
}

export default DeleteSectionView


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    
    deleteContainer: {
      marginTop: 20,
    },
    deleteLabel: {
      fontSize: 18,
      color: 'red',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    deleteDescription: {
      fontSize: 14,
      color: '#555',
      marginBottom: 10,
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
  
  