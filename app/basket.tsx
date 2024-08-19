import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import useBasketStore from "@/store/basketStore";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ConfettiCanon from "react-native-confetti-cannon";
import { Link } from "expo-router";
import SwipeableRow from "@/components/SwipeableRow";

const Basket = () => {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);

  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };

  const startCheckout = () => {
    setOrder(true), clearCart();
  };

  return (
    <>
      {order && (
        <ConfettiCanon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={250}
          fadeOut={true}
          autoStart
        />
      )}

      {order && (
        <View style={{ marginTop: "50%", padding: 20, alignItems: "center" }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", alignItems: "center" }}
          >
            Thank you for your order!
          </Text>
          <Link href={"/"} asChild>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.footerText}>New Order</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {!order && (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={() => (
              <Text style={styles.section}>Items</Text>
            )}
            ListFooterComponent={() => (
              <View>
                <View style={{ height: 1, backgroundColor: Colors.grey }} />
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Subtotal</Text>
                  <Text>${total}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Service</Text>
                  <Text style={styles.total}>${FEES.service}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Delivery</Text>
                  <Text style={styles.total}>${FEES.delivery}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Order Total</Text>
                  <Text style={styles.total}>
                    ${(total + FEES.service + FEES.delivery).toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            )}
            renderItem={({ item }) => (
              <SwipeableRow onDelete={() => reduceProduct(item)}>
                <View style={styles.row}>
                  <Text style={{ color: Colors.primary, fontSize: 18 }}>
                    {item.quantity}x
                  </Text>
                  <Text style={{ flex: 1, fontSize: 18 }}> {item.name}</Text>
                  <Text style={{ fontSize: 18 }}>
                    ${item.price * item.quantity}
                  </Text>
                </View>
              </SwipeableRow>
            )}
          />
          <View style={styles.footer}>
            <SafeAreaView
              edges={["bottom"]}
              style={{ backgroundColor: "#fff" }}
            >
              <TouchableOpacity
                style={styles.fullButton}
                onPress={startCheckout}
              >
                <Text style={styles.footerText}>Order Now</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </>
      )}
    </>
  );
};

export default Basket;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },

  section: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
    paddingHorizontal: 5,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    padding: 16,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
    color: Colors.mediumDark,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,

    backgroundColor: "#fff",
    paddingTop: 20,

    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -10 },
  },

  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    width: 250,
    height: 50,
    justifyContent: "center",
    marginTop: 20,
  },
});
