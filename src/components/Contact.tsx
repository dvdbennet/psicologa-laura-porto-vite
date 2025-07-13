import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Video } from "lucide-react";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "online",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert(
      "Thank you for your message! I will get back to you within 24 hours."
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            Get <span className="text-emerald-600 font-medium">In Touch</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to take the first step? I'm here to answer your questions and
            help you begin your journey toward healing and growth.
          </p>
        </motion.div>

        <div className="grid gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-9"
          >
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Phone className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">
                      (555) 123-4567
                    </div>
                    <div className="text-slate-600">
                      Call or text for appointments
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Mail className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">
                      laura.porto@email.com
                    </div>
                    <div className="text-slate-600">
                      Secure email communication
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <MapPin className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">
                      123 Wellness Drive, Suite 200
                    </div>
                    <div className="text-slate-600">Los Angeles, CA 90210</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Video className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">
                      Online Sessions Available
                    </div>
                    <div className="text-slate-600">Secure video platform</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 self-start rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="text-emerald-600" size={24} />
                <h4 className="text-xl font-semibold text-slate-800">
                  Office Hours
                </h4>
              </div>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
