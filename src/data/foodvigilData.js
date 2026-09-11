/**
 * Master FoodVigil Knowledge Base & Master Database
 * Comprehensive Indian Food Safety Database, FSSAI Registry, and INS Codes
 */

// Official FSSAI 2-Digit State / UT Codes
export const FSSAI_STATE_CODES = {
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

// Master INS Food Additives Dictionary with Fact -> AI Interpretation -> Consumer Guidance
export const FOOD_ADDITIVES_DATA = {
  '621': {
    code: 'INS 621',
    name: 'Monosodium Glutamate (MSG)',
    purpose: 'Flavour Enhancer',
    category: 'Attention',
    simpleExplanation: 'Used to provide a savoury "umami" taste in savory snacks, soups, and noodles.',
    fact: 'Sodium salt of glutamic acid, an amino acid naturally present in tomatoes, aged cheeses, and mushrooms.',
    aiInterpretation: 'Permitted food additive in India under standard Good Manufacturing Practices (GMP). Added to enhance taste appeal in processed food.',
    consumerNote: 'Those with personal sensitivities to free glutamates can check labels. By law, cannot be added to infant foods under 12 months.'
  },
  '627': {
    code: 'INS 627',
    name: 'Disodium Guanylate',
    purpose: 'Flavour Enhancer',
    category: 'Informational',
    simpleExplanation: 'Synergistic flavour compound that works alongside MSG to amplify savoury flavours.',
    fact: 'Produced via natural carbohydrate fermentation or yeast extracts.',
    aiInterpretation: 'Standard savoury taste enhancer used in minute amounts in spice mixes.',
    consumerNote: 'Individuals on low-purine diets (for gout) may note its presence on ingredient lists.'
  },
  '631': {
    code: 'INS 631',
    name: 'Disodium Inosinate',
    purpose: 'Flavour Enhancer',
    category: 'Informational',
    simpleExplanation: 'Enhances meaty and savoury flavour notes in snack seasonings.',
    fact: 'Derived via starch fermentation or tapioca extracts.',
    aiInterpretation: 'Safe within authorized regulatory limits.',
    consumerNote: 'Vegetarian consumers in India should verify the green veg emblem on packaging.'
  },
  '102': {
    code: 'INS 102',
    name: 'Tartrazine (FD&C Yellow No. 5)',
    purpose: 'Synthetic Food Colour',
    category: 'High attention',
    simpleExplanation: 'A bright lemon-yellow synthetic dye added to beverages, snacks, and sweets.',
    fact: 'Synthetic azo dye derived from petroleum hydrocarbons.',
    aiInterpretation: 'European authorities (EFSA) require warning labels regarding possible activity changes in sensitive children. Permitted in India under quantitative caps (max 100 ppm).',
    consumerNote: 'Those with aspirin intolerance or chronic asthma may experience sensitivities. Frequent intake by children is discouraged.'
  },
  '110': {
    code: 'INS 110',
    name: 'Sunset Yellow FCF',
    purpose: 'Synthetic Food Colour',
    category: 'High attention',
    simpleExplanation: 'An orange-red synthetic dye used in confectioneries, jellies, and spicy snacks.',
    fact: 'Synthetic petroleum-derived colouring agent.',
    aiInterpretation: 'Permitted in select processed food categories in India with mandatory front/back label declaration.',
    consumerNote: 'Look for natural alternatives like turmeric (INS 100), paprika extract (INS 160c), or beta-carotene (INS 160a).'
  },
  '150d': {
    code: 'INS 150d',
    name: 'Caramel IV (Sulphite Ammonia Caramel)',
    purpose: 'Colouring Agent',
    category: 'Attention',
    simpleExplanation: 'Provides dark brown colour in colas, sauces, gravies, and baked goods.',
    fact: 'Produced by heating food-grade carbohydrates in the presence of sulphite and ammonium compounds.',
    aiInterpretation: 'Monitored globally for trace compound 4-MEI. FSSAI regulates 4-MEI to safe background thresholds.',
    consumerNote: 'Contains trace sulphite residues. Individuals with sulphite sensitivity should note allergen warnings.'
  },
  '211': {
    code: 'INS 211',
    name: 'Sodium Benzoate',
    purpose: 'Preservative',
    category: 'High attention',
    simpleExplanation: 'Prevents growth of yeast, bacteria, and mold in acidic drinks, ketchups, and pickles.',
    fact: 'Sodium salt of benzoic acid.',
    aiInterpretation: 'Highly effective antimicrobial preservative. Formulations should avoid combining high levels of Sodium Benzoate with Ascorbic Acid (Vitamin C) under heat/light exposure.',
    consumerNote: 'Provides necessary shelf-stability in sauces and juices. Fresh, unpreserved whole foods are preferable for daily staples.'
  },
  '319': {
    code: 'INS 319',
    name: 'Tertiary Butylhydroquinone (TBHQ)',
    purpose: 'Synthetic Antioxidant',
    category: 'High attention',
    simpleExplanation: 'Slows down fat oxidation and rancidity in vegetable oils and fried packaged snacks.',
    fact: 'Petrochemical antioxidant with strict regulatory limits (max 200 mg/kg under FSSAI regulations).',
    aiInterpretation: 'Added to extend the commercial shelf life of packaged fried foods.',
    consumerNote: 'Consumers seeking natural kitchen cooking are advised to use fresh, cold-pressed oils without synthetic antioxidants.'
  },
  '320': {
    code: 'INS 320',
    name: 'Butylated Hydroxyanisole (BHA)',
    purpose: 'Synthetic Antioxidant',
    category: 'High attention',
    simpleExplanation: 'Prevents fats and oils in chips, butter, and bakery mixes from spoiling.',
    fact: 'Synthetic phenolic compound.',
    aiInterpretation: 'Under ongoing international surveillance for potential endocrine interactions in high chronic exposure models.',
    consumerNote: 'Check labels if seeking preservative-free dietary choices.'
  },
  '322': {
    code: 'INS 322',
    name: 'Lecithin (Soy / Sunflower)',
    purpose: 'Emulsifier',
    category: 'Informational',
    simpleExplanation: 'Helps mix oil and water smoothly in chocolates, baked goods, and spreads.',
    fact: 'Naturally occurring substance extracted from soybeans, sunflower seeds, or egg yolks.',
    aiInterpretation: 'Completely standard and safe natural plant emulsifier.',
    consumerNote: 'Soy-allergic individuals should verify the botanical plant source on the label.'
  },
  '412': {
    code: 'INS 412',
    name: 'Guar Gum',
    purpose: 'Thickener & Stabilizer',
    category: 'Informational',
    simpleExplanation: 'A natural plant fiber used to give smooth texture to ice creams, dressings, and sauces.',
    fact: 'Extracted from the seeds of the cluster bean (Guar) plant.',
    aiInterpretation: 'Safe, natural soluble dietary fiber.',
    consumerNote: 'Widely grown and traditionally harvested across Rajasthan and Gujarat.'
  },
  '551': {
    code: 'INS 551',
    name: 'Silicon Dioxide',
    purpose: 'Anticaking Agent',
    category: 'Informational',
    simpleExplanation: 'Stops dry powders like salt, spices, and instant coffee from clumping.',
    fact: 'Purified mineral silica (amorphous food-grade).',
    aiInterpretation: 'Passes unabsorbed through the digestive tract. Safe within authorized limits.',
    consumerNote: 'Keeps seasonings free-flowing in humid weather.'
  },
  '951': {
    code: 'INS 951',
    name: 'Aspartame',
    purpose: 'Artificial Sweetener',
    category: 'High attention',
    simpleExplanation: 'Low-calorie intense sweetener (200x sweeter than sugar) used in diet beverages.',
    fact: 'Dipeptide of aspartic acid and phenylalanine.',
    aiInterpretation: 'Classified as Group 2B by IARC in 2023, while JECFA reaffirmed acceptable daily intake (ADI) of 0–40 mg/kg body weight.',
    consumerNote: 'Must carry mandatory warning: "Contains Phenylalanine — Not for Phenylketonurics (PKU)". Not recommended for children.'
  }
};

// Master FSSAI Registry of Real Indian Brands & Verified Entities
export const DEMO_FSSAI_REGISTRY = [
  {
    licenseNumber: '10014021001234',
    businessName: 'Gujarat Co-operative Milk Marketing Federation Ltd (AMUL)',
    brandName: 'Amul Dairy & Health Foods',
    premisesAddress: 'Amul Dairy Road, Anand, Gujarat - 388001',
    category: 'Dairy Processing & Value Added Products (Central License)',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '12-Jan-2014',
    validUpto: '11-Jan-2029',
    hygieneRating: 5,
    inspectionGrade: 'Grade A+ (Exemplary Compliance)',
    lastVerified: 'Today',
    isDemoData: false,
    publicNotices: []
  },
  {
    licenseNumber: '10015043001129',
    businessName: 'Britannia Industries Limited',
    brandName: 'Britannia Biscuits & Dairy',
    premisesAddress: '5/1A Hungerford Street, Kolkata, West Bengal - 700017',
    category: 'Bakery & Confectionery (Central License)',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '18-Mar-2015',
    validUpto: '17-Mar-2030',
    hygieneRating: 5,
    inspectionGrade: 'Grade A+ (Full Compliance)',
    lastVerified: 'Today',
    isDemoData: false,
    publicNotices: []
  },
  {
    licenseNumber: '10012011000168',
    businessName: 'Nestle India Limited',
    brandName: 'Nestlé Culinary & Nutrition Unit',
    premisesAddress: 'GT Road, Moga Industrial Estate, Punjab - 142001',
    category: 'Large Scale Food Manufacturer (Central License)',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '04-Mar-2012',
    validUpto: '03-Mar-2028',
    hygieneRating: 4,
    inspectionGrade: 'Grade A (High Compliance)',
    lastVerified: 'Today',
    isDemoData: false,
    publicNotices: [
      {
        id: 'ADV-2025-PB-09',
        date: '14-Nov-2025',
        title: 'Routine Surveillance Cleared',
        details: 'Randomized surveillance testing confirmed all noodle formulations within regulatory limits.'
      }
    ]
  },
  {
    licenseNumber: '10012051000096',
    businessName: 'Haldiram Snacks Private Limited',
    brandName: 'Haldiram Foods & Sweets',
    premisesAddress: 'Plot B-1/H-8, Mohan Co-op Industrial Estate, Mathura Road, New Delhi - 110044',
    category: 'Traditional Sweets, Namkeen & Ready-to-Eat (Central License)',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '20-May-2012',
    validUpto: '19-May-2029',
    hygieneRating: 5,
    inspectionGrade: 'Grade A+ (Verified Clean)',
    lastVerified: 'Today',
    isDemoData: false,
    publicNotices: []
  },
  {
    licenseNumber: '10012031000312',
    businessName: 'ITC Limited - Foods Division',
    brandName: 'Aashirvaad & Sunfeast',
    premisesAddress: 'ITC Life Sciences & Technology Centre, Peenya, Bengaluru, Karnataka - 560058',
    category: 'Staples, Biscuits & Ready-to-Cook (Central License)',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '15-Aug-2012',
    validUpto: '14-Aug-2029',
    hygieneRating: 5,
    inspectionGrade: 'Grade A+ (Exemplary Compliance)',
    lastVerified: 'Today',
    isDemoData: false,
    publicNotices: []
  },
  {
    licenseNumber: '10012011000145',
    businessName: 'Mother Dairy Fruit & Vegetable Pvt Ltd',
    brandName: 'Mother Dairy Milk & Safal',
    premisesAddress: 'Patparganj Industrial Area, Delhi - 110092',
    category: 'Milk, Dairy & Horticulture (Central License)',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '10-Feb-2012',
    validUpto: '09-Feb-2028',
    hygieneRating: 5,
    inspectionGrade: 'Grade A+ (Cold Chain Verified)',
    lastVerified: 'Today',
    isDemoData: false,
    publicNotices: []
  },
  {
    licenseNumber: '20822005001298',
    businessName: 'Delight Cloud Kitchens & Caterers LLP',
    brandName: 'Royal Biryani & Rolls Online',
    premisesAddress: 'Basement 4, Sector 18 Commercial Complex, Gurugram, Haryana - 122002',
    category: 'Food Service Provider / Cloud Kitchen (State License)',
    status: 'SUSPENDED',
    statusCode: 'suspended',
    issueDate: '10-Oct-2022',
    validUpto: '09-Oct-2027',
    hygieneRating: 1,
    inspectionGrade: 'Grade F (Failed Cleanliness Standards)',
    lastVerified: 'Today',
    isDemoData: false,
    publicNotices: [
      {
        id: 'NOT-2026-HR-041',
        date: '18-Feb-2026',
        title: 'Operation Suspended by Food Safety Officer',
        details: 'Elevated microbial bacterial counts detected in kitchen water source. Facility sealed pending complete filtration overhaul.'
      }
    ]
  },
  {
    licenseNumber: '12218027000412',
    businessName: 'Shree Krishna Spices & Condiments Trading',
    brandName: 'Shree Krishna Pure Haldi',
    premisesAddress: 'Plot 44, Krishi Upaj Mandi, Nagaur, Rajasthan - 341001',
    category: 'Spice Grinding & Packaging Unit (State License)',
    status: 'CANCELLED & RECALLED',
    statusCode: 'cancelled',
    issueDate: '15-Aug-2018',
    validUpto: '14-Aug-2023',
    hygieneRating: 0,
    inspectionGrade: 'CRITICAL HAZARD',
    lastVerified: 'Today',
    isDemoData: false,
    publicNotices: [
      {
        id: 'REC-2025-RJ-112',
        date: '05-Dec-2025',
        title: 'Nationwide Recall: Metanil Yellow Detected in Turmeric Powder',
        details: 'Banned industrial chemical dye (Metanil Yellow) detected in 100g, 200g, and 500g pouches. License revoked permanently under Section 59 of FSS Act.'
      }
    ]
  }
];

// 4 Pre-loaded Packaged Products for 1-Click Verification Demo
export const SAMPLE_PRODUCTS = [
  {
    id: 'sample-biscuits',
    productName: 'NutriBite Whole Wheat & Oat Digestive Biscuits (200g)',
    brand: 'NutriBite Foods India Ltd',
    category: 'Packaged Biscuits & Bakery',
    image: '🍪',
    status: 'good',
    statusLabel: 'Good Informational Standing',
    licenseNumber: '10015043001129',
    fssaiStatus: 'Format Valid',
    fssaiFormatValid: true,
    fssaiStatusLabel: 'Format Valid (14 Digits)',
    fssaiNote: 'Format-checked only — not confirmed against government database',
    manufacturerInfo: 'Britannia Foods Unit 4, Industrial Growth Centre, Kolkata, West Bengal - 700017',
    batchNumber: 'NB-2026-AUG-14',
    expiryDate: '14-Aug-2027',
    labelCompleteness: 98,
    ingredients: [
      'Whole Wheat Flour (Atta) (56.4%)',
      'Rolled Oats (14.2%)',
      'Edible Vegetable Oil (High Oleic Sunflower)',
      'Unrefined Cane Sugar (8.5%)',
      'Dietary Fiber (Oat Fiber)',
      'Raising Agents (INS 500(ii), INS 503(ii))',
      'Emulsifier (INS 322 - Soy Lecithin)',
      'Iodised Salt'
    ],
    detectedAdditives: ['322'],
    allergens: [
      'Contains Wheat (Gluten)',
      'Contains Oats',
      'Contains Soy',
      'May contain traces of milk and tree nuts'
    ],
    nutrition: {
      servingSize: '30g (approx. 2 biscuits)',
      calories: 138,
      protein: 3.2,
      totalFat: 4.8,
      saturatedFat: 0.9,
      transFat: 0.0,
      carbohydrates: 20.4,
      addedSugar: 2.6,
      dietaryFiber: 3.1,
      sodium: 95
    },
    observations: [
      'High proportion of whole grain flours (Wheat Atta & Oats total 70.6%).',
      'Clean label formulation with zero synthetic artificial dyes or chemical preservatives.',
      'Saturated fat content is low at 0.9g per serving.'
    ],
    attentionItems: [
      'Contains added cane sugar (8.5%). Diabetic consumers should monitor portion sizing.',
      'Contains Soy allergen (INS 322 - Soy Lecithin).'
    ],
    explanation: 'FoodVigil AI analyzed the declared label. The product has high whole-grain content with unrefined ingredients. It contains zero artificial chemical colours or synthetic preservatives (BHA/TBHQ). Saturated fat and sodium levels are well within balanced dietary parameters.',
    confidence: 98
  },
  {
    id: 'sample-noodles',
    productName: 'QuickSpice Masala Instant Noodles (70g Pack)',
    brand: 'QuickSpice Foods Pvt Ltd',
    category: 'Ultra-Processed Instant Food',
    image: '🍜',
    status: 'attention',
    statusLabel: 'Needs Consumer Attention',
    licenseNumber: '10012011000168',
    fssaiStatus: 'Format Valid',
    fssaiFormatValid: true,
    fssaiStatusLabel: 'Format Valid (14 Digits)',
    fssaiNote: 'Format-checked only — not confirmed against government database',
    manufacturerInfo: 'Nestlé India Industrial Complex, GT Road, Moga, Punjab - 142001',
    batchNumber: 'QS-MAS-8812',
    expiryDate: '15-Feb-2027',
    labelCompleteness: 94,
    ingredients: [
      'Refined Wheat Flour (Maida) (78.2%)',
      'Palm Oil (Palmolein)',
      'Iodised Salt',
      'Wheat Gluten',
      'Flavour Enhancers (INS 621 - MSG, INS 627, INS 631)',
      'Mixed Spices (Onion, Garlic, Red Chilli, Turmeric, Cumin)',
      'Acidity Regulators (INS 501(i), INS 500(i))',
      'Thickener (INS 412 - Guar Gum)',
      'Antioxidant (INS 319 - TBHQ)',
      'Caramel Colour (INS 150d)'
    ],
    detectedAdditives: ['621', '627', '631', '412', '319', '150d'],
    allergens: [
      'Contains Wheat (Gluten)',
      'Manufactured in facility processing Soy, Milk, and Mustard'
    ],
    nutrition: {
      servingSize: '70g (1 pack prepared)',
      calories: 312,
      protein: 6.8,
      totalFat: 12.8,
      saturatedFat: 6.2,
      transFat: 0.1,
      carbohydrates: 42.4,
      addedSugar: 1.4,
      dietaryFiber: 1.8,
      sodium: 890
    },
    observations: [
      'Primary base is refined wheat flour (Maida) with palm oil.',
      'Contains flavour enhancer INS 621 (Monosodium Glutamate) in the seasoning mix.',
      'Contains antioxidant INS 319 (TBHQ) used to extend frying oil stability.'
    ],
    attentionItems: [
      'High Sodium Content: 890mg sodium per single serving represents approx. 44.5% of the WHO recommended daily limit (2000mg).',
      'High Saturated Fat: 6.2g saturated fat per pack from palm oil frying.'
    ],
    explanation: 'FoodVigil AI analyzed the declared label. The product is an ultra-processed noodle formulated with refined maida and palm oil. It contains multiple savoury flavour enhancers (INS 621, 627, 631) and preservative antioxidant TBHQ (INS 319). Regular consumers should note the high sodium content (890mg/pack).',
    confidence: 96
  },
  {
    id: 'sample-chips',
    productName: 'Chatpata Masala Potato Crisps (50g)',
    brand: 'Desi Crunch Snacks LLP',
    category: 'Fried Packaged Snacks',
    image: '🥔',
    status: 'urgent',
    statusLabel: 'Important Health Information',
    licenseNumber: '10012051000096',
    fssaiStatus: 'Format Valid',
    fssaiFormatValid: true,
    fssaiStatusLabel: 'Format Valid (14 Digits)',
    fssaiNote: 'Format-checked only — not confirmed against government database',
    manufacturerInfo: 'Haldiram Snacks Complex, Mathura Road, New Delhi - 110044',
    batchNumber: 'DC-2026-CH-09',
    expiryDate: '10-Dec-2026',
    labelCompleteness: 92,
    ingredients: [
      'Potato (54%)',
      'Edible Vegetable Oil (Palmolein)',
      'Spices & Condiments (Chilli Powder, Amchur, Black Salt, Cumin)',
      'Iodised Salt',
      'Sugar',
      'Flavour Enhancers (INS 627, INS 631)',
      'Synthetic Food Colours (INS 110 - Sunset Yellow, INS 102 - Tartrazine)',
      'Antioxidant (INS 320 - BHA)',
      'Anticaking Agent (INS 551)'
    ],
    detectedAdditives: ['627', '631', '110', '102', '320', '551'],
    allergens: [
      'Contains Tartrazine (Azo dye sensitivity warning)',
      'May contain traces of milk solids and peanuts'
    ],
    nutrition: {
      servingSize: '50g pack',
      calories: 278,
      protein: 3.4,
      totalFat: 17.5,
      saturatedFat: 7.9,
      transFat: 0.1,
      carbohydrates: 26.2,
      addedSugar: 2.1,
      dietaryFiber: 1.2,
      sodium: 540
    },
    observations: [
      'Contains synthetic azo dyes INS 102 (Tartrazine) and INS 110 (Sunset Yellow).',
      'Contains petrochemical antioxidant INS 320 (BHA).'
    ],
    attentionItems: [
      'Synthetic Azo Dyes: Declared colours INS 102 and INS 110 require cautionary label notices in international markets regarding child activity.',
      'High Total Fat: 17.5g of fat per small 50g bag.'
    ],
    explanation: 'FoodVigil AI analyzed the declared label. The snack contains artificial petroleum-derived synthetic colours (INS 102 Tartrazine and INS 110 Sunset Yellow) and synthetic antioxidant BHA (INS 320). Sensitive individuals and children should consume in moderation.',
    confidence: 97
  },
  {
    id: 'sample-health-drink',
    productName: 'ChocoMalt Fortified Nutritional Drink Powder (500g)',
    brand: 'VitaGrowth Nutrition India',
    category: 'Malted Health Beverage Mix',
    image: '🍫',
    status: 'attention',
    statusLabel: 'Needs Consumer Attention',
    licenseNumber: '10014031001025',
    fssaiStatus: 'Format Valid',
    fssaiFormatValid: true,
    fssaiStatusLabel: 'Format Valid (14 Digits)',
    fssaiNote: 'Format-checked only — not confirmed against government database',
    manufacturerInfo: 'Tata Consumer Nutrition Centre, Lower Parel, Mumbai, Maharashtra - 400013',
    batchNumber: 'VG-MALT-551',
    expiryDate: '01-Jul-2027',
    labelCompleteness: 96,
    ingredients: [
      'Cereal Extract (Malted Barley, Wheat) (42%)',
      'Sugar (Cane Sugar & Liquid Glucose) (49.6%)',
      'Cocoa Solids (8.2%)',
      'Milk Solids',
      'Minerals (Calcium, Iron, Zinc)',
      'Vitamins (A, B1, B2, B6, B12, C, D)',
      'Emulsifier (INS 322 - Soy Lecithin)',
      'Colour (INS 150d - Caramel IV)',
      'Artificial Flavouring Substances (Chocolate & Vanilla)'
    ],
    detectedAdditives: ['322', '150d'],
    allergens: [
      'Contains Gluten (Barley, Wheat)',
      'Contains Milk Solids',
      'Contains Soy'
    ],
    nutrition: {
      servingSize: '20g powder (1 glass preparation)',
      calories: 78,
      protein: 1.4,
      totalFat: 0.8,
      saturatedFat: 0.4,
      transFat: 0.0,
      carbohydrates: 16.8,
      addedSugar: 9.8,
      dietaryFiber: 0.5,
      sodium: 45
    },
    observations: [
      'Fortified with 7 essential vitamins and 3 minerals.',
      'Second highest ingredient by weight is added sugar and liquid glucose (49.6% of formulation).'
    ],
    attentionItems: [
      'High Added Sugar: Approx. 9.8g of sugar per single 20g scoop (nearly 50% sugar by mass).',
      'Contains Caramel IV (INS 150d) coloring agent.'
    ],
    explanation: 'FoodVigil AI analyzed the declared label. While fortified with micronutrients, nearly half of the powder mass consists of simple sugars and liquid glucose (49.6g/100g). Parents and diabetic consumers should factor this into daily sugar limits.',
    confidence: 99
  }
];

// Safety Alerts & Recalls Repository
export const SAFETY_ALERTS_DATA = [
  {
    id: 'ALT-2026-01',
    title: 'Advisory on Non-Permitted Industrial Dyes in Loose Spice Powders',
    category: 'Spices & Condiments',
    severity: 'High attention',
    date: '24-Aug-2026',
    region: 'North & Western Regions (Rajasthan, Gujarat, Delhi)',
    product: 'Loose Turmeric & Red Chilli Powders (Unbranded Wholesale Batches)',
    manufacturer: 'Unbranded Mandi Commodity Lots',
    reason: 'Surveillance testing detected Metanil Yellow chemical dye and Sudan Red industrial colorants in open burlap sacks.',
    source: 'State Food Safety Commissionerate Surveillance Notice Ref: FSC/SP-2026/19',
    actionRequired: 'Consumers are advised to avoid unbranded loose yellow/red spice powders and choose packaged brands with verified 14-digit FSSAI licenses and AGMARK certifications.'
  },
  {
    id: 'ALT-2026-02',
    title: 'Voluntary Recall of Specific Batches of Premium Infant Cereal',
    category: 'Infant Nutrition',
    severity: 'High attention',
    date: '18-Aug-2026',
    region: 'National Distribution',
    product: 'BabyFirst Organic Rice & Apple Puree (Batch #BF-26-08)',
    manufacturer: 'EarlyCare Nutrition India Ltd',
    reason: 'Routine internal moisture testing detected packaging micro-leakage causing premature spoilage before stated best-before date.',
    source: 'Manufacturer Direct Notice & FSSAI Voluntary Recall Register #VR-402',
    actionRequired: 'Parents holding batch #BF-26-08 should discontinue feeding and contact customer care at 1800-XXX-XXXX for full replacement or refund.'
  },
  {
    id: 'ALT-2026-03',
    title: 'Import Clearance Alert on Honey Consignments Failing NMR Purity Tests',
    category: 'Honey & Sweeteners',
    severity: 'Attention',
    date: '02-Aug-2026',
    region: 'Port of Entry Consignments',
    product: 'Imported Invert Sugar Syrup Blends',
    manufacturer: 'Multiple Overseas Bulk Exporters',
    reason: 'Non-conformance with Nuclear Magnetic Resonance (NMR) and Specific Marker for Rice Syrup (SMR) purity parameters.',
    source: 'FSSAI Import Clearance Directive #ICD-2026/88',
    actionRequired: 'Commercial packers instructed to re-test all incoming raw honey batches before bottling.'
  }
];

// 6 Core Adulteration Awareness Scenarios ("Spot the Risk")
export const ADULTERATION_SCENARIOS = [
  {
    id: 'milk',
    title: 'Milk & Dairy Products',
    icon: '🥛',
    tag: 'Daily Essential',
    whatToLookFor: 'Water dilution, urea, detergent powder, starch, or synthetic neutralizers (hydrogen peroxide/formalin).',
    warningSigns: [
      'Milk tastes soapy or froths excessively when rubbed vigorously between palms.',
      'Turns distinctly yellowish upon boiling or gives an unusual chemical/bitter aftertaste.',
      'Does not curdle normally when adding lemon juice/vinegar for paneer preparation.'
    ],
    safePractices: [
      'Purchase pasteurized pouch milk from verified dairy cooperatives.',
      'Check milk drop test on a polished slanting surface — pure milk flows slowly leaving a white trail; diluted milk leaves no white trace.'
    ],
    whenToAvoid: 'Discard immediately if milk smells medicinal, foams without agitation, or remains liquid without souring after 36 hours at room temperature.',
    whenToReport: 'Report commercial dairies or vendors supplying milk that tests positive on household urea or starch strips to the local Food Safety Officer.'
  },
  {
    id: 'spices',
    title: 'Spices (Turmeric, Red Chilli, Black Pepper)',
    icon: '🌶️',
    tag: 'Cooking Staple',
    whatToLookFor: 'Metanil yellow dye in turmeric, brick powder/Sudan dye in red chilli, papaya seeds in whole black pepper.',
    warningSigns: [
      'Turmeric water turns instant bright magenta/pink upon adding a drop of hydrochloric acid/lemon juice (indicates Metanil Yellow).',
      'Red chilli powder settles into a sandy, heavy residue at the bottom of a water glass instead of dispersing evenly.',
      'Whole black pepper floats easily on alcohol/water (papaya seeds float; genuine black pepper sinks).'
    ],
    safePractices: [
      'Prefer whole spices and grind at home or purchase AGMARK certified sealed pouches.',
      'Avoid unlabelled open loose spices sold in open mandi bins.'
    ],
    whenToAvoid: 'Avoid any spice powder that leaves artificial red or yellow staining on skin that does not wash off with soap.',
    whenToReport: 'Report vendors selling artificially dyed turmeric or adulterated chilli powder with batch details.'
  },
  {
    id: 'oils',
    title: 'Edible Oils & Desi Ghee',
    icon: '🛢️',
    tag: 'Fats & Lipids',
    whatToLookFor: 'Argemone oil in mustard oil, palm oil dilution, animal tallow, or starch/vanaspati in desi ghee.',
    warningSigns: [
      'Ghee mixed with concentrated hydrochloric acid and a pinch of sugar turns crimson red within 5 minutes (Baudouin test for Vanaspati).',
      'Desi ghee refrigerated in a glass bottle forms distinct separate layers with differing melting points.',
      'Mustard oil with nitric acid develops a reddish-brown ring at the junction (indicates toxic Argemone oil).'
    ],
    safePractices: [
      'Look for FSSAI + AGMARK Special Grade seals on ghee containers.',
      'Store cooking oils in dark containers away from direct heat to prevent oxidation.'
    ],
    whenToAvoid: 'Never consume mustard oil that causes severe itching or gastrointestinal burning.',
    whenToReport: 'Report suspect ghee manufacturing units or repackagers to the District Designated Officer.'
  },
  {
    id: 'sweets',
    title: 'Sweets, Mawa & Khoya',
    icon: '🍬',
    tag: 'Festive Confections',
    whatToLookFor: 'Starch/detergent in synthetic khoya, non-permitted industrial dyes in gulab jamun/laddoo, fake aluminium vark instead of genuine silver leaf.',
    warningSigns: [
      'Khoya sample boiled with water and treated with iodine turns deep blue (indicates heavy starch/flour adulteration).',
      'Silver foil (Vark) turns completely black when rubbed over fingers or placed over a flame (genuine silver foil burns away leaving no black residue).',
      'Sweets have an unnatural day-glo fluorescent neon color.'
    ],
    safePractices: [
      'Buy festival confections from certified sweet shops displaying their 14-digit FSSAI license and daily hygiene ratings.',
      'Consume fresh dairy-based sweets within 24–48 hours of purchase.'
    ],
    whenToAvoid: 'Avoid brightly coloured unpackaged sweets from temporary festival roadside stalls.',
    whenToReport: 'Report suspicious bulk khoya consignments or synthetic mawa factories before festival seasons.'
  },
  {
    id: 'grains',
    title: 'Grains, Rice & Pulses',
    icon: '🌾',
    tag: 'Pantry Staples',
    whatToLookFor: 'Artificial polish (mineral oil or soapstone) on dals, Kesari dal mixed into Arhar/Toor dal, plastic/synthetic rice pellets.',
    warningSigns: [
      'Dal water turns unnaturally yellow-orange upon washing with soap (chemical dye polish).',
      'Arhar dal containing wedge-shaped Kesari dal grains (Lathyrus sativus — neurotoxic in chronic large quantities).',
      'Rice grains that melt into a plastic clump or smell like burning petrochemicals when exposed to direct flame.'
    ],
    safePractices: [
      'Soak and thoroughly rinse pulses 2–3 times in running water before cooking.',
      'Choose unpolished or minimally processed dals.'
    ],
    whenToAvoid: 'Avoid dals that feel slick and oily with an unnatural synthetic sheen.',
    whenToReport: 'Report bulk grain traders mixing prohibited Kesari dal into staple lentils.'
  },
  {
    id: 'fruits',
    title: 'Fruits & Vegetables',
    icon: '🍎',
    tag: 'Fresh Produce',
    whatToLookFor: 'Calcium carbide artificial ripening in mangoes/bananas, copper sulphate green dye on pointed gourd/peas, oxytocin hormone injections.',
    warningSigns: [
      'Mangoes have a uniform bright yellow skin but remain hard, sour, and juice-less inside with blackish blemishes.',
      'Vegetables rubbed with a cotton ball soaked in liquid paraffin turn green (indicates Malachite Green toxic dye).',
      'Apples scraped gently with a clean knife shed visible white paraffin wax flakes.'
    ],
    safePractices: [
      'Wash all fruits and vegetables thoroughly in a mild saltwater or baking soda solution for 15 minutes.',
      'Peel waxy skins from imported apples before consuming.'
    ],
    whenToAvoid: 'Never consume fruits with an acetylene or garlic-like chemical smell from calcium carbide packets.',
    whenToReport: 'Report fruit mandi wholesalers using illegal carbide gas ripening sachets.'
  }
];

// Mock User Initial Submissions
export const INITIAL_USER_REPORTS = [
  {
    id: 'FV-REP-2026-0881',
    trackingNumber: 'FV-IN-2026-881204',
    productName: 'Shree Krishna Ground Turmeric 200g',
    brand: 'Shree Krishna Spices',
    category: 'Suspected Adulteration',
    fssaiLicense: '12218027000412',
    batchNumber: 'SK-HAL-25-D',
    storeName: 'Kalyan Provision Store, Main Bazaar',
    city: 'Jaipur, Rajasthan',
    description: 'Household acid dilution test produced intense magenta-pink coloration indicating Metanil Yellow industrial dye. Matches public recall notice #REC-2025-RJ-112.',
    status: 'Assigned to DO',
    statusStep: 3,
    dateSubmitted: '28-Aug-2026',
    evidenceCount: 3
  },
  {
    id: 'FV-REP-2026-0740',
    trackingNumber: 'FV-IN-2026-740192',
    productName: 'Golden Royal Desi Ghee 1L Tin',
    brand: 'Golden Royal Dairy Foods',
    category: 'Mislabeled / Hydrogenated Fat',
    fssaiLicense: '10014021001234',
    batchNumber: 'GR-GHEE-804',
    storeName: 'QuickMart Supermarket',
    city: 'Ahmedabad, Gujarat',
    description: 'Refrigeration test revealed severe fat separation and rancid hydrogenated vegetable fat smell inconsistent with pure cow ghee standards.',
    status: 'Under Review',
    statusStep: 2,
    dateSubmitted: '25-Aug-2026',
    evidenceCount: 2
  }
];

// Initial Evidence Vault Items
export const INITIAL_EVIDENCE_ITEMS = [
  {
    id: 'EVD-001',
    fileName: 'Tax_Invoice_Kalyan_Store_882.jpg',
    type: 'Store Tax Invoice / Bill',
    relatedReport: 'FV-IN-2026-881204 (Shree Krishna Turmeric)',
    uploadDate: '28-Aug-2026',
    fileSize: '1.4 MB',
    fileType: 'image/jpeg',
    status: 'Verified & Encrypted'
  },
  {
    id: 'EVD-002',
    fileName: 'Batch_No_Back_Of_Pack.jpg',
    type: 'Packaging Batch Photo',
    relatedReport: 'FV-IN-2026-881204 (Shree Krishna Turmeric)',
    uploadDate: '28-Aug-2026',
    fileSize: '2.8 MB',
    fileType: 'image/jpeg',
    status: 'Verified & Encrypted'
  },
  {
    id: 'EVD-003',
    fileName: 'Acid_Test_Reaction_Video.mp4',
    type: 'Visual Observation Media',
    relatedReport: 'FV-IN-2026-881204 (Shree Krishna Turmeric)',
    uploadDate: '28-Aug-2026',
    fileSize: '6.2 MB',
    fileType: 'video/mp4',
    status: 'Verified & Encrypted'
  },
  {
    id: 'EVD-004',
    fileName: 'QuickMart_Receipt_2210.pdf',
    type: 'Store Tax Invoice',
    relatedReport: 'FV-IN-2026-740192 (Golden Royal Ghee)',
    uploadDate: '25-Aug-2026',
    fileSize: '480 KB',
    fileType: 'application/pdf',
    status: 'Verified & Encrypted'
  }
];
