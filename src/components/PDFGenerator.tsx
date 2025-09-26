import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';

interface PDFGeneratorProps {
  personalInfo: {
    name: string;
    title: string;
    summary: string;
  };
  contactInfo: {
    phone: string;
    whatsapp: string;
    email: string;
    location: string;
  };
  experiences: Array<{
    period: string;
    title: string;
    company: string;
    description: string;
    tasks: string[];
  }>;
  education: Array<{
    year: string;
    degree: string;
    institution: string;
  }>;
  skills: string[];
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  personalInfo,
  contactInfo,
  experiences,
  education,
  skills
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Créer un élément temporaire pour le PDF
      const pdfElement = document.createElement('div');
      pdfElement.id = 'pdf-content';
      pdfElement.style.position = 'absolute';
      pdfElement.style.left = '-9999px';
      pdfElement.style.width = '210mm';
      pdfElement.style.minHeight = '297mm';
      pdfElement.style.backgroundColor = 'white';
      pdfElement.style.fontFamily = 'Arial, sans-serif';
      pdfElement.style.fontSize = '12px';
      pdfElement.style.lineHeight = '1.4';
      pdfElement.style.color = '#333';
      
      // Contenu HTML optimisé pour PDF - Style du modèle fourni
      pdfElement.innerHTML = `
        <div style="width: 210mm; min-height: 297mm; margin: 0; padding: 0; background: white; font-family: Arial, sans-serif;">
          
          <!-- PAGE 1 -->
          <div style="width: 100%; min-height: 297mm; padding: 0; margin: 0; page-break-after: always;">
            
            <!-- En-tête bleu avec photo et infos principales -->
            <div style="background: #4472C4; color: white; padding: 25px 30px; margin: 0; display: flex; align-items: center;">
              <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid white; margin-right: 30px; flex-shrink: 0;">
                <img src="/images/Gemini_Generated_Image_dj3qtidj3qtidj3q.png" 
                     style="width: 100%; height: 100%; object-fit: cover;" 
                     alt="Photo de profil" />
              </div>
              <div style="flex: 1;">
                <h1 style="margin: 0 0 8px 0; font-size: 32px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${personalInfo.name}</h1>
                <h2 style="margin: 0 0 15px 0; font-size: 18px; font-weight: normal; opacity: 0.9;">${personalInfo.title}</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 14px;">
                  <span>• ${contactInfo.email}</span>
                  <span>• ${contactInfo.phone}</span>
                  <span>• ${contactInfo.location}</span>
                </div>
              </div>
            </div>

            <!-- Contenu principal en 2 colonnes -->
            <div style="display: flex; padding: 0; margin: 0; min-height: calc(297mm - 180px);">
              
              <!-- Colonne gauche - À Propos et Compétences -->
              <div style="width: 35%; background: #f8f9fa; padding: 25px 20px; border-right: 1px solid #e0e0e0;">
                
                <!-- À Propos -->
                <div style="margin-bottom: 30px;">
                  <h3 style="color: #4472C4; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #4472C4; padding-bottom: 5px;">À Propos</h3>
                  <p style="margin: 0; font-size: 11px; line-height: 1.5; text-align: justify; color: #333;">${personalInfo.summary}</p>
                </div>

                <!-- Compétences Techniques -->
                <div style="margin-bottom: 30px;">
                  <h3 style="color: #4472C4; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #4472C4; padding-bottom: 5px;">Compétences Techniques</h3>
                  
                  <div style="margin-bottom: 20px;">
                    <h4 style="color: #333; font-size: 12px; font-weight: bold; margin: 0 0 8px 0;">Gestion Logistique & Données</h4>
                    ${skills.slice(0, 4).map(skill => `
                      <div style="margin-bottom: 3px;">
                        <span style="color: #4472C4; margin-right: 5px;">▸</span>
                        <span style="font-size: 10px; color: #333;">${skill}</span>
                      </div>
                    `).join('')}
                  </div>

                  <div style="margin-bottom: 20px;">
                    <h4 style="color: #333; font-size: 12px; font-weight: bold; margin: 0 0 8px 0;">Outils & Systèmes</h4>
                    ${skills.slice(4).map(skill => `
                      <div style="margin-bottom: 3px;">
                        <span style="color: #4472C4; margin-right: 5px;">▸</span>
                        <span style="font-size: 10px; color: #333;">${skill}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Compétences Comportementales -->
                <div style="margin-bottom: 30px;">
                  <h3 style="color: #4472C4; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #4472C4; padding-bottom: 5px;">Compétences Comportementales</h3>
                  
                  <div style="margin-bottom: 3px;">
                    <span style="color: #4472C4; margin-right: 5px;">▸</span>
                    <span style="font-size: 10px; color: #333;">Communication et Leadership</span>
                  </div>
                  <div style="margin-bottom: 3px;">
                    <span style="color: #4472C4; margin-right: 5px;">▸</span>
                    <span style="font-size: 10px; color: #333;">Capacités rédactionnelles</span>
                  </div>
                  <div style="margin-bottom: 3px;">
                    <span style="color: #4472C4; margin-right: 5px;">▸</span>
                    <span style="font-size: 10px; color: #333;">Capacité d'analyse et esprit analytique</span>
                  </div>
                  <div style="margin-bottom: 3px;">
                    <span style="color: #4472C4; margin-right: 5px;">▸</span>
                    <span style="font-size: 10px; color: #333;">Esprit et travail en équipe</span>
                  </div>
                  <div style="margin-bottom: 3px;">
                    <span style="color: #4472C4; margin-right: 5px;">▸</span>
                    <span style="font-size: 10px; color: #333;">Curiosité intellectuelle</span>
                  </div>
                </div>

                <!-- Langues -->
                <div>
                  <h3 style="color: #4472C4; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #4472C4; padding-bottom: 5px;">Langues</h3>
                  <div style="margin-bottom: 8px;">
                    <span style="font-size: 11px; font-weight: bold; color: #333;">Français</span>
                    <span style="float: right; font-size: 10px; color: #666;">Natif</span>
                  </div>
                  <div>
                    <span style="font-size: 11px; font-weight: bold; color: #333;">Anglais</span>
                    <span style="float: right; font-size: 10px; color: #666;">Lu/Écrit</span>
                  </div>
                </div>
              </div>

              <!-- Colonne droite - Expérience -->
              <div style="width: 65%; padding: 25px 20px;">
                
                <!-- Expérience Professionnelle -->
                <div style="margin-bottom: 30px;">
                  <h3 style="color: #4472C4; font-size: 18px; font-weight: bold; margin: 0 0 20px 0; text-transform: uppercase; text-align: center; border-bottom: 2px solid #4472C4; padding-bottom: 8px;">Expérience Professionnelle</h3>
                  
                  ${experiences.slice(0, 4).map((exp, index) => `
                    <div style="margin-bottom: 25px; ${index === 0 ? 'border: 1px solid #e0e0e0; padding: 15px; border-radius: 8px; background: #f8f9fa;' : ''}">
                      <div style="margin-bottom: 12px;">
                        <h4 style="color: #4472C4; font-size: 14px; font-weight: bold; margin: 0 0 4px 0;">${exp.title}</h4>
                        <p style="color: #666; font-style: italic; font-size: 11px; margin: 0 0 4px 0;">${exp.company} | ${exp.period}</p>
                      </div>
                      
                      ${index === 0 ? `
                        <p style="margin: 0 0 10px 0; font-size: 11px; line-height: 1.4; color: #333;">${exp.description}</p>
                        <div style="margin-bottom: 8px;">
                          <p style="color: #333; font-size: 11px; font-weight: bold; margin: 0 0 5px 0;">Contrôle qualité des données et rapprochements :</p>
                          ${exp.tasks.slice(0, 4).map(task => `
                            <div style="margin-bottom: 2px; font-size: 10px; line-height: 1.3;">
                              <span style="color: #4472C4; margin-right: 5px;">•</span>
                              <span style="color: #333;">${task}</span>
                            </div>
                          `).join('')}
                        </div>
                        
                        <div style="background: #e8f4fd; padding: 8px; border-radius: 5px; margin-top: 10px;">
                          <p style="color: #4472C4; font-size: 10px; font-weight: bold; margin: 0 0 5px 0;">🏆 Réalisations clés</p>
                          <div style="font-size: 9px; line-height: 1.3; color: #333;">
                            <div style="margin-bottom: 2px;">• Formation de 15+ agents sur les nouveaux outils et processus</div>
                            <div style="margin-bottom: 2px;">• Déploiement de 25+ bornes automatiques</div>
                            <div>• Automatisation du traitement des fichiers (gain de 50% sur les délais)</div>
                          </div>
                        </div>
                      ` : `
                        <div style="font-size: 10px; line-height: 1.3;">
                          ${exp.tasks.slice(0, 3).map(task => `
                            <div style="margin-bottom: 2px;">
                              <span style="color: #4472C4; margin-right: 5px;">•</span>
                              <span style="color: #333;">${task}</span>
                            </div>
                          `).join('')}
                        </div>
                      `}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- PAGE 2 -->
          <div style="width: 100%; min-height: 297mm; padding: 30px; margin: 0; page-break-before: always;">
            
            <!-- Suite Expérience -->
            <div style="margin-bottom: 35px;">
              <h3 style="color: #4472C4; font-size: 18px; font-weight: bold; margin: 0 0 20px 0; text-transform: uppercase; text-align: center; border-bottom: 2px solid #4472C4; padding-bottom: 8px;">Expérience Professionnelle (Suite)</h3>
              
              ${experiences.slice(4).map(exp => `
                <div style="margin-bottom: 20px;">
                  <div style="margin-bottom: 8px;">
                    <h4 style="color: #4472C4; font-size: 13px; font-weight: bold; margin: 0 0 4px 0;">${exp.title}</h4>
                    <p style="color: #666; font-style: italic; font-size: 11px; margin: 0 0 4px 0;">${exp.company} | ${exp.period}</p>
                  </div>
                  <div style="font-size: 10px; line-height: 1.3;">
                    ${exp.tasks.slice(0, 3).map(task => `
                      <div style="margin-bottom: 2px;">
                        <span style="color: #4472C4; margin-right: 5px;">•</span>
                        <span style="color: #333;">${task}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Formation -->
            <div style="margin-bottom: 35px;">
              <h3 style="color: #4472C4; font-size: 18px; font-weight: bold; margin: 0 0 20px 0; text-transform: uppercase; text-align: center; border-bottom: 2px solid #4472C4; padding-bottom: 8px;">Formation</h3>
              
              ${education.map(edu => `
                <div style="margin-bottom: 15px;">
                  <h4 style="color: #4472C4; font-size: 13px; font-weight: bold; margin: 0 0 4px 0;">${edu.degree}</h4>
                  <p style="color: #666; font-size: 11px; margin: 0 0 2px 0;">${edu.institution} | ${edu.year}</p>
                  <p style="color: #333; font-size: 10px; margin: 0; line-height: 1.3;">Spécialisation en gestion logistique, collecte de données et systèmes d'information</p>
                </div>
              `).join('')}
            </div>

            <!-- Atouts clés -->
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #4472C4; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; text-align: center;">🏆 Atouts clés</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div style="font-size: 11px; color: #333;">• Respectueuse et professionnelle</div>
                <div style="font-size: 11px; color: #333;">• Leadership naturel</div>
                <div style="font-size: 11px; color: #333;">• Travailleuse et rigoureuse</div>
                <div style="font-size: 11px; color: #333;">• Esprit d'équipe développé</div>
              </div>
            </div>

            <!-- Centres d'intérêt -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #4472C4; font-size: 16px; font-weight: bold; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #4472C4; padding-bottom: 5px;">Centres d'Intérêt</h3>
              <div style="display: flex; gap: 20px;">
                <div style="font-size: 11px; color: #333;">
                  <span style="color: #4472C4; margin-right: 5px;">▸</span>
                  Veille technologique et innovation
                </div>
                <div style="font-size: 11px; color: #333;">
                  <span style="color: #4472C4; margin-right: 5px;">▸</span>
                  Formation continue
                </div>
                <div style="font-size: 11px; color: #333;">
                  <span style="color: #4472C4; margin-right: 5px;">▸</span>
                  Développement personnel
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 15px; border-top: 1px solid #e0e0e0; margin-top: 30px;">
              <p style="margin: 0; color: #666; font-size: 10px;">
                CV généré le ${new Date().toLocaleDateString('fr-FR')} • ${personalInfo.name} • ${personalInfo.title}
              </p>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(pdfElement);

      // Attendre que les images se chargent
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Générer le canvas avec une meilleure résolution
      const canvas = await html2canvas(pdfElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels
        height: 1123, // A4 height in pixels
        logging: false,
      });

      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Calculer les dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Si l'image est plus haute que 2 pages A4, on la divise
      if (imgHeight > pdfHeight * 2) {
        // Page 1
        const firstPageHeight = pdfHeight;
        const firstPageCanvas = document.createElement('canvas');
        const firstPageCtx = firstPageCanvas.getContext('2d');
        firstPageCanvas.width = canvas.width;
        firstPageCanvas.height = (canvas.height / 2);
        
        const img = new Image();
        img.onload = () => {
          firstPageCtx?.drawImage(img, 0, 0, canvas.width, canvas.height / 2, 0, 0, canvas.width, canvas.height / 2);
          const firstPageData = firstPageCanvas.toDataURL('image/png', 1.0);
          pdf.addImage(firstPageData, 'PNG', 0, 0, pdfWidth, firstPageHeight);
          
          // Page 2
          pdf.addPage();
          const secondPageCanvas = document.createElement('canvas');
          const secondPageCtx = secondPageCanvas.getContext('2d');
          secondPageCanvas.width = canvas.width;
          secondPageCanvas.height = (canvas.height / 2);
          
          secondPageCtx?.drawImage(img, 0, canvas.height / 2, canvas.width, canvas.height / 2, 0, 0, canvas.width, canvas.height / 2);
          const secondPageData = secondPageCanvas.toDataURL('image/png', 1.0);
          pdf.addImage(secondPageData, 'PNG', 0, 0, pdfWidth, firstPageHeight);
          
          // Télécharger
          const fileName = `CV_${personalInfo.name.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
          pdf.save(fileName);
        };
        img.src = imgData;
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pdfHeight * 2));
        const fileName = `CV_${personalInfo.name.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
        pdf.save(fileName);
      }

      // Nettoyer
      document.body.removeChild(pdfElement);
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1 md:space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <span className="text-xs md:text-sm hidden sm:inline">Génération...</span>
        </>
      ) : (
        <>
          <Download size={16} />
          <span className="text-xs md:text-sm hidden sm:inline">PDF</span>
        </>
      )}
    </button>
  );
};

export default PDFGenerator;