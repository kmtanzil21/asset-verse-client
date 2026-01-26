import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteLeft, FaBuilding, FaUsers, FaCheckCircle } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const TestimonialsStats = () => {
  const stats = [
    { icon: <FaBuilding />, value: "100+", label: "Companies Trust Us" }, 
    { icon: <FaUsers />, value: "5000+", label: "Active Employees" },
    { icon: <FaCheckCircle />, value: "99.9%", label: "Asset Security" },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "HR Director, TechFlow",
      text: "AssetVerse transformed how we track our hardware. No more lost laptops or spreadsheet headaches!", // 
      image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "David Chen",
      role: "Operations Manager, BuildIt",
      text: "The auto-affiliation feature saved our team hours of manual data entry. Truly a game changer for B2B management.", // 
      image: "https://i.pravatar.cc/150?u=david"
    },
    {
      name: "Elena Rodriguez",
      role: "CEO, InnovateX",
      text: "Scalable pricing and a professional interface. It's the only asset tool our startup will ever need.", // 
      image: "https://i.pravatar.cc/150?u=elena"
    }
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        
        {/* Statistics Grid - Trust Building Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-8 bg-primary/5 rounded-2xl border border-primary/10"
            >
              <div className="text-4xl text-primary mb-4">{stat.icon}</div>
              <div className="text-4xl font-black text-base-content mb-2">{stat.value}</div>
              <div className="text-gray-500 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Industry Leaders Say</h2>
            <p className="text-gray-500">Real feedback from HR Managers using AssetVerse</p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-12"
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <div className="bg-base-200 p-10 rounded-3xl relative text-center">
                  <FaQuoteLeft className="text-primary/20 text-6xl absolute top-6 left-6" />
                  <p className="text-xl italic text-base-content mb-8 relative z-10">
                    "{t.text}"
                  </p>
                  <div className="flex flex-col items-center">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-16 h-16 rounded-full mb-4 border-2 border-primary" 
                    />
                    <h4 className="font-bold text-lg">{t.name}</h4>
                    <span className="text-primary text-sm font-medium">{t.role}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsStats;