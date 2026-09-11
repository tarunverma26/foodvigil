import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  FileWarning, 
  CheckCircle2, 
  Upload, 
  Camera, 
  Building2, 
  MapPin, 
  Package, 
  Calendar, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { apiService } from '../services/apiService';
import confetti from 'canvas-confetti';

export default function ReportIssue() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const prefillProduct = searchParams.get('product') || '';
  const prefillFssai = searchParams.get('fssai') || '';
  const prefillCategory = searchParams.get('category') || '';

  const [step, setStep] = useState(1); // 1: What happened?, 2: Product & Vendor, 3: Evidence & Details, 4: Review & Submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    issueType: prefillCategory ? 'Suspected adulteration' : 'Suspected adulteration',
    productName: prefillProduct || 'Shree Krishna Ground Turmeric 200g',
    brand: 'Shree Krishna Spices',
    fssaiLicense: prefillFssai || '12218027000412',
    batchNumber: 'SK-HAL-25-D',
    expiryDate: '14-Aug-2027',
    storeName: 'Kalyan Provision Store, Main Bazaar',
    storeType: 'Offline Store',
    location: 'Jaipur, Rajasthan',
    purchaseDate: '2026-08-28',
    description: 'Acid dilution test produced persistent bright magenta-pink color indicating non-permitted industrial yellow dye. Matches public recall alert #REC-2025-RJ-112.',
    healthImpact: 'Nausea and stomach discomfort reported after cooking.',
    checklist: {
      productPhoto: true,
      labelPhoto: true,
      billUploaded: true,
      batchNumberCaptured: true,
      locationRecorded: true
    },
    evidenceFiles: [
      { name: 'Receipt_INV_882.jpg', type: 'Tax Invoice', size: '1.2 MB' },
      { name: 'Turmeric_Batch_Photo.jpg', type: 'Back of Pack Photo', size: '2.4 MB' },
      { name: 'Acid_Test_Result.jpg', type: 'Observation Photo', size: '1.8 MB' }
    ]
  });

  const issueOptions = [
    { id: 'adulteration', label: 'Suspected Adulteration', desc: 'Chemical dyes, synthetic milk, water dilution, foreign fats' },
    { id: 'mislabelled', label: 'Mislabelled Product', desc: 'Missing allergens, deceptive health claims, wrong ingredient order' },
    { id: 'expired', label: 'Expired or Tampered Date', desc: 'Food sold past best-before or erased/overprinted batch codes' },
    { id: 'packaging', label: 'Damaged Packaging / Foreign Matter', desc: 'Insects, glass fragments, broken seals, swollen cans' },
    { id: 'suspicious_vendor', label: 'Suspicious / Unlicensed Business', desc: 'Operating without mandatory 14-digit FSSAI registration' },
    { id: 'food_poisoning', label: 'Food Poisoning / Spoilage Concern', desc: 'Severe microbial illness, acute vomiting, rancid smell' },
    { id: 'other', label: 'Other Consumer Safety Issue', desc: 'Price gouging beyond MRP, unhygienic restaurant conditions' }
  ];

  const handleToggleChecklist = (key) => {
    setFormData({
      ...formData,
      checklist: {
        ...formData.checklist,
        [key]: !formData.checklist[key]
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await apiService.submitReport({
        productName: formData.productName,
        brand: formData.brand,
        category: formData.issueType,
        storeName: formData.storeName,
        city: formData.location,
        description: formData.description,
        fssaiLicense: formData.fssaiLicense,
        batchNumber: formData.batchNumber,
        evidenceItems: formData.evidenceFiles
      });

      if (res.success) {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        navigate('/my-reports', { state: { newReport: res.data } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200">
          <FileWarning className="w-3.5 h-3.5 text-brand-red" />
          <span>Consumer Grievance Intake</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-900">
          Report a Food Safety Issue
        </h1>
        <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
          Follow our guided reporting system to capture verifiable product details, evidence photos, and generate structured consumer dossiers for regulatory review.
        </p>
      </div>

      {/* Wizard Card Surface */}
      <div className="card-surface p-6 sm:p-8 space-y-6">
        
        {/* Stepper Progress */}
        <div>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-brand-border">
            <span className="font-bold text-forest-900 uppercase tracking-wider">
              Step {step} of 4: {
                step === 1 ? 'Select Issue Nature' :
                step === 2 ? 'Product & Vendor Information' :
                step === 3 ? 'Evidence Checklist & Details' : 'Review & Submit Report'
              }
            </span>
            <span className="text-brand-muted font-mono font-bold">{step * 25}%</span>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-2">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step >= s ? 'bg-forest-900' : 'bg-brand-border'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* STEP 1: WHAT HAPPENED? */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-bold text-sm text-forest-900">
              What type of food safety issue are you reporting?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {issueOptions.map((opt) => {
                const isSelected = formData.issueType === opt.label;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, issueType: opt.label })}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-emerald-50/70 border-forest-800 shadow-soft-sm ring-1 ring-forest-800'
                        : 'bg-white border-brand-border hover:border-brand-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-brand-text">{opt.label}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-forest-800 border-forest-800 text-white' : 'border-brand-border'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-brand-muted leading-snug">{opt.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: PRODUCT & VENDOR INFO */}
        {step === 2 && (
          <div className="space-y-4 text-xs animate-fadeIn">
            <h3 className="font-bold text-sm text-forest-900">
              Product & Vendor Particulars
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-brand-text mb-1">Product Name & Package Size *</label>
                <input
                  type="text"
                  required
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  placeholder="e.g. Pure Desi Cow Ghee 500g"
                  className="w-full p-2.5 bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-forest-800 shadow-soft-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-text mb-1">Brand / Manufacturer *</label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. ABC Foods Ltd"
                  className="w-full p-2.5 bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-forest-800 shadow-soft-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-brand-text mb-1">14-Digit FSSAI License</label>
                <input
                  type="text"
                  maxLength={14}
                  value={formData.fssaiLicense}
                  onChange={(e) => setFormData({ ...formData, fssaiLicense: e.target.value.replace(/[^0-9]/g, '') })}
                  placeholder="Printed on pack"
                  className="w-full p-2.5 bg-white border border-brand-border rounded-xl text-brand-text font-mono focus:outline-none focus:border-forest-800 shadow-soft-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-text mb-1">Batch / Lot Number *</label>
                <input
                  type="text"
                  required
                  value={formData.batchNumber}
                  onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                  placeholder="e.g. B-882"
                  className="w-full p-2.5 bg-white border border-brand-border rounded-xl text-brand-text font-mono focus:outline-none focus:border-forest-800 shadow-soft-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-text mb-1">Expiry / Best Before Date</label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  placeholder="DD-MM-YYYY"
                  className="w-full p-2.5 bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-forest-800 shadow-soft-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-brand-text mb-1">Store / Merchant Name *</label>
                <input
                  type="text"
                  required
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  placeholder="e.g. Modern Retail Mart / Quick Commerce App"
                  className="w-full p-2.5 bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-forest-800 shadow-soft-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-text mb-1">Location / City *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Market Area, State"
                  className="w-full p-2.5 bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-forest-800 shadow-soft-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EVIDENCE CHECKLIST & DESCRIPTION */}
        {step === 3 && (
          <div className="space-y-5 text-xs animate-fadeIn">
            <h3 className="font-bold text-sm text-forest-900">
              Evidence Checklist & Observation Description
            </h3>

            {/* Evidence Checklist */}
            <div className="p-4 bg-brand-bg/40 border border-brand-border rounded-2xl space-y-3">
              <span className="font-bold text-brand-text block text-xs">
                Verification & Evidence Checklist:
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'productPhoto', label: '☑ Product photo captured' },
                  { key: 'labelPhoto', label: '☑ Label & ingredients photo' },
                  { key: 'billUploaded', label: '☑ Bill / Tax invoice uploaded' },
                  { key: 'batchNumberCaptured', label: '☑ Batch number recorded' },
                  { key: 'locationRecorded', label: '☑ Store location documented' }
                ].map((item) => (
                  <label 
                    key={item.key} 
                    className="flex items-center space-x-2.5 p-2 bg-white rounded-lg border border-brand-border cursor-pointer shadow-soft-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formData.checklist[item.key]}
                      onChange={() => handleToggleChecklist(item.key)}
                      className="rounded accent-forest-800 w-4 h-4"
                    />
                    <span className="font-semibold text-brand-text">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">Detailed Grievance Description *</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-forest-800 shadow-soft-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-text mb-1">Health Symptoms or Adverse Effects (if any)</label>
              <input
                type="text"
                value={formData.healthImpact}
                onChange={(e) => setFormData({ ...formData, healthImpact: e.target.value })}
                placeholder="e.g. Stomach cramping, nausea within 2 hours of consumption"
                className="w-full p-2.5 bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:border-forest-800 shadow-soft-sm"
              />
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SUBMIT */}
        {step === 4 && (
          <div className="space-y-5 text-xs animate-fadeIn">
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Review your structured consumer report before finalizing submission to the Evidence Vault.</span>
            </div>

            {/* Review Summary Card */}
            <div className="p-5 bg-brand-bg/40 border border-brand-border rounded-2xl space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-brand-border">
                <span className="font-bold text-brand-text text-sm">{formData.productName}</span>
                <span className="badge-urgent text-[10px] px-2.5 py-0.5 rounded-full">{formData.issueType}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-brand-muted">
                <div>
                  <span className="text-[10px] text-brand-muted block">Brand:</span>
                  <span className="font-semibold text-brand-text">{formData.brand}</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-muted block">Batch No:</span>
                  <span className="font-mono font-semibold text-brand-text">{formData.batchNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-muted block">FSSAI License:</span>
                  <span className="font-mono font-semibold text-brand-text">{formData.fssaiLicense || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-muted block">Vendor / Store:</span>
                  <span className="font-semibold text-brand-text">{formData.storeName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-muted block">City:</span>
                  <span className="font-semibold text-brand-text">{formData.location}</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-muted block">Attached Evidence:</span>
                  <span className="font-semibold text-forest-800">{formData.evidenceFiles.length} files attached</span>
                </div>
              </div>

              <div className="pt-2 border-t border-brand-border text-brand-text">
                <span className="font-bold text-forest-900 block text-[11px] mb-0.5">Statement:</span>
                <p className="leading-relaxed bg-white p-3 rounded-xl border border-brand-border font-mono text-[11px] text-brand-text">
                  {formData.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-4 border-t border-brand-border flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="btn-secondary text-xs py-2 px-4"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="btn-forest text-xs py-2.5 px-6"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-orange py-2.5 px-8 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Report...' : 'Submit Report to Vault'}</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
