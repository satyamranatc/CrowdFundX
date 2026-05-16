export const initialCampaigns = [
  {
    id: "1",
    title: "Help Ramesh Fight Cancer",
    description: "Ramesh is a 35-year-old father of two recently diagnosed with Stage 3 Lymphoma. The cost of chemotherapy and radiation is beyond what his family can afford. Your contribution will directly fund his medical bills and help him focus on recovery. Every small donation makes a difference.",
    goal: 500000,
    raised: 275000,
    donors: 120,
    category: "Medical",
    status: "Active",
    creator: { id: "u1", name: "Anil Kumar" },
    image: "https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updates: [
      { id: "u1", text: "Ramesh has completed his first round of chemo! Thank you all for the support.", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
    ]
  },
  {
    id: "2",
    title: "Rebuild Kerala: Flood Relief Fund",
    description: "Recent floods have devastated numerous villages in Kerala, leaving thousands homeless and without basic necessities. We are raising funds to provide emergency shelter, clean drinking water, and dry rations. Stand with Kerala in this time of need.",
    goal: 2000000,
    raised: 1540000,
    donors: 850,
    category: "Disaster Relief",
    status: "Active",
    creator: { id: "u2", name: "NGO Hope Foundation" },
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updates: []
  },
  {
    id: "3",
    title: "Education for Underprivileged Girls in Bihar",
    description: "Education is a right, not a privilege. We aim to sponsor the education of 50 girls from marginalized communities in Bihar for an entire year. The funds cover tuition fees, books, uniforms, and mid-day meals.",
    goal: 300000,
    raised: 85000,
    donors: 45,
    category: "Education",
    status: "Active",
    creator: { id: "u3", name: "Priya Singh" },
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updates: []
  },
  {
    id: "4",
    title: "Support Local Animal Shelter 'Paws & Claws'",
    description: "Our shelter is currently housing over 200 stray dogs and cats. Due to recent inflation, our food supplies and medical resources are running out. We urgently need funds to buy food, vaccines, and pay our veterinary staff.",
    goal: 150000,
    raised: 150000,
    donors: 300,
    category: "Charity",
    status: "Completed",
    creator: { id: "u4", name: "Sarah John" },
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updates: [
      { id: "u1", text: "We reached our goal! Thank you to everyone who donated. The animals will be well fed for the next 3 months.", date: new Date().toISOString() }
    ]
  },
  {
    id: "5",
    title: "Suspicious Tech Startup Funding",
    description: "Help us build the next big AI thing. We need a lot of money very fast. Trust us.",
    goal: 10000000,
    raised: 0,
    donors: 0,
    category: "Tech",
    status: "Pending",
    creator: { id: "u5", name: "Anonymous" },
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date().toISOString(),
    updates: []
  },
  {
    id: "6",
    title: "Support for Tribal Artisans in Bastar",
    description: "Our initiative aims to provide modern tools and market access to tribal artisans in Bastar, Chhattisgarh. We need funds to set up a community workshop and conduct training sessions on sustainable crafting techniques.",
    goal: 450000,
    raised: 0,
    donors: 0,
    category: "Other",
    status: "Pending",
    creator: { id: "u6", name: "Sita Marandi" },
    image: "https://images.unsplash.com/photo-1544650039-22886fbb4323?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date().toISOString(),
    updates: []
  },
  {
    id: "7",
    title: "Mobile Medical Van for Rural Villages",
    description: "Many villages in remote areas lack basic healthcare facilities. We are raising funds to purchase and equip a mobile medical van that will travel to these villages twice a week, providing free checkups and essential medicines.",
    goal: 1200000,
    raised: 0,
    donors: 0,
    category: "Medical",
    status: "Pending",
    creator: { id: "u7", name: "Health For All NGO" },
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000",
    createdAt: new Date().toISOString(),
    updates: []
  }
];

export const categories = [
  "Medical", "Education", "Disaster Relief", "Charity", "Tech", "Other"
];

export const dummyUser = {
  id: "user_123",
  name: "John Doe",
  email: "john@example.com",
  role: "USER" // can be USER or ADMIN
};

export const adminUser = {
  id: "admin_1",
  name: "Admin User",
  email: "admin@crowdfundx.com",
  role: "ADMIN"
};
