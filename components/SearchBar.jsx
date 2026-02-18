import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native"

export default function SearchBar({music, setTracks}) {

    const [search, setSearch] = useState('')
    const inputRef = useRef(null)

    function filterByValue(array, string) {

    return array.filter(o => {
        const {title, artist} = o
        const object = {title, artist}
        const values = Object.values(object)
        return values.some(v => v.toLowerCase().includes(string.toLowerCase()))
    })
    }

    const filter = () => {
        const filtered = filterByValue(music, search)
        setTracks(filtered)
    }

    return (
        <View style={styles.searchBar}>
  <View style={styles.input}>
    <TextInput
      ref={inputRef}
      value={search}
      onChangeText={setSearch}
      placeholder="Search for a song..."
      placeholderTextColor="#999"
      style={styles.textInput}
    />

    <Pressable
      onPress={() => {
        setSearch('')
        setTracks(music)
        inputRef.current?.focus()
      }}
      style={styles.clearButton}
    >
      <Text style={styles.clearText}>X</Text>
    </Pressable>
  </View>

  <Pressable style={styles.button} onPress={filter}>
    <Text style={styles.buttonText}>🔍</Text>
  </Pressable>
</View>
    )
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },

  input: {
    flex: 1,                     
    flexDirection: 'row',      
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },

  textInput: {
    flex: 1,                  
    fontSize: 16,
    paddingVertical: 0,        
  },

  clearButton: {
    marginLeft: 8,
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
    color: '#555',
  },

  button: {
    marginLeft: 8,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});