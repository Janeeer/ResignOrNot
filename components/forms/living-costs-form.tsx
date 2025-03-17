"use client"

import type { FormData } from "../resignation-calculator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface LivingCostsFormProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function LivingCostsForm({ formData, updateFormData }: LivingCostsFormProps) {
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <p className="text-purple-700 text-sm">
        又到了坦诚面对账单的时候，算出你的真实生活成本
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="baseLivingCost" className="text-base">
              生存成本基数 (元/月)
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>维持基本生存所需的每月支出：基本伙食 + 通勤</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              id="baseLivingCost"
              type="number"
              min="0"
              value={formData.baseLivingCost || ''}
              onChange={(e) => updateFormData({ baseLivingCost: e.target.value ? Number(e.target.value) : 0 })}
              className="pl-8"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
          </div>
          <p className="text-sm text-gray-500 italic">在你的城市，一日三餐，有荤有素</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label className="text-base">品质系数</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>希望维持什么样的生活水平？</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup
            defaultValue="1.0"
            value={formData.comfortLevel.toFixed(1)}  // 使用 toFixed(1) 确保数字格式一致
            onValueChange={(value) => updateFormData({ comfortLevel: parseFloat(value) })}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.0" id="comfort-1" />
              <Label htmlFor="comfort-1" className="cursor-pointer">
                饺子导演那种 (1.0x)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.2" id="comfort-2" />
              <Label htmlFor="comfort-2" className="cursor-pointer">
                偶尔也得下馆子 (1.2x)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.5" id="comfort-3" />
              <Label htmlFor="comfort-3" className="cursor-pointer">
                吃好穿好玩好 (1.5x)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.8" id="comfort-4" />
              <Label htmlFor="comfort-4" className="cursor-pointer">
                买买买 (1.8x)
              </Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 italic">已经习惯的那种舒适</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="mortgagePayment" className="text-base">
                房贷/房租 (元/月)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-2">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>每月需要偿还的房贷/房租金额。(如果没有，请填写 0)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="mortgagePayment"
                type="number"
                min="0"
                value={formData.mortgagePayment || ''}
                onChange={(e) => updateFormData({ mortgagePayment: e.target.value ? Number(e.target.value) : 0 })}
                className="pl-8"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="carLoanPayment" className="text-base">
                车贷 (元/月)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-2">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>每月需要偿还的车贷金额。(如果没有，请填写 0)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="carLoanPayment"
                type="number"
                min="0"
                value={formData.carLoanPayment || ''}
                onChange={(e) => updateFormData({ carLoanPayment: e.target.value ? Number(e.target.value) : 0 })}
                className="pl-8"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="medicalCost" className="text-base">
                医疗成本 (元/月)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-2">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>每月平均医疗支出，包括医保、体检、药品等。</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="medicalCost"
                type="number"
                min="0"
                value={formData.medicalCost || ''}
                onChange={(e) => updateFormData({ medicalCost: e.target.value ? Number(e.target.value) : 0 })}
                className="pl-8"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

