"""
Predefined legal scenario data in three languages.
Each scenario follows the structure:
  title, rights, what_to_do, what_not_to_do, actions
"""

# ---------------------------------------------------------------------------
# English (en)
# ---------------------------------------------------------------------------
SITUATIONS_EN = {
    "traffic_police": {
        "scenario_id": "traffic_police",
        "title": "Stopped by Traffic Police",
        "rights": [
            "You have the right to know the reason for being stopped.",
            "You cannot be detained without cause for more than a reasonable time.",
            "You have the right to see the officer's identity and badge number.",
            "You have the right to remain silent and not incriminate yourself.",
            "You cannot be fined on the spot without an official receipt.",
            "You can request a court hearing instead of paying on-the-spot fine.",
        ],
        "what_to_do": [
            "Stay calm and be polite with the officer.",
            "Keep your driving licence, RC book, insurance, and PUC certificate ready.",
            "Ask for the officer's name and badge number politely.",
            "If fined, insist on an official receipt or challan.",
            "Note the time, location, officer's badge number, and vehicle number of the police vehicle.",
            "If you suspect illegal demand, you can complain to the State Traffic Police helpline.",
        ],
        "what_not_to_do": [
            "Do not argue aggressively or use abusive language.",
            "Do not bribe the officer — it is a criminal offence.",
            "Do not sign any blank documents.",
            "Do not leave the scene without getting an official receipt if a fine is levied.",
            "Do not allow the officer to confiscate your original licence without proper procedure.",
        ],
        "actions": [
            "Call 100 (Police Helpline) if you feel threatened.",
            "File a complaint at the local police station or district SP office.",
            "Contact State Vigilance & Anti-Corruption Bureau if bribery is demanded.",
            "You may approach the Motor Accident Claims Tribunal for wrongful detainment.",
            "Send an RTI application to get details of the challan issued.",
        ],
    },

    "salary_not_paid": {
        "scenario_id": "salary_not_paid",
        "title": "Employer Not Paying Salary",
        "rights": [
            "Under the Payment of Wages Act 1936, wages must be paid by the 7th/10th of every month.",
            "Withholding salary without valid reason is illegal.",
            "You are entitled to full salary plus interest/compensation for delayed payment.",
            "Deductions from salary must be authorised under law.",
            "You cannot be terminated for demanding your lawful salary.",
            "Contract workers and domestic workers also have wage rights under respective state acts.",
        ],
        "what_to_do": [
            "Send a written demand notice to your employer by registered post.",
            "Keep payslips, bank statements, offer letter, and attendance records as evidence.",
            "File a complaint with the Labour Commissioner of your district.",
            "Register a complaint on the Shram Suvidha portal (shramsuvidha.gov.in).",
            "File a case before the Labour Court under the Industrial Disputes Act.",
            "Consult a labour lawyer for legal notice and court proceedings.",
        ],
        "what_not_to_do": [
            "Do not resign immediately — it may weaken your legal claim.",
            "Do not accept partial payment without written acknowledgement of the remaining dues.",
            "Do not destroy or delete any employment-related messages or emails.",
            "Do not sign any settlement without reading all terms carefully.",
        ],
        "actions": [
            "Dial 1800-11-6090 (Labour Ministry helpline) for guidance.",
            "File complaint at district Labour Commissioner office.",
            "Lodge complaint on Shram Suvidha portal online.",
            "Approach Labour Court or Industrial Tribunal.",
            "File a police FIR under IPC Section 406 (criminal breach of trust) as a last resort.",
        ],
    },

    "cyber_fraud": {
        "scenario_id": "cyber_fraud",
        "title": "Victim of Cyber Fraud / Online Scam",
        "rights": [
            "You have the right to file an FIR under the IT Act 2000 and IPC.",
            "Banks are liable to refund money in unauthorised transactions if reported within 3 days.",
            "You can freeze the fraudster's account by contacting cybercrime helpline.",
            "You have the right to full investigation by the Cyber Cell.",
            "You cannot be held liable for fraudulent transactions done without your consent.",
        ],
        "what_to_do": [
            "Immediately call the National Cyber Crime Helpline: 1930.",
            "File a complaint at cybercrime.gov.in within 24 hours.",
            "Inform your bank immediately and request a transaction freeze/reversal.",
            "Take screenshots of all fraudulent messages, emails, and transactions.",
            "Preserve call records, OTPs received, and any communication with the fraudster.",
            "File an FIR at the nearest police station or online cybercrime portal.",
        ],
        "what_not_to_do": [
            "Do not share OTP, CVV, or banking credentials with anyone — including callers claiming to be bank officials.",
            "Do not click any suspicious links received via SMS or email.",
            "Do not transfer money again 'to reverse the fraud' — it is another scam.",
            "Do not delay reporting — the sooner you report, the higher the chance of recovery.",
            "Do not delete fraud-related messages or call logs.",
        ],
        "actions": [
            "Call 1930 (National Cyber Crime Helpline) immediately.",
            "Report at cybercrime.gov.in.",
            "Inform your bank's fraud department within 3 working days.",
            "File an FIR at your local police station mentioning IT Act Section 66C / 66D.",
            "Contact RBI Banking Ombudsman if bank refuses to reverse unauthorised transaction.",
        ],
    },

    "landlord_issue": {
        "scenario_id": "landlord_issue",
        "title": "Problem with Landlord / Tenancy Dispute",
        "rights": [
            "Landlord cannot evict you without proper legal notice and court order.",
            "You have the right to essential services (water, electricity) even during a dispute.",
            "Rent increase is governed by the Rent Control Act of your state.",
            "Security deposit refund is your legal right after vacating.",
            "Landlord cannot enter the rented premises without prior notice.",
            "You can register the rent agreement for legal protection.",
        ],
        "what_to_do": [
            "Keep a copy of your registered rent agreement at all times.",
            "Pay rent via bank transfer or cheque — always keep payment records.",
            "Send a legal notice through a lawyer if the landlord is harassing you.",
            "Approach the Rent Control Court / Civil Court for eviction disputes.",
            "File a complaint with the local police if the landlord threatens you or illegally enters.",
            "Report unlawful eviction to the District Collector or Tehsildar.",
        ],
        "what_not_to_do": [
            "Do not vacate without written notice to the landlord.",
            "Do not accept verbal agreements — get everything in writing.",
            "Do not stop paying rent as a protest — it may affect your legal standing.",
            "Do not allow lock-changing by landlord without due process.",
        ],
        "actions": [
            "Approach Rent Control Court for rent-related disputes.",
            "File a police complaint (Section 503 IPC) if threatened with eviction.",
            "Contact District Legal Services Authority (DLSA) for free legal aid.",
            "File RTI to check property ownership if landlord's title is disputed.",
            "Approach Consumer Forum if charged illegal maintenance fees.",
        ],
    },

    "consumer_complaint": {
        "scenario_id": "consumer_complaint",
        "title": "Consumer Complaint — Defective Product / Service",
        "rights": [
            "You have the right to safety against hazardous goods and services.",
            "You have the right to be informed about quality, quantity, and price of products.",
            "You have the right to choose freely from a range of products.",
            "You have the right to be heard and seek redressal against unfair trade practices.",
            "You can claim refund, replacement, or compensation under the Consumer Protection Act 2019.",
            "E-commerce companies are equally liable for defective products.",
        ],
        "what_to_do": [
            "Preserve the product, packaging, bill, and warranty card as evidence.",
            "Write a formal complaint to the company's customer care first.",
            "File a complaint on the National Consumer Helpline: 1800-11-4000.",
            "Register a complaint on consumerhelpline.gov.in or the NCH app.",
            "Approach District Consumer Disputes Redressal Commission (DCDRC) for claims up to ₹1 Crore.",
            "File case in State or National Commission for higher value claims.",
        ],
        "what_not_to_do": [
            "Do not dispose of the defective product before filing a complaint.",
            "Do not accept verbal assurances from company — get everything in writing.",
            "Do not sign any waiver or settlement form without reading all terms.",
            "Do not miss the limitation period — complaints must be filed within 2 years of the cause.",
        ],
        "actions": [
            "Call 1800-11-4000 (National Consumer Helpline).",
            "File complaint at consumerhelpline.gov.in.",
            "Approach District Consumer Commission (DCDRC) in your city.",
            "File complaint on e-Daakhil portal (edaakhil.nic.in) for online case filing.",
            "Seek compensation including mental harassment and litigation costs.",
        ],
    },
}

# ---------------------------------------------------------------------------
# Hindi (hi) — translations
# ---------------------------------------------------------------------------
SITUATIONS_HI = {
    "traffic_police": {
        "scenario_id": "traffic_police",
        "title": "ट्रैफिक पुलिस द्वारा रोका गया",
        "rights": [
            "आपको रोकने का कारण जानने का अधिकार है।",
            "बिना कारण के आपको उचित समय से अधिक नहीं रोका जा सकता।",
            "अधिकारी की पहचान और बैज नंबर देखने का आपको अधिकार है।",
            "आपको चुप रहने और खुद के खिलाफ बयान न देने का अधिकार है।",
            "बिना आधिकारिक रसीद के मौके पर जुर्माना नहीं लिया जा सकता।",
            "आप मौके पर जुर्माना भरने की बजाय कोर्ट सुनवाई का अनुरोध कर सकते हैं।",
        ],
        "what_to_do": [
            "शांत रहें और अधिकारी से विनम्र व्यवहार करें।",
            "अपना ड्राइविंग लाइसेंस, RC बुक, बीमा और PUC प्रमाण पत्र तैयार रखें।",
            "अधिकारी का नाम और बैज नंबर विनम्रता से पूछें।",
            "जुर्माने पर आधिकारिक रसीद या चालान अवश्य लें।",
            "समय, स्थान और अधिकारी का बैज नंबर नोट करें।",
            "अवैध मांग की आशंका होने पर राज्य ट्रैफिक पुलिस हेल्पलाइन पर शिकायत करें।",
        ],
        "what_not_to_do": [
            "आक्रामकता से बहस न करें और अपशब्द न कहें।",
            "रिश्वत न दें — यह आपराधिक अपराध है।",
            "किसी भी खाली दस्तावेज़ पर हस्ताक्षर न करें।",
            "जुर्माना लगने पर रसीद लिए बिना न जाएं।",
            "अधिकारी को बिना उचित प्रक्रिया के मूल लाइसेंस जब्त न करने दें।",
        ],
        "actions": [
            "खतरा महसूस होने पर 100 (पुलिस हेल्पलाइन) पर कॉल करें।",
            "स्थानीय पुलिस स्टेशन या जिला SP कार्यालय में शिकायत दर्ज करें।",
            "रिश्वत की मांग पर राज्य सतर्कता और भ्रष्टाचार निरोधक ब्यूरो से संपर्क करें।",
            "गलत तरीके से हिरासत में लिए जाने पर मोटर दुर्घटना दावा न्यायाधिकरण से संपर्क करें।",
            "चालान विवरण के लिए RTI आवेदन दें।",
        ],
    },

    "salary_not_paid": {
        "scenario_id": "salary_not_paid",
        "title": "नियोक्ता द्वारा वेतन न देना",
        "rights": [
            "मजदूरी भुगतान अधिनियम 1936 के तहत हर महीने 7वीं/10वीं तारीख तक वेतन मिलना चाहिए।",
            "बिना वैध कारण वेतन रोकना अवैध है।",
            "आप पूरे वेतन के साथ देरी के लिए ब्याज/मुआवज़ा पाने के हकदार हैं।",
            "वेतन से कटौती कानूनी रूप से अधिकृत होनी चाहिए।",
            "कानूनी वेतन मांगने पर आपको नौकरी से नहीं निकाला जा सकता।",
        ],
        "what_to_do": [
            "नियोक्ता को रजिस्टर्ड पोस्ट द्वारा लिखित मांग नोटिस भेजें।",
            "पे-स्लिप, बैंक स्टेटमेंट, ऑफर लेटर और उपस्थिति रिकॉर्ड साक्ष्य के रूप में रखें।",
            "जिले के श्रम आयुक्त के पास शिकायत दर्ज करें।",
            "श्रम सुविधा पोर्टल (shramsuvidha.gov.in) पर शिकायत दर्ज करें।",
            "औद्योगिक विवाद अधिनियम के तहत श्रम न्यायालय में मामला दायर करें।",
        ],
        "what_not_to_do": [
            "तुरंत इस्तीफा न दें — इससे आपका कानूनी दावा कमजोर हो सकता है।",
            "बकाया राशि की लिखित स्वीकृति के बिना आंशिक भुगतान स्वीकार न करें।",
            "नौकरी से संबंधित कोई भी संदेश या ईमेल न हटाएं।",
            "सभी शर्तें ध्यान से पढ़े बिना किसी समझौते पर हस्ताक्षर न करें।",
        ],
        "actions": [
            "मार्गदर्शन के लिए 1800-11-6090 (श्रम मंत्रालय हेल्पलाइन) पर कॉल करें।",
            "जिला श्रम आयुक्त कार्यालय में शिकायत दर्ज करें।",
            "श्रम सुविधा पोर्टल पर ऑनलाइन शिकायत करें।",
            "श्रम न्यायालय या औद्योगिक अधिकरण में जाएं।",
            "अंतिम उपाय के रूप में IPC धारा 406 के तहत पुलिस FIR दर्ज कराएं।",
        ],
    },

    "cyber_fraud": {
        "scenario_id": "cyber_fraud",
        "title": "साइबर धोखाधड़ी / ऑनलाइन स्कैम का शिकार",
        "rights": [
            "आपको IT अधिनियम 2000 और IPC के तहत FIR दर्ज कराने का अधिकार है।",
            "3 दिनों के भीतर रिपोर्ट करने पर बैंक अनधिकृत लेनदेन वापस करने के लिए उत्तरदायी हैं।",
            "साइबर क्राइम हेल्पलाइन से संपर्क करके धोखेबाज का खाता फ्रीज करवाया जा सकता है।",
            "आपको साइबर सेल द्वारा पूरी जांच का अधिकार है।",
        ],
        "what_to_do": [
            "तुरंत राष्ट्रीय साइबर क्राइम हेल्पलाइन 1930 पर कॉल करें।",
            "24 घंटे के भीतर cybercrime.gov.in पर शिकायत दर्ज करें।",
            "तुरंत अपने बैंक को सूचित करें और लेनदेन फ्रीज/रिवर्सल का अनुरोध करें।",
            "सभी धोखाधड़ी संदेशों, ईमेल और लेनदेन के स्क्रीनशॉट लें।",
            "कॉल रिकॉर्ड, OTP और धोखेबाज से संचार सुरक्षित रखें।",
        ],
        "what_not_to_do": [
            "किसी के साथ भी OTP, CVV या बैंकिंग जानकारी साझा न करें।",
            "SMS या ईमेल से प्राप्त संदिग्ध लिंक पर क्लिक न करें।",
            "'धोखाधड़ी वापस करने के लिए' दोबारा पैसे ट्रांसफर न करें — यह एक और स्कैम है।",
            "रिपोर्ट करने में देरी न करें।",
            "धोखाधड़ी से संबंधित संदेश या कॉल लॉग न हटाएं।",
        ],
        "actions": [
            "तुरंत 1930 (राष्ट्रीय साइबर क्राइम हेल्पलाइन) पर कॉल करें।",
            "cybercrime.gov.in पर रिपोर्ट करें।",
            "3 कार्य दिवसों के भीतर अपने बैंक के धोखाधड़ी विभाग को सूचित करें।",
            "IT अधिनियम की धारा 66C/66D का उल्लेख करते हुए स्थानीय पुलिस स्टेशन में FIR दर्ज करें।",
            "बैंक अनधिकृत लेनदेन वापस करने से इनकार करे तो RBI बैंकिंग लोकपाल से संपर्क करें।",
        ],
    },

    "landlord_issue": {
        "scenario_id": "landlord_issue",
        "title": "मकान मालिक से विवाद / किरायेदारी समस्या",
        "rights": [
            "मकान मालिक बिना कानूनी नोटिस और कोर्ट आदेश के आपको बेदखल नहीं कर सकता।",
            "विवाद के दौरान भी आपको आवश्यक सेवाओं (पानी, बिजली) का अधिकार है।",
            "किराया वृद्धि राज्य के किराया नियंत्रण अधिनियम द्वारा नियंत्रित होती है।",
            "खाली करने के बाद सुरक्षा जमा वापस पाना आपका कानूनी अधिकार है।",
            "मकान मालिक बिना पूर्व सूचना के किराए की संपत्ति में प्रवेश नहीं कर सकता।",
        ],
        "what_to_do": [
            "अपने पंजीकृत किराया समझौते की प्रति हमेशा अपने पास रखें।",
            "बैंक ट्रांसफर या चेक से किराया दें — भुगतान रिकॉर्ड रखें।",
            "मकान मालिक उत्पीड़न करे तो वकील के माध्यम से कानूनी नोटिस भेजें।",
            "बेदखली विवाद के लिए किराया नियंत्रण न्यायालय / सिविल कोर्ट से संपर्क करें।",
            "मकान मालिक धमकी दे या अवैध रूप से प्रवेश करे तो स्थानीय पुलिस में शिकायत करें।",
        ],
        "what_not_to_do": [
            "मकान मालिक को लिखित नोटिस दिए बिना खाली न करें।",
            "मौखिक समझौते स्वीकार न करें — सब कुछ लिखित में लें।",
            "विरोध के रूप में किराया देना बंद न करें।",
            "मकान मालिक को उचित प्रक्रिया के बिना ताला बदलने न दें।",
        ],
        "actions": [
            "किराया संबंधित विवादों के लिए किराया नियंत्रण न्यायालय में जाएं।",
            "धमकी मिलने पर पुलिस शिकायत दर्ज करें (IPC धारा 503)।",
            "मुफ्त कानूनी सहायता के लिए जिला कानूनी सेवा प्राधिकरण (DLSA) से संपर्क करें।",
            "मकान मालिक का शीर्षक विवादित हो तो संपत्ति स्वामित्व जानने के लिए RTI दायर करें।",
        ],
    },

    "consumer_complaint": {
        "scenario_id": "consumer_complaint",
        "title": "उपभोक्ता शिकायत — दोषपूर्ण उत्पाद / सेवा",
        "rights": [
            "आपको खतरनाक वस्तुओं और सेवाओं से सुरक्षा का अधिकार है।",
            "आपको उत्पादों की गुणवत्ता, मात्रा और मूल्य के बारे में जानकारी का अधिकार है।",
            "आपको उत्पादों की श्रृंखला से स्वतंत्र रूप से चुनने का अधिकार है।",
            "आपको अनुचित व्यापार प्रथाओं के खिलाफ सुनवाई और निवारण का अधिकार है।",
            "उपभोक्ता संरक्षण अधिनियम 2019 के तहत आप धनवापसी, प्रतिस्थापन या मुआवज़ा मांग सकते हैं।",
        ],
        "what_to_do": [
            "उत्पाद, पैकेजिंग, बिल और वारंटी कार्ड को सबूत के रूप में सुरक्षित रखें।",
            "पहले कंपनी के ग्राहक सेवा केंद्र को लिखित शिकायत करें।",
            "राष्ट्रीय उपभोक्ता हेल्पलाइन 1800-11-4000 पर शिकायत दर्ज करें।",
            "consumerhelpline.gov.in या NCH ऐप पर शिकायत दर्ज करें।",
            "₹1 करोड़ तक के दावों के लिए जिला उपभोक्ता विवाद निवारण आयोग (DCDRC) से संपर्क करें।",
        ],
        "what_not_to_do": [
            "शिकायत दर्ज करने से पहले दोषपूर्ण उत्पाद को नष्ट न करें।",
            "कंपनी की मौखिक आश्वासनें स्वीकार न करें — सब कुछ लिखित में लें।",
            "सभी शर्तें पढ़े बिना कोई छूट या समझौता फॉर्म पर हस्ताक्षर न करें।",
            "सीमा अवधि न चूकें — कारण के 2 वर्षों के भीतर शिकायत दर्ज करें।",
        ],
        "actions": [
            "1800-11-4000 (राष्ट्रीय उपभोक्ता हेल्पलाइन) पर कॉल करें।",
            "consumerhelpline.gov.in पर शिकायत दर्ज करें।",
            "अपने शहर के जिला उपभोक्ता आयोग (DCDRC) से संपर्क करें।",
            "ऑनलाइन केस दाखिल करने के लिए e-Daakhil पोर्टल (edaakhil.nic.in) पर शिकायत करें।",
            "मानसिक उत्पीड़न और मुकदमेबाजी लागत सहित मुआवज़ा मांगें।",
        ],
    },
}

# ---------------------------------------------------------------------------
# Marathi (mr) — translations
# ---------------------------------------------------------------------------
SITUATIONS_MR = {
    "traffic_police": {
        "scenario_id": "traffic_police",
        "title": "वाहतूक पोलिसांनी थांबवले",
        "rights": [
            "तुम्हाला थांबवण्याचे कारण जाणण्याचा तुम्हाला अधिकार आहे।",
            "योग्य कारणाशिवाय तुम्हाला जास्त वेळ रोखता येत नाही।",
            "अधिकाऱ्याची ओळख आणि बॅज नंबर पाहण्याचा तुम्हाला अधिकार आहे।",
            "तुम्हाला शांत राहण्याचा आणि स्वतःविरुद्ध साक्ष न देण्याचा अधिकार आहे।",
            "अधिकृत पावतीशिवाय जागेवर दंड आकारता येत नाही।",
        ],
        "what_to_do": [
            "शांत राहा आणि अधिकाऱ्याशी विनम्र वागा।",
            "ड्रायव्हिंग लायसन्स, RC बुक, विमा आणि PUC प्रमाणपत्र तयार ठेवा।",
            "अधिकाऱ्याचे नाव आणि बॅज नंबर विनम्रपणे विचारा।",
            "दंड आकारल्यास अधिकृत पावती किंवा चलान घ्या।",
            "वेळ, ठिकाण आणि अधिकाऱ्याचा बॅज नंबर नोंदवा।",
        ],
        "what_not_to_do": [
            "आक्रमकपणे वाद घालू नका आणि शिवीगाळ करू नका।",
            "लाच देऊ नका — हा फौजदारी गुन्हा आहे।",
            "कोणत्याही रिक्त कागदपत्रावर सही करू नका।",
            "दंड आकारल्यावर पावती न घेता जाऊ नका।",
        ],
        "actions": [
            "धोका वाटल्यास 100 (पोलिस हेल्पलाइन) वर कॉल करा।",
            "स्थानिक पोलिस स्टेशन किंवा जिल्हा SP कार्यालयात तक्रार नोंदवा।",
            "लाचेची मागणी असल्यास राज्य दक्षता आणि भ्रष्टाचार विरोधी ब्यूरोशी संपर्क करा।",
        ],
    },

    "salary_not_paid": {
        "scenario_id": "salary_not_paid",
        "title": "नियोक्त्याने पगार न दिल्यास",
        "rights": [
            "मजुरी देयक कायदा 1936 अंतर्गत प्रत्येक महिन्याच्या 7/10 तारखेपर्यंत पगार मिळणे आवश्यक आहे।",
            "वैध कारणाशिवाय पगार रोखणे बेकायदेशीर आहे।",
            "विलंबित देयकासाठी तुम्ही संपूर्ण पगार आणि व्याज/भरपाई मिळण्यास पात्र आहात।",
        ],
        "what_to_do": [
            "नियोक्त्याला नोंदणीकृत पोस्टाने लिखित मागणी नोटीस पाठवा।",
            "पे-स्लिप, बँक स्टेटमेंट आणि ऑफर लेटर पुरावा म्हणून ठेवा।",
            "जिल्ह्याच्या कामगार आयुक्तांकडे तक्रार दाखल करा।",
            "श्रम सुविधा पोर्टलवर (shramsuvidha.gov.in) तक्रार नोंदवा।",
        ],
        "what_not_to_do": [
            "लगेच राजीनामा देऊ नका — त्यामुळे तुमचा कायदेशीर दावा कमकुवत होऊ शकतो।",
            "उर्वरित देय रकमेची लेखी पावती न घेता आंशिक देयक स्वीकारू नका।",
        ],
        "actions": [
            "मार्गदर्शनासाठी 1800-11-6090 (कामगार मंत्रालय हेल्पलाइन) वर कॉल करा।",
            "जिल्हा कामगार आयुक्त कार्यालयात तक्रार दाखल करा।",
            "कामगार न्यायालय किंवा औद्योगिक न्यायाधिकरणाकडे जा।",
        ],
    },

    "cyber_fraud": {
        "scenario_id": "cyber_fraud",
        "title": "सायबर फसवणूक / ऑनलाइन घोटाळ्याचा बळी",
        "rights": [
            "IT कायदा 2000 आणि IPC अंतर्गत FIR दाखल करण्याचा तुम्हाला अधिकार आहे।",
            "3 दिवसांत नोंदवल्यास बँका अनधिकृत व्यवहार परत करण्यास जबाबदार आहेत।",
        ],
        "what_to_do": [
            "तात्काळ राष्ट्रीय सायबर क्राइम हेल्पलाइन 1930 वर कॉल करा।",
            "24 तासांत cybercrime.gov.in वर तक्रार दाखल करा।",
            "बँकेला तात्काळ कळवा आणि व्यवहार फ्रीज/रिव्हर्सलची विनंती करा।",
            "सर्व फसव्या संदेश, ईमेल आणि व्यवहारांचे स्क्रीनशॉट घ्या।",
        ],
        "what_not_to_do": [
            "OTP, CVV किंवा बँकिंग माहिती कोणाशीही शेअर करू नका।",
            "संशयास्पद लिंकवर क्लिक करू नका।",
            "तक्रार नोंदवण्यास विलंब करू नका।",
        ],
        "actions": [
            "तात्काळ 1930 वर कॉल करा।",
            "cybercrime.gov.in वर तक्रार नोंदवा।",
            "3 कामकाजाच्या दिवसांत बँकेच्या फसवणूक विभागाला कळवा।",
        ],
    },

    "landlord_issue": {
        "scenario_id": "landlord_issue",
        "title": "मालकाशी वाद / भाडेकरू समस्या",
        "rights": [
            "मालक कायदेशीर नोटीस आणि न्यायालयाच्या आदेशाशिवाय तुम्हाला बेदखल करू शकत नाही।",
            "वादाच्या वेळीही तुम्हाला अत्यावश्यक सेवांचा (पाणी, वीज) अधिकार आहे।",
            "सुरक्षा ठेव परत मिळणे हा तुमचा कायदेशीर अधिकार आहे।",
        ],
        "what_to_do": [
            "नोंदणीकृत भाडे करारनाम्याची प्रत नेहमी जवळ ठेवा।",
            "बँक ट्रान्सफर किंवा चेकने भाडे द्या — देयक नोंदी ठेवा।",
            "मालक त्रास देत असल्यास वकिलामार्फत कायदेशीर नोटीस पाठवा।",
        ],
        "what_not_to_do": [
            "मालकाला लेखी नोटीस न देता रिकामे करू नका।",
            "तोंडी करार स्वीकारू नका — सर्वकाही लेखी घ्या।",
        ],
        "actions": [
            "भाडे संबंधित वादांसाठी भाडे नियंत्रण न्यायालयाकडे जा।",
            "धमकी मिळाल्यास पोलिस तक्रार दाखल करा (IPC कलम 503)।",
            "विनामूल्य कायदेशीर मदतीसाठी जिल्हा कायदेशीर सेवा प्राधिकरण (DLSA) शी संपर्क करा।",
        ],
    },

    "consumer_complaint": {
        "scenario_id": "consumer_complaint",
        "title": "ग्राहक तक्रार — सदोष उत्पादन / सेवा",
        "rights": [
            "धोकादायक वस्तू आणि सेवांपासून संरक्षणाचा तुम्हाला अधिकार आहे।",
            "ग्राहक संरक्षण कायदा 2019 अंतर्गत परतावा, बदली किंवा भरपाई मागण्याचा अधिकार आहे।",
        ],
        "what_to_do": [
            "उत्पादन, पॅकेजिंग, बिल आणि वॉरंटी कार्ड पुरावा म्हणून ठेवा।",
            "प्रथम कंपनीच्या ग्राहक सेवा केंद्राकडे लेखी तक्रार करा।",
            "राष्ट्रीय ग्राहक हेल्पलाइन 1800-11-4000 वर तक्रार नोंदवा।",
            "consumerhelpline.gov.in वर तक्रार दाखल करा।",
        ],
        "what_not_to_do": [
            "तक्रार दाखल करण्यापूर्वी सदोष उत्पादन नष्ट करू नका।",
            "सर्व अटी न वाचता कोणत्याही समझोता फॉर्मवर सही करू नका।",
        ],
        "actions": [
            "1800-11-4000 (राष्ट्रीय ग्राहक हेल्पलाइन) वर कॉल करा।",
            "consumerhelpline.gov.in वर तक्रार नोंदवा।",
            "जिल्हा ग्राहक आयोगाकडे (DCDRC) जा।",
        ],
    },
}

# Master map: lang → scenarios dict
SITUATIONS_BY_LANG = {
    "en": SITUATIONS_EN,
    "hi": SITUATIONS_HI,
    "mr": SITUATIONS_MR,
}

ALL_SCENARIO_IDS = list(SITUATIONS_EN.keys())
