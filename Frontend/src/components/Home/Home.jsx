import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks'
import PopularCategories from './PopularCategories'
import PopularCompanies from './PopularCompanies'


const Home = () => {
  const {isAuthorised}=useContext(Context);

  if(!isAuthorised){
    return <Navigate to={"/login"}></Navigate>
  }
  return (
    <section className='homePage page'>
    <HeroSection></HeroSection>
    <HowItWorks></HowItWorks>
    <PopularCategories></PopularCategories>
    <PopularCompanies></PopularCompanies>

    </section>
  )
}

export default Home
