"use client"

import type { FormData } from "../resignation-calculator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"
import { useState } from "react"

// 问卷选项类型
type QuestionOption = "yes" | "somewhat" | "no"

// 问卷答案状态
interface QuestionnaireState {
  [key: string]: QuestionOption
}

// 生存技能问题
const survivalQuestions = [
  { id: "survival1", text: "具有核心职业技能？" },
  { id: "survival2", text: "持续学习新技能？" },
  { id: "survival3", text: "了解市场行情？" },
  { id: "survival4", text: "积极寻找变现机会？" }, 
  { id: "survival5", text: "快速适应新环境？" },  
]

// 情绪调节问题
const emotionalQuestions = [
  { id: "emotional1", text: "压力下保持冷静？" },
  { id: "emotional2", text: "能有效化解负面情绪？" }, 
  { id: "emotional3", text: "高效管理时间和精力？" }, 
  { id: "emotional4", text: "对未来充满希望？" },  
  { id: "emotional5", text: "快速从失败中振作？" },  
]

// 社交支持问题
const socialQuestions = [
  { id: "social1", text: "家人给予理解支持？" }, 
  { id: "social2", text: "有可倾诉的亲友？" },    
  { id: "social3", text: "积极参与社交活动？" },   
  { id: "social4", text: "愿主动寻求帮助？" },
  { id: "social5", text: "经济上有亲友兜底？" },   
]

// 全局状态存储问卷答案
const survivalAnswers: QuestionnaireState = {}
const emotionalAnswers: QuestionnaireState = {}
const socialAnswers: QuestionnaireState = {}

// 初始化答案
survivalQuestions.forEach((q) => (survivalAnswers[q.id] = "somewhat"))
emotionalQuestions.forEach((q) => (emotionalAnswers[q.id] = "somewhat"))
socialQuestions.forEach((q) => (socialAnswers[q.id] = "somewhat"))

// 计算得分并映射到系数
function calculateScore(answers: QuestionnaireState, questions: { id: string; text: string }[]): number {
  let score = 0
  questions.forEach((q) => {
    if (answers[q.id] === "yes") score += 1
    else if (answers[q.id] === "somewhat") score += 0.5
  })

  // 将得分标准化到10分制
  return (score / questions.length) * 10
}

// 将得分映射到系数 (0-1.0)
function mapScoreToFactor(score: number): number {
  // 线性映射: 0分对应0, 10分对应1.0
  return (score / 10)
}

// 生存技能问卷组件
function SurvivalSkillQuestionnaire({ updateFormData }: { updateFormData: (data: Partial<FormData>) => void }) {
  const [answers, setAnswers] = useState<QuestionnaireState>(survivalAnswers)

  const handleChange = (questionId: string, value: QuestionOption) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    survivalAnswers[questionId] = value

    const score = calculateScore(newAnswers, survivalQuestions)
    const factor = mapScoreToFactor(score)
    updateFormData({ survivalSkillFactor: factor })
  }

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      {survivalQuestions.map((question, index) => (
        <div key={question.id} className="space-y-2">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2">{index + 1}.</span>
            <span className="text-gray-700">{question.text}</span>
          </div>
          <div className="flex space-x-4 ml-6">
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.id}-yes`}
                name={question.id}
                value="yes"
                checked={answers[question.id] === "yes"}
                onChange={() => handleChange(question.id, "yes")}
                className="mr-2"
              />
              <label htmlFor={`${question.id}-yes`} className="text-sm">
                是
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.id}-somewhat`}
                name={question.id}
                value="somewhat"
                checked={answers[question.id] === "somewhat"}
                onChange={() => handleChange(question.id, "somewhat")}
                className="mr-2"
              />
              <label htmlFor={`${question.id}-somewhat`} className="text-sm">
                部分是
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.id}-no`}
                name={question.id}
                value="no"
                checked={answers[question.id] === "no"}
                onChange={() => handleChange(question.id, "no")}
                className="mr-2"
              />
              <label htmlFor={`${question.id}-no`} className="text-sm">
                否
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// 情绪调节问卷组件
function EmotionalRegulationQuestionnaire({ updateFormData }: { updateFormData: (data: Partial<FormData>) => void }) {
  const [answers, setAnswers] = useState<QuestionnaireState>(emotionalAnswers)

  const handleChange = (questionId: string, value: QuestionOption) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    emotionalAnswers[questionId] = value

    const score = calculateScore(newAnswers, emotionalQuestions)
    const factor = mapScoreToFactor(score)
    updateFormData({ emotionalRegulationFactor: factor })
  }

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      {emotionalQuestions.map((question, index) => (
        <div key={question.id} className="space-y-2">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2">{index + 1}.</span>
            <span className="text-gray-700">{question.text}</span>
          </div>
          <div className="flex space-x-4 ml-6">
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.id}-yes`}
                name={question.id}
                value="yes"
                checked={answers[question.id] === "yes"}
                onChange={() => handleChange(question.id, "yes")}
                className="mr-2"
              />
              <label htmlFor={`${question.id}-yes`} className="text-sm">
                是
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.id}-somewhat`}
                name={question.id}
                value="somewhat"
                checked={answers[question.id] === "somewhat"}
                onChange={() => handleChange(question.id, "somewhat")}
                className="mr-2"
              />
              <label htmlFor={`${question.id}-somewhat`} className="text-sm">
                部分是
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.id}-no`}
                name={question.id}
                value="no"
                checked={answers[question.id] === "no"}
                onChange={() => handleChange(question.id, "no")}
                className="mr-2"
              />
              <label htmlFor={`${question.id}-no`} className="text-sm">
                否
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// 社交支持问卷组件
function SocialSupportQuestionnaire({ updateFormData }: { updateFormData: (data: Partial<FormData>) => void }) {
  const [answers, setAnswers] = useState<QuestionnaireState>(socialAnswers)

  const handleChange = (questionId: string, value: QuestionOption) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    socialAnswers[questionId] = value

    const score = calculateScore(newAnswers, socialQuestions)
    const factor = mapScoreToFactor(score)
    updateFormData({ socialSupportFactor: factor })
  }

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      {socialQuestions.map((question, index) => (
        <div key={question.id} className="space-y-2">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2">{index + 1}.</span>
            <span className="text-gray-700">{question.text}</span>
          </div>
          <div className="flex space-x-4 ml-6">
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.id}-yes`}
                name={question.id}
                value="yes"
                checked={answers[question.id] === "yes"}
                onChange={() => handleChange(question.id, "yes")}
                className="mr-2"
              />
              <label htmlFor={`${question.id}-yes`} className="text-sm">
                是
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.id}-somewhat`}
                name={question.id}
                value="somewhat"
                checked={answers[question.id] === "somewhat"}
                onChange={() => handleChange(question.id, "somewhat")}
                className="mr-2"
              />
              <label htmlFor={`${question.id}-somewhat`} className="text-sm">
                部分是
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.id}-no`}
                name={question.id}
                value="no"
                checked={answers[question.id] === "no"}
                onChange={() => handleChange(question.id, "no")}
                className="mr-2"
              />
              <label htmlFor={`${question.id}-no`} className="text-sm">
                否
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface PersonalAbilityFormProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function PersonalAbilityForm({ formData, updateFormData }: PersonalAbilityFormProps) {
  // 计算各项得分
  const calculateSurvivalScore = () => {
    return calculateScore(survivalAnswers, survivalQuestions)
  }

  const calculateEmotionalScore = () => {
    return calculateScore(emotionalAnswers, emotionalQuestions)
  }

  const calculateSocialScore = () => {
    return calculateScore(socialAnswers, socialQuestions)
  }

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <p className="text-purple-700 text-sm">
        你的底牌、你的未来。
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="currentSideIncome" className="text-base">
                当前副业收入 (元/月)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-2">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>每月通过副业获得的稳定收入。(如果没有，请填写 0)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="currentSideIncome"
                type="number"
                min="0"
                value={formData.currentSideIncome || ''}
                onChange={(e) => updateFormData({ currentSideIncome: e.target.value ? Number(e.target.value) : 0 })}
                className="pl-8"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
            </div>
            <p className="text-sm text-gray-500 italic">斜杠技能变现了吗？</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="potentialSideIncome" className="text-base">
                潜在副业收入 (元/月)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-2">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>辞职后，通过技能提升和努力，预期每月可以获得的副业收入。(谨慎填写)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="potentialSideIncome"
                type="number"
                min="0"
                value={formData.potentialSideIncome || ''}
                onChange={(e) => updateFormData({ potentialSideIncome: e.target.value ? Number(e.target.value) : 0 })}
                className="pl-8"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
            </div>
            <p className="text-sm text-gray-500 italic">还有给自己画的饼</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label className="text-base">副业落地系数</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>您对将潜在副业收入转化为实际收入的把握有多大？</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup
            defaultValue="0.3"
            value={formData.sideIncomeConfidence.toFixed(1)}
            onValueChange={(value) => updateFormData({ sideIncomeConfidence: parseFloat(value) })}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0.1" id="confidence-1" />
              <Label htmlFor="confidence-1" className="cursor-pointer">
                一切随缘 (0.1x)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0.3" id="confidence-2" />
              <Label htmlFor="confidence-2" className="cursor-pointer">
                摸着石头过河 (0.3x)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0.8" id="confidence-3" />
              <Label htmlFor="confidence-3" className="cursor-pointer">
                八九不离十 (0.8x)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.0" id="confidence-4" />
              <Label htmlFor="confidence-4" className="cursor-pointer">
                稳如老狗 (1.0x)
              </Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 italic">吃上饼子的概率</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label className="text-base">生存技能系数</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-2">
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>您通过技能维持生计的能力有多强？</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium text-purple-700">
                得分: {calculateSurvivalScore()} / 10 (系数: {formData.survivalSkillFactor.toFixed(1)})
              </span>
            </div>
            <SurvivalSkillQuestionnaire updateFormData={updateFormData} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label className="text-base">情绪调节系数</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-2">
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>您在压力下保持积极心态的能力有多强？</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium text-purple-700">
                得分: {calculateEmotionalScore()} / 10 (系数: {formData.emotionalRegulationFactor.toFixed(1)})
              </span>
            </div>
            <EmotionalRegulationQuestionnaire updateFormData={updateFormData} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label className="text-base">社交支持系数</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-2">
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>您获得家人、朋友和社会支持的程度有多高？</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium text-purple-700">
                得分: {calculateSocialScore()} / 10 (系数: {formData.socialSupportFactor.toFixed(1)})
              </span>
            </div>
            <SocialSupportQuestionnaire updateFormData={updateFormData} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label className="text-base">经济景气度</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>您认为当前的经济形势如何？</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup
            defaultValue="1.0"
            value={formData.economicTemperatureFactor.toFixed(1)}
            onValueChange={(value) => updateFormData({ economicTemperatureFactor: parseFloat(value) })}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0.5" id="economy-1" />
              <Label htmlFor="economy-1" className="cursor-pointer">
                996是福报 (0.5x)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.0" id="economy-2" />
              <Label htmlFor="economy-2" className="cursor-pointer">
                打工人打工魂 (1.0x)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1.5" id="economy-3" />
              <Label htmlFor="economy-3" className="cursor-pointer">
                风口上的猪 (1.5x)
              </Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 italic">考虑一下子历史的进程</p>
        </div>
      </div>
    </div>
  )
}

