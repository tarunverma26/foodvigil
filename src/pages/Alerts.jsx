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
      <div className="text-center space-y-3 max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-[#E8DCB8] shadow-sm">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FDF1F0] text-[#D9534F] text-xs font-bold border border-[#F5C2C0]">
          <AlertOctagon className="w-3.5 h-3.5 text-[#D9534F]" />
          <span>Statutory Safety Radar</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1F5D42]">
          Food Safety Alerts & Recalls
        </h1>
        <p className="text-[#19352A] text-xs sm:text-sm leading-relaxed font-medium">
          Searchable repository of active product recalls, adulteration surveillance circulars, and public health advisories across India.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="card-surface p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name, manufacturer, or reason..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-border rounded-xl text-xs text-brand-text placeholder:text-brand-muted/70 focus:outline-none focus:border-forest-800"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full py-2.5 px-3 bg-white border border-brand-border rounded-xl text-xs text-brand-text focus:outline-none focus:border-forest-800"
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
              className="w-full py-2.5 px-3 bg-white border border-brand-border rounded-xl text-xs text-brand-text focus:outline-none focus:border-forest-800"
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
          <div className="p-12 text-center text-xs text-brand-muted">Loading statutory alerts...</div>
        ) : alerts.length === 0 ? (
          <div className="card-surface p-12 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm text-brand-text">No Matching Alerts</h4>
            <p className="text-xs text-brand-muted">No active recall or safety notices match your search criteria.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`card-surface p-6 space-y-4 border-l-4 ${
                alert.severity === 'High attention' ? 'border-l-brand-red' : alert.severity === 'Attention' ? 'border-l-brand-yellow' : 'border-l-brand-fresh'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    alert.severity === 'High attention' ? 'badge-urgent' : alert.severity === 'Attention' ? 'badge-attention' : 'badge-good'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs font-semibold text-brand-muted">
                    Category: <strong className="text-brand-text">{alert.category}</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-brand-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-muted/70" />
                    {alert.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-muted/70" />
                    {alert.region}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-base text-forest-900">
                  {alert.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-muted">
                  <span>Product: <strong className="text-brand-text">{alert.product}</strong></span>
                  <span>Manufacturer: <strong className="text-brand-text">{alert.manufacturer}</strong></span>
                </div>
              </div>

              {/* Reason Details */}
              <div className="p-3.5 bg-brand-bg/40 rounded-xl text-xs text-brand-text space-y-1 leading-relaxed border border-brand-border">
                <span className="font-bold text-forest-900 block">Statutory Reason & Findings:</span>
                <p className="text-brand-muted">{alert.reason}</p>
              </div>

              {/* Action Required for Consumers */}
              <div className="p-3 bg-amber-50/70 rounded-xl text-xs text-amber-950 space-y-1 border border-amber-200">
                <span className="font-bold text-amber-900 block">Consumer Advisory & Action:</span>
                <p className="text-amber-800">{alert.actionRequired}</p>
              </div>

              {/* Source attribution */}
              <div className="flex items-center justify-between text-[11px] text-brand-muted pt-1">
                <span className="font-mono truncate max-w-md">Source: {alert.source}</span>
                <a
                  href="https://foodsafetyconnect.fssai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest-800 hover:text-forest-900 flex items-center gap-1 font-bold flex-shrink-0"
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
