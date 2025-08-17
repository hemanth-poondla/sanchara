import React, { useState } from 'react';
import HeroStats from './HeroStats';
import TripTabs from './TripTabs';
import HighlightBox from './HighlightBox';
import RouteMap from './RouteMap';
import TipsGrid from './TipsGrid';
import Moodboard from './Moodboard';
import HotelsSection from './HotelsSection';
import PackingList from './PackingList';
import FooterCTA from './FooterCTA';
import DayItinerary from './DayItinerary';
import ItinerarySection from './ItinerarySection';
import '../../styles/Itinerary/ItineraryPlanner.css';

const ItineraryPlanner = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const heroStatsData = [
    { label: 'Cities to Explore', value: '6' },
    { label: 'Scenic Journey', value: '763 km' },
    { label: 'Estimated Cost', value: '₹58,000' },
    { label: 'Unforgettable Trip', value: '7 Days' }
  ];

  const tabsData = [
    {
      icon: 'fas fa-layer-group',
      label: 'Overview',
      content: <p className="placeholder">Trip overview coming soon...</p>
    },
    {
      icon: 'fas fa-calendar-day',
      label: 'Day 1: Johannesburg',
      content: (
        <ItinerarySection title="Day 1: Johannesburg">
          <DayItinerary
            date="Oct 10, 2025"
            weather={{ temp: 26, note: 'Sunny and dry. Pack your shades!' }}
            highlights="Urban vibes, Soweto culture, and local markets."
            activities={[
              { time: '9:00 AM', description: 'Visit Apartheid Museum', icon: '🏛️', transport: 'Self-drive' },
              { time: '12:00 PM', description: 'Lunch at Neighbourgoods Market', icon: '🍴', transport: 'Walk' },
              { time: '3:00 PM', description: 'Soweto Tour', icon: '🚌', transport: 'Guided van' }
            ]}
            expenses={[
              { title: 'Lunch', payer: 'John', amount: 750 },
              { title: 'Museum Entry', payer: 'Lisa', amount: 300 }
            ]}
            blogNotes={{
              text: '',
              images: []
            }}
            onAddExpense={() => alert('Expense added!')}
            onSaveNotes={(notes) => console.log('Notes saved:', notes)}
          />
        </ItinerarySection>
      )
    },
    {
      icon: 'fas fa-mountain',
      label: 'Day 2: Panorama Route',
      content: (
        <ItinerarySection title="Day 2: Panorama Route">
          <DayItinerary
            date="Oct 11, 2025"
            weather={{ temp: 22, note: 'Cool breeze. Perfect for sightseeing.' }}
            highlights="Blyde River Canyon, waterfalls, and epic lookouts."
            activities={[
              { time: '8:00 AM', description: 'God’s Window', icon: '🌄', transport: 'Self-drive' },
              { time: '11:00 AM', description: 'Bourke’s Luck Potholes', icon: '🪨', transport: 'Self-drive' }
            ]}
            expenses={[
              { title: 'Entry Fees', payer: 'Mark', amount: 500 }
            ]}
            blogNotes={{ text: '', images: [] }}
            onAddExpense={() => alert('Expense added!')}
            onSaveNotes={(notes) => console.log('Notes saved:', notes)}
          />
        </ItinerarySection>
      )
    },
    {
      icon: 'fas fa-tree',
      label: 'Day 3: Underberg',
      content: (
        <ItinerarySection title="Day 3: Underberg">
          <DayItinerary
            date="Oct 12, 2025"
            weather={{ temp: 18, note: 'Chilly with mountain winds' }}
            highlights="Alpine charm and stargazing"
            activities={[
              { time: '10:00 AM', description: 'Drive to Underberg', icon: '🚗', transport: 'Rental car' },
              { time: '5:00 PM', description: 'Evening stargazing', icon: '🌌', transport: 'Walk' }
            ]}
            expenses={[
              { title: 'Fuel', payer: 'Sara', amount: 1200 }
            ]}
            blogNotes={{ text: '', images: [] }}
            onAddExpense={() => alert('Expense added!')}
            onSaveNotes={(notes) => console.log('Notes saved:', notes)}
          />
        </ItinerarySection>
      )
    },
    {
      icon: 'fas fa-hiking',
      label: 'Day 4: Sani Pass Tour',
      content: (
        <ItinerarySection title="Day 4: Sani Pass Tour">
          <DayItinerary
            date="Oct 13, 2025"
            weather={{ temp: 14, note: 'Cold and misty. Jacket needed!' }}
            highlights="4x4 adventure to Lesotho"
            activities={[
              { time: '8:30 AM', description: 'Sani Pass 4x4 Tour', icon: '🚙', transport: 'Tour jeep' },
              { time: '12:00 PM', description: 'Lunch at highest pub in Africa', icon: '🍻', transport: 'Same' }
            ]}
            expenses={[
              { title: 'Tour cost', payer: 'Raj', amount: 2200 }
            ]}
            blogNotes={{ text: '', images: [] }}
            onAddExpense={() => alert('Expense added!')}
            onSaveNotes={(notes) => console.log('Notes saved:', notes)}
          />
        </ItinerarySection>
      )
    },
    {
      icon: 'fas fa-umbrella-beach',
      label: 'Day 5: Port Elizabeth',
      content: (
        <ItinerarySection title="Day 5: Port Elizabeth">
          <DayItinerary
            date="Oct 14, 2025"
            weather={{ temp: 28, note: 'Hot coastal winds. Sunscreen needed!' }}
            highlights="Beach chill and seafood feast"
            activities={[
              { time: '11:00 AM', description: 'Swim at Hobie Beach', icon: '🏖️', transport: 'Walk' },
              { time: '7:00 PM', description: 'Seafood dinner', icon: '🦐', transport: 'Uber' }
            ]}
            expenses={[
              { title: 'Dinner', payer: 'Anu', amount: 1800 }
            ]}
            blogNotes={{ text: '', images: [] }}
            onAddExpense={() => alert('Expense added!')}
            onSaveNotes={(notes) => console.log('Notes saved:', notes)}
          />
        </ItinerarySection>
      )
    }
  ];

  const highlight = {
    title: 'Journey Highlights',
    summary: '2 Flights • 1 Boat Ride • 3 Road Trips',
    quote: "From sunrise hikes to coastal drives, you're in for a treat! This itinerary balances adventure with relaxation for the perfect South African experience."
  };

  const routeData = [
    { day: 'Day 1', color: '#4caf50', title: 'Johannesburg', desc: 'Arrival and city exploration' },
    { day: 'Day 2', color: '#ff9800', title: 'Panorama Route', desc: 'Scenic drives and waterfalls' },
    { day: 'Day 3', color: '#2196f3', title: 'Underberg', desc: 'Mountain retreat and hiking' },
    { day: 'Day 4', color: '#9c27b0', title: 'Sani Pass Tour', desc: '4x4 adventure to Lesotho' },
    { day: 'Day 5', color: '#f44336', title: 'Port Elizabeth', desc: 'Coastal relaxation and beaches' }
  ];

  const tips = [
    { icon: 'fas fa-comments', title: '"Howzit"', desc: 'means hello! Learn a few Zulu phrases' },
    { icon: 'fas fa-money-bill-wave', title: 'ZAR cash', desc: 'preferred in small towns' },
    { icon: 'fas fa-car', title: 'Drive', desc: 'left-side on the road' },
    { icon: 'fas fa-sim-card', title: 'Best SIMs', desc: 'MTN, Vodacom' },
    { icon: 'fas fa-utensils', title: 'Try', desc: 'biltong and boerewors' },
    { icon: 'fas fa-hand-holding-usd', title: 'Tipping', desc: '10-15% at restaurants' }
  ];

  const moodImages = [
    { url: 'https://images.unsplash.com/photo-1579547621700-03c2c337370a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Landscape' },
    { url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Wildlife' },
    { url: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Coast' },
    { url: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Culture' },
    { url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Sunset' }
  ];

  const packingList = [
    'High SPF sunblock & UV-protection sunglasses',
    'Reusable insulated water bottle',
    'Universal travel adapter with USB ports',
    'Lightweight waterproof jacket',
    'Comfortable hiking shoes',
    'Binoculars for wildlife viewing',
    'Portable power bank'
  ];

  const hotels = [
    {
      name: 'Underberg Hills Lodge',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      day: 'Day 3',
      price: '₹2,500/night',
      rating: 4.5,
      reviews: 128,
      description: 'Mountain-view rooms with fireplace and private balcony',
      features: ['Free WiFi', 'Breakfast', 'Spa'],
      bookingUrl: 'https://www.booking.com/hotel/in/underberg-hills-lodge.html'
    },
    {
      name: 'Panorama Ridge Stay',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      day: 'Day 2',
      price: '₹3,000/night',
      rating: 4.8,
      reviews: 94,
      description: 'Luxury cliffside retreat with infinity pool',
      features: ['Pool', 'Restaurant', 'Hiking'],
      bookingUrl: 'https://www.booking.com/hotel/in/panorama-ridge-stay.html'
    },
    {
      name: 'Port Elizabeth Inn',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      day: 'Day 5',
      price: '₹2,800/night',
      rating: 4.2,
      reviews: 206,
      description: 'Beachfront property with private beach access',
      features: ['Beach Access', 'Spa', 'Bar'],
      bookingUrl: 'https://www.booking.com/hotel/in/port-elizabeth-inn.html'
    },
    {
      name: 'Sani Pass Eco Lodge',
      image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      day: 'Day 4',
      price: '₹2,200/night',
      rating: 4.5,
      reviews: 87,
      description: 'Eco-friendly lodge with mountain views',
      features: ['Eco-friendly', 'Guided Tours', 'Restaurant'],
      bookingUrl: 'https://www.booking.com/hotel/in/sani-pass-eco-lodge.html'
    }
  ];

  return (
    <div className="itinerary-wrapper container">
      <section className="hero">
        <h1>Your South African Adventure Awaits</h1>
        <p>Experience the perfect blend of nature, culture, and adventure across 7 unforgettable days</p>
        <HeroStats stats={heroStatsData} />
      </section>

      <TripTabs 
        days={tabsData} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <div className="tabs-content">
        {tabsData[activeTab].content}
      </div>
      
      <HighlightBox highlight={highlight} />
      <RouteMap routes={routeData} />

      <div className="section-grid">
        <PackingList 
          title="What to Pack" 
          iconClass="fas fa-suitcase" 
          items={packingList} 
        />

        <div className="section-card">
          <h3><i className="fas fa-lightbulb"></i> Local Tips</h3>
          <TipsGrid tips={tips} />
        </div>

        <div className="section-card">
          <h3><i className="fas fa-images"></i> Journey Moodboard</h3>
          <p>Visual inspiration for your adventure</p>
          <Moodboard images={moodImages} />
        </div>
      </div>

      <HotelsSection hotels={hotels} />

      <FooterCTA />
    </div>
  );
};

export default ItineraryPlanner;