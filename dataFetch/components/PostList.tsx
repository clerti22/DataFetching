import React, { useContext } from "react";
import {
  FlatList, StyleSheet, Text, View, Image, Pressable, TextInput

} from "react-native";
import { DataContext } from "../context/DataContext";
import { Products } from "../types/types";

export default function PostsList() {
  const { products } = useContext(DataContext);

  const renderPost = ({ item, index }: { item: Products; index: number }) => (


    <View style={styles.card}>
      



      <Image
        source={{ uri: item.thumbnail }}
        style={{ width: '100%', height: 400 }}
        resizeMode="cover"
      />

      <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
        {item.title}
      </Text>
      <Text>Price: ${item.price}</Text>
      <Text>Description: {item.description}</Text>
      <Pressable style={{ backgroundColor: 'green', height: 30, borderRadius: 10 }}>
        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: 'white' }}>Add to Cart</Text>
      </Pressable>
    </View>
  );



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Posts (Fetch API)</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginTop: 20, color: 'red' },
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  title: {
    fontWeight: "bold"
  },
});