import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderLock, 
  ShieldCheck, 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  Download, 
  Lock, 
  Info, 
  Eye, 
  PlusCircle,
  FileCheck
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function EvidenceVault() {
  const [evidenceItems, setEvidenceItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setEvidenceItems(apiService.getEvidence());
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-[#E8DCB8] shadow-sm">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EAF5EE] text-[#1F5D42] text-xs font-bold border border-[#BCE2CB]">
          <Lock className="w-3.5 h-3.5 text-[#246B4A]" />
          <span>Secure Consumer Vault</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1F5D42]">
          My Evidence Vault
        </h1>
        <p className="text-[#19352A] text-xs sm:text-sm leading-relaxed font-medium">
          Centralized repository of tax invoices, packaging photos, and batch records linked to your consumer safety reports.
        </p>
        <div className="pt-2">
          <Link to="/report" className="btn-forest text-xs py-2.5 px-5 inline-flex items-center space-x-2 font-bold shadow-sm">
            <PlusCircle className="w-4 h-4" />
            <span>Upload New Evidence</span>
          </Link>
        </div>
      </div>

      {/* Evidentiary Value Legal Notice */}
      <div className="p-4 bg-brand-bg/60 border border-brand-border rounded-2xl flex items-start space-x-3 text-xs text-brand-muted">
        <Info className="w-4 h-4 text-brand-muted flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-brand-text text-[11px] uppercase">
            Storage & Evidentiary Value Notice:
          </span>
          <p className="text-[11px] leading-relaxed text-brand-muted">
            The FoodVigil Evidence Vault organizes consumer-uploaded documents for structured petition drafting. The platform does not claim official legal admissibility or guaranteed evidentiary validation; statutory admission remains subject to regulatory verification under the Consumer Protection Act, 2019.
          </p>
        </div>
      </div>

      {/* Vault Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {evidenceItems.map((item) => (
          <div key={item.id} className="card-surface p-5 space-y-4 flex flex-col justify-between">
            
            <div className="space-y-3">
              {/* Item Header */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-forest-900">
                  {item.fileType?.includes('image') ? <ImageIcon className="w-5 h-5 text-forest-800" /> : <FileText className="w-5 h-5 text-forest-800" />}
                </div>

                <span className="badge-neutral text-[10px] px-2 py-0.5 rounded-md font-semibold">
                  {item.fileSize}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-xs text-brand-text truncate" title={item.fileName}>
                  {item.fileName}
                </h3>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded mt-1 inline-block border border-emerald-200">
                  {item.type}
                </span>
              </div>

              {/* Associated Report */}
              <div className="p-2.5 bg-brand-bg/40 rounded-xl text-xs space-y-0.5 border border-brand-border">
                <span className="text-[10px] text-brand-muted font-semibold block">Linked Dossier:</span>
                <p className="font-medium text-brand-text text-[11px] truncate">
                  {item.relatedReport}
                </p>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="pt-3 border-t border-brand-border flex items-center justify-between text-[10px] text-brand-muted">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-brand-muted/70" />
                {item.uploadDate}
              </span>
              <span className="text-forest-800 font-semibold flex items-center gap-1">
                <FileCheck className="w-3 h-3 text-forest-800" />
                <span>Encrypted & Linked</span>
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
