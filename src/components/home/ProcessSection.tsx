import { CheckCircle2, ChevronRight, DatabaseZap, LineChart, Wallet } from "lucide-react"

const ProcessSection = () => {
  const steps = [
    {
      icon: <DatabaseZap size={32} className="text-primary" />,
      title: "资产验证",
      description: "通过Tesla API验证您的车辆信息，确认所有权和车辆状态"
    },
    {
      icon: <LineChart size={32} className="text-accent" />,
      title: "额度评估",
      description: "系统基于车辆型号、年份和状况，评估最高可贷额度与利率"
    },
    {
      icon: <CheckCircle2 size={32} className="text-secondary" />,
      title: "获得贷款",
      description: "审批通过后，贷款资金将在12小时内直接转入您的指定账户"
    },
    {
      icon: <Wallet size={32} className="text-green-400" />,
      title: "灵活还款",
      description: "选择最适合您的还款计划，支持提前还款且无额外费用"
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            简单<span className="text-primary">四步</span>，快速获取资金
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            我们革新的贷款流程基于区块链技术与API集成，将传统需要数周的贷款流程缩短至最快12小时
          </p>
        </div>

        {/* Desktop Process */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary -translate-y-1/2"></div>
            
            {/* Steps */}
            <div className="grid grid-cols-4 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center px-4">
                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mb-4 border border-white/10 neon-border-primary">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                  <p className="text-muted-foreground text-center text-sm">{step.description}</p>
                </div>
              ))}
            </div>
            
            {/* Connector Arrows */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
              <div className="grid grid-cols-4">
                <div className="col-start-1 col-end-4 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <ChevronRight size={18} className="text-accent" />
                  </div>
                </div>
                <div className="col-start-2 col-end-4 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <ChevronRight size={18} className="text-accent" />
                  </div>
                </div>
                <div className="col-start-3 col-end-4 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <ChevronRight size={18} className="text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Process */}
        <div className="md:hidden">
          <div className="relative pl-8">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary"></div>
            
            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Icon Circle */}
                  <div className="absolute left-[-24px] top-0 w-12 h-12 rounded-full glass-card flex items-center justify-center border border-white/10 neon-border-primary">
                    {step.icon}
                  </div>
                  
                  <div className="pt-1">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[-8px] top-[60px]">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                        <ChevronRight size={16} className="text-accent -rotate-90" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection