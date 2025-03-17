"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FinancialBasicsForm } from "./forms/financial-basics-form"
import { LivingCostsForm } from "./forms/living-costs-form"
import { PersonalAbilityForm } from "./forms/personal-ability-form"
import { ResultsDisplay } from "./results-display"
import { Coffee, DollarSign, User } from "lucide-react"

// 定义表单数据类型
export type FormData = {
  // 财务基础
  activeAssets: number // 活动资产
  transitionCost: number // 过渡成本

  // 生活成本
  baseLivingCost: number // 生存成本基数
  comfortLevel: number // 体面程度系数
  mortgagePayment: number // 房贷
  carLoanPayment: number // 车贷
  medicalCost: number // 医疗成本

  // 个人能力与未来收入
  currentSideIncome: number // 当前副业收入
  potentialSideIncome: number // 潜在副业收入
  sideIncomeConfidence: number // 副业扩展系数
  survivalSkillFactor: number // 生存技能系数
  emotionalRegulationFactor: number // 情绪调节系数
  socialSupportFactor: number // 社交支持系数
  economicTemperatureFactor: number // 经济温度系数
}

// 初始表单数据
const initialFormData: FormData = {
  activeAssets: 50000,
  transitionCost: 5000,
  baseLivingCost: 2000,  // 修改这里的值从 3000 改为 2000
  comfortLevel: 1.0,
  mortgagePayment: 0,
  carLoanPayment: 0,
  medicalCost: 300,
  currentSideIncome: 0,
  potentialSideIncome: 2000,
  sideIncomeConfidence: 0.3, // 
  survivalSkillFactor: 0.5,
  emotionalRegulationFactor: 0.5,
  socialSupportFactor: 0.5,
  economicTemperatureFactor: 1.0, // 默认为平稳
}

export function ResignationCalculator() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [calculationDone, setCalculationDone] = useState(false)
  const [safetyPeriod, setSafetyPeriod] = useState(0)
  const [riskLevel, setRiskLevel] = useState("")

  const totalSteps = 3
  const progress = (step / (totalSteps + 1)) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      calculateResults()
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleReset = () => {
    setStep(1)
    setFormData(initialFormData)
    setCalculationDone(false)
    window.scrollTo(0, 0)
  }

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData({ ...formData, ...newData })
  }

  const calculateResults = () => {
    // 计算月支出
    const monthlyExpense =
      formData.baseLivingCost * formData.comfortLevel +
      formData.mortgagePayment +
      formData.carLoanPayment +
      formData.medicalCost

    // 计算月收入（副业）
    const monthlyIncome = formData.currentSideIncome + formData.potentialSideIncome * formData.sideIncomeConfidence

    // 计算月净支出
    const monthlyNetExpense = (monthlyExpense - monthlyIncome) 

    // 计算个人能力系数
    const personalAbilityFactor =
      ((formData.survivalSkillFactor + formData.emotionalRegulationFactor + formData.socialSupportFactor) / 3) *
      formData.economicTemperatureFactor

    // 计算辞职安全期（月）
    let calculatedSafetyPeriod = 0

    if (monthlyNetExpense > 0) {
      calculatedSafetyPeriod =
        ((formData.activeAssets - formData.transitionCost) / monthlyNetExpense) * personalAbilityFactor
    } else {
      // 如果月净支出为负或零（收入大于等于支出），设置为一个较大的值
      calculatedSafetyPeriod = 60 // 5年
    }

    // 设置风险等级
    let calculatedRiskLevel = ""
    if (calculatedSafetyPeriod < 12) {
      calculatedRiskLevel = "high" // 高危红线
    } else if (calculatedSafetyPeriod < 24) {
      calculatedRiskLevel = "warning" // 警戒黄线
    } else {
      calculatedRiskLevel = "safe" // 安全绿线
    }

    setSafetyPeriod(calculatedSafetyPeriod)
    setRiskLevel(calculatedRiskLevel)
    setCalculationDone(true)
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Progress 
          value={progress} 
          className="h-2 bg-purple-100 [&>div]:bg-gradient-to-r [&>div]:from-purple-200 [&>div]:via-purple-400 [&>div]:to-purple-700" 
        />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>开始</span>
          <span>财务基础</span>
          <span>生活成本</span>
          <span>个人能力</span>
          <span>结果</span>
        </div>
      </div>

      <Card className="p-6 shadow-lg">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xl font-semibold text-purple-700 mb-4">
              <DollarSign className="h-6 w-6" />
              <h2>第一步：财务基础</h2>
            </div>
            <FinancialBasicsForm formData={formData} updateFormData={updateFormData} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xl font-semibold text-purple-700 mb-4">
              <Coffee className="h-6 w-6" />
              <h2>第二步：生活成本</h2>
            </div>
            <LivingCostsForm formData={formData} updateFormData={updateFormData} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xl font-semibold text-purple-700 mb-4">
              <User className="h-6 w-6" />
              <h2>第三步：个人能力与未来收入</h2>
            </div>
            <PersonalAbilityForm formData={formData} updateFormData={updateFormData} />
          </div>
        )}

        {step === 4 && <ResultsDisplay safetyPeriod={safetyPeriod} riskLevel={riskLevel} formData={formData} />}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-600"
            >
              上一步
            </Button>
          )}

          {step === 4 ? (
            <Button 
              onClick={handleReset} 
              className="ml-auto bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white"
            >
              重新计算
            </Button>
          ) : (
            <Button 
              onClick={handleNext} 
              className={`${step > 1 ? "ml-auto" : "ml-auto"} bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white`}
            >
              {step === totalSteps ? "计算结果" : "下一步"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

// 格式化安全期显示
  const formatSafetyPeriod = (period: number) => {
    return `${Math.round(period * 10) / 10}个月`
  }

