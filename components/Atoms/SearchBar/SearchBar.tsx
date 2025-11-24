// import React from 'react';
// import {StyleSheet, TextInput, View} from 'react-native';
// import {SvgXml} from 'react-native-svg';
// import {
//   primaryBorderRadius,
//   primaryMargin,
//   primaryPadding,
//   tertiaryPadding,
// } from '../../../styles/topography';
// import {
//   primaryBlack,
//   primaryColor,
//   primaryGray,
//   secondaryGray,
// } from '../../../styles/colors';

// export const SearchBar = () => {
//   const searchIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M7.66659 13.8154C11.1644 13.8154 13.9999 11.0671 13.9999 7.67691C13.9999 4.28674 11.1644 1.53845 7.66659 1.53845C4.16878 1.53845 1.33325 4.28674 1.33325 7.67691C1.33325 11.0671 4.16878 13.8154 7.66659 13.8154Z" stroke="#BBBBBB" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M14.6666 14.4615L13.3333 13.1692" stroke="#BBBBBB" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>`;
//   return (
//     <View style={styles.searchSection}>
//       <SvgXml xml={searchIcon} width="16px" height="16px" />
//       <TextInput
//         style={styles.input}
//         placeholder="Search jobs..."
//         underlineColorAndroid="transparent"
//         placeholderTextColor={secondaryGray}
//         selectionColor={primaryColor}
//         cursorColor={primaryColor}
//         enterKeyHint="search"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   searchSection: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: primaryGray,
//     borderRadius: primaryBorderRadius,
//     paddingHorizontal: tertiaryPadding,
//     marginTop: primaryMargin,
//   },
//   input: {
//     flex: 1,
//     paddingTop: primaryPadding,
//     paddingRight: primaryPadding,
//     paddingBottom: primaryPadding,
//     paddingLeft: primaryPadding,
//     backgroundColor: primaryGray,
//     color: primaryBlack,
//   },
// });
// // #424242

// SearchBar.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  primaryBorderRadius,
  primaryMargin,
  primaryPadding,
  tertiaryPadding,
} from "../../../styles/topography";
import {
  primaryBlack,
  primaryColor,
  primaryGray,
  secondaryGray,
} from "../../../styles/colors";
import { getAllProducts } from "@/services/productServices"; // fallback
import { useRouter } from "expo-router";

export const SearchBar = () => {
  const searchIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.66659 13.8154C11.1644 13.8154 13.9999 11.0671 13.9999 7.67691C13.9999 4.28674 11.1644 1.53845 7.66659 1.53845C4.16878 1.53845 1.33325 4.28674 1.33325 7.67691C1.33325 11.0671 4.16878 13.8154 7.66659 13.8154Z" stroke="#BBBBBB" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.6666 14.4615L13.3333 13.1692" stroke="#BBBBBB" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // response shape: { categories: string[], brands: string[], products: Product[] }
  const [suggestions, setSuggestions] = useState<{
    categories: string[];
    brands: string[];
    products: any[];
  }>({ categories: [], brands: [], products: [] });

  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const debounceRef = useRef<any>(null);

  // Helper: call backend search endpoint. If it fails, fallback to client filtering.
  const fetchSuggestions = async (q: string) => {
    const min = q.trim().length >= 2;
    if (!min) {
      setSuggestions({ categories: [], brands: [], products: [] });
      setShowDropdown(false);
      return;
    }

    setLoading(true);

    // Try backend search first (recommended). Expects response { categories, brands, products }.
    try {
      // adapt base URL if your API lives on another host
      const resp = await fetch(
        `https://c58cf1154d84.ngrok-free.app/api/products/search?q=${encodeURIComponent(
          q
        )}&limit=5`
      );
      if (!resp.ok) throw new Error("no backend search");

      const data = await resp.json();
      // Ensure arrays exist
      setSuggestions({
        categories: data.categories || [],
        brands: data.brands || [],
        products: data.products || [],
      });
      setShowDropdown(true);
      setLoading(false);
      return;
    } catch (err) {
      // fallback to client-side filter using getAllProducts
      try {
        const r = await getAllProducts("1", "100"); // fetch more to cover local filtering
        const all = r?.data || [];
        const qlc = q.toLowerCase();

        // collect categories (unique) from product.category or product.categories
        const categoriesSet = new Set<string>();
        const brandsSet = new Set<string>();
        const productsMatch: any[] = [];

        for (const p of all) {
          // assume p.category or p.categories can exist
          const catField = p.category ?? p.categories ?? [];
          if (Array.isArray(catField)) {
            catField.forEach((c: string) => {
              if (typeof c === "string" && c.toLowerCase().includes(qlc)) {
                categoriesSet.add(c);
              }
            });
          } else if (typeof catField === "string") {
            if (catField.toLowerCase().includes(qlc))
              categoriesSet.add(catField);
          }

          if (
            p.brand &&
            typeof p.brand === "string" &&
            p.brand.toLowerCase().includes(qlc)
          ) {
            brandsSet.add(p.brand);
          }

          // product name / description match
          if (
            (p.name && p.name.toLowerCase().includes(qlc)) ||
            (p.description && p.description.toLowerCase().includes(qlc)) ||
            (p.tags &&
              Array.isArray(p.tags) &&
              p.tags.join(" ").toLowerCase().includes(qlc))
          ) {
            productsMatch.push(p);
          }
        }

        setSuggestions({
          categories: Array.from(categoriesSet).slice(0, 6),
          brands: Array.from(brandsSet).slice(0, 6),
          products: productsMatch.slice(0, 5),
        });
        setShowDropdown(true);
      } catch (err2) {
        console.error("Search fallback failed", err2);
        setSuggestions({ categories: [], brands: [], products: [] });
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    }
  };

  // debounce the query
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSelectCategory = (category: string) => {
    setQuery(category);
    setShowDropdown(false);
    Keyboard.dismiss();
    // Navigate to search results page, filter by category
    router.push({
      pathname: "/searchResults",
      params: { q: category, type: "category", value: category },
    });
  };

  const handleSelectBrand = (brand: string) => {
    setQuery(brand);
    setShowDropdown(false);
    Keyboard.dismiss();
    router.push({
      pathname: "/searchResults",
      params: { q: brand, type: "brand", value: brand },
    });
  };

  const handleSelectProduct = (product: any) => {
    setQuery(product.name);
    setShowDropdown(false);
    Keyboard.dismiss();
    // If you want to go to product listing filtered by name:
    router.push({
      pathname: "/searchResults",
      params: { q: product.name, type: "product", value: product.name },
    });

    // Or navigate directly to single product page:
    // router.push(`/product/${product.slug}`);
  };

  const renderSectionHeader = (title?: string) => {
    if (!title) return null;
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{String(title)}</Text>
      </View>
    );
  };

  return (
    <View style={{ position: "relative", zIndex: 2000 }}>
      <View style={styles.searchSection}>
        <SvgXml xml={searchIcon} width="16px" height="16px" />
        <TextInput
          style={styles.input}
          placeholder="Search products..."
          underlineColorAndroid="transparent"
          placeholderTextColor={secondaryGray}
          selectionColor={primaryColor}
          cursorColor={primaryColor}
          enterKeyHint="search"
          value={query}
          onChangeText={setQuery}
          onFocus={() =>
            (suggestions.products.length ||
              suggestions.categories.length ||
              suggestions.brands.length) &&
            setShowDropdown(true)
          }
        />
        {loading && (
          <ActivityIndicator style={{ marginLeft: 8 }} size="small" />
        )}
      </View>

      {/* {showDropdown &&
        (suggestions.categories.length ||
          suggestions.brands.length ||
          suggestions.products.length) && (
          <View style={styles.dropdown}>
            <FlatList
              ListHeaderComponent={() => (
                <View>
                  {suggestions.categories.length > 0 &&
                    renderSectionHeader("Categories")}
                  {suggestions.categories.map((c) => (
                    <TouchableOpacity
                      key={`cat-${c}`}
                      style={styles.dropdownItem}
                      onPress={() => handleSelectCategory(c)}
                    >
                      <Text style={styles.itemPrimary}>{c}</Text>
                      <Text style={styles.itemHint}>category</Text>
                    </TouchableOpacity>
                  ))}

                  {suggestions.brands.length > 0 &&
                    renderSectionHeader("Brands")}
                  {suggestions.brands.map((b) => (
                    <TouchableOpacity
                      key={`brand-${b}`}
                      style={styles.dropdownItem}
                      onPress={() => handleSelectBrand(b)}
                    >
                      <Text style={styles.itemPrimary}>{b}</Text>
                      <Text style={styles.itemHint}>brand</Text>
                    </TouchableOpacity>
                  ))}

                  {suggestions.products.length > 0 &&
                    renderSectionHeader("Top matches")}
                </View>
              )}
              data={suggestions.products}
              keyExtractor={(item) => item._id ?? item.id ?? item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelectProduct(item)}
                >
                  <Text style={styles.itemPrimary}>{item.name}</Text>
                  <Text style={styles.itemHint}>
                    {item.brand ? `${item.brand} • ` : ""}
                    {item.category ? item.category : item.categories?.[0] ?? ""}
                  </Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 300 }}
              scrollEnabled={false}
            />
          </View>
        )} */}

      {showDropdown &&
      (suggestions.categories.length ||
        suggestions.brands.length ||
        suggestions.products.length) ? (
        <View style={styles.dropdown}>
          <FlatList
            ListHeaderComponent={() => (
              <View>
                {suggestions.categories.length > 0 &&
                  renderSectionHeader("Categories")}
                {suggestions.categories.map((c) => (
                  <TouchableOpacity
                    key={`cat-${c}`}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectCategory(c)}
                  >
                    <Text style={styles.itemPrimary}>{c}</Text>
                    <Text style={styles.itemHint}>category</Text>
                  </TouchableOpacity>
                ))}

                {suggestions.brands.length > 0 && renderSectionHeader("Brands")}
                {suggestions.brands.map((b) => (
                  <TouchableOpacity
                    key={`brand-${b}`}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectBrand(b)}
                  >
                    <Text style={styles.itemPrimary}>{b}</Text>
                    <Text style={styles.itemHint}>brand</Text>
                  </TouchableOpacity>
                ))}

                {suggestions.products.length > 0 &&
                  renderSectionHeader("Top matches")}
              </View>
            )}
            data={suggestions.products}
            keyExtractor={(item) => item._id ?? item.id ?? item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelectProduct(item)}
              >
                <Text style={styles.itemPrimary}>{item.name}</Text>
                <Text style={styles.itemHint}>
                  {item.brand ? `${item.brand} • ` : ""}
                  {item.category ? item.category : item.categories?.[0] ?? ""}
                </Text>
              </TouchableOpacity>
            )}
            style={{ maxHeight: 300 }}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.dropdownItem}>
                <Text style={styles.itemHint}>No results found</Text>
              </View>
            }
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: primaryGray,
    borderRadius: primaryBorderRadius,
    paddingHorizontal: tertiaryPadding,
    marginTop: primaryMargin,
  },
  input: {
    flex: 1,
    paddingVertical: primaryPadding,
    paddingHorizontal: primaryPadding,
    backgroundColor: primaryGray,
    color: primaryBlack,
  },
  dropdown: {
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    paddingVertical: 6,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    flexDirection: "column",
  },
  sectionHeader: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fafafa",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  sectionHeaderText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#333",
  },
  itemPrimary: {
    color: primaryBlack,
    fontSize: 14,
    fontWeight: "500",
  },
  itemHint: {
    color: secondaryGray,
    fontSize: 12,
    marginTop: 2,
  },
});
