"use client"

import type { FormData } from "../resignation-calculator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface FinancialBasicsFormProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function FinancialBasicsForm({ formData, updateFormData }: FinancialBasicsFormProps) {
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <p className="text-purple-700 text-sm">
        裸辞不是头脑发热，是精密计算后的挥一挥衣袖！ 先来盘点一下，你的小金库给你多少底气？
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="activeAssets" className="text-base">
              活动资产 (元)
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>指可以随时变现的资产，用于支持辞职后的生活：银行存款 + 投资理财(易于变现的部分) - 信用卡欠款</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              id="activeAssets"
              type="number"
              min="0"
              value={formData.activeAssets || ''}
              onChange={(e) => updateFormData({ activeAssets: e.target.value ? Number(e.target.value) : 0 })}
              className="pl-8"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
          </div>
          <p className="text-sm text-gray-500 italic">随时能花的钱才有安全感！</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="transitionCost" className="text-base">
              过渡成本 (元)
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    辞职后到找到新工作或副业收入稳定期间产生的额外支出：求职成本、技能提升成本、搬家成本、人情往来成本等
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              id="transitionCost"
              type="number"
              min="0"
              value={formData.transitionCost || ''}
              onChange={(e) => updateFormData({ transitionCost: e.target.value ? Number(e.target.value) : 0 })}
              className="pl-8"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
          </div>
          <p className="text-sm text-gray-500 italic">梦想很贵，转型烧钱！ 别忘了为新技能、新机会充值</p>
        </div>
      </div>
    </div>
  )
}

