"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spotlight } from "@/components/ui/spotlight"
import { GridPattern } from "@/components/ui/grid-pattern"
import { Footer } from "@/components/sections/footer"
import { Shield, Lock, Eye, Database, Users, FileText, Mail, Calendar, Briefcase } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: Database,
    content: [
      {
        subtitle: "Personal Information",
        text: "We collect information you provide directly to us, such as when you create an account, update your profile, apply for jobs, or contact us for support. This may include your name, email address, phone number, resume, work history, and other professional information.",
      },
      {
        subtitle: "Usage Information",
        text: "We automatically collect information about how you use our platform, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed.",
      },
      {
        subtitle: "Device Information",
        text: "We may collect information about the device you use to access our services, including hardware model, operating system version, unique device identifiers, and mobile network information.",
      },
    ],
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    icon: Eye,
    content: [
      {
        subtitle: "Service Provision",
        text: "We use your information to provide, maintain, and improve our staffing platform, including matching you with relevant job opportunities or qualified candidates.",
      },
      {
        subtitle: "Communication",
        text: "We may use your information to send you technical notices, updates, security alerts, and support messages, as well as marketing communications about our services.",
      },
      {
        subtitle: "Analytics and Improvement",
        text: "We use aggregated and anonymized data to analyze usage patterns, improve our algorithms, and enhance the overall user experience.",
      },
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    icon: Users,
    content: [
      {
        subtitle: "With Your Consent",
        text: "We may share your information with third parties when you give us explicit consent to do so, such as when you apply for a job or express interest in working with a specific company.",
      },
      {
        subtitle: "Service Providers",
        text: "We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, and customer service.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required to do so by law or in response to valid requests by public authorities, such as a court or government agency.",
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    content: [
      {
        subtitle: "Security Measures",
        text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      },
      {
        subtitle: "Encryption",
        text: "All data transmission is encrypted using SSL/TLS protocols. Personal information is stored in encrypted databases with restricted access.",
      },
      {
        subtitle: "Access Controls",
        text: "We maintain strict access controls and regularly audit our systems to ensure the security and integrity of your data.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights and Choices",
    icon: Shield,
    content: [
      {
        subtitle: "Access and Correction",
        text: "You have the right to access, update, or correct your personal information at any time through your account settings or by contacting us.",
      },
      {
        subtitle: "Data Portability",
        text: "You have the right to request a copy of your personal information in a structured, commonly used, and machine-readable format.",
      },
      {
        subtitle: "Deletion",
        text: "You may request deletion of your personal information, subject to certain legal and contractual restrictions.",
      },
      {
        subtitle: "Marketing Communications",
        text: "You can opt out of receiving marketing communications from us by following the unsubscribe instructions in those communications or updating your preferences in your account.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Tracking",
    icon: FileText,
    content: [
      {
        subtitle: "Cookie Usage",
        text: "We use cookies and similar tracking technologies to collect and store information about your preferences and usage patterns to improve our services.",
      },
      {
        subtitle: "Cookie Types",
        text: "We use essential cookies for platform functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings.",
      },
      {
        subtitle: "Cookie Control",
        text: "You can control cookie settings through your browser preferences, though disabling certain cookies may affect platform functionality.",
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
     

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Spotlight className="absolute -top-40 left-0 md:left-60 md:-top-20" fill="green" />
        <GridPattern className="absolute inset-0 opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm font-medium border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
            >
              Legal Information
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-green-800 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal
              information when you use our platform.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Last updated: January 15, 2024
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Version 2.1
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Privacy at a Glance</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Data Protection</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We use enterprise-grade security to protect your personal information
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Transparency</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We're clear about what data we collect and how we use it
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Your Control</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    You have full control over your data and privacy settings
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                id={section.id}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-l-4 border-blue-200 dark:border-blue-800 pl-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{item.subtitle}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Questions About Privacy?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              If you have any questions about this Privacy Policy or our data practices, please don't hesitate to
              contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Privacy Team
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <FileText className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
