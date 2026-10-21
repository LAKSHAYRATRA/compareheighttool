import { Locale } from "@/config/site";

export interface TranslationDictionary {
  // Brand & Basic Navigation
  siteTitle: string;
  tagline: string;
  subtitle: string;

  // Canvas Controls & Actions
  addFigure: string;
  addPerson: string;
  addObject: string;
  name: string;
  height: string;
  gender: string;
  male: string;
  female: string;
  unit: string;
  metric: string;
  imperial: string;
  clearAll: string;
  resetDefault: string;
  exportPng: string;
  share: string;
  copied: string;
  eyeLevel: string;
  differenceIndicator: string;
  dragHint: string;
  editFigure: string;
  saveChanges: string;
  cancel: string;
  noFigures: string;
  deleteFigure: string;
  color: string;
  viewFullAnalysis: string;

  // Navigation Links
  faqTitle: string;
  howToTitle: string;
  popularComparisons: string;
  celebrities: string;
  couples: string;
  everydayObjects: string;
  guides: string;
  about: string;
  privacy: string;
  terms: string;
  contact: string;

  // Features Trust Section
  features: {
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };

  // Educational Section
  educational: {
    title: string;
    intro: string;
    maleBenchmarksTitle: string;
    maleBenchmarks: string[];
    femaleBenchmarksTitle: string;
    femaleBenchmarks: string[];
    eyeLevelTitle: string;
    eyeLevelIntro: string;
    milestonesTitle: string;
    milestone1: string;
    milestone2: string;
    milestone3: string;
  };

  // Comprehensive FAQ list
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  en: {
    siteTitle: "CompareHeightTool - Visual Height Comparison Tool",
    tagline: "Free Online Visual Height Comparison Tool",
    subtitle: "Compare heights of celebrities, couples, and everyday objects side-by-side with millimeter precision.",
    addFigure: "Add Figure",
    addPerson: "Add Person",
    addObject: "Add Reference Object",
    name: "Name",
    height: "Height",
    gender: "Gender",
    male: "Male",
    female: "Female",
    unit: "Unit",
    metric: "Metric (cm)",
    imperial: "Imperial (ft / in)",
    clearAll: "Clear All",
    resetDefault: "Reset Default",
    exportPng: "Export High-Res PNG",
    share: "Share Chart",
    copied: "Link copied to clipboard!",
    eyeLevel: "Show Eye Levels",
    differenceIndicator: "Show Height Delta",
    dragHint: "Drag silhouettes horizontally to compare and overlap",
    editFigure: "Edit Figure",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    noFigures: "No figures added yet. Click 'Add Person' to get started.",
    deleteFigure: "Delete Figure",
    color: "Silhouette Color",
    viewFullAnalysis: "View Full Analysis",
    faqTitle: "Frequently Asked Questions",
    howToTitle: "How to Use This Height Visualizer",
    popularComparisons: "Popular Height Comparisons",
    celebrities: "Celebrities",
    couples: "Couples & Dating Gaps",
    everydayObjects: "Everyday Objects",
    guides: "Guides & Research",
    about: "About & Methodology",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact Us",
    features: {
      feature1Title: "Private & Browser-Only",
      feature1Desc: "Calculations and graphic generation happen directly on your device. We do not store your custom measurements, names, or comparisons on any server.",
      feature2Title: "Geometric Silhouette Scale",
      feature2Desc: "Silhouettes are mapped strictly to physical millimeters, avoiding the wide-angle camera distortion common in celebrity red carpet photos.",
      feature3Title: "Instant Metric & Imperial",
      feature3Desc: "Toggle between centimeters and feet & inches at any time without rounding errors or needing to re-enter your figures.",
    },
    educational: {
      title: "Understanding Height Differences in Everyday Life",
      intro: "Height is one of the first physical characteristics people notice, but judging it from photographs is notoriously misleading. Camera lenses, footwear, posture, and head-to-shoulder proportions all distort perceived scale. CompareHeightTool removes those variables by placing silhouettes on a flat, neutral ground plane with consistent head-to-body ratios.",
      maleBenchmarksTitle: "Average Male Stature by Country",
      maleBenchmarks: [
        "Netherlands: 183.8 cm (6'0.4\")",
        "Germany: 181.0 cm (5'11.2\")",
        "United Kingdom: 177.5 cm (5'9.9\")",
        "United States: 175.3 cm (5'9.0\")",
        "Japan: 172.0 cm (5'7.7\")",
      ],
      femaleBenchmarksTitle: "Average Female Stature by Country",
      femaleBenchmarks: [
        "Netherlands: 170.4 cm (5'7.1\")",
        "Germany: 166.0 cm (5'5.3\")",
        "United Kingdom: 164.4 cm (5'4.7\")",
        "United States: 161.8 cm (5'3.7\")",
        "Japan: 158.0 cm (5'2.2\")",
      ],
      eyeLevelTitle: "Eye Lines and Visual Scale",
      eyeLevelIntro: "When two people talk face-to-face, perceived height depends far more on pupil position than the very top of the head. In adults, the human eye line sits approximately 10 to 12 centimeters (4 to 4.7 inches) below the crown of the skull.",
      milestonesTitle: "How height differences look in person:",
      milestone1: "A difference of 2 to 3 inches is easily masked in daily life by boots, sneakers, or a slight slouch.",
      milestone2: "At a 6 to 7 inch difference, one person's gaze lands directly at the other person's chin or mouth, allowing natural eye contact without tilting the head.",
      milestone3: "Once a height gap reaches 10 inches or more, the shorter person's eye level falls below shoulder height, creating an unmistakable contrast in standing posture.",
    },
    faqs: [
      {
        question: "How accurate is this visual height comparison tool?",
        answer: "Our visualizer uses true millimeter-to-pixel SVG aspect ratios, ensuring that whether you compare a 5'2\" person to a 6'0\" partner, or a 7'1\" basketball player to a standard door frame, proportions match true physical geometry.",
      },
      {
        question: "Does this tool upload or store my height data or photos?",
        answer: "No. CompareHeightTool operates 100% on the client side in your web browser. No measurements, custom names, or comparisons are ever uploaded to a server or recorded in any database.",
      },
      {
        question: "How do I switch between Centimeters and Feet/Inches?",
        answer: "Simply click the 'Feet & Inches' or 'Metric (cm)' buttons at the top left of the visualizer workspace. All measurements and differences will update dynamically in real time.",
      },
      {
        question: "Can I export or save my height comparison chart?",
        answer: "Yes! Click the 'Export High-Res PNG' button in the toolbar to immediately generate a high-resolution, watermark-credited comparison graphic ready for social media or messaging.",
      },
    ],
  },
  de: {
    siteTitle: "CompareHeightTool - Visueller Größenvergleich Online",
    tagline: "Kostenloser Visueller Größenvergleich Online",
    subtitle: "Vergleichen Sie Körpergrößen von Prominenten, Paaren und Alltagsgegenständen nebeneinander mit millimetergenauer Präzision.",
    addFigure: "Figur hinzufügen",
    addPerson: "Person hinzufügen",
    addObject: "Referenzobjekt hinzufügen",
    name: "Name",
    height: "Körpergröße",
    gender: "Geschlecht",
    male: "Männlich",
    female: "Weiblich",
    unit: "Einheit",
    metric: "Metrisch (cm)",
    imperial: "Imperial (ft / in)",
    clearAll: "Alles löschen",
    resetDefault: "Zurücksetzen",
    exportPng: "Hochauflösendes PNG exportieren",
    share: "Grafik teilen",
    copied: "Link in die Zwischenablage kopiert!",
    eyeLevel: "Augenhöhe anzeigen",
    differenceIndicator: "Höhenunterschied anzeigen",
    dragHint: "Silhouetten horizontal ziehen, um sie zu überlappen und zu vergleichen",
    editFigure: "Figur bearbeiten",
    saveChanges: "Änderungen speichern",
    cancel: "Abbrechen",
    noFigures: "Noch keine Figuren hinzugefügt. Klicken Sie auf 'Person hinzufügen', um zu starten.",
    deleteFigure: "Figur löschen",
    color: "Silhouettenfarbe",
    viewFullAnalysis: "Vollständige Analyse anzeigen",
    faqTitle: "Häufig gestellte Fragen (FAQ)",
    howToTitle: "So verwenden Sie diesen Größenvergleicher",
    popularComparisons: "Beliebte Größenvergleiche",
    celebrities: "Prominente",
    couples: "Paare & Größenunterschiede",
    everydayObjects: "Alltagsgegenstände",
    guides: "Ratgeber & Analysen",
    about: "Über uns & Methodik",
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
    contact: "Kontakt",
    features: {
      feature1Title: "Privat & nur im Browser",
      feature1Desc: "Berechnungen und Grafiken entstehen direkt in Ihrem Browser. Es werden keine Messwerte oder Namen auf Servern gespeichert.",
      feature2Title: "Geometrisch exakte Silhouetten",
      feature2Desc: "Silhouetten basieren direkt auf Millimeter-Maßen und vermeiden Verzerrungen klassischer Weitwinkel-Fotos.",
      feature3Title: "Schneller Einheitenwechsel",
      feature3Desc: "Wechseln Sie jederzeit zwischen Zentimetern und Fuß/Zoll ohne Rundungsverlust.",
    },
    educational: {
      title: "Größenunterschiede im Alltag verstehen",
      intro: "Die Körpergröße ist eines der ersten Merkmale, das auffällt. Auf Fotos wird sie jedoch oft durch Schuhe, Kameraperspektiven und Haltung verzerrt. CompareHeightTool neutralisiert diese Einflüsse durch eine einheitliche Standlinie und unbeeinflusste 2D-Projektion.",
      maleBenchmarksTitle: "Durchschnittsgrößen Männer nach Land",
      maleBenchmarks: [
        "Niederlande: 183,8 cm (6'0.4\")",
        "Deutschland: 181,0 cm (5'11.2\")",
        "Großbritannien: 177,5 cm (5'9.9\")",
        "Vereinigte Staaten: 175,3 cm (5'9.0\")",
        "Japan: 172,0 cm (5'7.7\")",
      ],
      femaleBenchmarksTitle: "Durchschnittsgrößen Frauen nach Land",
      femaleBenchmarks: [
        "Niederlande: 170,4 cm (5'7.1\")",
        "Deutschland: 166,0 cm (5'5.3\")",
        "Großbritannien: 164,4 cm (5'4.7\")",
        "Vereinigte Staaten: 161,8 cm (5'3.7\")",
        "Japan: 158,0 cm (5'2.2\")",
      ],
      eyeLevelTitle: "Augenlinie und optische Wirkung",
      eyeLevelIntro: "Wenn zwei Personen miteinander sprechen, wird das Empfinden von Augenhöhe vor allem durch die Position der Pupillen bestimmt – nicht durch die Schädeldecke. Im Schnitt liegt die Augenlinie 10 bis 12 Zentimeter unter dem Scheitel.",
      milestonesTitle: "Wie Höhenunterschiede im Alltag wirken:",
      milestone1: "Ein Unterschied von 5 bis 7 cm fällt im Alltag kaum auf und wird oft schon durch Straßenschuhe ausgeglichen.",
      milestone2: "Bei 15 bis 18 cm Unterschied liegt der Blick der kleineren Person auf Kinnhöhe der größeren, was entspannten Blickkontakt erlaubt.",
      milestone3: "Ab 25 cm Unterschied endet der Kopf der kleineren Person unterhalb der Schulterlinie – ein deutlicher Größenunterschied.",
    },
    faqs: [
      {
        question: "Wie genau ist dieser visuelle Größenvergleich?",
        answer: "Unser Tool verwendet mathematisch präzise Millimeter-zu-Pixel-Vektoren, damit Proportionen sowohl bei Personen als auch bei Referenzobjekten physikalisch exakt abgebildet werden.",
      },
      {
        question: "Werden meine eingegebenen Daten oder Größen auf Servern gespeichert?",
        answer: "Nein. CompareHeightTool arbeitet zu 100% clientseitig in Ihrem Webbrowser. Es werden weder Messwerte noch Namen oder Vergleiche auf Server übertragen oder gespeichert.",
      },
      {
        question: "Wie wechsle ich zwischen Zentimetern und Fuß/Zoll?",
        answer: "Klicken Sie einfach auf 'Metrisch (cm)' oder 'Imperial (ft / in)' im Menü. Alle Zahlen und Höhenunterschiede werden in Echtzeit ohne Neuladen umgerechnet.",
      },
      {
        question: "Kann ich die Vergleichsgrafik als hochauflösendes Bild speichern?",
        answer: "Ja! Mit dem Button 'Hochauflösendes PNG exportieren' generieren Sie sofort eine druckfähige Grafik für soziale Medien oder Präsentationen.",
      },
    ],
  },
  es: {
    siteTitle: "CompareHeightTool - Comparador de Estatura y Altura Visual",
    tagline: "Comparador de Altura Visual Gratuito en Línea",
    subtitle: "Compara la estatura de celebridades, parejas y objetos cotidianos lado a lado con precisión milimétrica.",
    addFigure: "Agregar Figura",
    addPerson: "Agregar Persona",
    addObject: "Agregar Objeto de Referencia",
    name: "Nombre",
    height: "Estatura",
    gender: "Género",
    male: "Hombre",
    female: "Mujer",
    unit: "Unidad",
    metric: "Métrico (cm)",
    imperial: "Imperial (pies / pulg)",
    clearAll: "Borrar Todo",
    resetDefault: "Restablecer",
    exportPng: "Exportar Imagen PNG",
    share: "Compartir Gráfica",
    copied: "¡Enlace copiado al portapapeles!",
    eyeLevel: "Mostrar Nivel de Ojos",
    differenceIndicator: "Mostrar Diferencia",
    dragHint: "Arrastra siluetas horizontalmente para comparar y superponer",
    editFigure: "Editar Figura",
    saveChanges: "Guardar Cambios",
    cancel: "Cancelar",
    noFigures: "Aún no hay figuras agregadas. Haz clic en 'Agregar Persona' para comenzar.",
    deleteFigure: "Eliminar Figura",
    color: "Color de Silueta",
    viewFullAnalysis: "Ver Análisis Completo",
    faqTitle: "Preguntas Frecuentes",
    howToTitle: "Cómo Usar Este Comparador de Altura",
    popularComparisons: "Comparaciones Populares",
    celebrities: "Celebridades",
    couples: "Parejas y Diferencias",
    everydayObjects: "Objetos Cotidianos",
    guides: "Guías e Investigaciones",
    about: "Acerca de y Metodología",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    contact: "Contacto",
    features: {
      feature1Title: "Privado y 100% en el Navegador",
      feature1Desc: "Los cálculos y la generación de imágenes se procesan directamente en su dispositivo. No guardamos sus medidas ni nombres en ningún servidor.",
      feature2Title: "Escala Geométrica Real",
      feature2Desc: "Las siluetas se calculan directamente en milímetros, evitando las distorsiones ópticas típicas de fotos con lentes angulares.",
      feature3Title: "Cambio Inmediato de Unidades",
      feature3Desc: "Cambie entre centímetros y pies con pulgadas en cualquier momento sin perder precisión de redondeo.",
    },
    educational: {
      title: "Comprender las Diferencias de Estatura en la Vida Real",
      intro: "La estatura es uno de los primeros rasgos perceptibles, pero juzgarla en fotografías suele ser engañoso debido al calzado, la postura y el ángulo de la lente. CompareHeightTool coloca cada silueta sobre un plano neutral para mostrar proporciones exactas.",
      maleBenchmarksTitle: "Estatura Media Masculina por País",
      maleBenchmarks: [
        "Países Bajos: 183.8 cm (6'0.4\")",
        "Alemania: 181.0 cm (5'11.2\")",
        "España: 176.6 cm (5'9.5\")",
        "Estados Unidos: 175.3 cm (5'9.0\")",
        "México / Latinoamérica: 170.0 cm (5'7.0\")",
      ],
      femaleBenchmarksTitle: "Estatura Media Femenina por País",
      femaleBenchmarks: [
        "Países Bajos: 170.4 cm (5'7.1\")",
        "Alemania: 166.0 cm (5'5.3\")",
        "España: 162.0 cm (5'3.8\")",
        "Estados Unidos: 161.8 cm (5'3.7\")",
        "México / Latinoamérica: 157.0 cm (5'1.8\")",
      ],
      eyeLevelTitle: "La Línea de la Mirada y la Escala Visual",
      eyeLevelIntro: "Al conversar frente a frente, la sensación de altura depende de la altura de los ojos, no de la parte superior del cráneo. En adultos, la línea de visión se sitúa entre 10 y 12 cm por debajo de la coronilla.",
      milestonesTitle: "Cómo se aprecian las diferencias en persona:",
      milestone1: "Una diferencia de 5 a 8 cm apenas se percibe en la vida cotidiana y se disimula fácilmente con calzado.",
      milestone2: "Con 15 a 18 cm de diferencia, la mirada de una persona queda a la altura de la barbilla de la otra, facilitando un contacto visual natural.",
      milestone3: "A partir de 25 cm de diferencia, el nivel de la cabeza desciende por debajo de los hombros, creando un contraste muy visible.",
    },
    faqs: [
      {
        question: "¿Qué tan precisa es esta herramienta de comparación de altura?",
        answer: "Nuestro visualizador emplea proporciones vectoriales SVG milímetro a píxel exactas, garantizando proporciones físicas fidedignas.",
      },
      {
        question: "¿Esta herramienta guarda o almacena mis datos o medidas?",
        answer: "No. CompareHeightTool opera al 100% en el lado del cliente en su navegador. Ningún dato ni nombre se sube a ningún servidor.",
      },
      {
        question: "¿Cómo cambio entre centímetros y pies/pulgadas?",
        answer: "Haga clic en 'Métrico (cm)' o 'Imperial (pies / pulg)' en la barra de control. Todos los cálculos se actualizan de inmediato en tiempo real.",
      },
      {
        question: "¿Puedo exportar o descargar mi gráfica de comparación?",
        answer: "¡Sí! Presione el botón 'Exportar Imagen PNG' para generar de inmediato una imagen de alta resolución para redes sociales o mensajería.",
      },
    ],
  },
  pt: {
    siteTitle: "CompareHeightTool - Comparador de Altura Visual Online",
    tagline: "Comparador de Altura Online Gratuito",
    subtitle: "Compare a estatura de celebridades, casais e objetos cotidianos lado a lado com máxima precisão.",
    addFigure: "Adicionar Figura",
    addPerson: "Adicionar Pessoa",
    addObject: "Adicionar Objeto",
    name: "Nome",
    height: "Altura",
    gender: "Gênero",
    male: "Masculino",
    female: "Feminino",
    unit: "Unidade",
    metric: "Métrico (cm)",
    imperial: "Imperial (pés / pol)",
    clearAll: "Limpar Tudo",
    resetDefault: "Restaurar Padrão",
    exportPng: "Exportar Imagem PNG",
    share: "Compartilhar Gráfico",
    copied: "Link copiado para a área de transferência!",
    eyeLevel: "Mostrar Linha dos Olhos",
    differenceIndicator: "Mostrar Diferença",
    dragHint: "Arraste as silhuetas horizontalmente para sobrepor e comparar",
    editFigure: "Editar Figura",
    saveChanges: "Salvar Alterações",
    cancel: "Cancelar",
    noFigures: "Nenhuma figura adicionada. Clique em 'Adicionar Pessoa' para começar.",
    deleteFigure: "Excluir Figura",
    color: "Cor da Silhueta",
    viewFullAnalysis: "Ver Análise Completa",
    faqTitle: "Perguntas Frequentes",
    howToTitle: "Como Usar o Comparador de Altura",
    popularComparisons: "Comparações Populares",
    celebrities: "Celebridades",
    couples: "Casais e Diferença de Altura",
    everydayObjects: "Objetos Comuns",
    guides: "Guias e Estatísticas",
    about: "Sobre e Metodologia",
    privacy: "Política de Privacidade",
    terms: "Termos de Uso",
    contact: "Contato",
    features: {
      feature1Title: "Privado e sem Envio para Servidores",
      feature1Desc: "Os cálculos e gráficos são gerados diretamente no seu navegador. Nenhuma medida ou nome personalizado é armazenado em servidores.",
      feature2Title: "Escala Geométrica Real",
      feature2Desc: "Silhuetas dimensionadas em milímetros reais, eliminando as distorções visuais comuns em fotos com lentes angulares.",
      feature3Title: "Conversão Imediata de Unidades",
      feature3Desc: "Alterne entre centímetros e pés com polegadas a qualquer momento com precisão exata.",
    },
    educational: {
      title: "Entendendo Diferenças de Altura no Dia a Dia",
      intro: "A altura é uma das primeiras características notadas em uma pessoa, mas julgá-la por fotos costuma ser impreciso devido ao calçado, à postura e ao ângulo da câmera. O CompareHeightTool posiciona cada silhueta em um plano neutro para mostrar proporções reais.",
      maleBenchmarksTitle: "Média de Altura Masculina por País",
      maleBenchmarks: [
        "Holanda: 183.8 cm (6'0.4\")",
        "Alemanha: 181.0 cm (5'11.2\")",
        "Brasil: 175.7 cm (5'9.2\")",
        "Portugal: 174.0 cm (5'8.5\")",
        "Japão: 172.0 cm (5'7.7\")",
      ],
      femaleBenchmarksTitle: "Média de Altura Feminina por País",
      femaleBenchmarks: [
        "Holanda: 170.4 cm (5'7.1\")",
        "Alemanha: 166.0 cm (5'5.3\")",
        "Brasil: 162.4 cm (5'3.9\")",
        "Portugal: 161.0 cm (5'3.4\")",
        "Japão: 158.0 cm (5'2.2\")",
      ],
      eyeLevelTitle: "Linha de Visão e Impressão Visual",
      eyeLevelIntro: "Ao conversar presencialmente, a percepção de altura depende da linha dos olhos, que fica em média 10 a 12 cm abaixo do topo da cabeça.",
      milestonesTitle: "Como a diferença se manifesta pessoalmente:",
      milestone1: "Uma diferença de 5 a 8 cm quase não é notada no cotidiano e pode ser facilmente compensada por sapatos.",
      milestone2: "Com 15 a 18 cm de diferença, o olhar da pessoa mais baixa fica na altura do queixo da outra, permitindo contato visual confortável.",
      milestone3: "A partir de 25 cm de diferença, a cabeça fica abaixo do nível dos ombros, gerando um contraste bem evidente.",
    },
    faqs: [
      {
        question: "Qual o nível de precisão deste comparador de altura?",
        answer: "O CompareHeightTool utiliza escalas vetoriais SVG de milímetro para pixel com precisão matemática absoluta.",
      },
      {
        question: "Meus dados ou imagens são enviados para algum servidor?",
        answer: "Não. A ferramenta é 100% processada no cliente (em seu próprio navegador). Nada é transmitido ou salvo.",
      },
      {
        question: "Como alterno entre centímetros e pés/polegadas?",
        answer: "Basta clicar em 'Métrico (cm)' ou 'Imperial (pés / pol)' na barra de ferramentas para conversão instantânea.",
      },
      {
        question: "Posso baixar a imagem gerada?",
        answer: "Sim! Clique no botão 'Exportar Imagem PNG' para obter uma imagem de alta definição pronta para redes sociais.",
      },
    ],
  },
  fr: {
    siteTitle: "CompareHeightTool - Comparateur de Taille Visuel en Ligne",
    tagline: "Comparateur de Taille Gratuit en Ligne",
    subtitle: "Comparez la taille de célébrités, de couples et d'objets du quotidien côte à côte avec une précision absolue.",
    addFigure: "Ajouter une silhouette",
    addPerson: "Ajouter une personne",
    addObject: "Ajouter un objet",
    name: "Nom",
    height: "Taille",
    gender: "Genre",
    male: "Homme",
    female: "Femme",
    unit: "Unité",
    metric: "Métrique (cm)",
    imperial: "Impérial (pieds / pouces)",
    clearAll: "Tout effacer",
    resetDefault: "Réinitialiser",
    exportPng: "Exporter en PNG",
    share: "Partager l'image",
    copied: "Lien copié dans le presse-papier !",
    eyeLevel: "Afficher le niveau des yeux",
    differenceIndicator: "Afficher l'écart de taille",
    dragHint: "Glissez les silhouettes horizontalement pour les superposer et comparer",
    editFigure: "Modifier la silhouette",
    saveChanges: "Enregistrer",
    cancel: "Annuler",
    noFigures: "Aucune silhouette pour le moment. Cliquez sur 'Ajouter une personne' pour démarrer.",
    deleteFigure: "Supprimer la silhouette",
    color: "Couleur de la silhouette",
    viewFullAnalysis: "Voir l'analyse détaillée",
    faqTitle: "Foire Aux Questions (FAQ)",
    howToTitle: "Comment utiliser ce comparateur de taille",
    popularComparisons: "Comparaisons Populaires",
    celebrities: "Célébrités",
    couples: "Couples & Écarts de taille",
    everydayObjects: "Objets du quotidien",
    guides: "Guides & Recherches",
    about: "À propos & Méthodologie",
    privacy: "Politique de Confidentialité",
    terms: "Conditions d'Utilisation",
    contact: "Contact",
    features: {
      feature1Title: "Privé et 100% dans le Navigateur",
      feature1Desc: "Les calculs et les rendus s'exécutent directement sur votre appareil. Aucune mesure ni nom n'est transmis à un serveur.",
      feature2Title: "Échelle Géométrique Réelle",
      feature2Desc: "Silhouettes étalonnées directement en millimètres, éliminant les déformations optiques des objectifs photo grand-angle.",
      feature3Title: "Conversion d'Unités Immédiate",
      feature3Desc: "Basculez entre le système métrique (cm) et le système impérial (pieds et pouces) à tout moment sans erreur d'arrondi.",
    },
    educational: {
      title: "Comprendre les Écarts de Taille au Quotidien",
      intro: "La taille est l'un des premiers traits remarqués chez une personne, mais les photos sont trompeuses en raison des chaussures, de la posture et des angles de vue. CompareHeightTool positionne chaque silhouette sur un plan neutre pour refléter des proportions exactes.",
      maleBenchmarksTitle: "Moyenne de Taille Masculine par Pays",
      maleBenchmarks: [
        "Pays-Bas: 183.8 cm (6'0.4\")",
        "France: 179.7 cm (5'10.7\")",
        "Allemagne: 181.0 cm (5'11.2\")",
        "États-Unis: 175.3 cm (5'9.0\")",
        "Japon: 172.0 cm (5'7.7\")",
      ],
      femaleBenchmarksTitle: "Moyenne de Taille Féminine par Pays",
      femaleBenchmarks: [
        "Pays-Bas: 170.4 cm (5'7.1\")",
        "France: 164.9 cm (5'4.9\")",
        "Allemagne: 166.0 cm (5'5.3\")",
        "États-Unis: 161.8 cm (5'3.7\")",
        "Japon: 158.0 cm (5'2.2\")",
      ],
      eyeLevelTitle: "Ligne du Regard et Perception Visuelle",
      eyeLevelIntro: "Lors d'un échange face à face, la perception de taille dépend de la hauteur des yeux, situés en moyenne 10 à 12 cm sous le sommet du crâne.",
      milestonesTitle: "Comment les écarts se perçoivent en personne :",
      milestone1: "Un écart de 5 à 8 cm passe presque inaperçu au quotidien et se compense aisément avec des chaussures ordinaires.",
      milestone2: "Avec 15 à 18 cm d'écart, le regard de la personne la plus petite se pose au niveau du menton de l'autre, offrant un contact visuel naturel.",
      milestone3: "À partir de 25 cm d'écart, la tête se situe en dessous des épaules, créant un contraste net et évident.",
    },
    faqs: [
      {
        question: "Ce comparateur visuel est-il précis ?",
        answer: "Oui, notre moteur applique une échelle vectorielle SVG millimètre-par-pixel pour garantir une fidélité physique totale.",
      },
      {
        question: "Mes données ou mesures sont-elles stockées en ligne ?",
        answer: "Non. CompareHeightTool fonctionne 100% côté client dans votre navigateur. Aucune donnée n'est envoyée vers un serveur.",
      },
      {
        question: "Comment convertir entre centimètres et pieds/pouces ?",
        answer: "Cliquez simplement sur 'Métrique (cm)' ou 'Impérial (pieds / pouces)' dans la barre d'outils pour une mise à jour instantanée.",
      },
      {
        question: "Puis-je enregistrer l'image comparative ?",
        answer: "Oui, cliquez sur 'Exporter en PNG' pour générer une image nette à partager sur vos réseaux sociaux ou messageries.",
      },
    ],
  },
  ja: {
    siteTitle: "CompareHeightTool - 身長比較ツール (オンライン無料)",
    tagline: "無料オンライン身長比較シミュレーター",
    subtitle: "芸能人、カップル、日常の物との身長差をリアルタイムかつミリ単位の精度で横並び比較できます。",
    addFigure: "人物・物を追加",
    addPerson: "人物を追加",
    addObject: "基準物を追加",
    name: "名前",
    height: "身長",
    gender: "性別",
    male: "男性",
    female: "女性",
    unit: "単位",
    metric: "メートル法 (cm)",
    imperial: "ヤード・ポンド法 (ft / in)",
    clearAll: "すべて消去",
    resetDefault: "リセット",
    exportPng: "高画質PNG保存",
    share: "比較画像を共有",
    copied: "リンクをコピーしました！",
    eyeLevel: "目線の高さを表示",
    differenceIndicator: "身長差を表示",
    dragHint: "シルエットを左右にドラッグして重ね合わせ比較が可能です",
    editFigure: "人物・物を編集",
    saveChanges: "変更を保存",
    cancel: "キャンセル",
    noFigures: "まだ人物が追加されていません。「人物を追加」をクリックしてください。",
    deleteFigure: "削除",
    color: "シルエットの色",
    viewFullAnalysis: "詳細な分析を見る",
    faqTitle: "よくある質問 (FAQ)",
    howToTitle: "身長比較ツールの使い方",
    popularComparisons: "人気の比較",
    celebrities: "芸能人・有名人",
    couples: "カップル・身長差",
    everydayObjects: "日常のアイテム",
    guides: "解説・統計データ",
    about: "当サイトについて",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    contact: "お問い合わせ",
    features: {
      feature1Title: "安心のブラウザ完結処理",
      feature1Desc: "計算や画像出力はすべてお使いの端末内で直接行われます。入力した身長や名前がサーバーに送信・記録されることは一切ありません。",
      feature2Title: "実寸に基づく幾何シルエット",
      feature2Desc: "ミリメートル単位の正確な縮尺でシルエットを配置し、広角レンズ特有の不自然な歪みを排除します。",
      feature3Title: "瞬時の単位切り替え",
      feature3Desc: "センチメートル（cm）とフィート・インチ（ft/in）をいつでも再入力なしで即座に相互変換できます。",
    },
    educational: {
      title: "日常で感じる身長差のリアルな見え方",
      intro: "身長は印象を左右する大きな要素ですが、写真では靴や姿勢、カメラの角度によって実物と大きく異なって見えることがよくあります。CompareHeightToolは水平な同一基準線上にシルエットを並べることで、肉眼で見たそのままの比率を再現します。",
      maleBenchmarksTitle: "国別の男性平均身長",
      maleBenchmarks: [
        "オランダ: 183.8 cm (6'0.4\")",
        "ドイツ: 181.0 cm (5'11.2\")",
        "アメリカ: 175.3 cm (5'9.0\")",
        "日本: 172.0 cm (5'7.7\")",
      ],
      femaleBenchmarksTitle: "国別の女性平均身長",
      femaleBenchmarks: [
        "オランダ: 170.4 cm (5'7.1\")",
        "ドイツ: 166.0 cm (5'5.3\")",
        "アメリカ: 161.8 cm (5'3.7\")",
        "日本: 158.0 cm (5'2.2\")",
      ],
      eyeLevelTitle: "目線の高さと印象の違い",
      eyeLevelIntro: "面と向かって会話するとき、身長の差は頭のてっぺんではなく目線の位置で感じ取られます。成人の場合、目線は頭頂部からおよそ10〜12cm下にあります。",
      milestonesTitle: "対面したときの実際の見え方：",
      milestone1: "5〜8cmの差：日常ではほとんど気にならず、一般的なスニーカーの靴底で容易に埋まる範囲です。",
      milestone2: "15〜18cmの差：相手の視線が自分の顎や口元あたりに届き、首を傾けずに自然なアイコンタクトが取れます。",
      milestone3: "25cm以上の差：背の低いほうの目線が相手の肩よりも下になり、誰が見てもはっきりとした身長差が実感できます。",
    },
    faqs: [
      {
        question: "この身長比較シミュレーターの精度はどれくらいですか？",
        answer: "当ツールはミリメートル単位の幾何比率でSVGベクター描画を行っており、実寸に忠実な比率で比較できます。",
      },
      {
        question: "入力したデータや身長が外部に送信・保存されますか？",
        answer: "いいえ。CompareHeightToolは100%ブラウザ内で完結して動作します。サーバーに入力情報が送信されることは一切ありません。",
      },
      {
        question: "センチメートルとフィート・インチの切り替えはどうすればいいですか？",
        answer: "画面上部の「メートル法 (cm)」または「ヤード・ポンド法 (ft / in)」をクリックするだけで、すべての数値が瞬時に再計算されます。",
      },
      {
        question: "比較画像を保存できますか？",
        answer: "はい。「高画質PNG保存」ボタンをクリックすると、SNS投稿やメッセージ送信に最適な画像を高画質で即座に書き出せます。",
      },
    ],
  },
};
