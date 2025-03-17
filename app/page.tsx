import { ResignationCalculator } from "@/components/resignation-calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">回答我！这个班能不能辞？</h1>
          <p className="text-gray-600">幽默职场裸辞风险评估计算器</p>
        </header>
        <ResignationCalculator />
      </div>
    </main>
  )
}

