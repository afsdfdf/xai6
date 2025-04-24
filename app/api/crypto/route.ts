import { NextResponse } from "next/server"

// This is a server-side API route that will fetch data from DexScreener
// In a real app, you would use the actual DexScreener API
export async function GET() {
  try {
    // In a production app, you would make a real API call to DexScreener
    // const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/popular')
    // const data = await response.json()

    // For demo purposes, we'll return mock data that matches the image
    const popularTokens = [
      {
        id: "bitcoin",
        name: "BTC",
        symbol: "Bitcoin",
        price: 62541.23,
        change: 0.62,
        icon: "btc",
        color: "#F7931A",
      },
      {
        id: "ethereum",
        name: "ETH",
        symbol: "Ethereum",
        price: 3458.92,
        change: 0.55,
        icon: "eth",
        color: "#627EEA",
      },
      {
        id: "binancecoin",
        name: "BNB",
        symbol: "BNB",
        price: 598.47,
        change: 0.72,
        icon: "bnb",
        color: "#F3BA2F",
      },
      {
        id: "solana",
        name: "SOL",
        symbol: "Solana",
        price: 142.37,
        change: 0.83,
        icon: "sol",
        color: "#00FFA3",
      },
      {
        id: "avalanche-2",
        name: "AVAX",
        symbol: "Avalanche",
        price: 36.52,
        change: -1.25,
        icon: "avax",
        color: "#E84142",
      },
    ]

    const otherTokens = [
      { id: "harmony", name: "ONE", symbol: "Harmony", price: 0.0, change: 0.0, icon: "one", color: "#00AEE9" },
      {
        id: "aurora-near",
        name: "AURORA",
        symbol: "Aurora",
        price: 0.0,
        change: 0.0,
        icon: "aurora",
        color: "#70D44B",
      },
      { id: "celo", name: "CELO", symbol: "Celo", price: 0.0, change: 0.0, icon: "celo", color: "#FBCC5C" },
      { id: "mobilecoin", name: "MOB", symbol: "MobileCoin", price: 0.0, change: 0.0, icon: "mob", color: "#4CCAF6" },
      { id: "maker", name: "MKR", symbol: "Maker", price: 0.0, change: 0.0, icon: "mkr", color: "#6ACEBB" },
    ]

    return NextResponse.json({
      success: true,
      data: {
        popularTokens,
        otherTokens,
      },
    })
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch cryptocurrency data" }, { status: 500 })
  }
}
