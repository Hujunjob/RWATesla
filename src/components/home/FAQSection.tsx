import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"

const FAQSection = () => {
  const faqs = [
    {
      question: "什么是RWA无抵押信用贷款？",
      answer: "RWA（Real World Assets）无抵押信用贷款是一种基于真实世界资产价值进行评估，但不需要将资产作为抵押物的贷款方式。通过验证您对特定资产（如Tesla汽车）的所有权和价值，我们可以为您提供相应的贷款额度，而无需您将车辆作为抵押物。"
    },
    {
      question: "贷款申请需要哪些条件？",
      answer: "申请我们的无抵押贷款，您需要：1）拥有Tesla汽车的所有权；2）车辆状况良好；3）具备基本个人信用记录；4）有稳定的收入来源。我们不要求完美的信用记录，而是更注重您的资产价值和还款能力。"
    },
    {
      question: "如何验证我的Tesla车辆？",
      answer: "验证过程非常简单，只需几个步骤：1）在我们的平台上注册账户；2）进入资产验证页面，选择Tesla汽车验证；3）提供您的车辆信息（型号、年份、VIN码）；4）授权我们通过Tesla API访问您的车辆基本信息；5）系统将自动完成验证并评估车辆价值。整个过程通常只需10-15分钟。"
    },
    {
      question: "贷款额度和利率如何确定？",
      answer: "贷款额度主要基于您Tesla车辆的当前市场价值，通常可达车辆估值的70%-80%。利率则根据多种因素综合确定，包括车辆型号和年份、您的信用记录、贷款期限等。作为Tesla车主，您可享受比传统贷款更优惠的利率，一般低至市场平均水平的85%。"
    },
    {
      question: "贷款资金可以用于哪些用途？",
      answer: "我们的贷款没有严格的用途限制，您可以将资金用于个人消费、教育投资、创业融资、房屋装修、医疗支出等各种合法用途。我们相信客户应当拥有资金使用的灵活性和自主权。"
    },
    {
      question: "还款方式有哪些选择？",
      answer: "我们提供多种灵活的还款选择：1）等额本息还款；2）等额本金还款；3）先息后本还款；4）自定义还款计划。您可以根据自己的财务状况选择最适合的方式。此外，我们支持提前还款且不收取额外费用。"
    }
  ]

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] animate-pulse"></div>
      <div 
        className="absolute bottom-20 right-10 w-[250px] h-[250px] rounded-full bg-secondary/5 blur-[70px] animate-pulse" 
        style={{ animationDelay: "1s" }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block glass-card rounded-full px-4 py-1 text-xs mb-6 border border-white/10">
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text font-medium">解答疑惑</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            常见<span className="text-primary">问题</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            我们整理了客户最常咨询的问题，如有其他疑问，欢迎联系我们的客服团队
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glass-card rounded-xl p-6 md:p-8 border border-white/10">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-white/10 rounded-lg px-4"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default FAQSection