import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShieldCheck, Clock, Award } from 'lucide-react';
import { CATEGORY_INFO } from '../data/mockVendors';
import { VendorCategory } from '../types';

export const Footer: React.FC = () => {
  const { setCategoryFilter, navigateTo, openAuthModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Adjacency Trust Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-violet-950/80 text-violet-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">100% Verified Vendors</h4>
              <p className="text-xs text-slate-400 mt-1">Every portfolio, license, and venue physically vetted by our team.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-violet-950/80 text-violet-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Transparent Pricing</h4>
              <p className="text-xs text-slate-400 mt-1">Clear package breakdowns with no hidden venue fees or surprise charges.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-violet-950/80 text-violet-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Guaranteed Response</h4>
              <p className="text-xs text-slate-400 mt-1">Inquiries answered in under 2 hours with instant availability checks.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-violet-950/80 text-violet-400 shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Couples First</h4>
              <p className="text-xs text-slate-400 mt-1">Personalized planning support, date holding, and dispute protection.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-4">VendorHub</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              The premier marketplace connecting couples with the most talented wedding professionals in America.
            </p>
            <div className="text-xs text-slate-400">
              <span>Color Palette:</span>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-4 h-4 rounded bg-[#8B5CF6] inline-block" title="Brand Purple #8B5CF6"></span>
                <span className="w-4 h-4 rounded bg-[#EDE7FF] inline-block border border-slate-700" title="Light Purple #EDE7FF"></span>
                <span className="w-4 h-4 rounded bg-white inline-block" title="Pure White #FFFFFF"></span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Popular Categories</h4>
            <ul className="space-y-2 text-xs">
              {(Object.keys(CATEGORY_INFO) as VendorCategory[]).slice(0, 5).map(catKey => (
                <li key={catKey}>
                  <button
                    onClick={() => setCategoryFilter(catKey)}
                    className="hover:text-violet-400 transition-colors cursor-pointer text-left"
                  >
                    {CATEGORY_INFO[catKey].name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">For Couples</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('listing')} className="hover:text-violet-400 transition-colors cursor-pointer">
                  Search Wedding Vendors
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('compare')} className="hover:text-violet-400 transition-colors cursor-pointer">
                  Vendor Comparison Tool
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-violet-400 transition-colors cursor-pointer">
                  Saved Shortlist
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('user-dashboard')} className="hover:text-violet-400 transition-colors cursor-pointer">
                  Wedding Checklist & Budget
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">For Vendors</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={openAuthModal} className="hover:text-violet-400 transition-colors cursor-pointer">
                  Join as Vendor Partner
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('vendor-dashboard')} className="hover:text-violet-400 transition-colors cursor-pointer">
                  Vendor Portal & Leads
                </button>
              </li>
              <li>
                <span className="text-slate-500">Zero commission on direct inquiries</span>
              </li>
              <li>
                <span className="text-slate-500">Verified Business Directory</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} VendorHub Inc. Built for modern weddings. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Security</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
