import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

export default function Home({exploreData,cardsData}) {
  return (
    <div className="">
      <Head>
      {/* Similar to the head in html, title is for the title of the app */}
      {/* The clasNames in Div are from tailwind css, in tailwindCss we need not create new file instead we can use something called as utility classes  */}
        <title>AirBnb Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Banner />
      {/* main part of the home page */}
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
      <section className="pt-6">
        <h2 className="text-4xl font-semibold pb-5">Explore near by</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exploreData?.map(item => (
          <SmallCard key={item.img} 
          img={item.img} location={item.location} 
          distance={item.distance} />
        ))}
      </div>

      <section>
        <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
        <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
        {cardsData?.map(item => (
          <MediumCard key={item.img} img={item.img} title={item.title}/>
        ))}
        </div>
      </section>
        

        <LargeCard 
          img='https://links.papareact.com/4cj'
          title='The Greatest Outdoors'
          description='Wishlists curated by AirBnB'
          buttonText='Get Inspired'
        />
      </section>
      </main>
      <Footer />
    </div>
  )
}
// Static rendering inside the server before we reach the actual browser 
export async function getStaticProps(){
 const exploreData = await fetch('https://links.papareact.com/pyp').then( res => res.json());
 
const cardsData = await fetch('https://links.papareact.com/zp1').then(res => res.json());



 return {
   props:{
     exploreData,
     cardsData
   }
 }
}
