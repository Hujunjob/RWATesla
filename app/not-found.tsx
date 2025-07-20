import { Button } from "@/components/ui/button"
import { ArrowLeft, FileWarning } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full glass-card border border-white/10 flex items-center justify-center mx-auto mb-6">
            <FileWarning size={32} className="text-secondary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">页面未找到</h1>
          <p className="text-muted-foreground mb-8">
            抱歉，您访问的页面不存在。请检查网址是否正确，或返回首页。
          </p>
          
          <Link href="/">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-2 mx-auto"
            >
              <ArrowLeft size={16} />
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}