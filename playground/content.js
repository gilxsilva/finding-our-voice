// All learning content stays on this device. .example addresses are fictional.
export const bi = (es, en) => ({ es, en });
export const categories = {
  supplies: bi("En mi mochila", "In my backpack"),
  places: bi("En la escuela", "Around school"),
  everyday: bi("Mi día a día", "Everyday life"),
};
export const vocabulary = [
  ["notebook", "cuaderno", "notebook", "supplies", "notebook"],
  ["pencil", "lápiz", "pencil", "supplies", "pencil"],
  ["backpack", "mochila", "backpack", "supplies", "backpack"],
  ["book", "libro", "book", "supplies", "book"],
  ["calculator", "calculadora", "calculator", "supplies", "calculator"],
  ["folder", "carpeta", "folder", "supplies", "folder"],
  ["library", "biblioteca", "library", "places", "book"],
  ["classroom", "salón de clases", "classroom", "places", "school"],
  ["office", "oficina", "office", "places", "school"],
  ["cafeteria", "cafetería", "cafeteria", "places", "cup"],
  ["schedule", "horario", "schedule", "places", "calendar"],
  ["teacher", "docente", "teacher", "places", "chat"],
  ["friend", "amigo o amiga", "friend", "everyday", "people"],
  ["help", "ayuda", "help", "everyday", "chat"],
  ["homework", "tarea", "homework", "everyday", "notebook"],
  ["water", "agua", "water", "everyday", "cup"],
  ["bus", "autobús", "bus", "everyday", "bus"],
  ["email", "correo electrónico", "email", "everyday", "mail"],
].map(([id, es, en, category, icon]) => ({ id, es, en, category, icon }));
export const games = [
  {
    id: "match",
    name: "Match It!",
    subtitle: bi("Conecta las palabras", "Connect the words"),
    description: bi(
      "Un cuaderno, una mochila… une lo que ya sabes con algo nuevo.",
      "A notebook, a backpack… connect what you know with something new.",
    ),
    group: "words",
    icon: "cards",
    color: "gold",
    time: "3–5",
    skill: bi("Vocabulario", "Vocabulary"),
  },
  {
    id: "loteria",
    name: "Lotería de Palabras",
    subtitle: bi("Escucha. Encuentra. ¡Lotería!", "Listen. Find it. ¡Lotería!"),
    description: bi(
      "Un clásico con nuevas palabras. Juega a tu ritmo o con tu clase.",
      "A familiar game with new words. Play at your pace or with your class.",
    ),
    group: "words",
    icon: "grid",
    color: "peach",
    time: "3–5",
    skill: bi("Escucha + vocabulario", "Listening + vocabulary"),
  },
  {
    id: "conversation",
    name: "What Would You Say?",
    subtitle: bi("Tu voz abre puertas", "Your voice opens doors"),
    description: bi(
      "Pide ayuda, conoce a alguien y encuentra las palabras para empezar.",
      "Ask for help, meet someone, and find the words to start.",
    ),
    group: "school",
    icon: "chat",
    color: "mint",
    time: "3–4",
    skill: bi("Conversación", "Conversation"),
  },
  {
    id: "sentence",
    name: "Build a Sentence",
    subtitle: bi("Palabra por palabra", "One word at a time"),
    description: bi(
      "Arma frases que sí vas a usar. Sin prisa, sin miedo a equivocarte.",
      "Build sentences you will actually use. Take your time and try again.",
    ),
    group: "words",
    icon: "blocks",
    color: "lavender",
    time: "3–4",
    skill: bi("Frases útiles", "Useful sentences"),
  },
  {
    id: "email",
    name: "Email Simulator",
    subtitle: bi("Un mensaje con confianza", "Send a little confidence"),
    description: bi(
      "Practica cómo escribirle a tu docente en un correo de prueba.",
      "Practice writing to your teacher in a pretend email.",
    ),
    group: "digital",
    icon: "mail",
    color: "peach",
    time: "4–5",
    skill: bi("Comunicación digital", "Digital communication"),
  },
  {
    id: "account",
    name: "My First Online Account",
    subtitle: bi("Tu primer paso digital", "Your first digital step"),
    description: bi(
      "Explora una cuenta de práctica y aprende a protegerla.",
      "Explore a practice account and learn how to protect it.",
    ),
    group: "digital",
    icon: "lock",
    color: "mint",
    time: "3–4",
    skill: bi("Seguridad digital", "Digital safety"),
  },
  {
    id: "safety",
    name: "Safe or Sketchy?",
    subtitle: bi("Haz una pausa. Revisa. Decide.", "Pause. Check. Decide."),
    description: bi(
      "Descubre las señales de engaño en mensajes de todos los días.",
      "Spot warning signs in everyday messages.",
    ),
    group: "digital",
    icon: "shield",
    color: "lavender",
    time: "3–4",
    skill: bi("Pensamiento crítico", "Critical thinking"),
  },
  {
    id: "school",
    name: "School Day Challenge",
    subtitle: bi("Tú puedes con este día", "You have got this day"),
    description: bi(
      "Lee tu horario, encuentra tu salón y resuelve un día escolar.",
      "Read your schedule, find your classroom, and navigate a school day.",
    ),
    group: "school",
    icon: "school",
    color: "gold",
    time: "4–5",
    skill: bi("La vida escolar", "School life"),
  },
];
const option = (en, es) => ({ en, es });
export const conversations = [
  {
    scene: bi(
      "En clase · Pide una explicación",
      "In class · Ask for an explanation",
    ),
    context: bi(
      "Tu docente acaba de explicar la tarea. Necesitas escucharla otra vez.",
      "Your teacher just explained the homework. You need to hear it again.",
    ),
    prompt: "Please finish page twelve for homework.",
    translation: "Por favor, terminen la página doce de tarea.",
    options: [
      option("Could you repeat that, please?", "¿Podría repetirlo, por favor?"),
      option("I finished it yesterday.", "Lo terminé ayer."),
      option("Where is the cafeteria?", "¿Dónde está la cafetería?"),
    ],
    answer: 0,
    why: bi(
      "“Could you repeat that, please?” pide que repitan algo de forma amable. Pedir ayuda es una habilidad.",
      "“Could you repeat that, please?” politely asks someone to say something again. Asking for help is a skill.",
    ),
    hint: bi(
      "Necesitas que repitan la explicación, no cambiar de tema.",
      "You need the explanation repeated, rather than a new topic.",
    ),
  },
  {
    scene: bi("En el salón · Pide algo prestado", "In class · Borrow a supply"),
    context: bi(
      "Olvidaste tu lápiz. ¿Qué le puedes decir a un compañero?",
      "You forgot your pencil. What can you say to a classmate?",
    ),
    prompt: "We are writing in our notebooks today.",
    translation: "Hoy vamos a escribir en nuestros cuadernos.",
    options: [
      option(
        "Can I borrow a pencil, please?",
        "¿Me prestas un lápiz, por favor?",
      ),
      option("Can I borrow a bus?", "¿Me prestas un autobús?"),
      option("I do not like notebooks.", "No me gustan los cuadernos."),
    ],
    answer: 0,
    why: bi(
      "“Can I borrow…?” sirve para pedir algo prestado. Puedes terminar con “Thank you!”",
      "“Can I borrow…?” is useful for borrowing something. You can finish with “Thank you!”",
    ),
    hint: bi(
      "“Borrow” significa pedir prestado. Elige el objeto que necesitas.",
      "“Borrow” means to use something and give it back. Choose the supply you need.",
    ),
  },
  {
    scene: bi("En el almuerzo · Conoce a alguien", "At lunch · Meet someone"),
    context: bi(
      "Ves un asiento libre junto a una persona de tu clase. Quieres sentarte.",
      "You see a free seat next to someone from your class. You would like to sit there.",
    ),
    prompt: "Hi! I think we have English together.",
    translation: "¡Hola! Creo que tenemos la clase de inglés juntos.",
    options: [
      option("What time is the bus?", "¿A qué hora pasa el autobús?"),
      option("Hi! Can I sit here?", "¡Hola! ¿Me puedo sentar aquí?"),
      option("I need a calculator.", "Necesito una calculadora."),
    ],
    answer: 1,
    why: bi(
      "“Can I sit here?” abre una conversación sin presionar a la otra persona.",
      "“Can I sit here?” opens a conversation without putting pressure on the other person.",
    ),
    hint: bi(
      "Saluda y pregunta por el asiento.",
      "Say hello and ask about the seat.",
    ),
  },
  {
    scene: bi(
      "Con tu docente · Busca apoyo",
      "With your teacher · Find support",
    ),
    context: bi(
      "La tarea fue difícil. Quieres ayuda después de clase.",
      "The homework was difficult. You want help after class.",
    ),
    prompt: "Do you have any questions about the homework?",
    translation: "¿Tienen preguntas sobre la tarea?",
    options: [
      option("The library is closed.", "La biblioteca está cerrada."),
      option("My backpack is blue.", "Mi mochila es azul."),
      option(
        "Could you help me after class?",
        "¿Podría ayudarme después de clase?",
      ),
    ],
    answer: 2,
    why: bi(
      "“Could you help me after class?” dice qué necesitas y cuándo. También la usarás en el correo.",
      "“Could you help me after class?” says what you need and when. You will also use it in the email.",
    ),
    hint: bi(
      "Busca una pregunta que pida ayuda y mencione cuándo.",
      "Look for a question that asks for help and says when.",
    ),
  },
];
export const sentences = [
  {
    en: "Can I borrow a pencil please?",
    es: "¿Me prestas un lápiz, por favor?",
    note: bi(
      "Usa “Can I” para pedir permiso o pedir algo de forma amable.",
      "Use “Can I” to ask permission or make a polite request.",
    ),
  },
  {
    en: "Could you help me after class?",
    es: "¿Podría ayudarme después de clase?",
    note: bi(
      "“After class” significa después de clase.",
      "“After class” tells someone when you need help.",
    ),
  },
  {
    en: "Where is the library?",
    es: "¿Dónde está la biblioteca?",
    note: bi(
      "Para preguntar por un lugar: “Where is the…?”",
      "To ask about a place, use “Where is the…?”",
    ),
  },
  {
    en: "I need help with my homework.",
    es: "Necesito ayuda con mi tarea.",
    note: bi(
      "“I need help with…” te permite explicar con qué necesitas ayuda.",
      "“I need help with…” lets you explain what you need help with.",
    ),
  },
];
export const safetyQuestions = [
  {
    scene: bi("Mensaje inesperado", "Unexpected message"),
    context: bi(
      "Un número desconocido te manda este mensaje.",
      "An unknown number sends you this message.",
    ),
    prompt: "You won a FREE phone! Send your password to claim it NOW.",
    translation:
      "¡Ganaste un teléfono GRATIS! Manda tu contraseña AHORA para recibirlo.",
    options: [
      option("Safe to follow", "Es seguro seguir las instrucciones"),
      option("Sketchy — pause and check", "Sospechoso: haz una pausa y revisa"),
    ],
    answer: 1,
    why: bi(
      "Un premio inesperado, la urgencia y pedir tu contraseña son señales de engaño. No respondas; pide apoyo a alguien de confianza.",
      "An unexpected prize, urgency, and a password request are warning signs. Do not reply; ask someone you trust for support.",
    ),
    hint: bi(
      "¿Alguien necesita tu contraseña para darte un premio? Nunca la compartas.",
      "Would someone need your password to give you a prize? Never share it.",
    ),
  },
  {
    scene: bi("Portal escolar", "School portal"),
    context: bi(
      "Entraste desde el marcador que tu escuela te dio y confirmaste el sitio con tu docente.",
      "You opened the bookmark your school gave you and confirmed the site with your teacher.",
    ),
    prompt: "Your homework is due Friday. Please bring your notebook.",
    translation: "La tarea se entrega el viernes. Por favor, trae tu cuaderno.",
    options: [
      option("Safe in this situation", "Seguro en esta situación"),
      option("Sketchy — pause and check", "Sospechoso: haz una pausa y revisa"),
    ],
    answer: 0,
    why: bi(
      "Ya verificaste el portal por una vía de confianza. Este aviso no pide secretos ni pagos. Un logo por sí solo no demuestra que algo sea seguro.",
      "You already verified the portal through a trusted source. This notice asks for no secrets or payment. A logo alone does not prove safety.",
    ),
    hint: bi(
      "Piensa en cómo llegaste al sitio y qué te pide el mensaje.",
      "Think about how you reached the site and what the message asks for.",
    ),
  },
  {
    scene: bi(
      "Una cuenta que parece conocida",
      "An account that looks familiar",
    ),
    context: bi(
      "Una cuenta con la foto de un amigo te escribe de repente.",
      "An account with your friend’s photo suddenly messages you.",
    ),
    prompt:
      "I lost my account. Send me the verification code you just received.",
    translation:
      "Perdí mi cuenta. Mándame el código de verificación que te acaba de llegar.",
    options: [
      option("Safe to follow", "Es seguro seguir las instrucciones"),
      option("Sketchy — pause and check", "Sospechoso: haz una pausa y revisa"),
    ],
    answer: 1,
    why: bi(
      "Los códigos de verificación también son secretos. Contacta a tu amigo por otra vía que ya conozcas. Su cuenta podría estar comprometida.",
      "Verification codes are secrets too. Contact your friend through another channel you already know. Their account may be compromised.",
    ),
    hint: bi(
      "Aunque reconozcas la foto, un código puede abrir tu cuenta.",
      "Even if you recognize the photo, a code can unlock your account.",
    ),
  },
  {
    scene: bi("En una computadora compartida", "On a shared computer"),
    context: bi(
      "Terminaste de revisar tu tarea en la biblioteca.",
      "You finished checking your homework at the library.",
    ),
    prompt: "I will sign out of my account before I leave.",
    translation: "Voy a cerrar la sesión de mi cuenta antes de irme.",
    options: [
      option("Safe choice", "Una decisión segura"),
      option("Sketchy choice", "Una decisión insegura"),
    ],
    answer: 0,
    why: bi(
      "Cerrar sesión ayuda a proteger tu cuenta en equipos compartidos. No guardes ahí tu contraseña.",
      "Signing out helps protect your account on shared devices. Do not save your password there.",
    ),
    hint: bi(
      "¿Qué evita que la próxima persona entre a tu cuenta?",
      "What keeps the next person from using your account?",
    ),
  },
  {
    scene: bi("Una amenaza por correo", "An email threat"),
    context: bi(
      "Te llega un mensaje que dice ser de tu escuela. No esperabas ningún cobro.",
      "A message claims to be from your school. You were not expecting a payment request.",
    ),
    prompt:
      "PAY TODAY or lose your classes. Buy a gift card and email us the code.",
    translation:
      "PAGA HOY o perderás tus clases. Compra una tarjeta de regalo y envíanos el código.",
    options: [
      option("Safe to follow", "Es seguro seguir las instrucciones"),
      option("Sketchy — pause and check", "Sospechoso: haz una pausa y revisa"),
    ],
    answer: 1,
    why: bi(
      "Las amenazas y los pagos con tarjetas de regalo son señales de estafa. Habla con la oficina escolar usando un contacto que ya conozcas. Si ya respondiste, busca apoyo; no es tu culpa.",
      "Threats and gift card payments are scam warning signs. Contact the school office using a contact you already know. If you already replied, seek support; it is not your fault.",
    ),
    hint: bi(
      "La urgencia y la forma de pago son señales de alerta.",
      "The urgency and payment method are warning signs.",
    ),
  },
];
export const accountQuestions = [
  {
    scene: bi(
      "Paso 1 · Elige un nombre de usuario",
      "Step 1 · Choose a username",
    ),
    context: bi(
      "Estás en Club Studio, una plataforma inventada. Usa solo las opciones de práctica. ¿Qué nombre protege mejor tu información personal?",
      "You are on Club Studio, an imaginary platform. Use only the practice choices. Which username best protects personal information?",
    ),
    prompt: "Create your practice account",
    translation: "Crea tu cuenta de práctica",
    options: [
      option(
        "Alex_FullName_Birthday_School",
        "Nombre completo, cumpleaños y escuela",
      ),
      option("RiverSketch42", "Un apodo sin datos personales"),
      option("MyHomeAddress123", "Mi dirección de casa"),
    ],
    answer: 1,
    why: bi(
      "Un apodo sin tu nombre completo, fecha de nacimiento o dirección revela menos información personal.",
      "A nickname without your full name, birth date, or address shares less personal information.",
    ),
    hint: bi(
      "Evita publicar datos que te identifiquen o digan dónde vives.",
      "Avoid publishing information that identifies you or says where you live.",
    ),
  },
  {
    scene: bi("Paso 2 · Protege la cuenta", "Step 2 · Protect the account"),
    context: bi(
      "No escribas una contraseña real. Elige la mejor estrategia para una cuenta real.",
      "Do not type a real password. Choose the best strategy for a real account.",
    ),
    prompt: "Choose a password strategy",
    translation: "Elige una estrategia de contraseña",
    options: [
      option("Reuse my school password.", "Reutilizar mi contraseña escolar."),
      option(
        "Use my birthday so it is easy to guess.",
        "Usar mi cumpleaños para que sea fácil adivinarla.",
      ),
      option(
        "Use a password manager to create a long, unique password.",
        "Usar un gestor de contraseñas para crear una contraseña larga y única.",
      ),
    ],
    answer: 2,
    why: bi(
      "Usa una contraseña larga y distinta para cada cuenta. Un gestor de contraseñas puede crearla y guardarla. No copies contraseñas de ejercicios.",
      "Use a long, different password for each account. A password manager can create and save it. Do not copy passwords from exercises.",
    ),
    hint: bi(
      "Si una contraseña se filtra, reutilizarla pone otras cuentas en riesgo.",
      "If one password is exposed, reusing it puts other accounts at risk.",
    ),
  },
  {
    scene: bi("Paso 3 · Verifica tu cuenta", "Step 3 · Verify your account"),
    context: bi(
      "Bandeja ficticia de river@club.example: “Your verification code is 482619.” Tú acabas de solicitar este código en Club Studio. ¿Qué haces?",
      "Pretend inbox for river@club.example: “Your verification code is 482619.” You just requested this code on Club Studio. What do you do?",
    ),
    prompt: "Enter the code on Club Studio",
    translation: "Introduce el código en Club Studio",
    options: [
      option(
        "Use 482619 on the same verified page where I requested it.",
        "Usar 482619 en la misma página verificada donde lo pedí.",
      ),
      option(
        "Send 482619 to someone who messages me.",
        "Enviar 482619 a alguien que me escribe.",
      ),
      option(
        "Post 482619 in a public chat.",
        "Publicar 482619 en un chat público.",
      ),
    ],
    answer: 0,
    why: bi(
      "Usa el código solo en el sitio verificado donde tú lo solicitaste. Nunca se lo des a otra persona. Aquí no se envía ningún correo real.",
      "Use the code only on the verified site where you requested it. Never give it to another person. No real email is sent here.",
    ),
    hint: bi(
      "Tú solicitaste el código. La página verificada lo necesita; otras personas no.",
      "You requested the code. The verified page needs it; other people do not.",
    ),
  },
  {
    scene: bi(
      "Paso 4 · Una capa más de seguridad",
      "Step 4 · One more layer of security",
    ),
    context: bi(
      "Tu cuenta ficticia está verificada. ¿Qué paso ayuda a proteger una cuenta real?",
      "Your fictional account is verified. Which step helps protect a real account?",
    ),
    prompt: "Secure your account",
    translation: "Protege tu cuenta",
    options: [
      option(
        "Share my password with my group chat.",
        "Compartir mi contraseña con mi grupo de chat.",
      ),
      option(
        "Turn on multi-factor authentication and keep recovery codes private.",
        "Activar la autenticación de varios factores y guardar los códigos de recuperación en privado.",
      ),
      option(
        "Stay signed in on every school computer.",
        "Dejar mi sesión abierta en todas las computadoras escolares.",
      ),
    ],
    answer: 1,
    why: bi(
      "La autenticación de varios factores añade protección. Sigue las instrucciones oficiales del servicio y pide apoyo a tu escuela si lo necesitas.",
      "Multi-factor authentication adds protection. Follow the service’s official instructions and ask your school for support if needed.",
    ),
    hint: bi(
      "Una segunda forma de verificar tu identidad añade protección. Compartir secretos la reduce.",
      "A second way to verify your identity adds protection. Sharing secrets reduces it.",
    ),
  },
];
export const schoolQuestions = [
  {
    scene: bi("8:15 a. m. · Tu primera clase", "8:15 a.m. · Your first class"),
    context: bi(
      "Este horario es inventado. Son las 8:15 a. m. ¿A qué salón vas para tu primera clase?",
      "This schedule is fictional. It is 8:15 a.m. Which room do you go to for your first class?",
    ),
    document: "schedule",
    prompt: "Find your English class.",
    translation: "Encuentra tu clase de inglés.",
    options: [
      option("Room 204", "Salón 204"),
      option("Room 110", "Salón 110"),
      option("Cafeteria", "Cafetería"),
    ],
    answer: 0,
    why: bi(
      "English empieza a las 8:30 a. m. en el salón 204. Llegar un poco antes te da tiempo para encontrarlo.",
      "English starts at 8:30 a.m. in Room 204. Arriving a little early gives you time to find it.",
    ),
    hint: bi(
      "Busca la fila de English y lee la columna Room.",
      "Find the English row and read the Room column.",
    ),
  },
  {
    scene: bi("10:00 a. m. · Cambio de salón", "10:00 a.m. · A room change"),
    context: bi(
      "Antes de matemáticas, lees este anuncio. ¿A dónde debes ir hoy?",
      "Before math, you read this announcement. Where should you go today?",
    ),
    prompt: "TODAY ONLY: Math with Ms. Chen moves from Room 110 to Room 112.",
    translation:
      "SOLO POR HOY: Matemáticas con Ms. Chen cambia del salón 110 al salón 112.",
    options: [
      option("Room 110", "Salón 110"),
      option("Room 112", "Salón 112"),
      option("Library", "Biblioteca"),
    ],
    answer: 1,
    why: bi(
      "“Moves from… to…” indica un cambio. Hoy vas al salón 112; el horario normal sigue indicando 110.",
      "“Moves from… to…” signals a change. Today you go to Room 112; the regular schedule still says 110.",
    ),
    hint: bi(
      "La palabra “to” señala el nuevo lugar.",
      "The word “to” points to the new place.",
    ),
  },
  {
    scene: bi("12:00 p. m. · Hora del almuerzo", "12:00 p.m. · Lunch time"),
    context: bi(
      "Revisa tu horario. ¿Dónde almuerzas al mediodía?",
      "Check your schedule. Where do you have lunch at noon?",
    ),
    document: "schedule",
    prompt: "Where do I go for lunch?",
    translation: "¿A dónde voy para almorzar?",
    options: [
      option("Room 204", "Salón 204"),
      option("Office", "Oficina"),
      option("Cafeteria", "Cafetería"),
    ],
    answer: 2,
    why: bi(
      "Lunch significa almuerzo. A las 12:00 p. m., el horario indica Cafeteria.",
      "Lunch is the midday meal. At 12:00 p.m., the schedule says Cafeteria.",
    ),
    hint: bi(
      "Busca la fila con la palabra Lunch.",
      "Look for the row with the word Lunch.",
    ),
  },
  {
    scene: bi("Después de clase · Pide ayuda", "After class · Ask for help"),
    context: bi(
      "Quieres ayuda con tu tarea. Lee el aviso y elige el plan que coincide.",
      "You want help with your homework. Read the notice and choose the matching plan.",
    ),
    prompt:
      "Homework help: Tuesday and Thursday, 3:30–4:30 p.m., in the library. Bring your notebook.",
    translation:
      "Apoyo con la tarea: martes y jueves, de 3:30 a 4:30 p. m., en la biblioteca. Trae tu cuaderno.",
    options: [
      option(
        "Tuesday at 3:30 p.m. in the library, with my notebook.",
        "El martes a las 3:30 p. m. en la biblioteca, con mi cuaderno.",
      ),
      option(
        "Monday at 8:00 a.m. in the cafeteria.",
        "El lunes a las 8:00 a. m. en la cafetería.",
      ),
      option(
        "Thursday at 5:00 p.m. in Room 204.",
        "El jueves a las 5:00 p. m. en el salón 204.",
      ),
    ],
    answer: 0,
    why: bi(
      "Encontraste el día, la hora, el lugar y lo que debes llevar. En tu escuela real, confirma los horarios con tu docente.",
      "You found the day, time, place, and what to bring. At your real school, confirm times with your teacher.",
    ),
    hint: bi(
      "Revisa cuatro detalles: día, hora, lugar y material.",
      "Check four details: day, time, place, and supply.",
    ),
  },
];
export const emailFields = [
  {
    id: "recipient",
    label: bi("Para", "To"),
    hint: bi(
      "Escríbele a tu docente, Ms. Rivera. Todas las direcciones son ficticias.",
      "Write to your teacher, Ms. Rivera. All addresses are fictional.",
    ),
    options: [
      "friend@club.example",
      "ms.rivera@school.example",
      "office@school.example",
    ],
    answer: 1,
    why: bi(
      "Elige la dirección de Ms. Rivera: ms.rivera@school.example.",
      "Choose Ms. Rivera’s address: ms.rivera@school.example.",
    ),
  },
  {
    id: "subject",
    label: bi("Asunto", "Subject"),
    hint: bi("Resume por qué escribes.", "Summarize why you are writing."),
    options: ["Hello!!!", "Question about the homework", "No subject"],
    answer: 1,
    why: bi(
      "“Question about the homework” comunica el tema antes de abrir el correo.",
      "“Question about the homework” tells the reader the topic before opening the email.",
    ),
  },
  {
    id: "greeting",
    label: bi("Saludo", "Greeting"),
    hint: bi(
      "Un saludo amable empieza la conversación.",
      "A polite greeting starts the conversation.",
    ),
    options: ["Hey you!", "No greeting", "Hello Ms. Rivera,"],
    answer: 2,
    why: bi(
      "“Hello Ms. Rivera,” es un saludo amable que usa el nombre de tu docente.",
      "“Hello Ms. Rivera,” is a polite greeting using your teacher’s name.",
    ),
  },
  {
    id: "message",
    label: bi("Mensaje", "Message"),
    hint: bi(
      "Explica que necesitas ayuda con la tarea y pide apoyo después de clase.",
      "Explain that you need help with the homework and ask for support after class.",
    ),
    options: [
      "I need help with my homework. Could you help me after class?",
      "Help!!!",
      "Where is the cafeteria?",
    ],
    answer: 0,
    why: bi(
      "Explica con qué necesitas ayuda y haz una petición concreta: “Could you help me after class?”",
      "Explain what you need help with and make a specific request: “Could you help me after class?”",
    ),
  },
  {
    id: "closing",
    label: bi("Despedida y firma ficticia", "Closing and fictional signature"),
    hint: bi(
      "Agradece y usa el nombre de práctica, Alex.",
      "Say thank you and use the practice name, Alex.",
    ),
    options: ["Thank you, Alex", "Answer me NOW.", "No closing"],
    answer: 0,
    why: bi(
      "“Thank you, Alex” agradece el tiempo de tu docente y muestra quién escribe.",
      "“Thank you, Alex” thanks your teacher for their time and shows who is writing.",
    ),
  },
];
