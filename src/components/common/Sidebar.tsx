// components/Sidebar.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RevenueSVG from "@/assets/icons/revenue-outline.svg";
import OperationSVG from "@/assets/icons/operation.svg";
import InventorySVG from "@/assets/icons/inventory.svg";
import RecipeSVG from "@/assets/icons/recipe.svg";
import { Image } from "expo-image";
import Icon from "@/src/components/common/Icon";

const Sidebar = () => {
  const menuItems = [
    {
      id: "sales",
      title: "매출",
      icon: RevenueSVG,
    },
    {
      id: "inventory",
      title: "재고",
      icon: InventorySVG,
    },
    {
      id: "operations",
      title: "운영",
      icon: OperationSVG,
    },
    {
      id: "menu",
      title: "우리 가게 메뉴",
      icon: RecipeSVG,
    },
  ];

  return (
    <SafeAreaView style={[styles.overlay]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              <Icon icon={item.icon} size={24} color={"black"} />
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.manualButton} activeOpacity={0.8}>
          <Text style={styles.manualButtonText}>매뉴얼북 하러가기 →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutItem} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={24} color="#666" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 60,
  },
  sidebar: {
    width: 280,
    backgroundColor: "#f5f5f5",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
    fontWeight: "500",
  },
  manualButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 30,
    elevation: 3,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  manualButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 15,
    fontWeight: "500",
  },
});

export default Sidebar;
