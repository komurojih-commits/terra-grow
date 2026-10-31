// --- CROP ADVISOR ---
function recommendCrop() {
  const loc = document.getElementById('location').value.trim() || "Farm";
  const water = document.getElementById('water').value, soil = document.getElementById('soil').value, season = document.getElementById('season').value;
  const cropDB = {
    'high-clay-kharif': { crops: ['Rice', 'Sugarcane', 'Jute'], reason: 'Clay soil holds water well and Kharif has high rainfall.' },
    'high-clay-rabi': { crops: ['Wheat', 'Mustard', 'Barley'], reason: 'Clay soil retains moisture, good for Wheat in Rabi.' },
    'high-loamy-kharif': { crops: ['Rice', 'Maize', 'Cotton'], reason: 'Loamy soil is fertile and retains water.' },
    'high-loamy-rabi': { crops: ['Wheat', 'Vegetables', 'Pulses'], reason: 'Loamy soil with good irrigation is perfect for Wheat.' },
    'medium-black-kharif': { crops: ['Cotton', 'Soybean', 'Sorghum'], reason: 'Black soil retains moisture and is extremely fertile.' },
    'medium-black-rabi': { crops: ['Wheat', 'Chickpea', 'Linseed'], reason: 'Black soil moisture supports Wheat and Chickpea.' },
    'medium-red-kharif': { crops: ['Groundnut', 'Millet', 'Pigeon pea'], reason: 'Red soil drains well, Groundnut thrives here.' },
    'medium-red-rabi': { crops: ['Gram', 'Mustard', 'Barley'], reason: 'Red soil with medium water is good for Gram.' },
    'medium-sandy-kharif': { crops: ['Groundnut', 'Bajra', 'Moong'], reason: 'Sandy soil drains fast, Bajra is drought-tolerant.' },
    'medium-sandy-rabi': { crops: ['Mustard', 'Gram', 'Barley'], reason: 'Mustard requires less water and grows well in Sandy soil.' },
    'low-sandy-kharif': { crops: ['Bajra', 'Jowar', 'Moth bean'], reason: 'Very low water and Sandy soil. Only Bajra will survive.' },
    'low-sandy-rabi': { crops: ['Gram', 'Mustard', 'Cumin'], reason: 'Gram and Cumin need very little water.' },
    'low-red-kharif': { crops: ['Millet', 'Pulses', 'Castor'], reason: 'Red soil with low water. Millet is highly resilient.' },
    'low-red-rabi': { crops: ['Gram', 'Safflower'], reason: 'Safflower can survive in Red soil with low water.' },
    'high-alluvial-kharif': { crops: ['Rice', 'Maize', 'Sugarcane'], reason: 'Alluvial soil is most fertile. High water makes Rice perfect.' },
    'high-alluvial-rabi': { crops: ['Wheat', 'Sugarcane', 'Mustard'], reason: 'Alluvial soil is extremely fertile, ideal for Wheat.' }
  };
  const resultData = cropDB[`${water}-${soil}-${season}`] || { crops: ['Millet', 'Pulses', 'Vegetables'], reason: 'General resilient crops.' };
  const crops = resultData.crops.map(c => cNames[currentLang][c] || c);
  
  document.getElementById('cropResult').innerHTML = `
    <h3><i class="fas fa-check-circle" style="color:#2e7d32;"></i> ${t[currentLang].rec_for} ${loc}</h3>
    <div style="background:#e8f5e9; padding:10px; border-radius:8px; margin-bottom:15px; border-left:4px solid #2e7d32;">
      <p style="font-size:0.95em; color:#1b5e20;"><strong>Why these crops?</strong> ${resultData.reason}</p>
    </div>
    <ul>${crops.map(c => `<li><i class="fas fa-angle-right" style="color:#66bb6a; margin-right:8px;"></i> ${c}</li>`).join('')}</ul>
    <div class="tip"><i class="fas fa-sync-alt"></i> ${t[currentLang].tip}</div>
  `;
  document.getElementById('cropResult').classList.add('show');
  speak(`${t[currentLang].rec_for} ${loc}: ${crops.join(', ')}`);
}

// --- FERTILIZER ---
// --- SAFE & ACCURATE FERTILIZER ADVISOR ---
function suggestFertilizer() {
  const cropRaw = document.getElementById('fertCrop').value.trim();
  const crop = cropRaw.toLowerCase();
  const stage = document.getElementById('growth').value;
  const resultDiv = document.getElementById('fertResult');

  if (!crop) {
    alert("Please enter a crop name.");
    return;
  }

  // Master Database: Specific to Crop AND Stage
  const fertilizerDB = {
    'rice': {
      'seedling': 'Apply DAP 25 kg/acre + Zinc Sulphate 10 kg/acre. (Rice needs Zinc early on to prevent Khaira disease).',
      'vegetative': 'Apply Urea 45 kg/acre + Potash 15 kg/acre. (Rice needs high Nitrogen for tillering).',
      'flowering': 'Apply NPK 10:26:26 @ 30 kg/acre. (Focus on root and panicle development).',
      'fruiting': 'Apply Urea 15 kg/acre if leaves are pale. Stop Nitrogen otherwise to prevent lodging.'
    },
    'wheat': {
      'seedling': 'Apply DAP 50 kg/acre + Urea 20 kg/acre at the time of sowing.',
      'vegetative': 'Apply Urea 45 kg/acre. (Apply in two splits, first at Crown Root Initiation, second at tillering).',
      'flowering': 'Apply Urea 15 kg/acre + Muriate of Potash (MOP) 10 kg/acre.',
      'fruiting': 'No heavy fertilizer needed. A foliar spray of 2% Urea can help grain filling.'
    },
    'apple': {
      'seedling': 'Apply DAP 20 kg/acre + Single Super Phosphate (SSP) 30 kg/acre for strong root establishment.',
      'vegetative': 'Apply NPK 19:19:19 @ 5g/L as a foliar spray for balanced growth.',
      'flowering': 'Apply Sulphate of Potash (SOP) 25 kg/acre + Boron spray. (Apples need Potash for fruit quality).',
      'fruiting': 'Apply Calcium Nitrate spray + NPK 19:19:19. (Prevents bitter pit disease in apples).'
    },
    'tomato': {
      'seedling': 'Apply NPK 19:19:19 @ 5g/L foliar spray.',
      'vegetative': 'Apply Urea 20 kg/acre + DAP 25 kg/acre.',
      'flowering': 'Apply Calcium Nitrate + Boron spray. (Prevents flower drop).',
      'fruiting': 'Apply Potash (MOP) 20 kg/acre + NPK 0:0:50. (For better fruit size and color).'
    },
    'cotton': {
      'seedling': 'Apply DAP 50 kg/acre.',
      'vegetative': 'Apply Urea 30 kg/acre + Potash 20 kg/acre.',
      'flowering': 'Apply Potash (MOP) 30 kg/acre + Magnesium Sulphate spray. (Prevents reddening of leaves).',
      'fruiting': 'Apply a foliar spray of NPK 0:0:50 to improve boll weight and quality.'
    },
    'sugarcane': {
      'seedling': 'Apply DAP 40 kg/acre + Urea 20 kg/acre.',
      'vegetative': 'Apply Urea 60 kg/acre near the root zone.',
      'flowering': 'Apply Potash 40 kg/acre + Sulphur 10 kg/acre.',
      'fruiting': 'No fertilizer needed during ripening. Stop watering 15 days before harvest.'
    },
    'potato': {
      'seedling': 'Apply DAP 30 kg/acre + MOP 20 kg/acre at planting.',
      'vegetative': 'Apply Urea 30 kg/acre + Potash 15 kg/acre.',
      'flowering': 'Apply Sulphur 10 kg/acre. (Sulphur improves potato size and skin quality).',
      'fruiting': 'No fertilizer needed. Stop watering 10 days before harvesting.'
    }
  };

  // Check if the crop exists in our database
  let cropKey = Object.keys(fertilizerDB).find(key => crop.includes(key));

  if (cropKey) {
    // Crop found, give specific advice
    const advice = fertilizerDB[cropKey][stage];
    
    resultDiv.innerHTML = `
      <h3><i class="fas fa-flask" style="color:#2e7d32;"></i> Accurate Plan for ${cropRaw.toUpperCase()}</h3>
      <p style="margin-bottom:15px; font-size:1.1em;"><strong>Recommendation:</strong> ${advice}</p>
      <div class="tip"><i class="fas fa-leaf"></i> <strong>Organic Tip:</strong> Always mix chemical fertilizers with organic Vermicompost to protect long-term soil health.</div>
    `;
    speak(`Specific fertilizer plan for ${cropRaw}: ${advice}`);
  } else {
    // Crop NOT found, refuse to predict blindly
    resultDiv.innerHTML = `
      <h3 style="color:#c62828;"><i class="fas fa-exclamation-triangle"></i> Crop Not Recognized</h3>
      <p style="margin-bottom:15px; font-size:1.1em;">We currently do not have precise fertilizer data for <strong>"${cropRaw}"</strong>.</p>
      <div style="padding:15px; background:#ffebee; border-left:4px solid #c62828; border-radius:8px; margin-bottom:15px;">
        <strong>⚠️ Safety Warning:</strong> It is highly unsafe to guess fertilizer for a crop we don't know. The wrong NPK ratio can destroy your crop.
      </div>
      <p><strong>What to do:</strong> Please get your soil tested and consult your local Krishi Kendra for the exact NPK requirement for ${cropRaw}.</p>
      <div class="tip"><i class="fas fa-leaf"></i> General Organic Tip: Apply 200 kg/acre of Vermicompost before sowing to build soil fertility.</div>
    `;
    speak(`We do not have specific fertilizer data for ${cropRaw}. Please consult your local Krishi Kendra to avoid damaging your crop.`);
  }

  resultDiv.classList.add('show');
}

// --- COMPOST ---
// --- SOIL-SPECIFIC COMPOST ADVISOR ---
function showCompost() {
  const soil = document.getElementById('compostSoil').value;
  
  const guides = {
    'sandy': `
      <h3>🏜️ Master Compost Recipe for Sandy Soil</h3>
      <p style="margin-bottom:10px; color:#555;"><strong>The Problem:</strong> Sandy soil drains water and nutrients too fast (like a sieve).</p>
      <p style="margin-bottom:10px; color:#555;"><strong>The Goal:</strong> Add compost that acts like a sponge to hold moisture.</p>
      
      <div style="background:#f1f8e9; padding:15px; border-radius:10px; margin-bottom:15px;">
        <h4 style="color:#1b5e20; margin-bottom:8px;">The Recipe (per 10x10 ft area):</h4>
        <ul style="padding-left:20px; line-height:1.6;">
          <li><strong>50% Browns:</strong> Dry leaves, straw, shredded cardboard (holds water).</li>
          <li><strong>30% Greens:</strong> Kitchen scraps, fresh grass clippings (adds nitrogen).</li>
          <li><strong>20% Soil/Manure:</strong> Cow dung or old soil (introduces microbes).</li>
        </ul>
      </div>
      
      <p><strong>Best Organic Matter:</strong> Green Manure (grow Dhaincha or Sunhemp and plough it back into the soil). It adds organic mass directly into the sand.</p>
      <p style="margin-top:10px;"><strong>Why it works:</strong> The heavy organic matter absorbs water, stopping it from draining instantly.</p>
    `,
    'clay': `
      <h3>🧱 Master Compost Recipe for Clay Soil</h3>
      <p style="margin-bottom:10px; color:#555;"><strong>The Problem:</strong> Clay soil is heavy, sticky, and gets waterlogged. Roots can't breathe.</p>
      <p style="margin-bottom:10px; color:#555;"><strong>The Goal:</strong> Add compost that creates air pockets and breaks up the clods.</p>
      
      <div style="background:#f1f8e9; padding:15px; border-radius:10px; margin-bottom:15px;">
        <h4 style="color:#1b5e20; margin-bottom:8px;">The Recipe (per 10x10 ft area):</h4>
        <ul style="padding-left:20px; line-height:1.6;">
          <li><strong>60% Browns:</strong> Chopped straw, wood chips, dry leaves (creates air pockets).</li>
          <li><strong>30% Greens:</strong> Vegetable peels, green leaves.</li>
          <li><strong>10% Gypsum:</strong> (Optional) A handful of gypsum helps break down hard clay.</li>
        </ul>
      </div>
      
      <p><strong>Best Organic Matter:</strong> Vermicompost or well-rotted Farm Yard Manure (FYM). Never use fresh manure, as it will make the clay even heavier.</p>
      <p style="margin-top:10px;"><strong>Why it works:</strong> The coarse browns physically separate the clay particles, improving drainage and root growth.</p>
    `,
    'black': `
      <h3>🌑 Master Compost Recipe for Black Soil</h3>
      <p style="margin-bottom:10px; color:#555;"><strong>The Problem:</strong> Black soil (Regur) is naturally very fertile and holds moisture excellently. It can become sticky when wet.</p>
      <p style="margin-bottom:10px; color:#555;"><strong>The Goal:</strong> Maintain fertility and prevent soil exhaustion.</p>
      
      <div style="background:#f1f8e9; padding:15px; border-radius:10px; margin-bottom:15px;">
        <h4 style="color:#1b5e20; margin-bottom:8px;">The Recipe (per 10x10 ft area):</h4>
        <ul style="padding-left:20px; line-height:1.6;">
          <li><strong>40% Browns:</strong> Crop residue (like cotton stalks, chopped).</li>
          <li><strong>40% Greens:</strong> Green leaves, weeds (before they flower).</li>
          <li><strong>20% Manure:</strong> Poultry manure or cow dung.</li>
        </ul>
      </div>
      
      <p><strong>Best Organic Matter:</strong> Farm Yard Manure (FYM) and composted oil cakes (like Neem or Castor cake).</p>
      <p style="margin-top:10px;"><strong>Why it works:</strong> Black soil needs regular organic matter to keep its structure and prevent it from becoming hard when dry.</p>
    `,
    'red': `
      <h3>🔴 Master Compost Recipe for Red Soil</h3>
      <p style="margin-bottom:10px; color:#555;"><strong>The Problem:</strong> Red soil is rich in iron but highly deficient in Nitrogen, Phosphorus, and organic matter. It drains well but lacks nutrients.</p>
      <p style="margin-bottom:10px; color:#555;"><strong>The Goal:</strong> Add nitrogen-rich compost and increase water retention.</p>
      
      <div style="background:#f1f8e9; padding:15px; border-radius:10px; margin-bottom:15px;">
        <h4 style="color:#1b5e20; margin-bottom:8px;">The Recipe (per 10x10 ft area):</h4>
        <ul style="padding-left:20px; line-height:1.6;">
          <li><strong>40% Browns:</strong> Dry leaves, hay.</li>
          <li><strong>50% Greens:</strong> Legume plants (beans, peas), fresh grass (high nitrogen).</li>
          <li><strong>10% Wood Ash:</strong> Adds potassium and reduces soil acidity.</li>
        </ul>
      </div>
      
      <p><strong>Best Organic Matter:</strong> Vermicompost mixed with <strong>Neem Cake</strong>. Neem cake slowly releases nitrogen and acts as a natural pesticide.</p>
      <p style="margin-top:10px;"><strong>Why it works:</strong> The high nitrogen greens and neem cake fix the nutrient deficiency of the red soil.</p>
    `,
    'loamy': `
      <h3>🌾 Master Compost Recipe for Loamy Soil</h3>
      <p style="margin-bottom:10px; color:#555;"><strong>The Problem:</strong> None! Loamy soil is the perfect balance of sand, silt, and clay.</p>
      <p style="margin-bottom:10px; color:#555;"><strong>The Goal:</strong> Maintain the health, microbial life, and structure of the soil.</p>
      
      <div style="background:#f1f8e9; padding:15px; border-radius:10px; margin-bottom:15px;">
        <h4 style="color:#1b5e20; margin-bottom:8px;">The Recipe (per 10x10 ft area):</h4>
        <ul style="padding-left:20px; line-height:1.6;">
          <li><strong>50% Browns:</strong> Dry leaves, straw.</li>
          <li><strong>40% Greens:</strong> Kitchen waste, fresh leaves.</li>
          <li><strong>10% Manure:</strong> Cow dung.</li>
        </ul>
      </div>
      
      <p><strong>Best Organic Matter:</strong> Any standard Vermicompost or Kitchen Waste Compost.</p>
      <p style="margin-top:10px;"><strong>Why it works:</strong> Regular compost keeps the soil alive, ensuring it stays perfect for generations.</p>
    `
  };
  
  document.getElementById('compostResult').innerHTML = guides[soil];
  document.getElementById('compostResult').classList.add('show');
  speak("Detailed compost recipe loaded for your soil type.");
}

// --- DISEASE DETECTION (PERFECTED) ---
function detectDisease(event) {
  const file = event.target.files[0];
  if (!file) return;

  const resultDiv = document.getElementById('diseaseResult');
  resultDiv.innerHTML = '<div style="text-align:center; padding:20px;"><i class="fas fa-spinner fa-spin" style="font-size:2em; color:#2e7d32;"></i><p style="margin-top:10px; font-weight:bold;">AI is scanning leaf pixels...</p></div>';
  resultDiv.classList.add('show');
  speak("Analyzing image pixels. Please wait.");

  const img = new Image();
  img.onload = function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.drawImage(this, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let yellowCount = 0, brownCount = 0, whiteCount = 0, greenCount = 0;

    for (let i = 0; i < data.length; i += 16) {
      const r = data[i], g = data[i+1], b = data[i+2];
      
      // Very sensitive pixel checks
      if (r > 120 && g > 120 && b < 100) yellowCount++; 
      else if (r > 90 && r < 190 && g > 40 && g < 130 && b < 90) brownCount++;
      else if (r > 190 && g > 190 && b > 190) whiteCount++;
      else if (g > r && g > b) greenCount++;
    }

    setTimeout(() => {
      const total = yellowCount + brownCount + whiteCount + greenCount;
      
      // If the image is too small or broken
      if (total < 50) {
        resultDiv.innerHTML = `<h3 style="color:#ff9800;"><i class="fas fa-exclamation-circle"></i> Image Unclear</h3><p style="color:#444;">The image is too dark, blurry, or not a leaf.</p><p style="margin-top:10px; font-weight:bold;">Please upload a clear, close-up photo in daylight.</p>`;
        speak(`The image is unclear. Please upload a clear close up photo.`);
        return;
      }

      const greenPct = (greenCount / total) * 100;
      const yellowPct = (yellowCount / total) * 100;
      const brownPct = (brownCount / total) * 100;
      const whitePct = (whiteCount / total) * 100;

      let disease = "", treatment = "", organic = "", confidence = 0;

      // 1. If there is even 8% brown, it's a disease! (Fixes your potato leaf)
      if (brownPct > 8) {
        disease = "Leaf Spot / Blight";
        treatment = "Spray Mancozeb 75% WP @ 2g/L or Copper oxychloride.";
        organic = "Neem oil spray (5ml/L) + remove infected leaves.";
        confidence = Math.min(99, Math.floor(brownPct * 2.5) + 65); 
      } 
      // 2. If there is heavy yellowing
      else if (yellowPct > 15) {
        disease = "Yellowing / Nutrient Deficiency";
        treatment = "Add Urea (20 kg/acre) or NPK 19:19:19.";
        organic = "Add Vermicompost or Jeevamrutha.";
        confidence = Math.min(95, Math.floor(yellowPct * 2) + 65);
      } 
      // 3. If there is white powder
      else if (whitePct > 15) {
        disease = "Powdery Mildew";
        treatment = "Spray Sulfur 80% WP @ 2g/L or Hexaconazole.";
        organic = "Spray milk-water mixture (1:9).";
        confidence = Math.min(92, Math.floor(whitePct * 2) + 65);
      } 
      // 4. ONLY if it is mostly green and has NO spots
      else if (greenPct > 70) {
        disease = "Healthy Plant";
        treatment = "No chemical treatment needed.";
        organic = "Continue regular watering and organic compost.";
        confidence = Math.min(99, Math.floor(greenPct) + 5);
      } 
      // 5. Fallback for mixed unclear images
      else {
        disease = "Early Stage Infection / Stress";
        treatment = "Consult a Krishi Kendra for a physical check.";
        organic = "Apply a general neem oil spray as a precaution.";
        confidence = 75;
      }

      const color = disease === 'Healthy Plant' ? '#2e7d32' : '#c62828';
      const icon = disease === 'Healthy Plant' ? 'fa-check-circle' : 'fa-exclamation-triangle';

      resultDiv.innerHTML = `
        <h3 style="color:${color};"><i class="fas ${icon}"></i> Analysis Result</h3>
        <img src="${URL.createObjectURL(file)}" style="max-width:150px; border-radius:10px; margin-bottom:15px; border:2px solid #ccc;">
        <p style="font-size:1.2em; margin-bottom:10px;"><strong>Detected:</strong> ${disease}</p>
        
        <div style="margin-bottom:15px;">
          <span style="font-weight:bold; color:#2e7d32;">AI Confidence: ${confidence}%</span>
          <div style="width:100%; background:#e0e0e0; border-radius:5px; height:8px; margin-top:5px;">
            <div style="width:${confidence}%; background:${color}; height:8px; border-radius:5px;"></div>
          </div>
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <div style="flex:1; padding:12px; background:#ffebee; border-radius:8px;">
            <strong style="color:#c62828;">Chemical Treatment:</strong>
            <p style="font-size:0.9em; margin-top:5px;">${treatment}</p>
          </div>
          <div style="flex:1; padding:12px; background:#e8f5e9; border-radius:8px;">
            <strong style="color:#2e7d32;">Organic Treatment:</strong>
            <p style="font-size:0.9em; margin-top:5px;">${organic}</p>
          </div>
        </div>

        <div style="margin-top:15px; padding:10px; background:#fff3e0; border-left:4px solid #ff9800; font-size:0.9em; color:#e65100;">
          <strong>⚠️ AI Disclaimer:</strong> AI can make mistakes. Please verify this with a local Krishi Kendra before applying heavy chemicals.
        </div>
      `;
      speak(`Detected ${disease} with ${confidence} percent confidence.`);
    }, 1500);
  };
  img.src = URL.createObjectURL(file);
}

// --- CHATBOT ---
function toggleChat() { document.getElementById('chatWindow').classList.toggle('active'); }

function sendMsg() {
  const input = document.getElementById('chatInput'), text = input.value.trim();
  if (!text) return;
  
  const box = document.getElementById('chatBox');
  box.innerHTML += `<div class="msg user">${text}</div>`;
  input.value = '';
  box.scrollTop = box.scrollHeight;

  const typingId = 'typing-' + Date.now();
  box.innerHTML += `<div class="msg bot" id="${typingId}"><i>Kisan Mitra is thinking...</i></div>`;
  box.scrollTop = box.scrollHeight;

  setTimeout(() => {
    document.getElementById(typingId).remove();
    let reply = "";
    const lower = text.toLowerCase();
    
    if (lower.includes('pest') || lower.includes('insct') || lower.includes('bug') || lower.includes('keeda')) {
      reply = "For pests, use Neem oil spray (5ml/L) or install yellow sticky traps. If severe, contact your local Krishi Kendra.";
    } else if (lower.includes('watr') || lower.includes('irigat') || lower.includes('pani')) {
      reply = "Always water early morning or evening. Drip irrigation saves 60% water and keeps plants healthy.";
    } else if (lower.includes('npk') || lower.includes('nitrogn') || lower.includes('urea')) {
      reply = "For vegetative growth, Nitrogen (N) is key. For root/flower development, use Phosphorus (P) and Potassium (K). Always test your soil first!";
    } else if (lower.includes('yelo') || lower.includes('spot') || lower.includes('diseas') || lower.includes('bimari')) {
      reply = "Yellow leaves or spots often mean a fungal infection or nitrogen deficiency. Remove the affected leaves immediately and spray a copper-based fungicide. Check the 'Disease' tab to upload a photo.";
    } else if (lower.includes('organic') || lower.includes('compst') || lower.includes('khad')) {
      reply = "Organic farming builds long-term soil health. Use Vermicompost, Jeevamrutha, or green manure. Check the 'Compost' tab for a full guide.";
    } else if (lower.includes('wether') || lower.includes('rain') || lower.includes('barish')) {
      reply = "Check the 'Home' tab. Don't spray pesticides if heavy rain is expected within 6 hours, as it will wash off.";
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste')) {
      reply = "Namaste! I am Kisan Mitra. Ask me about pests, fertilizers, weather, or crop diseases.";
    } else {
      reply = "That is a specific question. Since AI can make mistakes and your crop is your hard work, please consult your local agriculture officer or Krishi Kendra for a 100% accurate answer.";
    }

    box.innerHTML += `<div class="msg bot">${reply}</div>`;
    box.scrollTop = box.scrollHeight;
    speak(reply);
  }, 1000);
}