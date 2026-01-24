import { motion } from "framer-motion";
import { FaBoxes, FaUserCheck, FaChartLine, FaShieldAlt } from "react-icons/fa";

const AboutSection = () => {
  const benefits = [
    {
      icon: <FaBoxes className="text-4xl text-primary" />,
      title: "Inventory Control",
      description: "Provide clear visibility into company asset inventory and reduce administrative overhead."
    },
    {
      icon: <FaUserCheck className="text-4xl text-primary" />,
      title: "Enhanced Accountability",
      description: "Prevents asset loss and improves accountability by tracking which employee holds which equipment."
    },
    {
      icon: <FaChartLine className="text-4xl text-primary" />,
      title: "Streamlined Workflow",
      description: "Effortlessly manage asset assignment and return processes with a simple approval system."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: "Subscription Scaling",
      description: "Easily upgrade your employee limits as your company grows with secure Stripe integration."
    }
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4 text-base-content"
          >
            Why Choose AssetVerse?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            AssetVerse is a comprehensive digital platform designed to help companies manage physical assets efficiently.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="card-title text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;