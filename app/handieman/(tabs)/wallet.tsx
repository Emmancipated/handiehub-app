import { NotificationIcon } from "@/components/Atoms/NotificationIcon/NotificationIcon";
import { HeaderGroup } from "@/components/Header/Header";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

import { primaryBlack, primaryColor, white } from "@/styles/colors";
import { useRouter } from "expo-router";
const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};
interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  reference: string;
  category: "payment" | "refund" | "withdrawal" | "deposit" | "service_fee";
}

interface WalletBalance {
  available: number;
  pending: number;
  total: number;
  currency: string;
}

const SellerWalletScreen = () => {
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [balance, setBalance] = useState<WalletBalance>({
    available: 125000,
    pending: 15000,
    total: 140000,
    currency: "NGN",
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "credit",
      amount: 45000,
      description: "Payment from Grace Okafor - Cleaning Service",
      date: "2024-01-20",
      status: "completed",
      reference: "TXN-2024-001",
      category: "payment",
    },
    {
      id: "2",
      type: "debit",
      amount: 25000,
      description: "Payment to Michael Adebayo - Plumbing Repair",
      date: "2024-01-19",
      status: "completed",
      reference: "TXN-2024-002",
      category: "payment",
    },
    {
      id: "3",
      type: "debit",
      amount: 5000,
      description: "Service Fee - Platform Commission",
      date: "2024-01-19",
      status: "completed",
      reference: "TXN-2024-003",
      category: "service_fee",
    },
    {
      id: "4",
      type: "credit",
      amount: 150000,
      description: "Payment from David Farinde - Cabinet Design",
      date: "2024-01-18",
      status: "pending",
      reference: "TXN-2024-004",
      category: "payment",
    },
    {
      id: "5",
      type: "credit",
      amount: 30000,
      description: "Refund from Sarah Johnson - Electrical Service",
      date: "2024-01-17",
      status: "completed",
      reference: "TXN-2024-005",
      category: "refund",
    },
    {
      id: "6",
      type: "debit",
      amount: 20000,
      description: "Withdrawal to Bank Account",
      date: "2024-01-16",
      status: "completed",
      reference: "TXN-2024-006",
      category: "withdrawal",
    },
  ]);

  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number, currency: string = "NGN"): string => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTransactionIcon = (category: string, type: string): string => {
    if (type === "credit") {
      switch (category) {
        case "payment":
          return "💰";
        case "refund":
          return "↩️";
        case "deposit":
          return "💳";
        default:
          return "➕";
      }
    } else {
      switch (category) {
        case "payment":
          return "💸";
        case "withdrawal":
          return "🏦";
        case "service_fee":
          return "⚙️";
        default:
          return "➖";
      }
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "failed":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const handleAddMoney = () => {
    Alert.alert("Add Money", "Choose your preferred payment method", [
      { text: "Bank Transfer", onPress: () => console.log("Bank Transfer") },
      { text: "Card Payment", onPress: () => console.log("Card Payment") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleWithdraw = () => {
    Alert.alert("Withdraw Funds", "Withdraw to your bank account", [
      { text: "Continue", onPress: () => console.log("Withdraw") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleViewAllTransactions = () => {
    // Navigate to full transactions page
    console.log("View all transactions");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: white,
          paddingHorizontal: 16,
        }}
      >
        <HeaderGroup>
          <View />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: primaryBlack,
            }}
          >
            Wallet
          </Text>
          <NotificationIcon />
        </HeaderGroup>

        <ScrollView style={{ flex: 1 }}>
          {/* Balance Card */}
          <View
            style={{
              backgroundColor: primaryColor,
              marginVertical: 16,
              borderRadius: 16,
              padding: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: white,
                  opacity: 0.9,
                }}
              >
                Total Balance
              </Text>
              <TouchableOpacity
                onPress={() => setShowBalance(!showBalance)}
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: white,
                  }}
                >
                  {showBalance ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: white,
                marginBottom: 8,
              }}
            >
              {showBalance ? formatCurrency(balance.total) : "••••••"}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: white,
                    opacity: 0.8,
                  }}
                >
                  Available
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: white,
                  }}
                >
                  {showBalance ? formatCurrency(balance.available) : "••••••"}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: white,
                    opacity: 0.8,
                  }}
                >
                  Pending
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: white,
                  }}
                >
                  {showBalance ? formatCurrency(balance.pending) : "••••••"}
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // paddingHorizontal: 16,
              marginBottom: 24,
            }}
          >
            <TouchableOpacity
              onPress={handleAddMoney}
              style={{
                backgroundColor: white,
                borderRadius: 12,
                padding: 16,
                flex: 1,
                marginRight: 8,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#e5e7eb",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 24, marginBottom: 8 }}>💳</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: primaryBlack,
                  textAlign: "center",
                }}
              >
                Add Money
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleWithdraw}
              style={{
                backgroundColor: white,
                borderRadius: 12,
                padding: 16,
                flex: 1,
                marginLeft: 8,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#e5e7eb",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 24, marginBottom: 8 }}>🏦</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: primaryBlack,
                  textAlign: "center",
                }}
              >
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>

          {/* Recent Transactions */}
          <View
            style={{
              // paddingHorizontal: 16,
              marginBottom: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: primaryBlack,
                }}
              >
                Recent Transactions
              </Text>
              <TouchableOpacity onPress={handleViewAllTransactions}>
                <Text
                  style={{
                    fontSize: 14,
                    color: primaryColor,
                    fontWeight: "500",
                  }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {transactions.slice(0, 5).map((transaction) => (
              <View
                key={transaction.id}
                style={{
                  backgroundColor: white,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor:
                      transaction.type === "credit" ? "#10b981" : "#ef4444",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>
                    {getTransactionIcon(transaction.category, transaction.type)}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: primaryBlack,
                      marginBottom: 4,
                    }}
                  >
                    {transaction.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#666",
                        marginRight: 8,
                      }}
                    >
                      {formatDate(transaction.date)}
                    </Text>
                    <View
                      style={{
                        backgroundColor:
                          getStatusColor(transaction.status) + "15",
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: getStatusColor(transaction.status),
                          fontWeight: "500",
                          textTransform: "uppercase",
                        }}
                      >
                        {transaction.status}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color:
                        transaction.type === "credit" ? "#10b981" : "#ef4444",
                    }}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#666",
                    }}
                  >
                    {transaction.reference}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Wallet Features */}
          <View
            style={{
              paddingHorizontal: 16,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: primaryBlack,
                marginBottom: 16,
              }}
            >
              Wallet Features
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "48%",
                  backgroundColor: white,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <Text style={{ fontSize: 24, marginBottom: 8 }}>📊</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: primaryBlack,
                    textAlign: "center",
                  }}
                >
                  Analytics
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: "48%",
                  backgroundColor: white,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <Text style={{ fontSize: 24, marginBottom: 8 }}>🔒</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: primaryBlack,
                    textAlign: "center",
                  }}
                >
                  Security
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: "48%",
                  backgroundColor: white,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <Text style={{ fontSize: 24, marginBottom: 8 }}>⚙️</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: primaryBlack,
                    textAlign: "center",
                  }}
                >
                  Settings
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: "48%",
                  backgroundColor: white,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <Text style={{ fontSize: 24, marginBottom: 8 }}>❓</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: primaryBlack,
                    textAlign: "center",
                  }}
                >
                  Help
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Security Notice */}
          <View
            style={{
              backgroundColor: "#f8f9fa",
              margin: 16,
              padding: 16,
              borderRadius: 12,
              borderLeftWidth: 4,
              borderLeftColor: "#3b82f6",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: primaryBlack,
                marginBottom: 4,
              }}
            >
              🔒 Your wallet is secure
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#666",
                lineHeight: 16,
              }}
            >
              All transactions are encrypted and protected. Your funds are safe
              with us.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SellerWalletScreen;
