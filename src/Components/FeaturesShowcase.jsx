import { motion } from "framer-motion";
import { 
  FaLaptop,     
  FaUserShield, 
  FaFileAlt,    
  FaChartPie, 
  FaRetweet,    
  FaBell 
} from "react-icons/fa";

const FeaturesShowcase = () => {
  const features = [
    {
      icon: <FaLaptop />,
      title: "Full Inventory Tracking",
      description: "Complete oversight of all physical assets, from assignment to collection."
    },
    {
      icon: <FaUserShield />,
      title: "HR Admin Dashboard",
      description: "Dedicated portal for managers to approve requests and manage subscriptions."
    },
    {
      icon: <FaFileAlt />,
      title: "Digital Requests",
      description: "Employees can browse and request assets with a formal note system."
    },
    {
      icon: <FaChartPie />,
      title: "Real-time Analytics",
      description: "Visual data charts showing returnable vs non-returnable equipment distribution."
    },
    {
      icon: <FaRetweet />,
      title: "Return Management",
      description: "Efficient workflow for returning equipment when employees offboard or upgrade."
    },
    {
      icon: <FaBell />,
      title: "Team Connectivity",
      description: "Keep the team engaged with automated birthday reminders and company notices."
    }
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-base-content mb-4"
          >
            Core System Features
          </motion.h2>
          <p className="text-gray-500">Everything you need to manage corporate assets at scale.</p>
        </div>

        {/* Clean grid layout as per requirements [cite: 179] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group p-10 bg-base-200 rounded-3xl hover:bg-base-100 border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-500"
            >
              <div className="text-4xl text-primary mb-6 bg-white shadow-sm w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-base-content">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-loose">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;