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
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { DEMO_FSSAI_REGISTRY, FSSAI_STATE_CODES } from '../data/foodvigilData';
import { apiService } from '../services/apiService';

export default function Verify() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '10014021001234';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResult, setSearchResult] = useState(DEMO_FSSAI_REGISTRY[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [digitBreakdown, setDigitBreakdown] = useState(null);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const decodeFssaiDigits = (licenseNo) => {
    const clean = (licenseNo || '').replace(/[^0-9]/g, '');
    if (clean.length === 14) {
      const typeCode = clean.charAt(0);
      const stateCode = clean.substring(1, 3);
      const yearCode = clean.substring(3, 5);
      const quantityCode = clean.substring(5, 8);
      const serialCode = clean.substring(8, 14);

      const licenseType = typeCode === '1' ? 'Central License (Large Scale / Importer)' :
                          typeCode === '2' ? 'State License (Medium Scale / Manufacturer)' :
                          'Basic FSSAI Registration (Petty Food Business)';

      const stateName = FSSAI_STATE_CODES[stateCode] || `State Code ${stateCode} (India)`;
      const regYear = `20${yearCode}`;

      return {
        typeCode,
        licenseType,
        stateCode,
        stateName,
        yearCode,
        regYear,
        quantityCode,
        serialCode
      };
    }
    return null;
  };

  const handleSearch = async (queryToSearch) => {
    const q = queryToSearch || searchQuery;
    if (!q.trim()) return;

    setIsSearching(true);
    setErrorMessage('');

    try {
      const res = await apiService.verifyBusiness(q);
      if (res.success && res.data) {
        setSearchResult(res.data);
        setDigitBreakdown(decodeFssaiDigits(res.data.licenseNumber));
      } else {
        setSearchResult(null);
        setErrorMessage(res.message || 'No matching FSSAI record or registered trade entity found.');
      }
    } catch (e) {
      setErrorMessage('Verification service is temporarily unavailable. Try selecting a pre-loaded verified case.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectDemo = (item) => {
    setSearchQuery(item.licenseNumber);
    setSearchResult(item);
    setDigitBreakdown(decodeFssaiDigits(item.licenseNumber));
    setErrorMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-[#E8DCB8] shadow-sm">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EAF5EE] text-[#1F5D42] text-xs font-bold border border-[#BCE2CB]">
          <SearchCheck className="w-3.5 h-3.5 text-[#246B4A]" />
          <span>Statutory 14-Digit FSSAI License Validator</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1F5D42]">
          Verify Food Business License
        </h1>
        <p className="text-[#19352A] text-xs sm:text-sm leading-relaxed font-medium">
          Verify 14-digit FSSAI numbers, decode statutory state jurisdictions, check registered manufacturing premises, and inspect official surveillance ratings.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="card-surface p-6 sm:p-8 space-y-5">
        
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-brand-muted absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter 14-digit FSSAI number (e.g. 10014021001234) or brand name (e.g. Amul, Britannia, Nestle, Haldiram)"
              className="w-full pl-11 pr-4 py-3 bg-white border border-brand-border rounded-xl text-xs sm:text-sm text-brand-text placeholder:text-brand-muted/70 focus:outline-none focus:border-forest-800 shadow-soft-sm font-sans"
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
        <div className="pt-2 border-t border-brand-border flex flex-wrap items-center gap-2 text-xs">
          <span className="text-brand-muted font-semibold">Verified Brand Records:</span>
          {DEMO_FSSAI_REGISTRY.map((demo) => (
            <button
              key={demo.licenseNumber}
              onClick={() => handleSelectDemo(demo)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-soft-sm ${
                searchResult?.licenseNumber === demo.licenseNumber
                  ? 'bg-forest-900 border-forest-900 text-white font-bold'
                  : 'bg-white border-brand-border text-brand-text hover:bg-brand-bg'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                demo.statusCode === 'active' ? 'bg-emerald-500' : demo.statusCode === 'suspended' ? 'bg-amber-500' : 'bg-rose-500'
              }`} />
              <span>{demo.brandName.split(' ')[0]}</span>
              <span className={`text-[10px] ${searchResult?.licenseNumber === demo.licenseNumber ? 'text-emerald-200' : 'text-brand-muted'}`}>({demo.status})</span>
            </button>
          ))}
        </div>

      </div>

      {/* Search Results Display */}
      {errorMessage && (
        <div className="p-6 bg-white border border-brand-border rounded-2xl text-center space-y-2 shadow-soft-sm">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
          <h4 className="font-bold text-sm text-brand-text">No Registry Record Found</h4>
          <p className="text-xs text-brand-muted max-w-md mx-auto">{errorMessage}</p>
        </div>
      )}

      {searchResult && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* STATUTORY 14-DIGIT ANATOMY DECODER */}
          {digitBreakdown && (
            <div className="p-5 bg-forest-900 text-white rounded-2xl space-y-3 shadow-md border border-forest-800">
              <div className="flex items-center justify-between pb-2 border-b border-forest-700/60">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-brand-orange" />
                  <span className="font-bold text-xs uppercase tracking-wider text-emerald-200">
                    Statutory 14-Digit FSSAI Structure Decoded
                  </span>
                </div>
                <span className="text-[11px] font-mono text-brand-orange font-bold">
                  {searchResult.licenseNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                
                {/* Digit 1: License Type */}
                <div className="p-2.5 bg-forest-950/60 rounded-xl border border-forest-800/80 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-emerald-300/80">Digit 1: Type</span>
                    <span className="font-mono font-bold text-brand-orange">{digitBreakdown.typeCode}</span>
                  </div>
                  <div className="font-bold text-[11px] text-white leading-tight">{digitBreakdown.licenseType.split('(')[0]}</div>
                </div>

                {/* Digits 2-3: State */}
                <div className="p-2.5 bg-forest-950/60 rounded-xl border border-forest-800/80 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-emerald-300/80">Digits 2-3: State</span>
                    <span className="font-mono font-bold text-brand-orange">{digitBreakdown.stateCode}</span>
                  </div>
                  <div className="font-bold text-[11px] text-white leading-tight">{digitBreakdown.stateName}</div>
                </div>

                {/* Digits 4-5: Year */}
                <div className="p-2.5 bg-forest-950/60 rounded-xl border border-forest-800/80 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-emerald-300/80">Digits 4-5: Year</span>
                    <span className="font-mono font-bold text-brand-orange">{digitBreakdown.yearCode}</span>
                  </div>
                  <div className="font-bold text-[11px] text-white leading-tight">Enrolled {digitBreakdown.regYear}</div>
                </div>

                {/* Digits 6-8: Section */}
                <div className="p-2.5 bg-forest-950/60 rounded-xl border border-forest-800/80 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-emerald-300/80">Digits 6-8: Section</span>
                    <span className="font-mono font-bold text-brand-orange">{digitBreakdown.quantityCode}</span>
                  </div>
                  <div className="font-bold text-[11px] text-white leading-tight">Industry Unit</div>
                </div>

                {/* Digits 9-14: FBO Serial */}
                <div className="p-2.5 bg-forest-950/60 rounded-xl border border-forest-800/80 space-y-1 col-span-2 sm:col-span-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-emerald-300/80">Digits 9-14: Serial</span>
                    <span className="font-mono font-bold text-brand-orange">{digitBreakdown.serialCode}</span>
                  </div>
                  <div className="font-bold text-[11px] text-white leading-tight">Operator #{digitBreakdown.serialCode}</div>
                </div>

              </div>
            </div>
          )}

          {/* Main Verification Card */}
          <div className="card-surface p-6 sm:p-8 space-y-6">
            
            {/* Header: License & Live Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">14-Digit FSSAI License:</span>
                  <span className="font-mono font-bold text-base text-forest-900 bg-brand-bg px-2 py-0.5 rounded border border-brand-border">
                    {searchResult.licenseNumber}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    searchResult.isDemoData ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {searchResult.isDemoData ? 'Simulated Register' : 'Verified Entity'}
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-forest-900 mt-2">
                  {searchResult.businessName}
                </h2>
                <p className="text-xs text-brand-muted font-medium">
                  Trade Brand: <span className="font-bold text-brand-text">{searchResult.brandName}</span>
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
              <div className="p-4 bg-brand-bg/40 rounded-2xl border border-brand-border space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-forest-900">
                  <MapPin className="w-4 h-4 text-forest-800" />
                  <span>Registered Premises Address</span>
                </div>
                <p className="text-xs text-brand-text leading-relaxed font-medium">
                  {searchResult.premisesAddress}
                </p>
                <div className="text-[11px] text-brand-muted pt-2 border-t border-brand-border">
                  <span className="font-bold text-brand-text">Category:</span> {searchResult.category}
                </div>
              </div>

              {/* Validity */}
              <div className="p-4 bg-brand-bg/40 rounded-2xl border border-brand-border space-y-1.5 text-xs">
                <div className="flex items-center space-x-2 text-xs font-bold text-forest-900">
                  <Calendar className="w-4 h-4 text-forest-800" />
                  <span>Validity & Lifecycle</span>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Issue Date:</span>
                    <span className="font-semibold text-brand-text">{searchResult.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Valid Upto:</span>
                    <span className="font-bold text-forest-900">{searchResult.validUpto}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-brand-border">
                    <span className="text-brand-muted">Last Surveillance Check:</span>
                    <span className="font-medium text-brand-text">{searchResult.lastVerified}</span>
                  </div>
                </div>
              </div>

              {/* Hygiene Rating */}
              <div className="p-4 bg-brand-bg/40 rounded-2xl border border-brand-border space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-forest-900">
                  <Star className="w-4 h-4 text-brand-orange" />
                  <span>Hygiene Audit & Rating</span>
                </div>
                
                <div className="flex items-center space-x-1 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < searchResult.hygieneRating ? 'text-brand-orange fill-brand-orange' : 'text-slate-300'
                      }`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-brand-text ml-1.5">
                    {searchResult.hygieneRating} / 5 Stars
                  </span>
                </div>

                <div className="text-xs text-brand-muted pt-1">
                  <span className="font-semibold text-brand-text">Inspection Grade:</span> {searchResult.inspectionGrade}
                </div>
              </div>

            </div>

            {/* Official Circulars / Notices linked */}
            {searchResult.publicNotices && searchResult.publicNotices.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                  <AlertOctagon className="w-4 h-4 text-amber-600" />
                  <span>Public Safety Notices on File ({searchResult.publicNotices.length})</span>
                </div>
                {searchResult.publicNotices.map((n, i) => (
                  <div key={i} className="text-xs text-brand-text space-y-0.5">
                    <div className="font-bold text-brand-text">{n.title} ({n.date})</div>
                    <p className="text-[11px] text-brand-muted leading-relaxed">{n.details}</p>
                  </div>
                ))}
              </div>
            )}

            {/* External Official Portal Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-brand-muted">
                To cross-verify on official government servers:
              </span>
              <a
                href="https://foscos.fssai.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2 px-4"
              >
                <span>Open FSSAI FOSCOS Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-muted" />
              </a>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
