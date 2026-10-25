// src/screens/StockScreen.tsx
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SAMPLE_STOCK } from "../data/sampleData";
import { StockItem, StockLocation } from "../types/stock";

const LOCATIONS: { key: StockLocation; label: string }[] = [
  { key: "frigo", label: "Frigo" },
  { key: "congelateur", label: "Congélateur" },
  { key: "placard", label: "Placard" },
];

export default function Stock() {
  const [location, setLocation] = useState<StockLocation>("congelateur");
  const [items, setItems] = useState<StockItem[]>(SAMPLE_STOCK);

  const visibleItems = items.filter((i) => i.location === location);

  function countIn(loc: StockLocation) {
    return items.filter((i) => i.location === loc).length;
  }

  // Retire une portion ; l'aliment disparaît quand il est épuisé
  function removePortion(id: string) {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantityG: Math.max(0, i.quantityG - i.portionG) } : i
        )
        .filter((i) => i.quantityG > 0)
    );
  }

  return (
    <View>
      <Text style={styles.title}>Stock</Text>

      <View style={styles.segment}>
        {LOCATIONS.map((l) => {
          const active = l.key === location;
          return (
            <Pressable
              key={l.key}
              onPress={() => setLocation(l.key)}
              style={[styles.segmentBtn, active && styles.segmentBtnActive]}
              accessibilityRole="button"
            >
              <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                {l.label} ({countIn(l.key)})
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={visibleItems}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Rien ici pour le moment.</Text>
        }
        renderItem={({ item }) => {
          const portions = Math.floor(item.quantityG / item.portionG);
          return (
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.qty}>{item.quantityG} g</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.muted}>
                  {portions} portion{portions > 1 ? "s" : ""} de {item.portionG} g
                </Text>
                <Pressable onPress={() => removePortion(item.id)} accessibilityRole="button">
                  <Text style={styles.action}>− 1 portion</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          <View style={styles.info}>
            <Text style={styles.infoText}>
              Le stock est déduit automatiquement de la liste de courses suivante.
            </Text>
          </View>
        }
      />

      <Pressable style={styles.addBtn} accessibilityRole="button">
        <Text style={styles.addText}>+ Ajouter au stock</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "700", color: "#14211C", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10 },
  segment: { flexDirection: "row", gap: 6, paddingHorizontal: 16, paddingBottom: 10 },
  segmentBtn: { flex: 1, minHeight: 44, alignItems: "center", justifyContent: "center", borderRadius: 12, borderWidth: 1, borderColor: "#DDE3E0", backgroundColor: "#fff" },
  segmentBtnActive: { backgroundColor: "#1F7A5A", borderColor: "#1F7A5A" },
  segmentText: { fontSize: 13, fontWeight: "500", color: "#14211C" },
  segmentTextActive: { color: "#fff" },
  list: { paddingHorizontal: 16, gap: 10, paddingBottom: 16 },
  card: { backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, borderColor: "#DDE3E0", padding: 14, gap: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 15, fontWeight: "700", color: "#14211C" },
  qty: { fontSize: 15, color: "#14211C" },
  muted: { fontSize: 12, color: "#5A6B63" },
  action: { fontSize: 13, fontWeight: "700", color: "#1F7A5A", paddingVertical: 6 },
  empty: { textAlign: "center", color: "#5A6B63", marginTop: 40 },
  info: { backgroundColor: "#E3F1EB", borderRadius: 14, padding: 14 },
  infoText: { fontSize: 12, color: "#17604A" },
  addBtn: { margin: 16, minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: "#1F7A5A", backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  addText: { fontSize: 14, fontWeight: "700", color: "#1F7A5A" },
});