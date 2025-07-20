import { Quote } from "lucide-react"

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "王先生",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      position: "企业家",
      testimonial: "作为一名Tesla Model X的车主，我需要一笔资金用于新项目的启动。RWA贷款平台的无抵押贷款让我在不影响日常用车的情况下快速获得了融资，整个过程透明高效。",
      car: "Tesla Model X",
      amount: "65Mon",
      approved: "1分钟"
    },
    {
      name: "李女士",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      position: "医疗专家",
      testimonial: "平台的审批速度令人印象深刻。我周一申请，周二资金就已到账。作为医生，我的工作日程紧张，这种高效的服务真的为我节省了大量时间和精力。",
      car: "Tesla Model 3",
      amount: "38Mon",
      approved: "9分钟"
    },
    {
      name: "张先生",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      position: "软件工程师",
      testimonial: "这是我第一次申请无抵押贷款，平台的客服耐心回答了我所有问题。Tesla车辆验证系统运行流畅，整个过程数字化且无纸化，非常符合我对科技的期待。",
      car: "Tesla Model Y",
      amount: "42Mon",
      approved: "12分钟"
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Skewed background */}
      <div className="absolute inset-0 -skew-y-3 bg-card/60 -z-10"></div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-16">
          <div className="inline-block glass-card rounded-full px-4 py-1 text-xs mb-6 border border-white/10">
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text font-medium">用户体验</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            客户<span className="text-primary">案例</span>分享
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            来自真实用户的贷款体验，了解他们如何通过RWA无抵押信用贷款实现资金需求
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 border border-white/10 flex flex-col transition-all duration-300 hover:translate-y-[-8px] hover:shadow-lg hover:shadow-primary/10"
            >
              <Quote size={32} className="text-primary opacity-30 mb-4" />
              
              <p className="text-gray-300 mb-6">{testimonial.testimonial}</p>
              
              <div className="mt-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
              
              {/* Case details */}
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">车型</p>
                  <p className="text-sm">{testimonial.car}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">贷款金额</p>
                  <p className="text-sm font-mono text-accent">{testimonial.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">审批用时</p>
                  <p className="text-sm font-mono">{testimonial.approved}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection