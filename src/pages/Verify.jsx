import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  SearchCheck, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  MapPin, 
  AlertOctagon, 
  Star, 
  ExternalLink, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { DEMO_FSSAI_REGISTRY } from '../data/foodvigilData';
import { apiService } from '../services/apiService';

export default function Verify() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '10014021001234';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResult, setSearchResult] = useState(DEMO_FSSAI_REGISTRY[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (queryToSearch) => {
    const q = queryToSearch || searchQuery;
    if (!q.trim()) return;

    setIsSearching(true);
    setErrorMessage('');

    try {
      const res = await apiService.verifyBusiness(q);
      if (res.success) {
        setSearchResult(res.data);
      } else {
        setSearchResult(null);
        setErrorMessage(res.message);
      }
    } catch (e) {
      setErrorMessage('Verification service is temporarily unavailable. Try selecting a pre-loaded demo case.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectDemo = (item) => {
    setSearchQuery(item.licenseNumber);
    setSearchResult(item);
    setErrorMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <SearchCheck className="w-3.5 h-3.5" />
          <span>FSSAI Licence & Business Registry</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-900">
          Verify Food Business License
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Verify 14-digit FSSAI numbers, registered premises, business categories, and surveillance inspection records.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="card-surface p-6 sm:p-8 space-y-5">
        
        {/* Prototype Data Notice Banner */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong className="font-bold">Prototype Data Notice:</strong> Live public API integration is simulated via verified demo datasets. All entries are clearly stamped.
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-amber-200/80 font-bold uppercase rounded text-amber-900">
            Demo Mode Active
          </span>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter 14-digit FSSAI license or business name (e.g. Amul, 10014021001234)"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 shadow-soft-sm font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="btn-forest py-3 px-8 text-xs font-bold uppercase tracking-wider flex-shrink-0 shadow-sm"
          >
            <SearchCheck className="w-4 h-4 text-emerald-300" />
            <span>{isSearching ? 'Verifying...' : 'Verify Now'}</span>
          </button>
        </form>

        {/* Quick Demo Cases */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Try sample records:</span>
          {DEMO_FSSAI_REGISTRY.map((demo) => (
            <button
              key={demo.licenseNumber}
              onClick={() => handleSelectDemo(demo)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                searchResult?.licenseNumber === demo.licenseNumber
                  ? 'bg-forest-50 border-emerald-500 text-forest-900 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                demo.statusCode === 'active' ? 'bg-emerald-500' : demo.statusCode === 'suspended' ? 'bg-amber-500' : 'bg-rose-500'
              }`} />
              <span>{demo.brandName.split(' ')[0]}</span>
              <span className="text-[10px] text-slate-400">({demo.status})</span>
            </button>
          ))}
        </div>

      </div>

      {/* Search Results Display */}
      {errorMessage && (
        <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center space-y-2">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
          <h4 className="font-bold text-sm text-slate-800">No Registry Record Found</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">{errorMessage}</p>
        </div>
      )}

      {searchResult && (
        <div className="space-y-6">
          
          {/* Main Verification Card */}
          <div className="card-surface p-6 sm:p-8 space-y-6">
            
            {/* Header: License & Live Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">14-Digit FSSAI License:</span>
                  <span className="font-mono font-bold text-base text-forest-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {searchResult.licenseNumber}
                  </span>
                  <span className="badge-neutral text-[10px] px-2 py-0.5 rounded-full">
                    Demo verification data
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-forest-900 mt-2">
                  {searchResult.businessName}
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  Trade Brand: <span className="font-bold text-slate-900">{searchResult.brandName}</span>
                </p>
              </div>

              {/* Status Pill */}
              <div className={`p-4 rounded-2xl border flex items-center space-x-3 self-start sm:self-center ${
                searchResult.statusCode === 'active'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : searchResult.statusCode === 'suspended'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                {searchResult.statusCode === 'active' ? (
                  <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                ) : searchResult.statusCode === 'suspended' ? (
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                ) : (
                  <ShieldAlert className="w-6 h-6 text-rose-600 flex-shrink-0" />
                )}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">License Status</div>
                  <div className="text-sm font-extrabold font-display">{searchResult.status}</div>
                </div>
              </div>
            </div>

            {/* Grid of Verified Particulars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Premises */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Registered Premises Address</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {searchResult.premisesAddress}
                </p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-700">Category:</span> {searchResult.category}
                </div>
              </div>

              {/* Validity */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>Validity & Lifecycle</span>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Issue Date:</span>
                    <span className="font-semibold text-slate-800">{searchResult.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Valid Upto:</span>
                    <span className="font-bold text-forest-900">{searchResult.validUpto}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Last Verified:</span>
                    <span className="font-medium text-slate-700">{searchResult.lastVerified}</span>
                  </div>
                </div>
              </div>

              {/* Hygiene Rating */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>Hygiene Audit & Rating</span>
                </div>
                
                <div className="flex items-center space-x-1 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < searchResult.hygieneRating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                      }`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-800 ml-1.5">
                    {searchResult.hygieneRating} / 5 Stars
                  </span>
                </div>

                <div className="text-xs text-slate-600 pt-1">
                  <span className="font-semibold text-slate-800">Inspection Grade:</span> {searchResult.inspectionGrade}
                </div>
              </div>

            </div>

            {/* Official Circulars / Notices linked */}
            {searchResult.publicNotices && searchResult.publicNotices.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                  <AlertOctagon className="w-4 h-4 text-amber-600" />
                  <span>Public Safety Notices on File ({searchResult.publicNotices.length})</span>
                </div>
                {searchResult.publicNotices.map((n, i) => (
                  <div key={i} className="text-xs text-slate-700 space-y-0.5">
                    <div className="font-bold text-slate-900">{n.title} ({n.date})</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{n.details}</p>
                  </div>
                ))}
              </div>
            )}

            {/* External Official Portal Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">
                To cross-verify on official government servers:
              </span>
              <a
                href="https://foscos.fssai.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2 px-4"
              >
                <span>Open FSSAI FOSCOS Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
