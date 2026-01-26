import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaUserPlus, FaSearchPlus, FaCheckDouble } from "react-icons/fa";

// 1. How It Works Section Component [cite: 186]
const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Register Account",
      description: "Join as an HR Manager to manage your team or as an Employee to request equipment." // [cite: 60, 64]
    },
    {
      icon: <FaSearchPlus />,
      title: "Manage Assets",
      description: "HR adds inventory; Employees browse and request assets with a note system." // [cite: 75, 104, 228]
    },
    {
      icon: <FaCheckDouble />,
      title: "Approve & Affiliate",
      description: "HR approves requests, automatically creating team affiliations and tracking returns." // [cite: 70, 406]
    }
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-500 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 2. FAQ Section Component [cite: 187]
const FAQSection = () => {
  const faqs = [
    {
      q: "What is the default employee limit for HR Managers?",
      a: "New HR Managers are auto-assigned a basic package with a limit of 5 employees for $0." // [cite: 62, 127]
    },
    {
      q: "Can an employee work for multiple companies?",
      a: "Yes, our system supports employees being affiliated with multiple companies simultaneously." // [cite: 23, 71, 407]
    },
    {
      q: "How do I upgrade my employee limit?",
      a: "HR Managers can upgrade packages anytime via the dashboard using secure Stripe integration." // [cite: 81, 113, 215]
    },
    {
      q: "What is the difference between asset types?",
      a: "Returnable items like laptops can be returned to stock, while non-returnable items are permanent." // [cite: 18, 197, 272]
    }
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-100 border border-base-300 rounded-box">
              <input type="radio" name="assetverse-faq" defaultChecked={index === 0} /> 
              <div className="collapse-title text-xl font-medium">
                {faq.q}
              </div>
              <div className="collapse-content text-gray-600"> 
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Contact CTA Section Component [cite: 188]
const ContactCTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-content">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-extrabold mb-6 text-white">Scale Your Company Assets Today</h2>
          <p className="text-lg mb-10 opacity-90">
            Join 100+ companies already using AssetVerse to track inventory and streamline HR workflows. // [cite: 183]
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/join-hr" className="btn btn-secondary btn-lg px-10 shadow-xl border-none">
              Join as HR Manager
            </Link>
            <Link to="/join-employee" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary px-10">
              Join as Employee
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Export to use in Home Page
const ExtraSections = () => {
  return (
    <>
      <HowItWorks />
      <FAQSection />
      <ContactCTA />
    </>
  );
};

export default ExtraSections;