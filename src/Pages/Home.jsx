import React from 'react';
import Banner from '../Components/Banner';
import AboutSection from '../Components/AboutSection';
import PackagesSection from '../Components/PackagesSection';
import FeaturesShowcase from '../Components/FeaturesShowcase';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSection></AboutSection>
            <PackagesSection></PackagesSection>
            <FeaturesShowcase></FeaturesShowcase>
        </div>
    );
};

export default Home;