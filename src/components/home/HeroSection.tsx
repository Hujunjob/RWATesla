"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Layers, ShieldCheck, Clock } from "lucide-react"
import model3Image from "@/assets/model3.avif"

const HeroSection = () => {
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    "https://images.unsplash.com/photo-1619389136796-ebf6a175b80a?w=1200&h=800&fit=crop", // Tesla Model S
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&h=800&fit=crop", // Tesla Model 3
    "https://images.unsplash.com/photo-1617704548623-340376564e68?w=1200&h=800&fit=crop"  // Tesla Model X
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background with color gradient overlay */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(10, 17, 40, 0.85), rgba(10, 17, 40, 0.7)), url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-24 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                基于<span className="text-accent">RWA</span>的无抵押
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  信用贷款革新
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                拥有Tesla汽车？立即获得专属无抵押贷款服务，流程简便、额度可观、利率优惠。
              </p>
            </div>

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
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="glass-card rounded-lg px-5 py-3">
                <p className="text-accent font-mono text-2xl font-semibold">93%</p>
                <p className="text-gray-400 text-sm">审批通过率</p>
              </div>
              <div className="glass-card rounded-lg px-5 py-3">
                <p className="text-accent font-mono text-2xl font-semibold">12小时</p>
                <p className="text-gray-400 text-sm">资金到账时间</p>
              </div>
              <div className="glass-card rounded-lg px-5 py-3">
                <p className="text-accent font-mono text-2xl font-semibold">150万</p>
                <p className="text-gray-400 text-sm">最高贷款额度</p>
              </div>
            </div>
          </div>

          {/* Tesla 3D model placeholder */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full h-[500px]">
              <div className="absolute w-[500px] h-[300px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass-card rounded-xl border border-white/10 overflow-hidden">
                <img 
                  src={model3Image.src} 
                  alt="Tesla Model 3" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                
                {/* Tech Elements */}
                <div className="absolute left-4 top-4 glass-card rounded-lg px-4 py-2 text-xs">
                  模型: Tesla Model 3
                </div>
                <div className="absolute left-4 bottom-4 glass-card rounded-lg px-4 py-2 text-xs">
                  估值: 275,000 元
                </div>
                <div className="absolute right-4 bottom-4 glass-card rounded-lg px-4 py-2 text-xs">
                  可贷: 220,000 元
                </div>
                
                {/* Animated scanner effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-1 bg-accent/30 absolute top-0 animate-[scan_4s_ease-in-out_infinite]"></div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent/10 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220" className="w-full h-auto">
          <path fill="rgba(10, 17, 40, 0.8)" fillOpacity="1" d="M0,128L48,122.7C96,117,192,107,288,122.7C384,139,480,181,576,197.3C672,213,768,203,864,176C960,149,1056,107,1152,90.7C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* Feature cards that overlap with the wave */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 lg:-mt-28">
          <div className="glass-card rounded-xl p-6 border border-white/10 transition-transform hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <ShieldCheck className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">无需抵押</h3>
            <p className="text-gray-400">无需抵押实物资产，通过验证Tesla车辆所有权，即可获得相应贷款额度。</p>
          </div>
          <div className="glass-card rounded-xl p-6 border border-white/10 transition-transform hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
              <Clock className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">快速审批</h3>
            <p className="text-gray-400">简化的审批流程，最快12小时内完成审核，资金当日到账。</p>
          </div>
          <div className="glass-card rounded-xl p-6 border border-white/10 transition-transform hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
              <Layers className="text-secondary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">灵活额度</h3>
            <p className="text-gray-400">基于车辆价值评估，提供高达车辆估值80%的贷款额度，最高可达150万。</p>
          </div>
        </div>
      </div>
      
      {/* Animated tech dots background overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>
    </section>
  )
}

export default HeroSection