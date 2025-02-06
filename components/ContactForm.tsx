"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleContactFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    const formData = new FormData(e.target as HTMLFormElement)

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "")
    formData.append("subject", `Consulting Contact Form Submission`)
    formData.append("name", contactForm.name)
    formData.append("email", contactForm.email)
    formData.append("message", contactForm.message)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const json = await response.json()
      if (response.status === 200) {
        setSubmitMessage(json.message)
        setContactForm({
          name: "",
          email: "",
          message: "",
        })
      } else {
        throw new Error(json.message || "Submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitMessage("There was an error submitting your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleContactFormSubmission} className="max-w-xl mx-auto space-y-6">
      <div className="space-y-2">
        <Input
          placeholder="Your Name"
          name="name"
          value={contactForm.name}
          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={contactForm.email}
          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          required
        />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Your Message"
          name="message"
          value={contactForm.message}
          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[150px]"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#7F62F4] hover:bg-[#6B4FE6] transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      {submitMessage && (
        <p className={`text-center ${submitMessage.includes("error") ? "text-red-500" : "text-green-500"}`}>
          {submitMessage}
        </p>
      )}
    </form>
  )
}

