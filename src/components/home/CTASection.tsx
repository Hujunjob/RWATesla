"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const CTASection = () => {
  const router = useRouter()
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl glass-card border border-white/10">
          {/* Background gradients */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-[150px] -left-[150px] w-[400px] h-[400px] rounded-full bg-primary/20 blur-[120px]"></div>
            <div className="absolute -bottom-[150px] -right-[150px] w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[120px]"></div>
          </div>
          
          <div className="relative z-10 py-16 px-8 md:px-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              准备好<span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">解锁</span>您的Tesla价值了吗？
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
              无需抵押，只需几分钟验证，即可获得基于您Tesla车辆价值的贷款额度。
              我们的平台为您提供快速、安全、便捷的金融解决方案。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-tech h-14 px-8 rounded-lg text-lg"
                onClick={() => router.push("/verify")}
              >
                <span className="flex items-center gap-2">
                  立即验证资产 <ArrowRight size={20} />
                </span>
              </Button>
            </div>
          </div>
          
          {/* Animated tech dots background overlay */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)',
              backgroundSize: '50px 50px',
            }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection