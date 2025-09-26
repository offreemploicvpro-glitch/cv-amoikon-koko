import { useState, useEffect } from 'react';
import { User, Briefcase, GraduationCap, Star, Trophy, Phone, Mail, MapPin, Share2, CreditCard as Edit, Save, ChevronRight, Award, Target, Facebook, Linkedin, Lock, X } from 'lucide-react';
import PDFGenerator from './components/PDFGenerator';

interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  status: string;
}

interface Education {
  year: string;
  degree: string;
  institution: string;
}

interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
  tasks: string[];
}

interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
}

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState('');
  
  const CORRECT_ACCESS_CODE = 'LEA2025';

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Amoikon Koko Léa Josiane",
    title: "Superviseur Logistique",
    summary: "Professionnelle expérimentée dans la gestion logistique, la collecte de données et l'assistance humanitaire. Plus de 10 ans d'expérience dans divers secteurs incluant les enquêtes terrain, la gestion de points de services financiers et l'assistance humanitaire."
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "+225 0141144332",
    whatsapp: "+225 0708014404", 
    email: "Kamoikon777@Yahoo.com",
    location: "Côte d'Ivoire",
    status: ""
  });

  const [education] = useState<Education[]>([
    {
      year: "2008-2009",
      degree: "DEUG 2 - Faculté des Lettres Modernes",
      institution: "Université Félix Houphouët-Boigny, Cocody"
    },
    {
      year: "2007-2008", 
      degree: "DEUG 1 - Faculté des Lettres Modernes",
      institution: "Université Félix Houphouët-Boigny, Cocody"
    },
    {
      year: "2006",
      degree: "Baccalauréat D",
      institution: "Lycée Moderne Abengourou"
    }
  ]);

  const [experiences] = useState<Experience[]>([
    {
      period: "Avril 2025",
      title: "Agent Focus Groupe",
      company: "Étude sur les normes de genre",
      description: "Étude basée sur les normes de genre dans la nutrition et le développement de la petite enfance en CI",
      tasks: [
        "Animation de focus groupes",
        "Collecte de données qualitatives",
        "Participation à la formation",
        "Appui à la connexion des questionnaires sur ODK"
      ]
    },
    {
      period: "Février 2025",
      title: "Agent de Collecte",
      company: "Ferké - Projet VITAMINE A",
      description: "Évaluation de la couverture et du coût-efficacité de la supplémentation en VITAMINE A en Côte d'Ivoire",
      tasks: [
        "Participation à la formation",
        "Appui à la connexion des questionnaires sur ODK",
        "Participation à la collecte de données"
      ]
    },
    {
      period: "Décembre 2024",
      title: "Agent de Collecte",
      company: "Districts de Gagnoa",
      description: "Réalisation d'une enquête finale dans les localités de BOBIA et d'OTHEDA",
      tasks: [
        "Enquêtes terrain",
        "Participation à la formation",
        "Appui à la connexion des questionnaires sur ODK",
        "Participation à la collecte de données",
        "Supervision du plan logistique sur l'enquête"
      ]
    },
    {
      period: "Mars - Juillet 2024",
      title: "Agent de Collecte",
      company: "Région de Marahoué",
      description: "Évaluation de l'impact économique du paludisme sur les populations vulnérables en Côte d'Ivoire",
      tasks: [
        "Collecte de données terrain",
        "Participation à la formation",
        "Appui à la connexion des questionnaires sur ODK",
        "Participation à la collecte de données",
        "Participation à la collecte du rapport journalier de marché"
      ]
    },
    {
      period: "Juin 2024",
      title: "Agent de Collecte de Données",
      company: "Projet ECLIC - Région du Gontou",
      description: "Enquête de référence sur le travail des enfants du projet Eliminating Child Labour in Cocoa",
      tasks: [
        "Participation à la formation",
        "Appui à la connexion des questionnaires sur ODK",
        "Participation à la collecte de données",
        "Participation à la collecte du rapport journalier des ventes"
      ]
    },
    {
      period: "2021",
      title: "Agent Aide Humanitaire",
      company: "DREAM",
      description: "Assistance humanitaire et soutien aux populations vulnérables",
      tasks: [
        "Coordination des activités humanitaires",
        "Appui logistique aux opérations",
        "Suivi des bénéficiaires"
      ]
    },
    {
      period: "2019 - 2020",
      title: "Gérante de Point Orange Money",
      company: "Services Financiers Mobiles",
      description: "Gestion complète d'un point de service Orange Money",
      tasks: [
        "Gestion quotidienne des transactions",
        "Service client",
        "Tenue de caisse et comptabilité",
        "Formation et supervision d'agents"
      ]
    },
    {
      period: "2015-2016",
      title: "Agent Responsable Canal+",
      company: "Canal+",
      description: "Promotion vente, conseillère client et publicité de nouvelles offres",
      tasks: [
        "Participation à la formation des agents commerciaux",
        "Appui à la synthèse des ventes",
        "Participation à la supervision des agents",
        "Participation à la collecte journalier des ventes",
        "Élaboration du plan logistique des agents de vente",
        "Publication des offres"
      ]
    }
  ]);

  const skills = [
    "Gestion Logistique",
    "Collecte de Données",
    "Enquêtes Terrain", 
    "Formation d'Équipes",
    "Gestion de Projets",
    "Service Client",
    "Outils ODK",
    "Supervision d'Équipe"
  ];

  const strengths = [
    { name: "Respectueuse", icon: Star },
    { name: "Travailleuse", icon: Target },
    { name: "Leadership", icon: Trophy },
    { name: "Capacité à travailler seul et en équipe", icon: Award }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'experience', 'formation', 'competences', 'atouts', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = `CV - ${personalInfo.name} | ${personalInfo.title}`;
    const description = personalInfo.summary;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\nVoir le CV complet: ${url}`)}`);
        break;
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setShowAccessModal(true);
    }
  };

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === CORRECT_ACCESS_CODE) {
      setIsEditing(true);
      setShowAccessModal(false);
      setAccessCode('');
      setAccessError('');
    } else {
      setAccessError('Code d\'accès incorrect. Veuillez réessayer.');
      setAccessCode('');
    }
  };

  const closeAccessModal = () => {
    setShowAccessModal(false);
    setAccessCode('');
    setAccessError('');
  };

  const navigationItems = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'experience', label: 'Expérience', icon: Briefcase },
    { id: 'formation', label: 'Formation', icon: GraduationCap },
    { id: 'competences', label: 'Compétences', icon: Star },
    { id: 'atouts', label: 'Atouts', icon: Trophy },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-blue-200">
                <img 
                  src="/images/Gemini_Generated_Image_dj3qtidj3qtidj3q.png" 
                  alt="Amoikon Koko Léa Josiane"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-sm md:text-xl font-bold text-gray-900 leading-tight">{personalInfo.name}</h1>
                <p className="text-xs md:text-sm text-blue-600 font-medium">{personalInfo.title}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeSection === id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <PDFGenerator
                personalInfo={personalInfo}
                contactInfo={contactInfo}
                experiences={experiences}
                education={education}
                skills={skills}
              />
              <button
                onClick={handleEditClick}
                className="px-2 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1 md:space-x-2 shadow-lg"
              >
                {isEditing ? <Save size={16} /> : <Edit size={16} />}
                <span className="text-xs md:text-sm hidden sm:inline">{isEditing ? 'Sauvegarder' : 'Modifier'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Access Code Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
            <button
              onClick={closeAccessModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-200 mx-auto mb-4">
                <img 
                  src="/images/Gemini_Generated_Image_dj3qtidj3qtidj3q.png" 
                  alt="Amoikon Koko Léa Josiane"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Accès Sécurisé</h3>
              <p className="text-gray-600">Veuillez entrer le code d'accès pour modifier le CV</p>
            </div>

            <form onSubmit={handleAccessSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                      setAccessError('');
                    }}
                    placeholder="Code d'accès"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    autoFocus
                  />
                </div>
                {accessError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{accessError}</span>
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={closeAccessModal}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Lock size={16} />
                  <span>Accéder</span>
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 text-center">
                <span className="font-medium">🔒 Sécurisé</span><br />
                Seule Léa Josiane peut modifier ce CV
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 shadow-lg">
        <div className="grid grid-cols-6 gap-1 py-2 px-2">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                activeSection === id 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon size={18} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-20 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          
          {/* Profile Section */}
          <section id="profile" className="animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 px-4 md:px-8 py-8 md:py-12 text-white">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                    <img 
                      src="/images/Gemini_Generated_Image_dj3qtidj3qtidj3q.png" 
                      alt="Amoikon Koko Léa Josiane"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    {isEditing ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={personalInfo.name}
                          onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                          className="w-full text-3xl font-bold bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg px-4 py-2"
                        />
                        <input
                          type="text"
                          value={personalInfo.title}
                          onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                          className="w-full text-xl bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg px-4 py-2"
                        />
                        <textarea
                          value={personalInfo.summary}
                          onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                          rows={4}
                          className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg px-4 py-2 resize-none"
                        />
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">{personalInfo.name}</h1>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-light mb-4 text-blue-100">{personalInfo.title}</h2>
                        <p className="text-sm md:text-lg text-blue-100 max-w-2xl leading-relaxed">{personalInfo.summary}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
              <div className="flex items-center space-x-3 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="text-white" size={24} />
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900">Expérience Professionnelle</h2>
              </div>
              <div className="space-y-6 md:space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative border-l-4 border-green-500 pl-4 md:pl-8 pb-6 md:pb-8 last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-0">{exp.title}</h3>
                        <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium self-start">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-blue-600 font-semibold mb-2 text-sm md:text-base">{exp.company}</p>
                      <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">{exp.description}</p>
                      <div className="space-y-2">
                        {exp.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-start space-x-2">
                            <ChevronRight size={16} className="text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 text-xs md:text-sm leading-relaxed">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Formation Section */}
          <section id="formation" className="animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
              <div className="flex items-center space-x-3 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900">Formation</h2>
              </div>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight">{edu.degree}</h3>
                        <p className="text-gray-700 text-sm md:text-base">{edu.institution}</p>
                      </div>
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mt-3 md:mt-0 self-start">
                        {edu.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Competences Section */}
          <section id="competences" className="animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
              <div className="flex items-center space-x-3 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                  <Star className="text-white" size={24} />
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900">Compétences</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-3 md:p-4 text-center hover:shadow-lg transition-shadow">
                    <span className="text-gray-800 font-medium text-sm md:text-base">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Atouts Section */}
          <section id="atouts" className="animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
              <div className="flex items-center space-x-3 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Trophy className="text-white" size={24} />
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900">Atouts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {strengths.map((strength, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <strength.icon className="text-purple-600" size={24} />
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">{strength.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
              <div className="flex items-center space-x-3 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Phone className="text-white" size={24} />
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900">Contact</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <input
                          type="text"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                        <input
                          type="text"
                          value={contactInfo.whatsapp}
                          onChange={(e) => setContactInfo({...contactInfo, whatsapp: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                        <input
                          type="text"
                          value={contactInfo.location}
                          onChange={(e) => setContactInfo({...contactInfo, location: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Phone className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm md:text-base">Téléphone</p>
                          <p className="text-gray-600 text-sm md:text-base">{contactInfo.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Phone className="text-green-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm md:text-base">WhatsApp</p>
                          <p className="text-gray-600 text-sm md:text-base">{contactInfo.whatsapp}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <Mail className="text-orange-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm md:text-base">Email</p>
                          <p className="text-gray-600 text-sm md:text-base break-all">{contactInfo.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <MapPin className="text-purple-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm md:text-base">Localisation</p>
                          <p className="text-gray-600 text-sm md:text-base">{contactInfo.location}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Informations Personnelles</h3>
                  <p className="text-gray-600 text-sm">
                    Téléchargez ce CV au format PDF pour vos candidatures professionnelles.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Styles */}
      <style>{`        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
