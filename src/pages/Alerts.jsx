import React, { useState, useEffect } from 'react';
import { 
  AlertOctagon, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Building2, 
  ExternalLink, 
  ShieldAlert, 
  AlertTriangle, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, [search, selectedSeverity, selectedCategory]);

  const fetchAlerts = async () => {
    setLoading(true);
    const res = await apiService.getAlerts({
      search,
      severity: selectedSeverity,
      category: selectedCategory
    });
    if (res.success) {
      setAlerts(res.data);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Statutory Safety Radar</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-900">
          Food Safety Alerts & Recalls
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Searchable repository of active product recalls, adulteration surveillance circulars, and public health advisories across India.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="card-surface p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name, manufacturer, or reason..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Severities</option>
              <option value="High attention">High Attention</option>
              <option value="Attention">Attention</option>
              <option value="Informational">Informational</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Categories</option>
              <option value="Spices">Spices & Condiments</option>
              <option value="Infant">Infant Nutrition</option>
              <option value="Sweeteners">Honey & Sweeteners</option>
              <option value="Packaged Foods">Packaged Snacks</option>
            </select>
          </div>

        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading statutory alerts...</div>
        ) : alerts.length === 0 ? (
          <div className="card-surface p-12 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm text-slate-800">No Matching Alerts</h4>
            <p className="text-xs text-slate-500">No active recall or safety notices match your search criteria.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`card-surface p-6 space-y-4 border-l-4 ${
                alert.severity === 'High attention' ? 'border-l-rose-500' : alert.severity === 'Attention' ? 'border-l-amber-500' : 'border-l-emerald-500'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    alert.severity === 'High attention' ? 'badge-urgent' : alert.severity === 'Attention' ? 'badge-attention' : 'badge-good'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Category: <strong className="text-slate-800">{alert.category}</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {alert.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {alert.region}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-base text-forest-900">
                  {alert.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span>Product: <strong className="text-slate-900">{alert.product}</strong></span>
                  <span>Manufacturer: <strong className="text-slate-900">{alert.manufacturer}</strong></span>
                </div>
              </div>

              {/* Reason Details */}
              <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1 leading-relaxed border border-slate-100">
                <span className="font-bold text-slate-900 block">Statutory Reason & Findings:</span>
                <p>{alert.reason}</p>
              </div>

              {/* Action Required for Consumers */}
              <div className="p-3 bg-forest-50/60 rounded-xl text-xs text-forest-900 space-y-1 border border-emerald-200/80">
                <span className="font-bold text-emerald-900 block">Consumer Advisory & Action:</span>
                <p>{alert.actionRequired}</p>
              </div>

              {/* Source attribution */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="font-mono truncate max-w-md">Source: {alert.source}</span>
                <a
                  href="https://foodsafetyconnect.fssai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold flex-shrink-0"
                >
                  <span>Official Circular Reference</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
