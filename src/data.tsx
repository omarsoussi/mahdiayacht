export type Language = 'en' | 'it' | 'fr' | 'ar';

export interface Translation {
  nav: {
    services: string;
    projects: string;
    experience: string;
    socials: string;
    gallery: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaContact?: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  projects: {
    title: string;
    subtitle: string;
  };
  gallery: {
    title: string;
    subtitle?: string;
    filters?: {
      all: string;
      images: string;
      videos: string;
    };
  };
  experience: {
    title: string;
    subtitle: string;
    years: string;
    founded?: string;
    foundedLabel?: string;
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
  socials: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    sponsor?: string;
    form: {
      name: string;
      email: string;
      phone: string;
      message: string;
      send: string;
    };
    info: {
      location: string;
      email: string;
      phone: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
  };
  profile: {
    title: string;
    text: string;
  };
  competencies: {
    title: string;
    items: string[];
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      services: 'Services',
      projects: 'Projects',
      gallery: 'Gallery',
      experience: 'Experience',
      socials: 'Socials',
      contact: 'Contact',
    },
    hero: {
      title: 'Mahdia Yacht SRLS',
      subtitle: 'Professional Welding & Carpentry Services for Luxury Yachts',
      cta: 'Discover Our Services',
      ctaContact: 'Contact Us',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Excellence in every detail',
      items: [
        {
          title: 'Professional Welding',
          description: 'Expert welding services for yacht structures, using advanced techniques and premium materials for lasting results.',
        },
        {
          title: 'Yacht Maintenance',
          description: 'Comprehensive maintenance programs tailored to keep your yacht in pristine condition year-round.',
        },
        {
          title: 'Hull Restoration',
          description: 'Complete hull restoration and refinishing services to restore your yacht to its original glory.',
        },
        {
          title: 'Emergency Repairs',
          description: '24/7 emergency repair services to get you back on the water as quickly as possible.',
        },
      ],
    },
    projects: {
      title: 'Our Projects',
      subtitle: 'A showcase of excellence',
    },
    gallery: {
      title: 'Our Work',
      subtitle: '',
      filters: { all: 'All', images: 'Images', videos: 'Videos' },
    },
    experience: {
      title: 'Our Experience',
      subtitle: 'Years of dedication to yacht perfection',
      years: '10 Years',
      founded: 'Founded: 1.5 years ago',
      foundedLabel: 'Founded',
      stats: [
        { number: '10+', label: 'Yachts Serviced' },
        { number: '10', label: 'Years Experience' },
        { number: '100%', label: 'Client Satisfaction' },
      ],
    },
    socials: {
      title: 'Follow Our Journey',
      subtitle: 'See our latest projects on Instagram',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Ready to give your yacht the care it deserves?',
      sponsor: "The project 'Sea... the Lands of Giacomo Puccini' is realised with the support of LuccaPromos and the Chamber of Commerce of Lucca.",
      form: {
        name: 'Your Name',
        email: 'Email Address',
        phone: 'Phone Number',
        message: 'Your Message',
        send: 'Send Message',
      },
      info: {
        location: 'VECCHIANO (PI) VIA DI CAFAGGIO 160/3 CAP 56019',
        email: 'Mahdiayachts25@gmail.com / Mahdiayachtsrls@pec.it',
        phone: '+39 351 303 2745 / +39 351 586 6129',
      },
    },
    footer: {
      tagline: 'Excellence in yacht maintenance and welding',
      rights: 'All rights reserved.',
    },
    profile: {
      title: 'Profile',
      text: 'We have been working in the nautical industry for 10 years and specialize in metalwork, stainless steel and aluminium. We began a dedicated design division 1.5 years ago.',
    },
    competencies: {
      title: 'Competencies',
      items: ['Curiosity', 'Strategy', 'Team working', 'Professionalism', 'Problem solving'],
    },
  },
  it: {
    nav: {
      services: 'Servizi',
      projects: 'Progetti',
      gallery: 'Galleria',
      experience: 'Esperienza',
      socials: 'Social',
      contact: 'Contatto',
    },
    hero: {
      title: 'Mahdia Yacht SRLS',
      subtitle: 'Servizi Professionali di Saldatura e Carpenteria per Yacht di Lusso',
      cta: 'Scopri i Nostri Servizi',
      ctaContact: 'Contattaci',
    },
    services: {
      title: 'I Nostri Servizi',
      subtitle: 'Eccellenza in ogni dettaglio',
      items: [
        {
          title: 'Saldatura Professionale',
          description: "Servizi di saldatura esperti per strutture di yacht, utilizzando tecniche avanzate e materiali premium.",
        },
        {
          title: 'Manutenzione Yacht',
          description: "Programmi di manutenzione completi personalizzati per mantenere il tuo yacht in condizioni perfette tutto l'anno.",
        },
        {
          title: 'Restauro Scafo',
          description: "Servizi completi di restauro e rifinitura dello scafo per riportare il tuo yacht al suo splendore originale.",
        },
        {
          title: 'Riparazioni di Emergenza',
          description: "Servizi di riparazione di emergenza 24/7 per rimetterti in acqua il più rapidamente possibile.",
        },
      ],
    },
    projects: {
      title: 'I Nostri Progetti',
      subtitle: 'Una vetrina di eccellenza',
    },
    gallery: {
      title: 'Il Nostro Lavoro',
      subtitle: '',
      filters: { all: 'Tutti', images: 'Immagini', videos: 'Video' },
    },
    experience: {
      title: 'La Nostra Esperienza',
      subtitle: 'Anni di dedizione alla perfezione dello yacht',
      years: '10 Anni',
      founded: 'Fondata: 1,5 anni fa',
      foundedLabel: 'Fondata',
      stats: [
        { number: '500+', label: 'Yacht Serviti' },
        { number: '10', label: 'Anni di Esperienza' },
        { number: '100%', label: 'Soddisfazione Clienti' },
      ],
    },
    socials: {
      title: 'Segui il Nostro Viaggio',
      subtitle: 'Guarda i nostri ultimi progetti su Instagram',
    },
    contact: {
      title: 'Contattaci',
      subtitle: 'Pronto a dare al tuo yacht la cura che merita?',
      sponsor: "Il progetto Sea... the Lands of Giacomo Puccini è realizzato con il sostegno di LuccaPromos e dalla Camera di Commercio di Lucca.",
      form: {
        name: 'Il Tuo Nome',
        email: 'Indirizzo Email',
        phone: 'Numero di Telefono',
        message: 'Il Tuo Messaggio',
        send: 'Invia Messaggio',
      },
      info: {
        location: 'VECCHIANO (PI) VIA DI CAFAGGIO 160/3 CAP 56019',
        email: 'Mahdiayachts25@gmail.com / Mahdiayachtsrls@pec.it',
        phone: '+39 351 303 2745 / +39 351 586 6129',
      },
    },
    footer: {
      tagline: 'Eccellenza nella manutenzione e saldatura di yacht',
      rights: 'Tutti i diritti riservati.',
    },
    profile: {
      title: 'Profilo',
      text: 'Lavoriamo sulla nautica da dieci anni; siamo specialisti sul metallo, inox e alluminio. Abbiamo avviato una divisione design dedicata 1,5 anni fa.',
    },
    competencies: {
      title: 'Competenze',
      items: ['Curiosità', 'Strategia', 'Team working', 'Professionalità', 'Problem solving'],
    },
  },
  fr: {
    nav: {
      services: 'Services',
      projects: 'Projets',
      gallery: 'Galerie',
      experience: 'Expérience',
      socials: 'Réseaux',
      contact: 'Contact',
    },
    hero: {
      title: 'Mahdia Yacht SRLS',
      subtitle: "Services Professionnels de Soudure et de Charpenterie pour Yachts de Luxe",
      cta: 'Découvrir Nos Services',
      ctaContact: 'Contactez-Nous',
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Excellence dans chaque détail',
      items: [
        {
          title: 'Soudure Professionnelle',
          description: "Services de soudure experts pour structures de yacht, utilisant des techniques avancées et des matériaux premium.",
        },
        {
          title: 'Entretien de Yacht',
          description: "Programmes d'entretien complets adaptés pour maintenir votre yacht en parfait état toute l'année.",
        },
        {
          title: 'Restauration de Coque',
          description: "Services complets de restauration et finition de coque pour restaurer votre yacht à sa gloire d'origine.",
        },
        {
          title: "Réparations d'Urgence",
          description: "Services de réparation d'urgence 24/7 pour vous remettre à l'eau le plus rapidement possible.",
        },
      ],
    },
    projects: {
      title: 'Nos Projets',
      subtitle: "Une vitrine d'excellence",
    },
    gallery: {
      title: 'Nos Réalisations',
      subtitle: '',
      filters: { all: 'Tous', images: 'Images', videos: 'Vidéos' },
    },
    experience: {
      title: 'Notre Expérience',
      subtitle: "Des années de dévouement à la perfection du yacht",
      years: '10 Ans',
      founded: 'Fondée: il y a 1,5 an',
      foundedLabel: 'Fondée',
      stats: [
        { number: '500+', label: 'Yachts Entretenus' },
        { number: '10', label: "Ans d'Expérience" },
        { number: '100%', label: 'Satisfaction Client' },
      ],
    },
    socials: {
      title: 'Suivez Notre Voyage',
      subtitle: "Découvrez nos derniers projets sur Instagram",
    },
    contact: {
      title: 'Contactez-Nous',
      subtitle: "Prêt à donner à votre yacht les soins qu'il mérite?",
      sponsor: "Le projet « Sea... the Lands of Giacomo Puccini » est réalisé avec le soutien de LuccaPromos et de la Chambre de Commerce de Lucques.",
      form: {
        name: 'Votre Nom',
        email: 'Adresse Email',
        phone: 'Numéro de Téléphone',
        message: 'Votre Message',
        send: 'Envoyer le Message',
      },
      info: {
        location: 'VECCHIANO (PI) VIA DI CAFAGGIO 160/3 CAP 56019',
        email: 'Mahdiayachts25@gmail.com / Mahdiayachtsrls@pec.it',
        phone: '+39 351 303 2745 / +39 351 586 6129',
      },
    },
    footer: {
      tagline: "Excellence dans l'entretien et la soudure de yachts",
      rights: 'Tous droits réservés.',
    },
    profile: {
      title: 'Profil',
      text: "Nous travaillons dans le nautisme depuis dix ans et sommes spécialisés dans le travail des métaux, l'inox et l'aluminium. Nous avons lancé une division design dédiée il y a 1,5 an.",
    },
    competencies: {
      title: 'Compétences',
      items: ['Curiosité', 'Stratégie', "Travail d'équipe", 'Professionnalisme', 'Résolution de problèmes'],
    },
  },
  ar: {
    nav: {
      services: 'الخدمات',
      projects: 'المشاريع',
      gallery: 'معرض',
      experience: 'الخبرة',
      socials: 'التواصل',
      contact: 'اتصل بنا',
    },
    hero: {
      title: 'Mahdia Yacht SRLS',
      subtitle: 'خدمات اللحام والنجارة الاحترافية لليخوت الفاخرة',
      cta: 'اكتشف خدماتنا',
      ctaContact: 'تواصل معنا',
    },
    services: {
      title: 'خدماتنا',
      subtitle: 'التميز في كل التفاصيل',
      items: [
        {
          title: 'اللحام الاحترافي',
          description: 'خدمات لحام خبيرة لهياكل اليخوت، باستخدام تقنيات متقدمة ومواد عالية الجودة.',
        },
        {
          title: 'صيانة اليخوت',
          description: 'برامج صيانة شاملة مصممة للحفاظ على يختك في حالة مثالية طوال العام.',
        },
        {
          title: 'ترميم الهيكل',
          description: 'خدمات ترميم وتشطيب كاملة للهيكل لإعادة يختك إلى مجده الأصلي.',
        },
        {
          title: 'إصلاحات الطوارئ',
          description: 'خدمات إصلاح الطوارئ على مدار الساعة لإعادتك إلى الماء في أسرع وقت ممكن.',
        },
      ],
    },
    projects: {
      title: 'مشاريعنا',
      subtitle: 'عرض للتميز',
    },
    gallery: {
      title: 'أعمالنا',
      subtitle: '',
      filters: { all: 'الكل', images: 'صور', videos: 'فيديو' },
    },
    experience: {
      title: 'خبرتنا',
      subtitle: 'سنوات من التفاني لتحقيق كمال اليخوت',
      years: '10 سنة',
      founded: 'تأسست منذ سنة ونصف',
      foundedLabel: 'تأسست',
      stats: [
        { number: '500+', label: 'يخت تمت خدمته' },
        { number: '10', label: 'سنوات الخبرة' },
        { number: '100%', label: 'رضا العملاء' },
      ],
    },
    socials: {
      title: 'تابع رحلتنا',
      subtitle: 'شاهد أحدث مشاريعنا على إنستغرام',
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'هل أنت مستعد لإعطاء يختك العناية التي يستحقها؟',
      sponsor: 'تم تنفيذ مشروع «Sea... the Lands of Giacomo Puccini» بدعم من LuccaPromos ومن غرفة تجارة لوكا.',
      form: {
        name: 'اسمك',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        message: 'رسالتك',
        send: 'إرسال الرسالة',
      },
      info: {
        location: 'VECCHIANO (PI) VIA DI CAFAGGIO 160/3 CAP 56019',
        email: 'Mahdiayachts25@gmail.com / Mahdiayachtsrls@pec.it',
        phone: '+39 351 303 2745 / +39 351 586 6129',
      },
    },
    footer: {
      tagline: 'التميز في صيانة ولحام اليخوت',
      rights: 'جميع الحقوق محفوظة.',
    },
    profile: {
      title: 'الملف الشخصي',
      text: 'نعمل في مجال الملاحة منذ عشرة أعوام ونحن متخصصون في المعادن والفولاذ المقاوم للصدأ والألمنيوم. أطلقنا قسم تصميم مخصص منذ سنة ونصف.',
    },
    competencies: {
      title: 'المهارات',
      items: ['الفضول', 'الاستراتيجية', 'العمل الجماعي', 'الاحترافية', 'حل المشكلات'],
    },
  },
};

export const projectImages = [
  'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
  'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80',
  'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80',
  'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&q=80',
];

export const serviceIcons = [
  {
    name: 'welding',
    icon: '⚡',
  },
  {
    name: 'maintenance',
    icon: '⚙️',
  },
  {
    name: 'restoration',
    icon: '🔧',
  },
  {
    name: 'emergency',
    icon: '🚨',
  },
];

export const instagramPosts = [
  {
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
    caption: 'Professional welding work in progress',
  },
  {
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&q=80',
    caption: 'Luxury yacht maintenance completed',
  },
  {
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=400&q=80',
    caption: 'Working at the service of the sea',
  },
  {
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=400&q=80',
    caption: 'Another successful project',
  },
  {
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=400&q=80',
    caption: 'Excellence in yacht care',
  },
  {
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&q=80',
    caption: 'Premium yacht services',
  },
];
