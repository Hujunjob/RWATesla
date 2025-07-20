"use client"

import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DollarSign, CheckCircle, ArrowLeft, Loader2, CreditCard, AlertTriangle, Car } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useTeslaRWA } from "@/hooks/useTeslaRWA"
import { useLoanContract } from "@/hooks/useLoanContract"
import Image from "next/image"
import { formatEther } from "viem"

const LoansPage = () => {
  const router = useRouter()
  const { address } = useAccount()
  const { isVerified, teslaInfo } = useTeslaRWA()
  const { 
    hasLoan, 
    loanInfo, 
    loanAmount, 
    requestLoan, 
    repayLoan, 
    isRequestingLoan 
  } = useLoanContract()

  // 获取车型图片
  const getCarImage = (model: string) => {
    // 先尝试 AVIF 格式，如果不支持则使用占位符
    if (model.toLowerCase().includes("model 3") || model.includes("m3")) {
      return "/assets/model3.avif"
    }
    return "/assets/models.avif"
  }

  // 格式化车型名称
  const formatCarModel = (model: string) => {
    if (!model) return "未知型号"
    switch(model){
      case "m3": return "Tesla Model 3";
      case "ms": return "Tesla Model S";
      case "my": return "Tesla Model Y";
      case "mx": return "Tesla Model X";
      default: return model.includes("Tesla") ? model : "Tesla Model 3";
    }
  }

  const handleRequestLoan = async () => {
    const success = await requestLoan()
    if (success) {
      // 可以显示成功消息或者重定向
    }
  }

  const handleRepayLoan = async () => {
    const success = await repayLoan()
    if (success) {
      // 可以显示成功消息
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full glass-card border border-white/10 flex items-center justify-center mx-auto mb-6">
                <DollarSign size={32} className="text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">信用借贷</h1>
              <p className="text-muted-foreground">
                基于已验证的特斯拉资产，获得 1 MON 的信用借贷
              </p>
            </div>

            {/* 验证提示 */}
            {!address && (
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  请先连接钱包以使用借贷功能
                </AlertDescription>
              </Alert>
            )}

            {address && !isVerified && (
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  请先验证您的特斯拉车辆以获得借贷资格。 
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-normal"
                    onClick={() => router.push("/verify")}
                  >
                    立即验证
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* 已绑定车辆信息 */}
            {isVerified && teslaInfo && (
              <Card className="glass-card border-green-500/20 bg-green-500/5 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="text-green-500" size={24} />
                    已绑定的车辆
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 items-center">
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={getCarImage(teslaInfo.model)}
                        alt={formatCarModel(teslaInfo.model)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-muted-foreground">车型：</span>
                        <span className="font-bold text-lg">{formatCarModel(teslaInfo.model)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-muted-foreground">交付状态：</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          teslaInfo.isDeliveredOrPostDelivered 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {teslaInfo.isDeliveredOrPostDelivered ? "已交付" : "未交付"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-muted-foreground">验证时间：</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(Number(teslaInfo.timestamp) * 1000).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 借贷状态卡片 */}
            {isVerified && (
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="text-primary" size={24} />
                    借贷状态
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* 借贷信息 */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">可借贷金额：</span>
                      <span className="text-xl font-bold text-primary">
                        {loanAmount ? formatEther(loanAmount) : "1.0"} MON
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">借贷状态：</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        hasLoan && loanInfo?.active
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {hasLoan && loanInfo?.active ? "已借贷" : "可借贷"}
                      </span>
                    </div>
                    {hasLoan && loanInfo?.active && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">借贷金额：</span>
                          <span className="font-bold">
                            {formatEther(loanInfo.amount)} MON
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">借贷时间：</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(Number(loanInfo.timestamp) * 1000).toLocaleDateString('zh-CN')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">抵押车型：</span>
                          <span className="font-medium">
                            {formatCarModel(loanInfo.teslaModel)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-3 justify-center">
                    {!hasLoan || !loanInfo?.active ? (
                      <Button 
                        onClick={handleRequestLoan}
                        disabled={isRequestingLoan || !address || !isVerified}
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8 py-3"
                      >
                        {isRequestingLoan ? (
                          <>
                            <Loader2 className="animate-spin mr-2" size={16} />
                            申请中...
                          </>
                        ) : (
                          <>
                            <DollarSign className="mr-2" size={16} />
                            申请借贷
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleRepayLoan}
                        disabled={isRequestingLoan}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
                      >
                        {isRequestingLoan ? (
                          <>
                            <Loader2 className="animate-spin mr-2" size={16} />
                            还款中...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2" size={16} />
                            立即还款
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* 说明信息 */}
                  <div className="text-center text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                    <p>• 每个钱包地址仅可申请一次借贷</p>
                    <p>• 借贷基于已验证的特斯拉车辆资产</p>
                    <p>• 还款后可重新申请借贷</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Back Button */}
            <div className="text-center mt-8">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-primary flex items-center gap-2 mx-auto"
                onClick={() => router.push("/")}
              >
                <ArrowLeft size={16} />
                返回首页
              </Button>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default LoansPage