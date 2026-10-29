export const STATE_CODES = {
  '01': 'Jammu & Kashmir',
  '02': 'Himachal Pradesh',
  '03': 'Punjab',
  '04': 'Chandigarh',
  '05': 'Uttarakhand',
  '06': 'Haryana',
  '07': 'Delhi (NCT)',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '10': 'Bihar',
  '11': 'Sikkim',
  '12': 'Arunachal Pradesh',
  '13': 'Nagaland',
  '14': 'Manipur',
  '15': 'Mizoram',
  '16': 'Tripura',
  '17': 'Meghalaya',
  '18': 'Assam',
  '19': 'West Bengal',
  '20': 'Jharkhand',
  '21': 'Odisha',
  '22': 'Chhattisgarh',
  '23': 'Madhya Pradesh',
  '24': 'Gujarat',
  '25': 'Daman and Diu',
  '26': 'Dadra and Nagar Haveli',
  '27': 'Maharashtra',
  '28': 'Andhra Pradesh',
  '29': 'Karnataka',
  '30': 'Goa',
  '31': 'Lakshadweep',
  '32': 'Kerala',
  '33': 'Tamil Nadu',
  '34': 'Puducherry',
  '35': 'Andaman and Nicobar Islands',
  '36': 'Telangana',
  '37': 'Ladakh'
};

export const MASTER_ADDITIVES = [
  {
    code: '621',
    name: 'Monosodium Glutamate (MSG)',
    purpose: 'Flavour Enhancer',
    category: 'Attention',
    simple_explanation: 'Used to provide a savoury "umami" taste in savory foods, noodles, and snacks.',
    fact: 'Sodium salt of glutamic acid, an amino acid naturally present in tomatoes, aged cheeses, and mushrooms.',
    ai_interpretation: 'Commonly added to processed snacks to enhance palatability. Regulated by FSSAI within standard limits.',
    consumer_note: 'Individuals with reported sensitivities may prefer to monitor intake. Not recommended in infant formulations under 12 months.'
  },
  {
    code: '102',
    name: 'Tartrazine (FD&C Yellow 5)',
    purpose: 'Synthetic Food Colour',
    category: 'High attention',
    simple_explanation: 'A synthetic lemon-yellow dye added to give bright visual appeal to drinks, confectioneries, and snacks.',
    fact: 'Synthetic azo dye derived from petroleum hydrocarbons.',
    ai_interpretation: 'European regulatory authorities (EFSA) require warning notices regarding potential hyperactivity in sensitive children. Permitted in India under quantitative caps.',
    consumer_note: 'Individuals with aspirin intolerance or asthma may experience sensitivities. Frequent consumption by young children is not advised.'
  },
  {
    code: '110',
    name: 'Sunset Yellow FCF',
    purpose: 'Synthetic Food Colour',
    category: 'High attention',
    simple_explanation: 'An orange-red artificial dye used in desserts, squashes, and namkeen.',
    fact: 'Synthetic petroleum-derived colouring agent.',
    ai_interpretation: 'Permitted in select processed food categories in India with mandatory front/back declaration.',
    consumer_note: 'Check for natural alternative colorants (like turmeric, paprika, or beta-carotene) if seeking uncoloured alternatives.'
  },
  {
    code: '211',
    name: 'Sodium Benzoate',
    purpose: 'Preservative',
    category: 'High attention',
    simple_explanation: 'Prevents the growth of yeast, bacteria, and mold in acidic beverages and condiments.',
    fact: 'Sodium salt of benzoic acid.',
    ai_interpretation: 'Highly effective preservative. Should not be formulated with high levels of ascorbic acid (Vitamin C) under high heat/light due to trace benzene formation risk.',
    consumer_note: 'Provides shelf-stability in ketchups and juices. Best consumed fresh from whole sources where possible.'
  },
  {
    code: '319',
    name: 'Tertiary Butylhydroquinone (TBHQ)',
    purpose: 'Synthetic Antioxidant',
    category: 'High attention',
    simple_explanation: 'Slows down fat rancidity and oxidation in vegetable oils and fried snack foods.',
    fact: 'Petrochemical antioxidant with strict regulatory maximum limits (200 mg/kg under FSSAI regulations).',
    ai_interpretation: 'Added to extend the shelf life of packaged fried snacks.',
    consumer_note: 'Look for fresh unoxidized cold-pressed or minimal-preservative options for daily kitchen cooking.'
  },
  {
    code: '322',
    name: 'Lecithin (Soy / Sunflower)',
    purpose: 'Emulsifier',
    category: 'Informational',
    simple_explanation: 'Helps mix oil and water smoothly in chocolate, baked goods, and spreads.',
    fact: 'Naturally occurring fatty substance extracted from soybeans, sunflower seeds, or egg yolks.',
    ai_interpretation: 'Generally safe, standard natural emulsifier.',
    consumer_note: 'Soy-allergic individuals should verify the botanical source.'
  },
  {
    code: '150d',
    name: 'Caramel IV (Sulphite Ammonia Caramel)',
    purpose: 'Food Colouring',
    category: 'Attention',
    simple_explanation: 'Provides dark brown colour in colas, sauces, gravies, and baked products.',
    fact: 'Produced by heating carbohydrates in the presence of sulphite and ammonium compounds.',
    ai_interpretation: 'By-product 4-MEI is globally monitored by food safety authorities. FSSAI limits 4-MEI to safe background thresholds.',
    consumer_note: 'Contains sulphite residues. Individuals with sulphite allergies should check allergen declarations.'
  }
];

export const DEMO_BUSINESSES = [
  {
    licenseNumber: '10014021001234',
    businessName: 'Gujarat Cooperative Milk Marketing Federation Ltd. (Amul)',
    brandName: 'Amul Dairy Products',
    premisesAddress: 'Amul Dairy Road, Anand, Gujarat - 388001',
    category: 'Central License - Dairy & Milk Processing',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '01-Apr-2019',
    validUpto: '31-Mar-2029',
    hygieneRating: 5,
    inspectionGrade: 'Grade A+ (Exemplary Compliance)',
    isDemoData: true,
    publicNotices: []
  },
  {
    licenseNumber: '10012011000168',
    businessName: 'Nestlé India Limited (Moga Factory)',
    brandName: 'Nestlé Cereals & Culinary',
    premisesAddress: 'GT Road, Moga, Punjab - 142001',
    category: 'Central License - Packaged Foods & Infant Nutrition',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '15-Aug-2018',
    validUpto: '14-Aug-2028',
    hygieneRating: 5,
    inspectionGrade: 'Grade A (Satisfactory Audit)',
    isDemoData: true,
    publicNotices: []
  },
  {
    licenseNumber: '10019043002511',
    businessName: 'Haldiram Snacks Pvt. Ltd.',
    brandName: 'Haldirams Sweets & Namkeen',
    premisesAddress: 'B-1/H-8, Mohan Co-op Industrial Estate, Main Mathura Road, New Delhi - 110044',
    category: 'Central License - Snacks & Savouries',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '10-Oct-2020',
    validUpto: '09-Oct-2030',
    hygieneRating: 4,
    inspectionGrade: 'Grade A (Surveillance Cleared)',
    isDemoData: true,
    publicNotices: []
  },
  {
    licenseNumber: '20818005000421',
    businessName: 'Fresh Farms Daily Agro Ltd.',
    brandName: 'PureHarvest Organics',
    premisesAddress: 'Plot 44, Food Park, Phase 2, Sonipat, Haryana - 131029',
    category: 'State License - Fruits, Vegetables & Cold Pressed Oils',
    status: 'SUSPENDED',
    statusCode: 'suspended',
    issueDate: '12-May-2021',
    validUpto: '11-May-2026',
    hygieneRating: 2,
    inspectionGrade: 'Grade C (Show Cause Notice Issued for Mislabeling)',
    isDemoData: true,
    publicNotices: [
      {
        id: 'PN-2026-08',
        date: '14-Feb-2026',
        title: 'Temporary Suspension Order: Cold-Pressed Mustard Oil Batch',
        reason: 'Presence of synthetic Argemone oil marker detected during routine market surveillance.'
      }
    ]
  },
  {
    licenseNumber: '10015064000720',
    businessName: 'Tata Consumer Products Limited',
    brandName: 'Tata Sampann & Tata Salt',
    premisesAddress: '1, Bishop Lefroy Road, Kolkata, West Bengal - 700020',
    category: 'Central License - Staples, Spices & Iodized Salt',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '01-Jan-2020',
    validUpto: '31-Dec-2029',
    hygieneRating: 5,
    inspectionGrade: 'Grade A+ (National Benchmark Compliant)',
    isDemoData: true,
    publicNotices: []
  }
];

export const SAFETY_ALERTS = [
  {
    id: 'ALT-2026-089',
    title: 'Adulteration Alert: Synthetic Dyes (Rhodamine B & Tartrazine) in Loose Chilli Powder',
    category: 'Spices & Condiments',
    severity: 'critical',
    date: '10 Mar 2026',
    region: 'North & Western India (Delhi NCR, Rajasthan, Gujarat)',
    product: 'Unbranded & Loose Red Chilli Powder Batches',
    manufacturer: 'Unregistered Local Repackers',
    reason: 'Routine market sampling confirmed industrial chemical dye Rhodamine B added for artificial red pigmentation.',
    source: 'National Food Safety Surveillance Authority (Gazette Alert)',
    actionRequired: 'Avoid unsealed, open-market loose red chilli powder. Purchase only packaged brands bearing a validated 14-digit FSSAI license.'
  },
  {
    id: 'ALT-2026-084',
    title: 'Voluntary Batch Recall: Dairy Spread Batch #DS-4412 (Microbiological Limit Deviation)',
    category: 'Dairy Products',
    severity: 'warning',
    date: '02 Mar 2026',
    region: 'Maharashtra, Karnataka, Goa',
    product: 'FarmGold Table Butter & Dairy Spread 500g',
    manufacturer: 'FarmGold Agro Dairy Pvt. Ltd.',
    reason: 'Precautionary recall triggered due to coliform count exceeding statutory thresholds in Batch #DS-4412.',
    source: 'Manufacturer Direct Regulatory Filing',
    actionRequired: 'Consumers holding Batch #DS-4412 (Mfg Date: 18-Feb-2026) are advised to return packs to the point of sale for a full refund.'
  },
  {
    id: 'ALT-2026-077',
    title: 'Mislabeled Sweetener Alert: Undecorated Aspartame / Acesulfame K in "No Added Sugar" Fruit Nectar',
    category: 'Beverages',
    severity: 'advisory',
    date: '21 Feb 2026',
    region: 'Pan-India Commercial Distribution',
    product: 'VitalFruit Zero Sugar Nectar (Orange & Guava 1L)',
    manufacturer: 'Apex Beverages India Ltd.',
    reason: 'Failure to print statutory bold warning "CONTAINS ARTIFICIAL SWEETENER - NOT RECOMMENDED FOR CHILDREN" on front-of-pack.',
    source: 'FSSAI Labeling & Packaging Enforcement Division',
    actionRequired: 'Product formulation is non-toxic, but parents of young children and phenylketonurics should review ingredient panel.'
  },
  {
    id: 'ALT-2026-068',
    title: 'Argemone Oil Contamination Notice: Mustard Oil Cold-Pressed Lots',
    category: 'Oils & Fats',
    severity: 'critical',
    date: '08 Feb 2026',
    region: 'Haryana, Uttar Pradesh, Punjab',
    product: 'PureHarvest Kachi Ghani Mustard Oil 1L (Lot #MG-09)',
    manufacturer: 'Fresh Farms Daily Agro Ltd. (License #20818005000421)',
    reason: 'Trace Argemone mexicana seed oil contamination detected in raw seed pressing lot, posing epidemic dropsy hazard.',
    source: 'State Food Safety Commissionerate Enforcement Report',
    actionRequired: 'License suspended. Retailers ordered to seize remaining stock. Consumers should immediately discontinue usage.'
  },
  {
    id: 'ALT-2026-052',
    title: 'Excessive Lead & Cadmium Detection in Imported Energy Drinks',
    category: 'Imported Foods',
    severity: 'warning',
    date: '28 Jan 2026',
    region: 'Mumbai Port & Metro Modern Retailers',
    product: 'ThunderBolt Extreme Taurine Boost 250ml (Can)',
    manufacturer: 'Imported via Global Traders Corp',
    reason: 'Import clearance laboratory analysis recorded heavy metal levels exceeding statutory permissible caps.',
    source: 'Port Health Organization & Import Clearance Wing',
    actionRequired: 'Consignment withheld at port; grey-market distribution units directed to surrender stock.'
  }
];
