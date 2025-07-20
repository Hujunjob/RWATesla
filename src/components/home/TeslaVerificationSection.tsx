"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import modelsImage from "@/assets/models.avif"

const TeslaVerificationSection = () => {
  const router = useRouter()
  const benefits = [
    "车辆所有权快速验证，无需提供车辆物理文件",
    "保留车辆使用权，不影响日常驾驶与使用",
    "根据车型与车况自动计算最优贷款方案",
    "专属Tesla车主优惠利率，低至市场平均水平的85%"
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Interactive 3D Tesla Showcase */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="glass-card rounded-xl border border-white/10 overflow-hidden aspect-video">
                <img 
                  src={modelsImage.src} 
                  alt="Tesla Verification" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay with tech elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold mb-2">Tesla Model S</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">车型</p>
                      <p className="text-sm font-mono">MODEL S</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">年份</p>
                      <p className="text-sm font-mono">2022</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">价值评估</p>
                      <p className="text-sm font-mono">¥758,000</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-primary to-accent"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span>评估进度</span>
                    <span>85%</span>
                  </div>
                </div>
                
                {/* Tech elements */}
                <div className="absolute top-4 right-4 glass-card rounded-lg px-3 py-1 text-xs border border-white/10">
                  TESLA API 已连接
                </div>
                
                {/* Scanning animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-[2px] bg-accent/50 absolute top-[30%] animate-[scan_5s_ease-in-out_infinite]"></div>
                </div>
              </div>
              
              {/* Floating tech elements */}
              <div className="absolute -top-6 -right-6 glass-card rounded-lg px-4 py-2 text-xs border border-accent/20 neon-border-accent">
                车辆API验证中...
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card rounded-lg px-4 py-2 text-xs border border-primary/20 neon-border-primary">
                估值计算中...
              </div>
              
              {/* Animated connection lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="20%" y1="50%" x2="80%" y2="30%" stroke="url(#blue-gradient)" strokeWidth="1" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="80%" y1="70%" x2="30%" y2="90%" stroke="url(#purple-gradient)" strokeWidth="1" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="0" to="20" dur="3s" repeatCount="indefinite" />
                </line>
                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1282A2" />
                    <stop offset="100%" stopColor="#0AEFFF" />
                  </linearGradient>
                  <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8A4FFF" />
                    <stop offset="100%" stopColor="#1282A2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-block glass-card rounded-full px-4 py-1 text-xs mb-6 border border-white/10">
              <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text font-medium">Tesla车主专享</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              通过Tesla车辆
              <span className="text-primary">验证</span>
              获取无抵押贷款
            </h2>
            
            <p className="text-muted-foreground mb-8">
              我们与Tesla API直接对接，只需授权您的Tesla账户，系统将自动验证车辆信息、评估车辆价值，并立即计算您可获得的最高贷款额度，流程透明且高效。
            </p>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-primary mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className="btn-tech h-12 px-8 rounded-lg"
              onClick={() => router.push("/verify")}
            >
              <span className="flex items-center gap-2">
                开始验证 <ArrowRight size={18} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeslaVerificationSection