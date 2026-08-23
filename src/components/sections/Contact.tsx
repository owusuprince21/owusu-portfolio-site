'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, AlertCircle, MessageSquare } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { SectionHeading } from '@/components/ui/SectionHeading'
import ElectricBorder from '@/components/ElectricBorder'
import CurvedInput from '@/components/CurvedInput'
import { sendContactMessage } from '@/lib/api'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      await sendContactMessage(data)
      toast.success('Thank you! Your message has been sent.')
      reset()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      toast.error(message)
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'powusu050@gmail.com',
      href: 'mailto:powusu050@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+233 54 727 3952',
      href: 'tel:+233547273952',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Accra, Ghana',
      href: null,
    },
  ]

  return (
    <section id="contact" className="scroll-section section-padding py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Get In"
          highlight="Touch"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-dark-text">
                Let&apos;s Start a Conversation
              </h3>
              <p className="mb-8 text-dark-muted">
                I&apos;m always interested in new opportunities and collaborations.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon
                const content = (
                  <>
                    <div className="mb-0 mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-purple-500">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium text-dark-text">{info.label}</h4>
                      <p className="text-dark-muted">{info.value}</p>
                    </div>
                  </>
                )

                return (
                  <motion.div
                    key={info.label}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-start"
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        className="focus-outline -m-2 flex items-start rounded-lg p-2 transition-colors duration-200 hover:text-primary-400"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start">{content}</div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Outer div — CurvedInput renders its own <form>, so avoid nested forms */}
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-dark-text">Name *</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <CurvedInput
                      theme="dark"
                      type="text"
                      name="name"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Your full name"
                      ariaLabel="Name"
                      showButton={false}
                      showIcon
                      icon={
                        <>
                          <rect x={-14} y={-11} width={28} height={22} rx={6} fill="#3b82f6" />
                          <circle cx={0} cy={-3} r={4} fill="none" stroke="#fff" strokeWidth={1.6} />
                          <path
                            d="M -7 7 C -7 2.5 -4 1 0 1 C 4 1 7 2.5 7 7"
                            fill="none"
                            stroke="#fff"
                            strokeWidth={1.6}
                            strokeLinecap="round"
                          />
                        </>
                      }
                      width="100%"
                      bend={18}
                      height={56}
                      fontSize={16}
                      cornerRadius={14}
                      buttonColor="#3b82f6"
                      iconColor="#3b82f6"
                      borderColor="#3f3f46"
                      backgroundColor="#18181b"
                      shadowSize="sm"
                    />
                  )}
                />
                {errors.name && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle size={14} />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-dark-text">Email *</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <CurvedInput
                      theme="dark"
                      type="email"
                      name="email"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="your@email.com"
                      ariaLabel="Email"
                      showButton={false}
                      showIcon
                      width="100%"
                      bend={18}
                      height={56}
                      fontSize={16}
                      cornerRadius={14}
                      buttonColor="#8b5cf6"
                      borderColor="#3f3f46"
                      backgroundColor="#18181b"
                      shadowSize="sm"
                    />
                  )}
                />
                {errors.email && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle size={14} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-dark-text"
                >
                  Message *
                </label>
                <div className="relative">
                  <div
                    className="pointer-events-none absolute left-3 top-3 z-10 flex h-[34px] w-[42px] items-center justify-center rounded-lg bg-pink-500"
                    aria-hidden
                  >
                    <MessageSquare size={16} className="text-white" strokeWidth={2} />
                  </div>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className="w-full resize-none rounded-[14px] border border-[#3f3f46] bg-[#18181b] py-3 pl-[66px] pr-4 text-base text-dark-text shadow-sm placeholder-dark-muted transition-colors duration-200 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle size={14} />
                    {errors.message.message}
                  </p>
                )}
              </div>

              <ElectricBorder
                color="#60a5fa"
                speed={0.9}
                chaos={0.06}
                borderRadius={12}
                className="w-full"
                compact
              >
                <motion.button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`focus-outline flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-medium transition-all duration-200 ${
                    isSubmitting
                      ? 'cursor-not-allowed bg-dark-border text-dark-muted'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </motion.button>
              </ElectricBorder>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
