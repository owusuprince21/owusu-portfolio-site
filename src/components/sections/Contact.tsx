'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
// import { sendContactMessage } from '@/lib/api'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const { name, email, message } = data;
      await sendContactMessage({ name, email, message })
      toast.success('Thank you! Your message has been sent.')
      reset()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'powusu050@gmail.com', href: 'mailto:powusu050@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+233 54 727 3952', href: 'tel:+233547273952' },
    { icon: MapPin, label: 'Location', value: 'Accra, Ghana', href: null }
  ]

  return (
    <section id="contact" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-dark-muted max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-dark-text">Let&apos;s Start a Conversation</h3>
              <p className="text-dark-muted mb-8">
                I&apos;m always interested in new opportunities and collaborations.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon
                const content = (
                  <>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center mb-0 mr-4">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-dark-text mb-1">{info.label}</h4>
                      <p className="text-dark-muted">{info.value}</p>
                    </div>
                  </>
                )

                return (
                  <motion.div
                    key={info.label}
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-start"
                  >
                    {info.href ? <a href={info.href} className="flex items-start hover:text-primary-400 transition-colors duration-200 focus-outline rounded-lg p-2 -m-2">{content}</a> : <div className="flex items-start">{content}</div>}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-dark-text mb-2">Name *</label>
                <input {...register('name')} type="text" id="name" className="w-full px-4 py-3 glass rounded-lg border border-dark-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors duration-200 text-dark-text placeholder-dark-muted" placeholder="Your full name" />
                {errors.name && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><AlertCircle size={14}/>{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-text mb-2">Email *</label>
                <input {...register('email')} type="email" id="email" className="w-full px-4 py-3 glass rounded-lg border border-dark-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors duration-200 text-dark-text placeholder-dark-muted" placeholder="your@email.com" />
                {errors.email && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><AlertCircle size={14}/>{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-text mb-2">Message *</label>
                <textarea {...register('message')} id="message" rows={5} className="w-full px-4 py-3 glass rounded-lg border border-dark-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors duration-200 text-dark-text placeholder-dark-muted resize-none" placeholder="Tell me about your project or just say hello..." />
                {errors.message && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><AlertCircle size={14}/>{errors.message.message}</p>}
              </div>

              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }} className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 focus-outline ${isSubmitting ? 'bg-dark-border text-dark-muted cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white'}`}>
                {isSubmitting ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" /> : <>Send Message<Send size={16} /></>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
