// FoodVigil - Master Knowledge Engine & Demo Data Store

export const FOOD_ADDITIVES_DATA = {
  '621': {
    code: 'INS 621 (E621)',
    name: 'Monosodium Glutamate (MSG)',
    purpose: 'Flavour Enhancer',
    category: 'Attention', // 'Informational' | 'Attention' | 'High attention'
    simpleExplanation: 'Used to provide a savoury "umami" taste in savory foods, noodles, and snacks.',
    fact: 'Sodium salt of glutamic acid, an amino acid naturally present in tomatoes, aged cheeses, and mushrooms.',
    aiInterpretation: 'Commonly added to processed snacks to enhance palatability. Regulated by FSSAI within standard limits.',
    consumerNote: 'Individuals with reported sensitivities may prefer to monitor intake. Not recommended in infant formulations under 12 months.'
  },
  '627': {
    code: 'INS 627 (E627)',
    name: 'Disodium Guanylate',
    purpose: 'Flavour Enhancer',
    category: 'Informational',
    simpleExplanation: 'Synergistic flavour compound that works alongside MSG to enhance richness.',
    fact: 'Produced through fermentation of carbohydrates or yeast extracts.',
    aiInterpretation: 'Used in small quantities to amplify savoury flavours.',
    consumerNote: 'Those advised on low-purine dietary regimens (e.g. for gout) may note its presence.'
  },
  '631': {
    code: 'INS 631 (E631)',
    name: 'Disodium Inosinate',
    purpose: 'Flavour Enhancer',
    category: 'Informational',
    simpleExplanation: 'Enhances meaty and savoury flavour notes in processed snack seasonings.',
    fact: 'Derived via starch fermentation or animal/fish sources.',
    aiInterpretation: 'Generally safe and used in minute amounts for taste balancing.',
    consumerNote: 'Vegetarian consumers should look for the green veg logo to ensure plant-based origin.'
  },
  '102': {
    code: 'INS 102 (E102)',
    name: 'Tartrazine (FD&C Yellow 5)',
    purpose: 'Synthetic Food Colour',
    category: 'High attention',
    simpleExplanation: 'A synthetic lemon-yellow dye added to give bright visual appeal to drinks, confectioneries, and snacks.',
    fact: 'Synthetic azo dye derived from petroleum hydrocarbons.',
    aiInterpretation: 'European regulatory authorities (EFSA) require warning notices regarding potential hyperactivity in sensitive children. Permitted in India under quantitative caps.',
    consumerNote: 'Individuals with aspirin intolerance or asthma may experience sensitivities. Frequent consumption by young children is not advised.'
  },
  '110': {
    code: 'INS 110 (E110)',
    name: 'Sunset Yellow FCF',
    purpose: 'Synthetic Food Colour',
    category: 'High attention',
    simpleExplanation: 'An orange-red artificial dye used in desserts, squashes, and namkeen.',
    fact: 'Synthetic petroleum-derived colouring agent.',
    aiInterpretation: 'Permitted in select processed food categories in India with mandatory front/back declaration.',
    consumerNote: 'Check for natural alternative colorants (like turmeric, paprika, or beta-carotene) if seeking uncoloured alternatives.'
  },
  '150d': {
    code: 'INS 150d (E150d)',
    name: 'Caramel IV (Sulphite Ammonia Caramel)',
    purpose: 'Food Colouring',
    category: 'Attention',
    simpleExplanation: 'Provides dark brown colour in colas, sauces, gravies, and baked products.',
    fact: 'Produced by heating carbohydrates in the presence of sulphite and ammonium compounds.',
    aiInterpretation: 'By-product 4-MEI is globally monitored by food safety authorities. FSSAI limits 4-MEI to safe background thresholds.',
    consumerNote: 'Contains sulphite residues. Individuals with sulphite allergies should check allergen declarations.'
  },
  '211': {
    code: 'INS 211 (E211)',
    name: 'Sodium Benzoate',
    purpose: 'Preservative',
    category: 'High attention',
    simpleExplanation: 'Prevents the growth of yeast, bacteria, and mold in acidic beverages and condiments.',
    fact: 'Sodium salt of benzoic acid.',
    aiInterpretation: 'Highly effective preservative. Should not be formulated with high levels of ascorbic acid (Vitamin C) under high heat/light due to trace benzene formation risk.',
    consumerNote: 'Provides shelf-stability in ketchups and juices. Best consumed fresh from whole sources where possible.'
  },
  '319': {
    code: 'INS 319 (E319)',
    name: 'Tertiary Butylhydroquinone (TBHQ)',
    purpose: 'Synthetic Antioxidant',
    category: 'High attention',
    simpleExplanation: 'Slows down fat rancidity and oxidation in vegetable oils and fried snack foods.',
    fact: 'Petrochemical antioxidant with strict regulatory maximum limits (200 mg/kg under FSSAI regulations).',
    aiInterpretation: 'Added to extend the shelf life of packaged fried snacks.',
    consumerNote: 'Look for fresh unoxidized cold-pressed or minimal-preservative options for daily kitchen cooking.'
  },
  '320': {
    code: 'INS 320 (E320)',
    name: 'Butylated Hydroxyanisole (BHA)',
    purpose: 'Synthetic Antioxidant',
    category: 'High attention',
    simpleExplanation: 'Prevents oils and fats in butter, chips, and baked goods from turning rancid.',
    fact: 'Synthetic phenolic compound.',
    aiInterpretation: 'Under ongoing international surveillance for potential endocrine interactions when consumed in large chronic doses.',
    consumerNote: 'Check labels if seeking preservative-free dietary choices.'
  },
  '322': {
    code: 'INS 322 (E322)',
    name: 'Lecithin (Soy / Sunflower)',
    purpose: 'Emulsifier',
    category: 'Informational',
    simpleExplanation: 'Helps mix oil and water smoothly in chocolate, baked goods, and spreads.',
    fact: 'Naturally occurring fatty substance extracted from soybeans, sunflower seeds, or egg yolks.',
    aiInterpretation: 'Generally safe, standard natural emulsifier.',
    consumerNote: 'Soy-allergic individuals should verify the botanical source.'
  },
  '412': {
    code: 'INS 412 (E412)',
    name: 'Guar Gum',
    purpose: 'Thickener & Stabilizer',
    category: 'Informational',
    simpleExplanation: 'A natural plant fiber used to give smooth texture to ice creams, sauces, and baked products.',
    fact: 'Extracted from the seeds of the guar plant (Cyamopsis tetragonoloba).',
    aiInterpretation: 'Completely natural dietary fiber. Harmless in standard dietary amounts.',
    consumerNote: 'Safe and commonly cultivated across western India.'
  },
  '551': {
    code: 'INS 551 (E551)',
    name: 'Silicon Dioxide',
    purpose: 'Anti-Caking Agent',
    category: 'Informational',
    simpleExplanation: 'Stops dry powders like table salt, spice blends, and instant coffee from clumping due to moisture.',
    fact: 'Purified mineral silica (amorphous food-grade).',
    aiInterpretation: 'Passes unabsorbed through the digestive tract. Safe within authorized limits.',
    consumerNote: 'Keeps dry seasoning mixes free-flowing in humid environments.'
  },
  '951': {
    code: 'INS 951 (E951)',
    name: 'Aspartame',
    purpose: 'Artificial Sweetener',
    category: 'High attention',
    simpleExplanation: 'Low-calorie intense sweetener (approx. 200 times sweeter than table sugar) used in diet beverages.',
    fact: 'Dipeptide of aspartic acid and phenylalanine.',
    aiInterpretation: 'Classified as Group 2B ("possibly carcinogenic") by IARC in 2023, while JECFA reaffirmed an acceptable daily intake (ADI) of 0–40 mg/kg body weight.',
    consumerNote: 'Must carry mandatory warning: "Contains Phenylalanine — Not for Phenylketonurics (PKU)". Not recommended for children.'
  },
  '955': {
    code: 'INS 955 (E955)',
    name: 'Sucralose',
    purpose: 'Zero-Calorie Sweetener',
    category: 'Informational',
    simpleExplanation: 'Heat-stable zero-calorie sweetener derived from sugar.',
    fact: 'Chlorinated sucrose molecule that is not broken down for energy.',
    aiInterpretation: 'Useful for blood sugar management in diabetic dietary planning.',
    consumerNote: 'Safe alternative for sugar reduction. Consume in moderation as part of a balanced diet.'
  },
  '960': {
    code: 'INS 960 (E960)',
    name: 'Steviol Glycosides (Stevia Leaf Extract)',
    purpose: 'Natural Plant Sweetener',
    category: 'Informational',
    simpleExplanation: 'Zero-calorie natural sweetener extracted from the leaves of the Stevia rebaudiana plant.',
    fact: 'Plant-derived glycoside with high sweetness intensity.',
    aiInterpretation: 'Natural alternative to refined cane sugar.',
    consumerNote: 'Suitable for diabetic and calorie-conscious lifestyles.'
  }
};

export const SAMPLE_PRODUCTS = [
  {
    id: 'sample-biscuit',
    productName: 'NutriBite Digestivo Oats & Whole Wheat Biscuits (100g)',
    brand: 'NutriBite Bakeries India',
    category: 'Baked Goods & Biscuits',
    image: '🍪',
    status: 'good', // 'good' | 'attention' | 'urgent'
    statusLabel: 'Good Informational Standing',
    licenseNumber: '10015011002345',
    fssaiStatus: 'Active & Verified',
    manufacturerInfo: 'NutriBite Foods Pvt Ltd, Plot 12, KIADB Industrial Area, Bengaluru - 560058',
    batchNumber: 'NB-2026-08B',
    expiryDate: '15-Feb-2027',
    labelCompleteness: 95, // percentage
    ingredients: [
      'Whole Wheat Flour (Atta) (51%)',
      'Rolled Oats (14%)',
      'Refined Sunflower Oil',
      'Sugar',
      'Dietary Fiber (Inulin)',
      'Raising Agents (INS 500(ii), INS 503(ii))',
      'Emulsifier (INS 322 - Soy Lecithin)',
      'Iodised Salt',
      'Natural Flavouring Substances'
    ],
    detectedAdditives: ['322'],
    allergens: ['Contains Wheat (Gluten)', 'Contains Soy'],
    nutrition: {
      servingSize: '25g (3 biscuits)',
      calories: 118,
      protein: 2.4,
      totalFat: 4.5,
      saturatedFat: 0.8,
      transFat: 0.0,
      carbohydrates: 17.2,
      addedSugar: 3.5,
      dietaryFiber: 2.1,
      sodium: 95
    },
    observations: [
      'High whole-grain content: 51% whole wheat atta + 14% rolled oats.',
      'Contains natural dietary fiber from oats and inulin.',
      'Zero trans-fat declaration confirmed.',
      'Clear allergen declaration provided on back of pack.'
    ],
    attentionItems: [
      'Contains 3.5g added sugar per serving (moderate; diabetic consumers should note).'
    ],
    explanation: 'NutriBite Digestivo shows good ingredient transparency. The formulation is predominantly whole grains (65% combined) with a single plant-based emulsifier (INS 322 Soy Lecithin) that is widely recognized as safe. No synthetic colors or high-risk chemical preservatives were detected.',
    confidence: 96
  },
  {
    id: 'sample-noodles',
    productName: 'QuickSpice Masala Instant Noodles (70g Pack)',
    brand: 'QuickBite Express Foods',
    category: 'Ultra-Processed Instant Food',
    image: '🍜',
    status: 'attention',
    statusLabel: 'Needs Consumer Attention',
    licenseNumber: '10012011000168',
    fssaiStatus: 'Active (Central License)',
    manufacturerInfo: 'QuickBite Global Consumer Products, GT Road, Moga, Punjab - 142001',
    batchNumber: 'QS-08-26-90',
    expiryDate: '28-Jan-2027',
    labelCompleteness: 90,
    ingredients: [
      'Refined Wheat Flour (Maida)',
      'Palm Oil',
      'Iodised Salt',
      'Wheat Gluten',
      'Flavour Enhancers (INS 621, INS 627, INS 631)',
      'Mixed Spices (Dehydrated Onion, Red Chilli Powder, Turmeric, Coriander)',
      'Acidity Regulators (INS 501(i), INS 500(i))',
      'Thickener (INS 412 - Guar Gum)',
      'Synthetic Antioxidant (INS 319 - TBHQ)',
      'Colour (INS 150d - Caramel IV)'
    ],
    detectedAdditives: ['621', '627', '631', '412', '319', '150d'],
    allergens: ['Contains Wheat (Gluten)', 'May contain traces of Peanut & Soy'],
    nutrition: {
      servingSize: '70g (1 pack)',
      calories: 315,
      protein: 6.8,
      totalFat: 13.2,
      saturatedFat: 6.4,
      transFat: 0.1,
      carbohydrates: 42.1,
      addedSugar: 1.2,
      dietaryFiber: 1.8,
      sodium: 890
    },
    observations: [
      'Refined wheat flour (Maida) base with palm oil.',
      'Flavour enhancer combination (INS 621, 627, 631) declared clearly.',
      'High sodium content: 890mg per serving (approx. 45% of WHO recommended daily adult intake).'
    ],
    attentionItems: [
      'High Sodium (890mg / pack) — Hypertensive individuals should monitor frequency of consumption.',
      'High Saturated Fat (6.4g) due to palm oil processing.',
      'Contains synthetic antioxidant INS 319 (TBHQ) and Caramel IV (INS 150d).'
    ],
    explanation: 'QuickSpice Masala Noodles is an ultra-processed convenience food with accurate labeling. It contains multiple permitted additives including savory enhancers (INS 621, 627, 631) and antioxidant TBHQ (INS 319). The primary nutritional consideration for consumers is the elevated sodium and saturated fat content per single pack.',
    confidence: 94
  },
  {
    id: 'sample-chips',
    productName: 'Desi Masala Potato Crisps (50g)',
    brand: 'CrunchDelight Snacks',
    category: 'Snacks & Namkeen',
    image: '🥔',
    status: 'urgent',
    statusLabel: 'Important Health Information',
    licenseNumber: '10016051000789',
    fssaiStatus: 'Active',
    manufacturerInfo: 'CrunchDelight Foods Ltd, Mathura Road, New Delhi - 110044',
    batchNumber: 'CD-AUG26-44',
    expiryDate: '10-Nov-2026',
    labelCompleteness: 88,
    ingredients: [
      'Potato (54%)',
      'Edible Vegetable Oil (Palmolein)',
      'Seasoning Mix (Spices, Salt, Black Salt, Mango Powder, Sugar)',
      'Flavour Enhancers (INS 627, INS 631)',
      'Synthetic Food Colours (INS 110 - Sunset Yellow, INS 102 - Tartrazine)',
      'Synthetic Antioxidant (INS 320 - BHA)',
      'Anti-caking Agent (INS 551)'
    ],
    detectedAdditives: ['627', '631', '110', '102', '320', '551'],
    allergens: ['Produced in a facility processing dairy, nuts, and gluten'],
    nutrition: {
      servingSize: '50g pack',
      calories: 278,
      protein: 3.2,
      totalFat: 18.2,
      saturatedFat: 8.1,
      transFat: 0.1,
      carbohydrates: 25.4,
      addedSugar: 2.1,
      dietaryFiber: 1.4,
      sodium: 560
    },
    observations: [
      'Contains 2 synthetic azo dyes (INS 102 Tartrazine & INS 110 Sunset Yellow).',
      'Contains synthetic preservative BHA (INS 320).',
      'High saturated fat content (8.1g per 50g pack).'
    ],
    attentionItems: [
      'Synthetic Azo Dyes (INS 102 & INS 110): Linked to hyperactivity concerns in young children by EFSA.',
      'Contains BHA (INS 320): Monitored additive with established consumption limits.',
      'High total fat (18.2g / 50g) with high saturated palmolein content.'
    ],
    explanation: 'Desi Masala Crisps utilizes two synthetic artificial colorants (INS 102 Tartrazine and INS 110 Sunset Yellow) to achieve bright visual seasoning. While permitted under Indian food safety regulations within quantitative caps, consumers looking for child-safe or natural-color formulations should take note.',
    confidence: 93
  },
  {
    id: 'sample-malt-drink',
    productName: 'ChocoMax Health & Nutrition Drink Powder (500g Jar)',
    brand: 'ChocoMax Vitality',
    category: 'Malted Beverage / Health Drink',
    image: '🍫',
    status: 'attention',
    statusLabel: 'Needs Consumer Attention',
    licenseNumber: '10014021001234',
    fssaiStatus: 'Active',
    manufacturerInfo: 'ChocoMax Health Corp, Anand, Gujarat - 388001',
    batchNumber: 'CM-07-26-8',
    expiryDate: '01-Jul-2027',
    labelCompleteness: 92,
    ingredients: [
      'Cereal Extract (Malted Barley, Wheat) (42%)',
      'Sugar (Added Cane Sugar & Liquid Glucose) (48.5%)',
      'Cocoa Solids (8%)',
      'Milk Solids',
      'Minerals & Vitamins Premix',
      'Emulsifier (INS 322)',
      'Raising Agent (INS 500(ii))',
      'Permitted Synthetic Colour (INS 150d)',
      'Artificial Vanilla Flavour'
    ],
    detectedAdditives: ['322', '150d'],
    allergens: ['Contains Milk', 'Contains Gluten (Barley, Wheat)'],
    nutrition: {
      servingSize: '20g powder',
      calories: 79,
      protein: 1.4,
      totalFat: 0.7,
      saturatedFat: 0.3,
      transFat: 0.0,
      carbohydrates: 16.8,
      addedSugar: 9.7, // Approx 48.5% sugar by weight
      dietaryFiber: 0.5,
      sodium: 48
    },
    observations: [
      '48.5% of powder weight is added refined sugar and liquid glucose.',
      'Contains fortified vitamins and minerals (Vitamin D, B12, Iron, Zinc).',
      'Contains malted barley and wheat cereal extract.'
    ],
    attentionItems: [
      'High Added Sugar: 9.7g per 20g serving (Nearly 50% sugar by weight). Diabetic consumers and parents monitoring sugar intake should note.',
      'Marketing uses "Health & Nutrition" terminology despite high sugar density.'
    ],
    explanation: 'While ChocoMax provides fortified vitamins and malted grains, nearly half of the product content consists of added refined sugars and liquid glucose. Consumers should evaluate the nutritional balance relative to their daily sugar reduction goals.',
    confidence: 95
  }
];

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
    lastVerified: '2026-08-30',
    isDemoData: true,
    publicNotices: []
  },
  {
    licenseNumber: '10012011000168',
    businessName: 'Nestle India Limited',
    brandName: 'Nestlé Culinary & Dairy Unit',
    premisesAddress: 'GT Road, Moga Industrial Estate, Punjab - 142001',
    category: 'Large Scale Food Manufacturer (Central License)',
    status: 'ACTIVE',
    statusCode: 'active',
    issueDate: '04-Mar-2012',
    validUpto: '03-Mar-2028',
    hygieneRating: 4,
    inspectionGrade: 'Grade A (High Compliance)',
    lastVerified: '2026-08-25',
    isDemoData: true,
    publicNotices: [
      {
        id: 'ADV-2025-PB-09',
        date: '14-Nov-2025',
        title: 'Routine Surveillance Cleared',
        details: 'Randomized testing of noodle batches confirmed heavy metal levels well within permissible limits.'
      }
    ]
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
    inspectionGrade: 'Grade F (Failed Standards)',
    lastVerified: '2026-08-28',
    isDemoData: true,
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
    lastVerified: '2026-08-20',
    isDemoData: true,
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

export const SAFETY_ALERTS_DATA = [
  {
    id: 'ALT-2026-01',
    title: 'Advisory on Non-Permitted Industrial Dyes in Loose Spice Powders',
    category: 'Spices & Condiments',
    severity: 'High attention',
    date: '24-Aug-2026',
    region: 'North & Western Regions',
    product: 'Loose Turmeric & Red Chilli Powders',
    manufacturer: 'Unbranded Wholesale Mandi Traders',
    reason: 'Surveillance sampling identified non-permitted colorants (Metanil Yellow & Sudan Red dyes) in unbranded bulk sacks.',
    source: 'State Food Safety Commissionerate Advisory Ref: FSC/SP-2026/19',
    actionRequired: 'Consumers are advised to purchase packaged spices with verified 14-digit FSSAI licenses and AGMARK certifications.'
  },
  {
    id: 'ALT-2026-02',
    title: 'Voluntary Recall of Specific Batches of Premium Infant Cereal',
    category: 'Infant Nutrition',
    severity: 'High attention',
    date: '18-Aug-2026',
    region: 'National',
    product: 'BabyFirst Organic Rice & Apple Puree (Batch #BF-26-08)',
    manufacturer: 'EarlyCare Nutrition India Ltd',
    reason: 'Routine quality audit detected trace elevated moisture levels causing potential premature mold growth before stated best-before date.',
    source: 'Manufacturer Direct Notice & FSSAI Voluntary Recall Register #VR-402',
    actionRequired: 'Consumers holding batch #BF-26-08 should return unconsumed packs to point of purchase for immediate replacement or full refund.'
  },
  {
    id: 'ALT-2026-03',
    title: 'Advisory on Invert Sugar Syrup Adulteration in Commercial Honey',
    category: 'Sweeteners',
    severity: 'Attention',
    date: '10-Aug-2026',
    region: 'National',
    product: 'Commercially Packaged Flower Honey',
    manufacturer: 'Multiple Brands (Subject to SMR testing)',
    reason: 'Specific Markers for Rice Syrup (SMR) and Invert Sugar testing intensified across state analytical laboratories.',
    source: 'National Food Laboratory (NFL) Research Bulletin 2026/04',
    actionRequired: 'Ensure honey brands declare purity certifications conforming to FSSAI Gazetted Standards for Honey 2020.'
  },
  {
    id: 'ALT-2026-04',
    title: 'Public Notice on Front-of-Pack Nutritional Declaration Compliance',
    category: 'Packaged Foods',
    severity: 'Informational',
    date: '02-Aug-2026',
    region: 'National',
    product: 'High Fat-Sugar-Salt (HFSS) Packaged Snacks',
    manufacturer: 'All Food Business Operators (FBOs)',
    reason: 'Standardization of font sizes and clear percentage contribution to Recommended Daily Allowance (RDA).',
    source: 'FSSAI Regulatory Notification Ref: F.No. Stds/SP/2026',
    actionRequired: 'Informational update for consumer awareness regarding upcoming front-of-pack nutritional labeling standards.'
  }
];

export const ADULTERATION_SCENARIOS = [
  {
    id: 'milk',
    title: 'Milk & Dairy Products',
    icon: '🥛',
    tag: 'High Consumption Staple',
    whatToLookFor: 'Synthetic milk substitutes made using vegetable oils, urea, detergents, shampoo, or excess water dilution.',
    warningSigns: [
      'Milk feels soapy when rubbed between fingers.',
      'Forms a thick, persistent lather upon shaking that does not settle after 2 minutes.',
      'Turns distinctly yellowish upon slow boiling or prolonged storage.',
      'Bitter, chemical aftertaste rather than natural sweet dairy aroma.'
    ],
    safePractices: [
      'Prefer verified dairy brands with cold-chain monitoring.',
      'Perform simple home awareness checks (e.g. slant plate flow test).',
      'Boil fresh raw milk to standard temperature before consumption.'
    ],
    whenToAvoid: 'Discard immediately if milk smells chemical, leaves a sticky soapy film on vessels, or curdles with abnormal discolored separation.',
    whenToReport: 'Report when local milk vendors consistently deliver soapy milk or when neighborhood clusters experience gastrointestinal distress.',
    disclaimer: 'Preliminary visual and household checks are awareness tools only. Formal confirmation requires certified laboratory Gerber/spectroscopic testing.'
  },
  {
    id: 'spices',
    title: 'Spices & Condiments (Turmeric, Chilli, Pepper)',
    icon: '🌿',
    tag: 'High Risk for Chemical Dyes',
    whatToLookFor: 'Metanil Yellow (carcinogenic yellow dye in turmeric), Sudan Red / brick dust in chilli powder, and papaya seeds in black pepper.',
    warningSigns: [
      'Turmeric water remains magenta-pink even after extensive water dilution during acid check.',
      'Chilli powder releases bright crimson streaks immediately upon touching water surface without stirring.',
      'Heavy gritty red residue settles instantly at the bottom of a water tumbler.',
      'Black pepper corns float easily on water (papaya seeds are lighter and hollow).'
    ],
    safePractices: [
      'Buy whole spices and grind at home or trusted local flour mills.',
      'Look for AGMARK Grade certifications on packaged spices.',
      'Avoid unbranded brightly colored open sacks sold at deep discounts.'
    ],
    whenToAvoid: 'Never consume spices that impart artificial bright fluorescent stains on fingers or have a gritty chemical odor.',
    whenToReport: 'File a report with batch details if packaged haldi/chilli shows persistent synthetic dye bleed.',
    disclaimer: 'Acid and water settling checks provide rapid screening indicators. Definitive chemical dye assay requires HPLC lab verification.'
  },
  {
    id: 'oils',
    title: 'Edible Oils & Desi Ghee',
    icon: '🧈',
    tag: 'Fats & Adulterants',
    whatToLookFor: 'Argemone oil in mustard oil, mineral oil adulteration, and hydrogenated vanaspati / animal tallow / starch in desi ghee.',
    warningSigns: [
      'Melted ghee turns deep purple-black upon contact with a drop of medical iodine (indicating added starch/potato).',
      'Mustard oil produces severe eye irritation, abnormal pungent fumes at low smoke points, or red-brown acid separation.',
      'Oil feels sticky, does not absorb naturally, and leaves petroleum-like residue.'
    ],
    safePractices: [
      'Purchase sealed tins/pouches with clear FSSAI licensing and batch numbers.',
      'Store cooking oils in dark, cool spots away from direct heat to prevent oxidation.',
      'Check the Baudouin test verification mark on packaged ghee.'
    ],
    whenToAvoid: 'Argemone oil ingestion causes Epidemic Dropsy and severe cardiac/liver damage. Discard any suspicious mustard oil immediately.',
    whenToReport: 'Report any loose unbranded cooking oil vendor or oil that fails basic refrigeration solidifying patterns.',
    disclaimer: 'Iodine reaction screens for starch additives. Full fatty acid profiling requires Gas Chromatography (GC-MS).'
  },
  {
    id: 'sweets',
    title: 'Sweets, Mawa & Khoya',
    icon: '🍬',
    tag: 'Festive Season Adulteration',
    whatToLookFor: 'Synthetic khoya made with starch, detergent, and refined palm oil, and toxic aluminium foil used in place of silver vark on sweets.',
    warningSigns: [
      'Khoya feels gritty or excessively sticky rather than oily and smooth.',
      'Vark on sweets turns black and turns to ash when touched with a flame (pure silver vark crumbles or melts cleanly without soot).',
      'Silver foil stays in thick flakes and sticks to fingers instead of crumbling into micro-particles.'
    ],
    safePractices: [
      'Purchase festive sweets from FSSAI-registered sweet shops displaying hygiene ratings.',
      'Test silver vark with gentle palm rub before serving to children.'
    ],
    whenToAvoid: 'Avoid sweets with unnatural chemical fragrance or metallic bitter taste.',
    whenToReport: 'Report sweet vendors operating without hygiene certification during major festive seasons.',
    disclaimer: 'Flame testing for silver vark is a helpful preliminary check. Trace heavy metal testing is performed via ICP-MS.'
  },
  {
    id: 'grains',
    title: 'Grains, Pulses & Cereals',
    icon: '🌾',
    tag: 'Pesticides & Polishing Agents',
    whatToLookFor: 'Artificial dye coatings (Malachite green / Lead chromate on dals), chalk powder, and synthetic polishing with mineral oils.',
    warningSigns: [
      'Dal bleeds bright yellow/green color into cold water within 10 seconds of rinsing.',
      'Grain appears unnaturally glossy with oily petroleum fragrance.',
      'Excessive dust or fine chalk sediment settles during washing.'
    ],
    safePractices: [
      'Rinse grains and dals thoroughly in running water 2–3 times before cooking.',
      'Prefer unpolished dals with natural color variations.'
    ],
    whenToAvoid: 'Do not consume grains that release persistent artificial dye during simple cold water rinse.',
    whenToReport: 'Report retailers selling dyed pulses under premium natural branding.',
    disclaimer: 'Water wash tests indicate superficial dye wash-off. Internal pesticide residue requires multi-residue GC-MS lab screening.'
  },
  {
    id: 'fruits',
    title: 'Fruits & Vegetables',
    icon: '🍎',
    tag: 'Artificial Ripeners & Dyes',
    whatToLookFor: 'Calcium carbide (banned chemical for artificial ripening), copper sulfate injections, and wax coatings.',
    warningSigns: [
      'Mangoes or bananas have uniform bright yellow exterior skin but hard, sour, unripe pulp inside.',
      'White powdery chemical residue with garlic-like odor on fruit skin (indicative of carbide packets).',
      'Cotton soaked in water/alcohol turns green when rubbed on green vegetables (Malachite dye).'
    ],
    safePractices: [
      'Wash all fruits thoroughly under running water; peel skin when possible.',
      'Prefer naturally ripened, seasonal produce with natural color gradients.'
    ],
    whenToAvoid: 'Fruits ripened with Calcium Carbide contain toxic arsenic and phosphorus traces. Discard if chemical powder is visible.',
    whenToReport: 'Report fruit mandis using chemical ripening sachets directly inside fruit crates.',
    disclaimer: 'Surface observation screens for rapid ripening. Regulatory testing utilizes ethylene gas spectrometry.'
  }
];

export const INITIAL_USER_REPORTS = [
  {
    id: 'FV-REP-2026-104',
    productName: 'Shree Krishna Ground Turmeric 200g',
    brand: 'Shree Krishna Spices',
    category: 'Suspected Adulteration',
    storeName: 'Kalyan Provision Store, Main Bazaar',
    city: 'Jaipur, Rajasthan',
    dateSubmitted: '28-Aug-2026',
    status: 'Assigned to DO',
    statusStep: 3, // 1: Submitted, 2: Under Review, 3: Assigned to DO, 4: Resolved
    trackingNumber: 'FV-IN-2026-894102',
    fssaiLicense: '12218027000412',
    batchNumber: 'SK-HAL-25-D',
    evidenceCount: 3,
    description: 'Purchased 200g pouch. Acid dilution test showed persistent magenta-pink coloration. Sample matches active FSSAI recall notice #REC-2025-RJ-112.',
    evidenceItems: [
      { name: 'Receipt_INV_882.jpg', type: 'Tax Invoice', size: '1.2 MB' },
      { name: 'Turmeric_Batch_Photo.jpg', type: 'Back of Pack Photo', size: '2.4 MB' },
      { name: 'Acid_Test_Result.jpg', type: 'Testing Observation', size: '1.8 MB' }
    ]
  },
  {
    id: 'FV-REP-2026-103',
    productName: 'Royal Biryani Cooked Gravy Base',
    brand: 'Delight Cloud Kitchens',
    category: 'Food Poisoning / Spoilage',
    storeName: 'Royal Biryani Online Order via App',
    city: 'Gurugram, Haryana',
    dateSubmitted: '22-Aug-2026',
    status: 'Under Review',
    statusStep: 2,
    trackingNumber: 'FV-IN-2026-773419',
    fssaiLicense: '20822005001298',
    batchNumber: 'RBB-2026-08',
    evidenceCount: 2,
    description: 'Received foul-smelling spoiled meat gravy. Operator license is currently suspended per public registry.',
    evidenceItems: [
      { name: 'Delivery_App_Receipt.pdf', type: 'Digital Invoice', size: '420 KB' },
      { name: 'Food_Container_Timestamp.jpg', type: 'Packaging Proof', size: '3.1 MB' }
    ]
  }
];

export const INITIAL_EVIDENCE_ITEMS = [
  {
    id: 'EVD-01',
    fileName: 'Receipt_INV_882.jpg',
    type: 'Tax Invoice / Bill',
    relatedReport: 'FV-IN-2026-894102 (Shree Krishna Turmeric)',
    uploadDate: '28-Aug-2026',
    fileSize: '1.2 MB',
    fileType: 'image/jpeg',
    status: 'Attached to Active Dossier'
  },
  {
    id: 'EVD-02',
    fileName: 'Turmeric_Batch_Photo.jpg',
    type: 'Packaging & FSSAI Mark',
    relatedReport: 'FV-IN-2026-894102 (Shree Krishna Turmeric)',
    uploadDate: '28-Aug-2026',
    fileSize: '2.4 MB',
    fileType: 'image/jpeg',
    status: 'Attached to Active Dossier'
  },
  {
    id: 'EVD-03',
    fileName: 'Acid_Test_Result.jpg',
    type: 'Observation Photo',
    relatedReport: 'FV-IN-2026-894102 (Shree Krishna Turmeric)',
    uploadDate: '28-Aug-2026',
    fileSize: '1.8 MB',
    fileType: 'image/jpeg',
    status: 'Attached to Active Dossier'
  },
  {
    id: 'EVD-04',
    fileName: 'Delivery_App_Receipt.pdf',
    type: 'Digital Bill',
    relatedReport: 'FV-IN-2026-773419 (Delight Cloud Kitchen)',
    uploadDate: '22-Aug-2026',
    fileSize: '420 KB',
    fileType: 'application/pdf',
    status: 'Attached to Active Dossier'
  }
];
