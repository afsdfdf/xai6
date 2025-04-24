"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Share2, Star, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function TokenDetailPage() {
  const params = useParams()
  const [darkMode, setDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [tokenInfo, setTokenInfo] = useState<{
    name: string
    symbol: string
    price: string
    change24h: string
    volume24h: string
    liquidity: string
    marketCap: string
  }>({
    name: "Unknown Token",
    symbol: "???",
    price: "$0.00",
    change24h: "+0.00%",
    volume24h: "$0",
    liquidity: "$0",
    marketCap: "$0",
  })

  const blockchain = params.blockchain as string
  const address = params.address as string

  // Format blockchain name for display
  const formatBlockchainName = (chain: string) => {
    const chainMap: Record<string, string> = {
      solana: "Solana",
      bsc: "BNB Chain",
      ethereum: "Ethereum",
      polygon: "Polygon",
      avalanche: "Avalanche",
      arbitrum: "Arbitrum",
      optimism: "Optimism",
      base: "Base",
    }
    return chainMap[chain.toLowerCase()] || chain
  }

  // Shortened address for display
  const shortenAddress = (addr: string) => {
    if (addr.length <= 13) return addr
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Copy address to clipboard
  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address copied",
      description: "Contract address copied to clipboard",
    })
  }

  // Open in DexScreener
  const openInDexScreener = () => {
    window.open(`https://dexscreener.com/${blockchain}/${address}`, "_blank")
  }

  useEffect(() => {
    // Simulate loading token data
    setIsLoading(true)

    // In a real app, you would fetch actual token data here
    const fetchTokenData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data - in a real app, this would come from an API
        setTokenInfo({
          name: blockchain === "solana" ? "Solana Token" : "Unknown Token",
          symbol: blockchain === "solana" ? "SOL" : "???",
          price: "$29.45",
          change24h: "+2.34%",
          volume24h: "$1,245,678",
          liquidity: "$5,678,901",
          marketCap: "$12,345,678",
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching token data:", error)
        setIsLoading(false)

        toast({
          variant: "destructive",
          title: "Error loading token data",
          description: "Failed to load token information. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }

    fetchTokenData()
  }, [blockchain, address])

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              {isLoading ? (
                <>
                  <Skeleton className="h-5 w-24 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </>
              ) : (
                <>
                  <h1 className="text-lg font-bold">
                    {tokenInfo.name} ({tokenInfo.symbol})
                  </h1>
                  <div className="flex items-center text-xs text-gray-400">
                    <span>{formatBlockchainName(blockchain)}</span>
                    <span className="mx-1">•</span>
                    <span className="flex items-center gap-1">
                      {shortenAddress(address)}
                      <button onClick={copyAddressToClipboard} className="hover:text-gray-300">
                        <Copy className="w-3 h-3" />
                      </button>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Star className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={openInDexScreener}>
              <ExternalLink className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full">
          <style
            dangerouslySetInnerHTML={{
              __html: `
                #dexscreener-embed{
                  position:relative;
                  width:100%;
                  padding-bottom:125%;
                }
                @media(min-width:1400px){
                  #dexscreener-embed{
                    padding-bottom:65%;
                  }
                }
                #dexscreener-embed iframe{
                  position:absolute;
                  width:100%;
                  height:100%;
                  top:0;
                  left:0;
                  border:0;
                }
              `,
            }}
          />
          <div id="dexscreener-embed">
            <iframe
              src={`https://dexscreener.com/${blockchain}/${address}?embed=1&loadChartSettings=0&trades=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15`}
              title={`${tokenInfo.name} Chart`}
            ></iframe>
          </div>
        </div>

        {/* Trading Info */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
              <p className="text-xs text-gray-400">价格</p>
              {isLoading ? (
                <Skeleton className="h-6 w-20 mt-1" />
              ) : (
                <>
                  <p className="text-lg font-bold">{tokenInfo.price}</p>
                  <p className={`text-xs ${tokenInfo.change24h.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                    {tokenInfo.change24h}
                  </p>
                </>
              )}
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
              <p className="text-xs text-gray-400">24h交易量</p>
              {isLoading ? (
                <Skeleton className="h-6 w-20 mt-1" />
              ) : (
                <>
                  <p className="text-lg font-bold">{tokenInfo.volume24h}</p>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
              <p className="text-xs text-gray-400">流动性</p>
              {isLoading ? (
                <Skeleton className="h-6 w-20 mt-1" />
              ) : (
                <p className="text-lg font-bold">{tokenInfo.liquidity}</p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
              <p className="text-xs text-gray-400">市值</p>
              {isLoading ? (
                <Skeleton className="h-6 w-20 mt-1" />
              ) : (
                <p className="text-lg font-bold">{tokenInfo.marketCap}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
