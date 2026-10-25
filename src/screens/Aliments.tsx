// src/screens/AlimentsScreen.tsx
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SAMPLE_FOODS } from "../data/sampleData";
import { RootStackParamList } from "../types/navigation";
import { formatNumber } from "../utils/format";

type Filter = "tous" | "coach" | "perso";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "coach", label: "Coach" },
  { key: "perso", label: "Mes aliments" },
];

// "Épicerie" et "epicerie" doivent matcher : on retire accents et majuscules
const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Aliments() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [foods] = useState(SAMPLE_FOODS);
  const [filter, setFilter] = useState<Filter>("tous");
  const [query, setQuery] = useState("");

  const visibleFoods = foods.filter(
    (f) =>
      (filter === "tous" || f.origin === filter) &&
      normalize(f.name).includes(normalize(query))
  );

  return (
    <View>
      <Text style={styles.title}>Aliments</Text>

      <TextInput
        style={styles.search}
        placeholder="Rechercher un aliment"
        placeholderTextColor="#5A6B63"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />

      <View style={styles.chips}>
        {FILTERS.map((f) => {
          const active = f.key === filter;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[styles.chip, active && styles.chipActive]}
              accessibilityRole="button"
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={visibleFoods}
        keyExtractor={(f) => f.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<Text style={styles.empty}>Aucun aliment trouvé.</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("AlimentDetail", { alimentId: item.id })}
            accessibilityRole="button"
          >
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              {item.origin === "perso" ? (
                <Text style={[styles.tag, styles.tagPerso]}>Perso</Text>
              ) : (
                <Text style={styles.tag}>×{formatNumber(item.coefficient)}</Text>
              )}
            </View>
            <Text style={styles.muted}>
              {item.kcal} kcal · P {formatNumber(item.protein)} · G {formatNumber(item.carbs)} · L{" "}
              {formatNumber(item.fat)} · pour 100 g cru
            </Text>
          </Pressable>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <Pressable style={[styles.btn, styles.btnFilled]} accessibilityRole="button">
            <Text style={styles.btnFilledText}>+ Ajouter</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.btnGhost, styles.disabled]} disabled accessibilityRole="button">
            <Text style={styles.btnGhostText}>Scanner</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => navigation.navigate("Import")} accessibilityRole="button">
          <Text style={styles.link}>Importer un CSV</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "700", color: "#14211C", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10 },
  search: { marginHorizontal: 16, minHeight: 44, borderRadius: 12, borderWidth: 1, borderColor: "#DDE3E0", backgroundColor: "#fff", paddingHorizontal: 14, fontSize: 14, color: "#14211C" },
  chips: { flexDirection: "row", gap: 6, paddingHorizontal: 16, paddingVertical: 10 },
  chip: { borderRadius: 20, borderWidth: 1, borderColor: "#DDE3E0", backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 8 },
  chipActive: { backgroundColor: "#14211C", borderColor: "#14211C" },
  chipText: { fontSize: 12, color: "#14211C" },
  chipTextActive: { color: "#fff" },
  list: { paddingHorizontal: 16, gap: 10, paddingBottom: 16 },
  card: { backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, borderColor: "#DDE3E0", padding: 14, gap: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  name: { flex: 1, fontSize: 15, fontWeight: "700", color: "#14211C" },
  muted: { fontSize: 12, color: "#5A6B63" },
  tag: { backgroundColor: "#E3F1EB", color: "#17604A", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, fontSize: 11, fontWeight: "700", overflow: "hidden" },
  tagPerso: { backgroundColor: "#FBE9DD", color: "#8A3A0A" },
  empty: { textAlign: "center", color: "#5A6B63", marginTop: 40 },
  footer: { paddingHorizontal: 16, paddingBottom: 8, gap: 4, alignItems: "center" },
  footerRow: { flexDirection: "row", gap: 8, alignSelf: "stretch" },
  btn: { flex: 1, minHeight: 48, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  btnFilled: { backgroundColor: "#1F7A5A" },
  btnFilledText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  btnGhost: { borderWidth: 1, borderColor: "#1F7A5A", backgroundColor: "#fff" },
  btnGhostText: { color: "#1F7A5A", fontWeight: "700", fontSize: 14 },
  disabled: { opacity: 0.4 },
  link: { color: "#1F7A5A", fontWeight: "700", fontSize: 13, paddingVertical: 10 },
});