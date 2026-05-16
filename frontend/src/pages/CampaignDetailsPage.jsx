import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, AlertTriangle, CheckCircle, Clock, User, Heart } from 'lucide-react';
import { api } from '../services/api';
import { useAppContext } from '../context/AppContext';

export const CampaignDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAppContext();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [donating, setDonating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await api.getCampaignById(id);
        setCampaign(data);
      } catch (error) {
        console.error("Campaign not found", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) return;
    
    setDonating(true);
    try {
      await api.donate(campaign.id, Number(donationAmount));
      // Refresh campaign data
      const updated = await api.getCampaignById(id);
      setCampaign(updated);
      setDonationAmount('');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Donation failed", error);
    } finally {
      setDonating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-2">Campaign Not Found</h2>
        <p className="text-gray-500 mb-6">The campaign you are looking for does not exist or has been removed.</p>
        <Link to="/campaigns" className="btn btn-primary px-6 py-2">Back to Explore</Link>
      </div>
    );
  }

  const percent = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Donation successful! Thank you.</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left) */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
            
            <div className="rounded-xl overflow-hidden mb-8 shadow-sm">
              <img src={campaign.image} alt={campaign.title} className="w-full h-[400px] object-cover" />
            </div>

            <div className="flex items-center gap-4 mb-8 text-gray-600 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                  {campaign.creator.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Organizer</div>
                  <div className="font-medium text-gray-900">{campaign.creator.name}</div>
                </div>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Created on {new Date(campaign.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="prose max-w-none mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Story</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{campaign.description}</p>
            </div>

            {campaign.updates && campaign.updates.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Updates</h2>
                <div className="space-y-6">
                  {campaign.updates.map((update, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
                      <div className="absolute top-6 -left-3 w-6 h-6 bg-primary-100 rounded-full border-4 border-white"></div>
                      <div className="text-sm text-gray-500 mb-2">{new Date(update.date).toLocaleDateString()}</div>
                      <p className="text-gray-700">{update.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button className="flex items-center text-gray-500 hover:text-red-600 transition-colors text-sm">
                <AlertTriangle className="w-4 h-4 mr-2" /> Report this campaign
              </button>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">₹{campaign.raised.toLocaleString()}</span>
                  <span className="text-gray-500 pb-1">raised of ₹{campaign.goal.toLocaleString()} goal</span>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                  <div className="bg-primary-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${percent}%` }}></div>
                </div>
                <div className="text-gray-500 text-sm font-medium">{campaign.donors} people have donated</div>
              </div>

              {campaign.status === "Active" ? (
                <form onSubmit={handleDonate} className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter Donation Amount (₹)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        type="number"
                        min="1"
                        required
                        className="block w-full pl-8 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        placeholder="1000"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={donating}
                    className="w-full btn btn-primary py-3 text-lg font-semibold flex items-center justify-center gap-2"
                  >
                    {donating ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>Donate Now <Heart className="w-5 h-5 fill-white" /></>
                    )}
                  </button>
                </form>
              ) : (
                <div className="bg-gray-100 text-gray-700 text-center py-3 rounded-lg mb-6 font-medium">
                  This campaign is {campaign.status.toLowerCase()} and no longer accepting donations.
                </div>
              )}

              <button className="w-full btn btn-outline py-2.5 mb-8 flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" /> Share Campaign
              </button>

              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" /> Recent Donations
                </h3>
                {campaign.donors > 0 ? (
                  <div className="space-y-4">
                    {/* Simulated recent donors */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">Anonymous</div>
                        <div className="text-xs text-gray-500 flex gap-2"><span>₹{Math.floor(Math.random() * 5000) + 500}</span> • <span>Just now</span></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">Well Wisher</div>
                        <div className="text-xs text-gray-500 flex gap-2"><span>₹{Math.floor(Math.random() * 10000) + 1000}</span> • <span>2 hrs ago</span></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Be the first to donate!</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
