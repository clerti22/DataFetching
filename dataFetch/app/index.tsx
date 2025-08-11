import PostsList from "@/components/PostList";
import { DataContext, DataProvider } from "@/context/DataContext";
import { Products,ProductsResponse } from "@/types/types";
import React, { useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AppContent: React.FC = () => {
  const { setProducts } = useContext(DataContext);

const fetchProducts = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data: ProductsResponse = await res.json();
    setProducts(data.products.slice(0, 20));
  } catch (err) {
    console.error("Failed fetching products:", err);
  }
};


  useEffect(() => {
    fetchProducts();

  }, []);

  const handleReload = () => {
   fetchProducts();
  };

  return (
    <SafeAreaView style={styles.container}>
      <PostsList />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.customButton} onPress={handleReload}>
          <Text style={styles.buttonText}>Reload Data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default function Index() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40 },
  buttonWrapper: {
    alignItems: "center", // centers horizontally
    marginVertical: 20,
  },
  customButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3, // shadow on Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
