import { initialCampaigns } from '../data/initialData';

// Simulated delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getStorageCampaigns = () => {
  const stored = localStorage.getItem('crowdfundx_campaigns');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('crowdfundx_campaigns', JSON.stringify(initialCampaigns));
  return initialCampaigns;
};

const setStorageCampaigns = (campaigns) => {
  localStorage.setItem('crowdfundx_campaigns', JSON.stringify(campaigns));
};

export const api = {
  // Campaigns
  getCampaigns: async (status = "Active") => {
    await delay(600); // Simulate network
    const all = getStorageCampaigns();
    return all.filter(c => c.status === status);
  },

  getAllCampaigns: async () => {
    await delay(600);
    return getStorageCampaigns();
  },

  getCampaignById: async (id) => {
    await delay(500);
    const all = getStorageCampaigns();
    const campaign = all.find(c => c.id === id);
    if (!campaign) throw new Error("Campaign not found");
    return campaign;
  },

  createCampaign: async (campaignData, user) => {
    await delay(1000);
    const all = getStorageCampaigns();
    const newCampaign = {
      ...campaignData,
      id: Date.now().toString(),
      raised: 0,
      donors: 0,
      status: "Pending", // Needs admin approval
      creator: { id: user.id, name: user.name },
      createdAt: new Date().toISOString(),
      updates: []
    };
    setStorageCampaigns([newCampaign, ...all]);
    return newCampaign;
  },

  updateCampaignStatus: async (id, newStatus) => {
    await delay(800);
    const all = getStorageCampaigns();
    const updated = all.map(c => c.id === id ? { ...c, status: newStatus } : c);
    setStorageCampaigns(updated);
    return true;
  },

  donate: async (campaignId, amount) => {
    await delay(800);
    const all = getStorageCampaigns();
    const updated = all.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          raised: c.raised + amount,
          donors: c.donors + 1
        };
      }
      return c;
    });
    setStorageCampaigns(updated);
    return true;
  },

  // Auth (Mock)
  login: async (email, password) => {
    await delay(1000);
    if (email === "admin@crowdfundx.com") {
      const admin = { id: "admin_1", name: "Admin User", email, role: "ADMIN" };
      localStorage.setItem("crowdfundx_user", JSON.stringify(admin));
      return admin;
    }
    const user = { id: "user_" + Date.now(), name: email.split('@')[0], email, role: "USER" };
    localStorage.setItem("crowdfundx_user", JSON.stringify(user));
    return user;
  },

  logout: async () => {
    await delay(400);
    localStorage.removeItem("crowdfundx_user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("crowdfundx_user");
    return user ? JSON.parse(user) : null;
  }
};
