import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { api } from '../services/api';
import { LayoutDashboard, Heart, PlusCircle, ExternalLink, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyCampaigns = async () => {
      try {
        const data = await api.getAllCampaigns();
        // Filter campaigns created by this user
        setCampaigns(data.filter(c => c.creator.id === user.id));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCampaigns();
  }, [user, navigate]);

  if (!user) return null;

  const totalRaised = campaigns.reduce((acc, curr) => acc + curr.raised, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <LayoutDashboard className="w-8 h-8 text-primary-600" />
              User Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Welcome back, {user.name}. Track your fundraising impact.</p>
          </div>
          <Link to="/create" className="btn btn-primary px-6 py-2.5 flex items-center gap-2 w-fit">
            <PlusCircle className="w-5 h-5" /> Start New Campaign
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Raised</div>
            <div className="text-2xl font-bold text-gray-900">₹{totalRaised.toLocaleString()}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Active Campaigns</div>
            <div className="text-2xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'Active').length}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Donors</div>
            <div className="text-2xl font-bold text-gray-900">{campaigns.reduce((acc, curr) => acc + curr.donors, 0)}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Successful</div>
            <div className="text-2xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'Completed').length}</div>
          </div>
        </div>

        {/* My Campaigns Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">My Campaigns</h2>
          </div>
          
          {loading ? (
             <div className="p-12 flex justify-center">
               <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
             </div>
          ) : campaigns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-3">Campaign</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Raised</th>
                    <th className="px-6 py-3">Donors</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {campaigns.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={c.image} className="w-10 h-10 rounded-md object-cover" alt="" />
                          <div className="font-medium text-gray-900 max-w-[200px] truncate">{c.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {c.status === 'Active' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </span>
                        )}
                        {c.status === 'Pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                        )}
                        {c.status === 'Completed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        )}
                        {c.status === 'Rejected' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <AlertCircle className="w-3 h-3" /> Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">₹{c.raised.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">of ₹{c.goal.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{c.donors}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/campaigns/${c.id}`} className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1">
                          View <ExternalLink className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No campaigns yet</h3>
              <p className="text-gray-500 mt-1 max-w-sm mx-auto">Start your first fundraising campaign to help a cause you care about.</p>
              <Link to="/create" className="btn btn-outline px-6 py-2 mt-6 inline-flex items-center gap-2">
                <PlusCircle className="w-4 h-4" /> Create Campaign
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
