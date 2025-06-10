
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Target, TrendingUp, Shield, Globe, Phone, Calendar, CheckCircle, Star, Award, Clock, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: Users,
      title: "Lead Management",
      description: "Centralized lead capture from social media and manual inputs with intelligent assignment",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Smart Assignment",
      description: "Automated lead distribution to counsellors based on expertise and workload",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Phone,
      title: "Integrated Calling",
      description: "Built-in calling system with recording and post-call automation",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Lead Scoring",
      description: "Advanced scoring algorithms to prioritize high-potential leads",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Calendar,
      title: "Task Automation",
      description: "Automated follow-up tasks and activity tracking for seamless workflow",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Role Management",
      description: "Comprehensive user roles and permissions for secure operations",
      color: "from-teal-500 to-green-500"
    }
  ];

  const stats = [
    { number: "500+", label: "Educational Partners", icon: Award },
    { number: "50k+", label: "Students Placed", icon: Users },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "24/7", label: "Support", icon: Clock }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Admissions Director",
      company: "Global Education Hub",
      content: "StudyConnect CRM transformed our admissions process. We've seen a 40% increase in successful placements.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Counselling Manager",
      company: "EduPath Consultancy",
      content: "The automated lead scoring and task management features have made our team 3x more efficient.",
      rating: 5
    },
    {
      name: "Emma Wilson",
      role: "Operations Head",
      company: "DreamStudy International",
      content: "Best investment we've made. The ROI was visible within the first month of implementation.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: 49,
      description: "Perfect for small consultancies getting started",
      features: [
        "Up to 100 leads per month",
        "Basic lead management",
        "Email support",
        "Standard reporting",
        "2 user accounts"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: 149,
      description: "Ideal for growing consultancies",
      features: [
        "Up to 1,000 leads per month",
        "Advanced lead scoring",
        "Phone & email support",
        "Advanced analytics",
        "10 user accounts",
        "Call integration",
        "Task automation"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: 399,
      description: "For large consultancies and agencies",
      features: [
        "Unlimited leads",
        "Custom integrations",
        "24/7 priority support",
        "Custom reporting",
        "Unlimited users",
        "Advanced security",
        "Dedicated account manager",
        "White-label options"
      ],
      popular: false
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                StudyConnect
              </span>
              <div className="text-xs text-gray-500 font-medium">CRM Platform</div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')} className="hover:bg-blue-50">
              Sign In
            </Button>
            <Button onClick={() => navigate('/register')} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg">
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-3xl"></div>
        <div className="max-w-5xl mx-auto relative">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 hover:from-blue-200 hover:to-indigo-200 border-0 px-4 py-2 text-sm font-medium">
            🚀 Next-Generation CRM for Study Abroad Excellence
          </Badge>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Transform Your <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
              Study Abroad Business
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            The most powerful CRM platform designed specifically for study abroad consultancies. 
            Streamline admissions, automate workflows, and scale your business like never before.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <div className="flex items-center space-x-3 bg-white rounded-2xl shadow-lg p-2 max-w-md w-full">
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-0 focus-visible:ring-0 text-base"
              />
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-6 rounded-xl shadow-lg"
                onClick={() => navigate('/register')}
              >
                Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-16">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">Features</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for study abroad consultancies to manage leads, 
              automate workflows, and drive admissions success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`h-14 w-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200">Pricing</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your consultancy. All plans include our core features with no hidden fees.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    onClick={() => navigate('/register')}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans come with a 14-day free trial. No credit card required.</p>
            <Button variant="outline" className="hover:bg-blue-50">
              Compare All Features
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Loved by Education Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what industry leaders are saying about StudyConnect CRM
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600 font-medium">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-10 text-blue-100">
              Join hundreds of study abroad consultancies already scaling their operations with StudyConnect CRM. 
              Start your free trial today and see results within days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl"
                onClick={() => navigate('/register')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 text-lg font-semibold"
                onClick={() => navigate('/login')}
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg">StudyConnect</span>
                <div className="text-xs text-gray-400">CRM Platform</div>
              </div>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <div>© 2024 StudyConnect. All rights reserved.</div>
              <div className="text-sm mt-1">Empowering education, one student at a time.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
