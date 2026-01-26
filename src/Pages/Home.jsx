import React from 'react';
import Banner from '../Components/Banner';
import AboutSection from '../Components/AboutSection';
import PackagesSection from '../Components/PackagesSection';
import FeaturesShowcase from '../Components/FeaturesShowcase';
import TestimonialsStats from '../Components/TestimonialsStats';
import HowItWorks from '../Components/HowItWorks';
import ExtraSections from '../Components/ExtraSections';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutSection></AboutSection>
            <PackagesSection></PackagesSection>
            <FeaturesShowcase></FeaturesShowcase>
            <TestimonialsStats></TestimonialsStats>
            <ExtraSections></ExtraSections>
            
        </div>
    );
};

export default Home;