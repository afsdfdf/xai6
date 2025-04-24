"use client"

import type { TrendingToken } from "../api/trending/route"
import { getTokenIconUrl } from "../lib/trending-service"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TrendingTokenCardProps {
  token: TrendingToken
  darkMode: boolean
  onClick: () => void
}

export function TrendingTokenCard({ token, darkMode, onClick }: TrendingTokenCardProps) {
  return (
    <Card
      className={`p-3 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} 
        hover:shadow-md transition-all duration-200 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image src={getTokenIconUrl(token) || "/placeholder.svg"} alt={token.name} fill className="object-cover" />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <p className="font-medium">{token.name}</p>
              <span className="text-xs text-gray-500">#{token.rank}</span>
              {token.trending === "up" && <TrendingUp className="w-3 h-3 text-green-500" />}
              {token.trending === "down" && <TrendingDown className="w-3 h-3 text-red-500" />}
            </div>
            <p className="text-xs text-gray-400">{token.symbol}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-medium">{token.priceUsd}</p>
          <p className={`text-xs ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
            {token.change24h >= 0 ? "+" : ""}
            {token.change24h}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
        <div>
          <p className="text-gray-400">交易量 (24h)</p>
          <p className="font-medium">{token.volumeUsd}</p>
        </div>
        <div>
          <p className="text-gray-400">市值</p>
          <p className="font-medium">{token.marketCapUsd}</p>
        </div>
        <div className="text-right">
          <Link
            href={`/token/${token.chain}/${token.address}`}
            className="text-blue-500 flex items-center justify-end gap-1 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            查看详情 <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </Card>
  )
}
