"use client"

import type { FormData } from "./resignation-calculator"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface ResultsDisplayProps {
  safetyPeriod: number
  riskLevel: string
  formData: FormData
}

// 毒鸡汤语录
const toxicQuotes = {
  high: [
    "老板虽然讨厌，但饿死更可怕哦~",
    "辞职容易找工作难，你确定你不是在刀尖上起舞？",
    "裸辞一时爽，天天吃土火葬场。",
    "你的勇气可嘉，但你的钱包不答应。",
    "辞职信写好了吗？别急，先看看你的余额。",
  ],
  warning: [
    "梦想还是要有的，万一实现了呢？记得先存够钱！",
    "裸辞一时爽，一直裸辞一直爽（前提是你有钱）",
    "辞职容易找工作难，但至少你有一段时间可以享受自由。",
    "人生苦短，及时行乐，但先确保你的钱包够厚。",
    "不想上班是病，辞职是药，但要小心药不能停。",
  ],
  safe: [
    "恭喜你，可以体面地告别老板了！",
    "自由的感觉真好，尤其是当你有足够的钱时。",
    "躺平也是一种生活方式，只要你的钱包够硬。",
    "人生苦短，及时行乐，你已经做好了准备！",
    "辞职是为了更好的开始，你已经准备好了！",
  ],
}

// 建议内容
const suggestions = {
  high: "强烈不建议辞职，建议先提升财务状况和个人能力。你的辞职安全期过短，可能面临严重的财务压力。建议在当前工作中坚持，同时寻找新的工作机会或提升副业收入。",
  warning:
    "谨慎辞职，需要做好充分准备，密切关注财务状况。你的辞职安全期处于警戒线，建议在辞职前确保有稳定的副业收入或已经找到新的工作机会。",
  safe: "可以考虑辞职，但仍需谨慎规划未来。你的辞职安全期较长，财务状况相对稳定。但仍建议制定详细的职业规划，确保在安全期内找到新的工作或实现副业收入的稳定增长。",
}

export function ResultsDisplay({ safetyPeriod, riskLevel, formData }: ResultsDisplayProps) {
  const [randomQuote, setRandomQuote] = useState("")
  const [animatedSafetyPeriod, setAnimatedSafetyPeriod] = useState(0)

  useEffect(() => {
    // 随机选择一条毒鸡汤
    const quotes = toxicQuotes[riskLevel as keyof typeof toxicQuotes] || []
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setRandomQuote(quotes[randomIndex])

    // 动画效果
    const duration = 1500 // 动画持续时间（毫秒）
    const interval = 20 // 更新间隔（毫秒）
    const steps = duration / interval
    const increment = safetyPeriod / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= safetyPeriod) {
        setAnimatedSafetyPeriod(safetyPeriod)
        clearInterval(timer)
      } else {
        setAnimatedSafetyPeriod(current)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [safetyPeriod, riskLevel])

  // 格式化安全期显示
  const formatSafetyPeriod = (period: number) => {
    return `${Math.round(period * 10) / 10}个月`
  }

  // 获取风险等级对应的颜色和图标
  const getRiskLevelInfo = () => {
    switch (riskLevel) {
      case "high":
        return {
          color: "text-red-600",
          bgColor: "bg-red-100",
          borderColor: "border-red-200",
          progressColor: "bg-red-500",
          icon: <XCircle className="h-8 w-8 text-red-600" />,
        }
      case "warning":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          borderColor: "border-yellow-200",
          progressColor: "bg-yellow-500",
          icon: <AlertCircle className="h-8 w-8 text-yellow-600" />,
        }
      case "safe":
        return {
          color: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-200",
          progressColor: "bg-green-500",
          icon: <CheckCircle className="h-8 w-8 text-green-600" />,
        }
      default:
        return {
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          borderColor: "border-gray-200",
          progressColor: "bg-gray-500",
          icon: <AlertCircle className="h-8 w-8 text-gray-600" />,
        }
    }
  }

  const riskInfo = getRiskLevelInfo()

  // 计算进度条百分比
  const getProgressPercentage = () => {
    if (safetyPeriod >= 36) return 100
    return (safetyPeriod / 36) * 100
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">辞职风险评估结果</h2>
        <p className="text-gray-600">根据你提供的信息，我们为你计算出了以下结果</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          className={`text-center p-6 rounded-full border-4 ${riskInfo.borderColor} ${riskInfo.bgColor} w-48 h-48 flex flex-col items-center justify-center`}
        >
          <div className="text-sm font-medium text-gray-600">辞职安全期</div>
          <div className={`text-3xl font-bold ${riskInfo.color}`}>
            {formatSafetyPeriod(animatedSafetyPeriod)}
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-red-500">高风险</span>
            <span className="text-yellow-500">警戒</span>
            <span className="text-green-500">安全</span>
          </div>
          <Progress 
            value={getProgressPercentage()} 
            className={`h-3`}
            style={{
              ['--progress-background' as string]: riskLevel === 'high' ? '#ef4444' : 
                                                riskLevel === 'warning' ? '#eab308' : '#22c55e'
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0个月</span>
            <span>12个月</span>
            <span>24个月</span>
            <span>36个月+</span>
          </div>
        </div>
      </div>

      <Card className={`p-6 ${riskInfo.bgColor} border ${riskInfo.borderColor}`}>
        <div className="flex items-start space-x-4">
          {riskInfo.icon}
          <div>
            <h3 className={`text-lg font-semibold ${riskInfo.color} mb-2`}>
              {riskLevel === "high" ? "高风险" : riskLevel === "warning" ? "警戒风险" : "安全风险"}
            </h3>
            <p className="text-gray-700">{suggestions[riskLevel as keyof typeof suggestions]}</p>
          </div>
        </div>
      </Card>

      <div className="bg-purple-100 border border-purple-200 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">毒鸡汤时间</h3>
        <blockquote className="italic text-lg text-purple-700 border-l-4 border-purple-300 pl-4">
          "{randomQuote}"
        </blockquote>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">计算说明</h3>
        <p className="text-gray-600 text-sm mb-4">
          辞职安全期是根据你的财务状况、生活成本和个人能力综合计算得出的。它代表在没有新工作收入的情况下，你可以维持当前生活水平的时间。
        </p>
        <div className="text-xs text-gray-500">
          <p>计算公式：</p>
          <div className="font-mono bg-gray-100 p-4 rounded mt-1 overflow-x-auto space-y-6">
            <div>
              辞职安全期 = 
                (活动资产 - 过渡成本) 
                ÷ (月支出 - 月收入)
                × 个人能力系数
                × 经济景气度
            </div>
            <div className="text-purple-600 font-semibold">其中：</div>
            <div>
              月支出 = 
                生存成本基数 × 品质系数 
                + 房贷/房租 
                + 车贷 
                + 医疗成本
            </div>
            <div>
              月收入 = 
                当前副业收入 
                + (潜在副业收入 × 副业落地系数)
            </div>
            <div>
              个人能力系数 = 
                (生存技能系数 + 情绪调节系数 + 社交支持系数) ÷ 3
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

