"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileWarning, ArrowLeft } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const LoansPage = () => {
  const router = useRouter()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full glass-card border border-white/10 flex items-center justify-center mx-auto mb-6">
              <FileWarning size={32} className="text-secondary" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">页面正在建设中</h1>
            <p className="text-muted-foreground mb-8">
              您访问的页面正在开发中，即将推出。请稍后再回来查看，或返回首页浏览其他内容。
            </p>
            
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-2 mx-auto"
              onClick={() => router.push("/")}
            >
              <ArrowLeft size={16} />
              返回首页
            </Button>
            
            <div className="mt-12 relative">
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-4 bg-background text-xs text-muted-foreground">
                即将推出
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default LoansPage