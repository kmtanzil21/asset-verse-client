import { motion } from "framer-motion";
import { FaUserPlus, FaSearchPlus, FaCheckDouble } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Register Account",
      description: "Join as an HR Manager to manage your team or as an Employee to request equipment."
    },
    {
      icon: <FaSearchPlus />,
      title: "Request or Add Assets",
      description: "HR adds inventory; Employees browse and request what they need with a simple note."
    },
    {
      icon: <FaCheckDouble />,
      title: "Approve & Assign",
      description: "HR approves requests, automatically creating team affiliations and tracking returns."
    }
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg">
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

export default HowItWorks;