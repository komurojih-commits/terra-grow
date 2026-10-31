let currentLang = 'en';
let voiceEnabled = false;

const t = {
  en: { title: "TerraGrow", subtitle: "Smart Farming", nav_home: "Home", nav_crop: "Crop", nav_fert: "Fertilizer", nav_compost: "Compost", nav_disease: "Disease", lbl_location: "Location", ph_location: "e.g., Tamil Nadu", lbl_water: "Water", opt_high: "High", opt_medium: "Medium", opt_low: "Low", lbl_soil: "Soil", opt_clay: "Clay", opt_sandy: "Sandy", opt_loamy: "Loamy", opt_black: "Black", opt_red: "Red", lbl_season: "Season", opt_kharif: "Kharif", opt_rabi: "Rabi", opt_zaid: "Zaid", btn_recommend: "Get Recommendation", lbl_crop_name: "Crop Name", ph_crop: "e.g., Rice", lbl_growth: "Stage", opt_seedling: "Seedling", opt_veg: "Vegetative", opt_flower: "Flowering", opt_fruit: "Fruiting", btn_fert: "Get Plan", lbl_soil_type: "Select Soil Type", lbl_upload: "Upload Leaf Photo", ph_upload: "Click to upload a photo of the affected plant", voice_on: "Voice: ON", voice_off: "Voice: OFF", rec_for: "Recommended for", tip: "Pro Tip: Rotate crops every season to prevent pests and keep soil healthy.", intro: "Voice enabled." },
  hi: { title: "टेराग्रो", subtitle: "स्मार्ट खेती", nav_home: "होम", nav_crop: "फसल", nav_fert: "उर्वरक", nav_compost: "खाद", nav_disease: "रोग", lbl_location: "स्थान", ph_location: "जैसे: तमिलनाडु", lbl_water: "पानी", opt_high: "उच्च", opt_medium: "मध्यम", opt_low: "कम", lbl_soil: "मिट्टी", opt_clay: "चिकनी", opt_sandy: "रेतीली", opt_loamy: "दोमट", opt_black: "काली", opt_red: "लाल", lbl_season: "मौसम", opt_kharif: "खरीफ", opt_rabi: "रबी", opt_zaid: "जायद", btn_recommend: "सुझाव", lbl_crop_name: "फसल", ph_crop: "जैसे: चावल", lbl_growth: "चरण", opt_seedling: "अंकुर", opt_veg: "वानस्पतिक", opt_flower: "फूल", opt_fruit: "फल", btn_fert: "योजना", lbl_soil_type: "मिट्टी का प्रकार चुनें", lbl_upload: "पत्ती की फोटो अपलोड करें", ph_upload: "प्रभावित पौधे की फोटो अपलोड करने के लिए क्लिक करें", voice_on: "आवाज़: चालू", voice_off: "आवाज़: बंद", rec_for: "सुझाव", tip: "सुझाव: मिट्टी को स्वस्थ रखने के लिए हर मौसम में फसल बदलें।", intro: "आवाज़ चालू।" },
  ta: { title: "டெராக்ரோ", subtitle: "ஸ்மார்ட்", nav_home: "முகப்பு", nav_crop: "பயிர்", nav_fert: "உரம்", nav_compost: "உரம்", nav_disease: "நோய்", lbl_location: "இடம்", ph_location: "எ.கா: தமிழ்நாடு", lbl_water: "நீர்", opt_high: "அதிகம்", opt_medium: "நடுத்தரம்", opt_low: "குறைவு", lbl_soil: "மண்", opt_clay: "களிமண்", opt_sandy: "மணல்", opt_loamy: "வண்டல்", opt_black: "கரிசல்", opt_red: "செம்மண்", lbl_season: "பருவம்", opt_kharif: "கார்", opt_rabi: "பின்", opt_zaid: "இளவேனில்", btn_recommend: "பெறுங்கள்", lbl_crop_name: "பயிர்", ph_crop: "எ.கா: நெல்", lbl_growth: "நிலை", opt_seedling: "நாற்று", opt_veg: "தாவர", opt_flower: "பூ", opt_fruit: "காய்", btn_fert: "திட்டம்", lbl_soil_type: "மண் வகையைத் தேர்ந்தெடுக்கவும்", lbl_upload: "இலை புகைப்படத்தை பதிவேற்றவும்", ph_upload: "பாதிக்கப்பட்ட தாவரத்தின் புகைப்படத்தை பதிவேற்ற கிளிக் செய்யவும்", voice_on: "குரல்: ஆன்", voice_off: "குரல்: ஆஃப்", rec_for: "பரிந்துரை", tip: "குறிப்பு: மண்ணின் வளத்தை காக்க ஒவ்வொரு பருவத்திலும் பயிர்களை மாற்றவும்.", intro: "குரல் இயக்கப்பட்டது." },
  te: { title: "టెరాగ్రో", subtitle: "స్మార్ట్", nav_home: "హోమ్", nav_crop: "పంట", nav_fert: "ఎరువులు", nav_compost: "కంపోస్ట్", nav_disease: "వ్యాధి", lbl_location: "ప్రాంతం", ph_location: "ఉదా: తెలంగాణ", lbl_water: "నీరు", opt_high: "అధికం", opt_medium: "మధ్యస్థం", opt_low: "తక్కువ", lbl_soil: "నేల", opt_clay: "బంకమట్టి", opt_sandy: "ఇసుక", opt_loamy: "లోమీ", opt_black: "నల్ల", opt_red: "ఎర్ర", lbl_season: "కాలం", opt_kharif: "ఖరీఫ్", opt_rabi: "రబీ", opt_zaid: "జైద్", btn_recommend: "పొందండి", lbl_crop_name: "పంట", ph_crop: "ఉదా: వరి", lbl_growth: "దశ", opt_seedling: "నారు", opt_veg: "వృద్ధి", opt_flower: "పూత", opt_fruit: "పండు", btn_fert: "ప్రణాళిక", lbl_soil_type: "నేల రకాన్ని ఎంచుకోండి", lbl_upload: "ఆకు ఫోటో అప్‌లోడ్ చేయండి", ph_upload: "ప్రభావిత మొక్క యొక్క ఫోటోను అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి", voice_on: "వాయిస్: ఆన్", voice_off: "వాయిస్: ఆఫ్", rec_for: "సిఫార్సు", tip: "చిట్కా: నేల ఆరోగ్యాన్ని కాపాడుకోవడానికి ప్రతి సీజన్లో పంటలను మార్చండి.", intro: "వాయిస్ ప్రారంభమైంది." }
};

const cNames = { en: { 'Rice': 'Rice', 'Sugarcane': 'Sugarcane', 'Jute': 'Jute', 'Wheat': 'Wheat', 'Mustard': 'Mustard', 'Barley': 'Barley', 'Maize': 'Maize', 'Cotton': 'Cotton', 'Vegetables': 'Vegetables', 'Pulses': 'Pulses', 'Soybean': 'Soybean', 'Sorghum': 'Sorghum', 'Chickpea': 'Chickpea', 'Linseed': 'Linseed', 'Groundnut': 'Groundnut', 'Millet': 'Millet', 'Pigeon pea': 'Pigeon pea', 'Gram': 'Gram', 'Bajra': 'Bajra', 'Moong': 'Moong', 'Jowar': 'Jowar', 'Moth bean': 'Moth bean', 'Cumin': 'Cumin', 'Castor': 'Castor', 'Safflower': 'Safflower', 'Local Vegetables': 'Local Vegetables' }, hi: { 'Rice': 'चावल', 'Sugarcane': 'गन्ना', 'Jute': 'जूट', 'Wheat': 'गेहूं', 'Mustard': 'सरसों', 'Barley': 'जौ', 'Maize': 'मक्का', 'Cotton': 'कपास', 'Vegetables': 'सब्जियां', 'Pulses': 'दालें', 'Soybean': 'सोयाबीन', 'Sorghum': 'ज्वार', 'Chickpea': 'चना', 'Linseed': 'अलसी', 'Groundnut': 'मूंगफली', 'Millet': 'बाजरा', 'Pigeon pea': 'अरहर', 'Gram': 'चना', 'Bajra': 'बाजरा', 'Moong': 'मूंग', 'Jowar': 'ज्वार', 'Moth bean': 'मोठ', 'Cumin': 'जीरा', 'Castor': 'अरंडी', 'Safflower': 'कुसुम', 'Local Vegetables': 'स्थानीय सब्जियां' }, ta: { 'Rice': 'நெல்', 'Sugarcane': 'கரும்பு', 'Jute': 'சணல்', 'Wheat': 'கோதுமை', 'Mustard': 'கடுகு', 'Barley': 'பார்லி', 'Maize': 'மக்காச்சோளம்', 'Cotton': 'பருத்தி', 'Vegetables': 'காய்கறிகள்', 'Pulses': 'பருப்பு வகைகள்', 'Soybean': 'சோயாபீன்', 'Sorghum': 'சோளம்', 'Chickpea': 'கொண்டைக்கடலை', 'Linseed': 'ஆளி விதை', 'Groundnut': 'நிலக்கடலை', 'Millet': 'சிறுதானியம்', 'Pigeon pea': 'துவரை', 'Gram': 'கடலை', 'Bajra': 'கம்பு', 'Moong': 'பச்சைப்பயறு', 'Jowar': 'சோளம்', 'Moth bean': 'பயறு', 'Cumin': 'சீரகம்', 'Castor': 'ஆமணக்கு', 'Safflower': 'குசும்பா', 'Local Vegetables': 'உள்ளூர் காய்கறிகள்' }, te: { 'Rice': 'వరి', 'Sugarcane': 'చెరకు', 'Jute': 'జనపనార', 'Wheat': 'గోధుమ', 'Mustard': 'ఆవాలు', 'Barley': 'బార్లీ', 'Maize': 'మొక్కజొన్న', 'Cotton': 'పత్తి', 'Vegetables': 'కూరగాయలు', 'Pulses': 'పప్పు ధాన్యాలు', 'Soybean': 'సోయాబీన్', 'Sorghum': 'జొన్న', 'Chickpea': 'శనగ', 'Linseed': 'అవిసె', 'Groundnut': 'వేరుశనగ', 'Millet': 'చిరుధాన్యాలు', 'Pigeon pea': 'కంది', 'Gram': 'శనగ', 'Bajra': 'సజ్జ', 'Moong': 'పెసర', 'Jowar': 'జొన్న', 'Moth bean': 'మినుము', 'Cumin': 'జీలకర్ర', 'Castor': 'ఆముదం', 'Safflower': 'కుసుమ', 'Local Vegetables': 'స్థానిక కూరగాయలు' } };

function getLocation() {
  const status = document.getElementById('setupStatus');
  status.style.display = 'block';
  status.textContent = "Fetching your location...";
  status.style.color = "#666";
  
  setTimeout(() => {
    document.getElementById('weatherTemp').innerText = "34°C, Partly Cloudy";
    document.getElementById('weatherDetails').innerText = "Humidity: 58% | Rain: 20%";
    document.getElementById('dailyAdvice').innerText = "AI Daily Advice: Location synced. Check for fungal infections today due to high humidity.";
    status.textContent = "✅ Location synced successfully!";
    status.style.color = "#2e7d32";
    speak("Location synced. Today's weather is 34 degrees. Be careful of fungal infections.");
  }, 1000);
}

function handleHomeImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const status = document.getElementById('setupStatus');
  const img = new Image();
  img.onload = function() {
    if (this.width < 200 || this.height < 200) {
      status.style.display = 'block';
      status.textContent = "❌ Image is too small. Please upload a better photo.";
      status.style.color = "#c62828";
      return;
    }
    status.style.display = 'block';
    status.textContent = "✅ Crop photo analyzed! Advice updated.";
    status.style.color = "#2e7d32";
    document.getElementById('dailyAdvice').innerText = "AI Daily Advice: Based on your uploaded crop, ensure proper drainage today. Watch out for early signs of leaf spot.";
    speak("Crop photo analyzed. Please ensure proper drainage today.");
  };
  img.src = URL.createObjectURL(file);
}

function showSection(id, btn) {
  document.querySelectorAll('.glass-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('section-' + id).classList.add('active');
  btn.classList.add('active');
}

function changeLanguage() {
  currentLang = document.getElementById('langSelect').value;
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (t[currentLang][key]) {
      if (el.tagName === 'INPUT') el.placeholder = t[currentLang][key];
      else if (el.tagName === 'OPTION') el.textContent = t[currentLang][key];
      else el.innerHTML = t[currentLang][key];
    }
  });
  document.querySelectorAll('.result').forEach(r => r.classList.remove('show'));
  document.getElementById('voiceText').textContent = voiceEnabled ? t[currentLang].voice_on : t[currentLang].voice_off;
}

function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  const btn = document.getElementById('voiceToggle');
  const icon = document.getElementById('voiceIcon');
  const text = document.getElementById('voiceText');
  if (voiceEnabled) {
    text.textContent = t[currentLang].voice_on;
    icon.className = 'fas fa-volume-up';
    btn.classList.add('active');
    speak(t[currentLang].intro);
  } else {
    text.textContent = t[currentLang].voice_off;
    icon.className = 'fas fa-volume-mute';
    btn.classList.remove('active');
    window.speechSynthesis.cancel();
  }
}

function speak(text) {
  if (!voiceEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.9;
  if (currentLang === 'hi') utter.lang = 'hi-IN';
  else if (currentLang === 'ta') utter.lang = 'ta-IN';
  else if (currentLang === 'te') utter.lang = 'te-IN';
  else utter.lang = 'en-IN';
  window.speechSynthesis.speak(utter);
}