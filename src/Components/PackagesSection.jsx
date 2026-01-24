import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios"; 

const PackagesSection = () => {
  const axiosInstance = useAxios();

  const { data: packages = [], isLoading, isError } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const res = await axiosInstance.get('/packages');
      return res.data;
    }
  });

  if (isLoading) return (
    <div className="flex justify-center items-center py-20">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  
  if (isError) return (
    <div className="text-center py-20 text-error font-semibold">
      Failed to load packages. Please check your server connection.
    </div>
  );

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Flexible Membership Packages</h2>
          <p className="text-gray-500">Choose the plan that best fits your company's scale.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg._id} className="card bg-base-200 shadow-xl border border-transparent hover:border-primary transition-all duration-300 flex flex-col">
              <div className="card-body items-center text-center flex-grow">
                <h3 className="card-title text-2xl font-bold text-primary">{pkg.name}</h3>
                
                <div className="my-6">
                  <span className="text-5xl font-extrabold">${pkg.price}</span>
                  <span className="text-gray-400 ml-2">/ month</span>
                </div>
                
                <div className="badge badge-outline badge-lg mb-6 py-4">
                  Up to {pkg.employeeLimit} Employees
                </div>
                
                <ul className="space-y-4 text-left w-full mb-4">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="bg-success/20 text-success rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-8 pt-0 mt-auto">
                <button className="btn btn-primary btn-block text-white shadow-lg">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;