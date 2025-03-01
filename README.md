# **NLP-Based Medical Report Summarization**

_Automated system to generate technical and simplified medical summaries with multilingual and voice support._  

## 🔹 **Overview**
This project is designed to automatically summarize medical reports using NLP techniques. It generates two types of summaries: 
1. **Technical summary for doctors**
2. **Simplified summary for patients**

Additionally, it features:
✅ **Voice Summarization** for visually impaired users  
✅ **Multilingual Support** (e.g., Hindi translation)  
✅ **AI Chatbot** for user queries  
✅ **Interactive Report Visualization** (charts/graphs)  

## 🔹 **Tech Stack**
- 🟢 Python, NLP (spaCy, NLTK, Transformers)
- 🟢 Google Gemini API for OCR & summarization
- 🟢 React.js (Frontend), Flask/FastAPI (Backend)
- 🟢 Text-to-Speech (TTS), Speech-to-Text (STT)
- 🟢 MongoDB / Firebase (Database)

## 🔹 **Dataset**
- **Medical reports dataset** (Private)
- Custom preprocessed text data for training

## 🔹 **Installation & Setup**
```bash
# Clone the repository
git clone https://github.com/Rishita-rm/NLP-Medical-Report-Summarization.git

# Navigate to the project folder
cd NLP-Medical-Report-Summarization

# Install dependencies
pip install -r requirements.txt

# Run the backend
python app.py

# Navigate to frontend folder
cd frontend
npm install
npm start
```

## 🔹 **Implementation Steps**
1️⃣ OCR for text extraction from medical reports  
2️⃣ NLP-based summarization (BERT, T5, GPT models)  
3️⃣ Dual-layer summarization (technical & simplified)  
4️⃣ Multilingual translation using AI models  
5️⃣ Voice synthesis for accessibility  
6️⃣ Chatbot for interactive Q&A  
7️⃣ Data visualization for medical insights  

## 🔹 **Results & Visualizations**
📌 **Sample Summary Output:**  
✅ _Doctor Summary:_ "Patient diagnosed with mild pneumonia, prescribed antibiotics..."  
✅ _Patient Summary:_ "You have a mild lung infection. Take your medicines and rest..."  

📊 **Graphical Insights:**
- Common diagnoses distribution
- Prescription trends analysis

## 🔹 **How to Use?**
1. Upload a medical report (PDF/Image)
2. AI extracts text & summarizes it
3. Choose technical or simplified summary
4. Listen to the summary via voice output
5. View report insights through interactive charts

## 🔹 **Future Improvements**
✅ Expand language support beyond Hindi  
✅ Improve summarization accuracy with fine-tuned models  
✅ Mobile app integration  

## 🔹 **Contributing**
Want to contribute? Follow these steps:  
1. Fork the repository
2. 
3. Create a new branch (`feature-xyz`)  
4. Commit changes  
5. Push to the branch  
6. Open a Pull Request  
