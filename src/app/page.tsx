import AboutComponent from "@/components/LandingPageComponents/AboutComponent";
import Footer from "@/components/LandingPageComponents/Footer";
import { HeaderForLandingPage } from "@/components/LandingPageComponents/HeaderForLandingPage";
import { HeroSectionForLandingPage } from "@/components/LandingPageComponents/HeroSectionForLandingPage";
import InvestmentPlansComponent from "@/components/LandingPageComponents/InvestmentPlansComponent";
import LiveUpdates from "@/components/LandingPageComponents/LiveUpdates";
import NumberStats from "@/components/LandingPageComponents/NumberStats";
import OurFeatures from "@/components/LandingPageComponents/OurFeatures";
import StableAndSafeComponent from "@/components/LandingPageComponents/StableAndSafeComponent";
import { StatsForLandingPage } from "@/components/LandingPageComponents/StatsForLandingPage";
import Sponsors from "@/components/Sponsors";

export default function Home() {
  return (
   
    <div className=" ">
       <div className="gtranslate_wrapper" style={{ padding: '10px' }} />
      {/* <LanguageSelector /> */}
       {/* <LanguageSelector /> */}
     <HeaderForLandingPage/>
     <HeroSectionForLandingPage/>
     <StatsForLandingPage/>
     <StableAndSafeComponent/>
     <AboutComponent/>
     <OurFeatures/>
     <InvestmentPlansComponent/>
     <NumberStats/>
     <LiveUpdates/>
     <Sponsors/>
     <Footer/>
    </div>

  
  );
}
