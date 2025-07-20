import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-card border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="font-rajdhani text-xl font-bold text-white">R</span>
              </div>
              <span className="font-rajdhani font-bold text-xl">
                RWA<span className="text-primary">信用</span>贷款
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              基于RWA的无抵押信用贷款平台，为资产提供快速、便捷、无抵押的贷款服务。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">快速链接</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">首页</Link>
              </li>
              <li>
                <Link href="/verify" className="text-muted-foreground hover:text-primary transition-colors">资产验证</Link>
              </li>
              <li>
                <Link href="/loans" className="text-muted-foreground hover:text-primary transition-colors">借贷服务</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">关于我们</Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">常见问题</Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">法律信息</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">服务条款</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">隐私政策</Link>
              </li>
              <li>
                <Link href="/security" className="text-muted-foreground hover:text-primary transition-colors">安全说明</Link>
              </li>
              <li>
                <Link href="/compliance" className="text-muted-foreground hover:text-primary transition-colors">合规信息</Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie政策</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">联系我们</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1" />
                <span className="text-muted-foreground">1600 Pennsylvania Ave NW, Washington, DC 20500</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span className="text-muted-foreground">400-888-8888</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span className="text-muted-foreground">contact@usa.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} RWA无抵押信用贷款平台. 保留所有权利.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">

          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer