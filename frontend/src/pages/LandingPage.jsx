import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, HeartPulse } from 'lucide-react';
import { api } from '../services/api';
import { cn } from '../utils/cn';

export const LandingPage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await api.getCampaigns();
        setFeatured(data.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Empower Change,<br />One Donation at a Time.
          </h1>
          <p className="mt-4 max-w-2xl text-xl mx-auto text-primary-100 mb-10">
            Join thousands of people making a difference. Start a campaign for medical aid, education, or disaster relief and raise funds securely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create" className="btn bg-white text-primary-700 hover:bg-gray-50 px-8 py-3 text-lg font-semibold rounded-full shadow-lg">
              Start a Campaign
            </Link>
            <Link to="/campaigns" className="btn border-2 border-white/30 hover:bg-white/10 text-white px-8 py-3 text-lg font-semibold rounded-full backdrop-blur-sm transition-all">
              Explore Causes
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">0% Platform Fee</h3>
              <p className="text-gray-500">Every single rupee you donate goes directly to the cause. We rely entirely on voluntary tips.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Campaigns</h3>
              <p className="text-gray-500">Our trust and safety team verifies every medical and relief campaign before they go live.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Withdrawals</h3>
              <p className="text-gray-500">Funds are transferred directly to the beneficiary's bank account with minimal delay.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Trending Causes</h2>
              <p className="text-gray-500 mt-2">Support campaigns that need urgent attention.</p>
            </div>
            <Link to="/campaigns" className="hidden sm:flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="card h-96 animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-5 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featured.map(campaign => {
                const percent = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
                return (
                  <Link to={`/campaigns/${campaign.id}`} key={campaign.id} className="card hover:shadow-md transition-shadow group flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-gray-800 rounded-md">
                        {campaign.category}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{campaign.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{campaign.description}</p>
                      
                      <div className="mt-auto">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-semibold text-primary-600">₹{campaign.raised.toLocaleString()}</span>
                          <span className="text-gray-500">raised of ₹{campaign.goal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{campaign.donors} donors</span>
                          <span className="text-primary-600 font-medium group-hover:underline">Donate now →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="mt-8 text-center sm:hidden">
            <Link to="/campaigns" className="btn btn-outline px-6 py-2">
              View all campaigns
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
