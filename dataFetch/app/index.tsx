import PostsList from "@/components/PostList";
import { DataContext, DataProvider } from "@/context/DataContext";
import { Products, ProductsResponse } from "@/types/types";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable } from "react-native";

const AppContent: React.FC = () => {
  const { setProducts } = useContext(DataContext);
  const [allProducts, setAllProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: ProductsResponse = await res.json();
      setAllProducts(data.products.slice(0, 20)); // store original
      setProducts(data.products.slice(0, 20)); // set displayed
    } catch (err) {
      console.error("Failed fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleReload = () => {
    setSearchQuery(""); // clear search
    fetchProducts();
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(text.toLowerCase())
    );
    setProducts(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Product list */}
      <PostsList />

      {/* Reload Button */}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
  },
  buttonWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  customButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
