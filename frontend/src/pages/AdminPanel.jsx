import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { api } from '../services/api';
import { ShieldCheck, Check, X, AlertTriangle, ExternalLink, Clock } from 'lucide-react';

export const AdminPanel = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }

    const fetchPending = async () => {
      try {
        const all = await api.getAllCampaigns();
        setPendingCampaigns(all.filter(c => c.status === 'Pending'));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, [user, navigate]);

  const handleAction = async (id, status) => {
    setProcessingId(id);
    try {
      await api.updateCampaignStatus(id, status);
      setPendingCampaigns(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
            Admin Moderation
          </h1>
          <p className="text-gray-500 mt-1">Review and verify pending campaigns to ensure platform integrity.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              Pending Verification ({pendingCampaigns.length})
            </h2>
            
            {loading ? (
              <div className="p-12 bg-white rounded-xl border border-gray-100 flex justify-center shadow-sm">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
            ) : pendingCampaigns.length > 0 ? (
              pendingCampaigns.map(c => (
                <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={c.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md mb-1">
                            {c.category}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{c.title}</h3>
                        </div>
                        <a href={`/campaigns/${c.id}`} target="_blank" className="text-indigo-600 hover:text-indigo-700 p-1 rounded-full hover:bg-indigo-50 transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{c.description}</p>
                      
                      <div className="flex flex-wrap gap-4 items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <div className="text-sm">
                          <span className="text-gray-500">By </span>
                          <span className="font-medium text-gray-900">{c.creator.name}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-gray-500">Goal: </span>
                          <span className="font-bold text-gray-900">₹{c.goal.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAction(c.id, 'Active')}
                            disabled={processingId === c.id}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                          >
                            <Check className="w-4 h-4" /> Approve
                          </button>
                          <button
                            onClick={() => handleAction(c.id, 'Rejected')}
                            disabled={processingId === c.id}
                            className="bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                          >
                            <X className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Queue is empty</h3>
                <p className="text-gray-500 mt-1">All submitted campaigns have been reviewed.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
             <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Fraud Reports
                </h3>
                <div className="space-y-4">
                   <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                      <div className="text-xs font-bold text-red-700 mb-1">SUSPICIOUS ACTIVITY</div>
                      <div className="text-sm font-medium text-gray-900 mb-1">Campaign: "Help me buy a Tesla"</div>
                      <div className="text-xs text-gray-500 italic">"User reported: Possible scam, misleading description."</div>
                      <button className="mt-2 text-xs font-bold text-red-700 hover:underline uppercase">Investigate →</button>
                   </div>
                   <p className="text-xs text-gray-500 text-center italic">0 new reports in the last 24h</p>
                </div>
             </div>

             <div className="bg-indigo-900 rounded-xl shadow-lg p-6 text-white">
                <h3 className="font-bold mb-2">Admin Guidelines</h3>
                <ul className="text-sm text-indigo-100 space-y-3">
                   <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0"></div>
                      Verify medical documents for high-goal health campaigns.
                   </li>
                   <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0"></div>
                      Check for duplicate titles or AI-generated suspicious descriptions.
                   </li>
                   <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0"></div>
                      Ensure payout bank details are matched with creator identity.
                   </li>
                </ul>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
