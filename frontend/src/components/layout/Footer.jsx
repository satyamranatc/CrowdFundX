import React from 'react';
import { Heart, Globe, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-primary-600 fill-primary-600" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">CrowdFundX</span>
            </Link>
            <p className="text-gray-500 text-sm mb-6">
              Empowering communities to fund medical aid, education, disaster relief, and charity campaigns.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-primary-600 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-600 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-600 transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/campaigns" className="hover:text-primary-600 transition-colors">Explore Campaigns</Link></li>
              <li><Link to="/create" className="hover:text-primary-600 transition-colors">Start a Campaign</Link></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Pricing & Fees</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/campaigns?category=Medical" className="hover:text-primary-600 transition-colors">Medical Aid</Link></li>
              <li><Link to="/campaigns?category=Education" className="hover:text-primary-600 transition-colors">Education</Link></li>
              <li><Link to="/campaigns?category=Disaster+Relief" className="hover:text-primary-600 transition-colors">Disaster Relief</Link></li>
              <li><Link to="/campaigns?category=Charity" className="hover:text-primary-600 transition-colors">Charity</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CrowdFundX. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
