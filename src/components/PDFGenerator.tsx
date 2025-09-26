import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, FileText } from 'lucide-react';

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
      pdfElement.style.width = '210mm'; // A4 width
      pdfElement.style.backgroundColor = 'white';
      pdfElement.style.fontFamily = 'Arial, sans-serif';
      
      // Contenu HTML optimisé pour PDF
      pdfElement.innerHTML = `
        <div style="padding: 20px; max-width: 210mm; margin: 0 auto; background: white;">
          <!-- En-tête avec photo et informations principales -->
          <div style="display: flex; align-items: center; margin-bottom: 25px; padding: 20px; background: linear-gradient(135deg, #2563eb, #059669); border-radius: 12px; color: white;">
            <div style="width: 100px; height: 100px; border-radius: 50%; overflow: hidden; border: 3px solid white; margin-right: 25px; flex-shrink: 0;">
              <img src="/images/Gemini_Generated_Image_dj3qtidj3qtidj3q.png" 
                   style="width: 100%; height: 100%; object-fit: cover;" 
                   alt="Photo de profil" />
            </div>
            <div style="flex: 1;">
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: bold; line-height: 1.2;">${personalInfo.name}</h1>
              <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 300; opacity: 0.9;">${personalInfo.title}</h2>
              <p style="margin: 0; font-size: 14px; line-height: 1.4; opacity: 0.9;">${personalInfo.summary}</p>
            </div>
          </div>

          <!-- Informations de contact -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; padding: 15px; background: #f8fafc; border-radius: 8px;">
            <div style="display: flex; align-items: center;">
              <span style="color: #2563eb; font-weight: bold; margin-right: 8px;">📞</span>
              <span style="font-size: 13px;">${contactInfo.phone}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #059669; font-weight: bold; margin-right: 8px;">📱</span>
              <span style="font-size: 13px;">${contactInfo.whatsapp}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #ea580c; font-weight: bold; margin-right: 8px;">✉️</span>
              <span style="font-size: 13px;">${contactInfo.email}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #7c3aed; font-weight: bold; margin-right: 8px;">📍</span>
              <span style="font-size: 13px;">${contactInfo.location}</span>
            </div>
          </div>

          <!-- Expérience Professionnelle -->
          <div style="margin-bottom: 25px;">
            <h3 style="color: #2563eb; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; padding-bottom: 5px; border-bottom: 2px solid #2563eb;">
              💼 EXPÉRIENCE PROFESSIONNELLE
            </h3>
            ${experiences.slice(0, 6).map(exp => `
              <div style="margin-bottom: 15px; padding: 12px; border-left: 3px solid #059669; background: #f0fdf4;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <h4 style="margin: 0; font-size: 14px; font-weight: bold; color: #1f2937;">${exp.title}</h4>
                  <span style="background: #fbbf24; color: #92400e; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">
                    ${exp.period}
                  </span>
                </div>
                <p style="margin: 0 0 6px 0; color: #2563eb; font-weight: 600; font-size: 13px;">${exp.company}</p>
                <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 12px; line-height: 1.4;">${exp.description}</p>
                <ul style="margin: 0; padding-left: 15px; color: #4b5563; font-size: 11px; line-height: 1.3;">
                  ${exp.tasks.slice(0, 3).map(task => `<li style="margin-bottom: 2px;">${task}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <!-- Formation et Compétences côte à côte -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <!-- Formation -->
            <div>
              <h3 style="color: #059669; font-size: 16px; font-weight: bold; margin: 0 0 12px 0; padding-bottom: 5px; border-bottom: 2px solid #059669;">
                🎓 FORMATION
              </h3>
              ${education.map(edu => `
                <div style="margin-bottom: 12px; padding: 10px; background: #f0fdf4; border-radius: 6px;">
                  <div style="display: flex; justify-content: between; align-items: flex-start; margin-bottom: 4px;">
                    <h4 style="margin: 0; font-size: 12px; font-weight: bold; color: #1f2937; line-height: 1.3;">${edu.degree}</h4>
                  </div>
                  <p style="margin: 0 0 4px 0; color: #4b5563; font-size: 11px;">${edu.institution}</p>
                  <span style="background: #10b981; color: white; padding: 1px 6px; border-radius: 8px; font-size: 10px; font-weight: 500;">
                    ${edu.year}
                  </span>
                </div>
              `).join('')}
            </div>

            <!-- Compétences -->
            <div>
              <h3 style="color: #ea580c; font-size: 16px; font-weight: bold; margin: 0 0 12px 0; padding-bottom: 5px; border-bottom: 2px solid #ea580c;">
                ⭐ COMPÉTENCES
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                ${skills.map(skill => `
                  <div style="background: #fff7ed; color: #9a3412; padding: 6px 8px; border-radius: 6px; text-align: center; font-size: 11px; font-weight: 500;">
                    ${skill}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Atouts -->
          <div style="margin-bottom: 20px;">
            <h3 style="color: #7c3aed; font-size: 16px; font-weight: bold; margin: 0 0 12px 0; padding-bottom: 5px; border-bottom: 2px solid #7c3aed;">
              🏆 ATOUTS PROFESSIONNELS
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div style="background: #faf5ff; color: #6b21a8; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px; font-weight: 500;">
                ✨ Respectueuse
              </div>
              <div style="background: #faf5ff; color: #6b21a8; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px; font-weight: 500;">
                💪 Travailleuse
              </div>
              <div style="background: #faf5ff; color: #6b21a8; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px; font-weight: 500;">
                👑 Leadership
              </div>
              <div style="background: #faf5ff; color: #6b21a8; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px; font-weight: 500;">
                🤝 Esprit d'équipe
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding: 15px; background: #f8fafc; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #6b7280; font-size: 11px;">
              CV généré le ${new Date().toLocaleDateString('fr-FR')} • ${personalInfo.name} • ${personalInfo.title}
            </p>
          </div>
        </div>
      `;

      document.body.appendChild(pdfElement);

      // Attendre que les images se chargent
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Générer le canvas
      const canvas = await html2canvas(pdfElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
      });

      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      // Calculer les dimensions pour s'adapter à A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Si l'image est plus haute qu'une page A4, on la redimensionne
      if (imgHeight > pdfHeight) {
        const ratio = pdfHeight / imgHeight;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, pdfHeight);
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

      // Télécharger le PDF
      const fileName = `CV_${personalInfo.name.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);

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