export interface Pregunta {
  seccion?: string
  pregunta: string
  descripcion: string
  tipo: 'texto' | 'opcion'
  opciones?: string[]
}

export interface TipoPostulacion {
  clave: string
  nombre: string
  color: string
  descripcion: string
  preguntas: Pregunta[]
  icono: string
}

export const tipos: Record<string, TipoPostulacion> = {
  staff: {
    clave: 'staff',
    nombre: 'Staff',
    color: '#5865F2',
    descripcion:
      'El equipo de **Staff** es el pilar del servidor. Se encarga de moderar, mantener el orden y brindar ayuda a los miembros.\n\n**Lo que esperamos:**\n- Actividad constante en el servidor\n- Buen trato y paciencia con la comunidad\n- Compromiso y responsabilidad',
    icono: '🛡️',
    preguntas: [
      {
        seccion: '📋 Preguntas Generales (1/5)',
        pregunta: 'Nombre de Discord + ID de usuario',
        descripcion: 'Ejemplo: urugodd · 123456789012345678',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cuántos años tienes?',
        descripcion: 'Escribe solo el número',
        tipo: 'texto',
      },
      {
        pregunta: '¿De qué país eres?',
        descripcion: 'País de residencia actual',
        tipo: 'texto',
      },
      {
        pregunta: '¿Qué haces en tu tiempo libre? (estudio / trabajo / hobby)',
        descripcion: 'Cuéntanos un poco sobre vos fuera de Discord',
        tipo: 'texto',
      },
      {
        pregunta: '¿Desde qué dispositivo moderarías?',
        descripcion: 'El dispositivo principal desde el que estarías activo',
        tipo: 'opcion',
        opciones: ['PC', 'Celular', 'Ambos'],
      },
      {
        seccion: '📚 Preguntas Teóricas (6/15)',
        pregunta: '¿Tienes micrófono disponible si fuese necesario?',
        descripcion: 'Para reuniones o llamadas de equipo si se requiriesen',
        tipo: 'opcion',
        opciones: ['Sí', 'No'],
      },
      {
        pregunta: '¿Cuántas horas al día podrías dedicarle al servidor?',
        descripcion: 'Tiempo promedio que podrías dedicar diariamente',
        tipo: 'opcion',
        opciones: ['1-2 horas', '3-5 horas', 'Más de 5 horas'],
      },
      {
        pregunta: '¿Tienes experiencia moderando en otros servidores? ¿Cuáles?',
        descripcion: 'Si no tienes, escribe "No tengo experiencia previa"',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cuál crees que es el trabajo de un moderador?',
        descripcion: 'Desarrolla con tus propias palabras, sin buscar en internet',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes experiencia utilizando bots de Discord? Especifica (bots de moderación)',
        descripcion: 'Ej: Carl-bot, MEE6, Wick, bots propios, etc.',
        tipo: 'texto',
      },
      {
        pregunta: '¿Qué es un raid en Discord? ¿Cómo reaccionarías ante uno?',
        descripcion: 'Explica el concepto y describe los pasos que tomarías',
        tipo: 'texto',
      },
      {
        pregunta: 'Explica qué es flood, spam y walltext',
        descripcion: 'Define cada término brevemente con tus propias palabras',
        tipo: 'texto',
      },
      {
        pregunta: 'Si un grupo de usuarios comienza a hacer flood masivo, ¿cómo reaccionarías?',
        descripcion: 'Describe las acciones en orden: primero, segundo, tercero...',
        tipo: 'texto',
      },
      {
        pregunta: '¿Qué significa NSFW?',
        descripcion: 'Escribe el significado completo y en qué contextos aplica en Discord',
        tipo: 'texto',
      },
      {
        pregunta: '¿Qué son las ToS de Discord? ¿Cuáles consideras las más relevantes? (nombra al menos 2)',
        descripcion: 'ToS = Terms of Service / Términos de Servicio',
        tipo: 'texto',
      },
      {
        seccion: '⚙️ Preguntas Prácticas (16/25)',
        pregunta: '¿Qué harías si dos usuarios comienzan a insultarse en el chat general?',
        descripcion: 'Describe el proceso: advertencia, escalada, sanción',
        tipo: 'texto',
      },
      {
        pregunta: 'Describe tu manera de actuar si un usuario reporta a otro pero no tiene pruebas.',
        descripcion: '¿Qué le dirías a quien reporta? ¿Qué harías con el reportado?',
        tipo: 'texto',
      },
      {
        pregunta: 'Si ves a un compañero del equipo usando su rango para beneficio propio o sancionando sin razón, ¿qué harías y por qué?',
        descripcion: 'Sé honesto/a. No hay respuesta incorrecta.',
        tipo: 'texto',
      },
      {
        pregunta: 'Si tuvieras la posibilidad de hablar directamente con Uru, ¿le escribirías? ¿Por qué?',
        descripcion: 'Uru es el streamer y dueño del servidor',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes alguna sanción dentro del servidor? En caso de tenerla, ¿consideras que fue apropiada?',
        descripcion: 'Si no tienes, escribe "No tengo sanciones"',
        tipo: 'texto',
      },
      {
        pregunta: 'Un usuario nuevo llega al servidor y empieza a comportarse de manera inapropiada. Describe los pasos que seguirías.',
        descripcion: '¿Qué harías primero? ¿Cuándo aplicarías una sanción?',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cómo manejarías un ticket donde el usuario está muy enojado y usa lenguaje ofensivo hacia el staff?',
        descripcion: '¿Mantienes la calma? ¿Cómo lo calmarías? ¿Habría sanciones?',
        tipo: 'texto',
      },
      {
        pregunta: 'Se detecta un posible raid: 10 cuentas nuevas entran al mismo tiempo. ¿Cuáles son tus primeros pasos?',
        descripcion: 'Considera las herramientas disponibles: roles, canales, bots, etc.',
        tipo: 'texto',
      },
      {
        pregunta: '¿Por qué deberíamos elegirte a ti sobre otros candidatos?',
        descripcion: 'Esta es tu oportunidad de destacar — ¡convéncenos!',
        tipo: 'texto',
      },
      {
        pregunta: 'Si tienes algo más para agregar que debamos saber, hazlo aquí. Si no, déjalo en blanco.',
        descripcion: 'Opcional — podés escribir "Sin comentarios adicionales"',
        tipo: 'texto',
      },
    ],
  },
  developer: {
    clave: 'developer',
    nombre: 'Developer',
    color: '#57F287',
    descripcion:
      'El equipo de **Developer** se encarga de crear, mantener y mejorar el bot y las herramientas del servidor.\n\n**Lo que esperamos:**\n- Conocimientos de programación (Python / JS preferible)\n- Experiencia con la API de Discord\n- Responsabilidad y disponibilidad',
    icono: '💻',
    preguntas: [
      {
        seccion: '📋 Preguntas Generales (1/5)',
        pregunta: 'Nombre de Discord + ID de usuario',
        descripcion: 'Ejemplo: urugodd · 123456789012345678',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cuántos años tienes?',
        descripcion: 'Escribe solo el número',
        tipo: 'texto',
      },
      {
        pregunta: '¿De qué país eres?',
        descripcion: 'País de residencia actual',
        tipo: 'texto',
      },
      {
        pregunta: '¿Qué haces en tu tiempo libre? (estudio / trabajo / hobby)',
        descripcion: 'Cuéntanos un poco sobre vos fuera de Discord',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cuántas horas semanales podrías dedicar al desarrollo del servidor?',
        descripcion: 'Tiempo promedio a la semana, no al día',
        tipo: 'opcion',
        opciones: ['1-5 horas', '6-15 horas', 'Más de 15 horas'],
      },
      {
        seccion: '📚 Preguntas Teóricas (6/15)',
        pregunta: '¿Qué lenguajes de programación conoces? Describe brevemente tu nivel en cada uno.',
        descripcion: 'Ej: Python (intermedio), JavaScript (básico), etc.',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes experiencia con la API de Discord?',
        descripcion: 'Wrappers de la API oficial de Discord',
        tipo: 'opcion',
        opciones: ['Sí, con discord.py', 'Sí, con discord.js', 'Ambos', 'Solo la API REST', 'No, pero aprendo rápido'],
      },
      {
        pregunta: '¿Has desarrollado bots de Discord antes? Descríbelos brevemente.',
        descripcion: 'Si no tienes, escribe "No he desarrollado bots aún"',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes GitHub o portfolio? Comparte el enlace (o escribe "No tengo").',
        descripcion: 'Proyectos públicos, repositorios, demos, etc.',
        tipo: 'texto',
      },
      {
        pregunta: '¿Qué es un webhook en Discord? ¿Para qué se usa?',
        descripcion: 'Explica con tus propias palabras, sin buscar en internet',
        tipo: 'texto',
      },
      {
        pregunta: '¿Qué es MongoDB? ¿Tienes experiencia con bases de datos NoSQL?',
        descripcion: 'El bot usa MongoDB como base de datos',
        tipo: 'texto',
      },
      {
        pregunta: '¿Qué es el rate limit de la API de Discord y cómo lo manejarías en el código?',
        descripcion: 'Límite de peticiones — describe cómo evitarías errores 429',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes experiencia con sistemas de hosting, VPS o plataformas como Discloud?',
        descripcion: 'El bot está hosteado en Discloud',
        tipo: 'opcion',
        opciones: ['Sí, bastante', 'Algo de experiencia', 'No, pero quiero aprender'],
      },
      {
        pregunta: '¿Qué son los slash commands y en qué se diferencian de los prefix commands?',
        descripcion: 'Ej: /ban vs !ban — explica las diferencias principales',
        tipo: 'texto',
      },
      {
        pregunta: '¿Por qué quieres ser Developer del servidor?',
        descripcion: 'Desarrolla con tus propias palabras tu motivación real',
        tipo: 'texto',
      },
      {
        seccion: '⚙️ Preguntas Prácticas (16/25)',
        pregunta: 'El bot lanza este error: `AttributeError: \'NoneType\' object has no attribute \'id\'`. ¿Cómo lo debuggearías?',
        descripcion: 'Describe el proceso de diagnóstico paso a paso',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cómo diseñarías un sistema de sanciones con historial por usuario en MongoDB?',
        descripcion: 'Describe la estructura de documentos y las operaciones principales',
        tipo: 'texto',
      },
      {
        pregunta: 'Se reporta que el bot no responde a comandos en algunos canales. ¿Cuáles son tus primeros pasos?',
        descripcion: 'Piensa en permisos, errores silenciosos, logs, etc.',
        tipo: 'texto',
      },
      {
        pregunta: 'Un usuario encuentra una forma de explotar un comando para obtener permisos elevados. ¿Qué harías?',
        descripcion: 'Tanto la solución técnica como la comunicación al equipo',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cómo manejarías la comunicación con el equipo de staff sobre cambios importantes en el bot?',
        descripcion: 'Changelogs, avisos, pruebas previas, etc.',
        tipo: 'texto',
      },
      {
        pregunta: 'Describe cómo implementarías un sistema básico de auto-moderación contra spam.',
        descripcion: 'Qué datos guardarías, qué reglas aplicarías, cómo sancionarías',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cómo organizarías el código de un bot grande con múltiples cogs y módulos?',
        descripcion: 'Estructura de carpetas, separación de responsabilidades, etc.',
        tipo: 'texto',
      },
      {
        pregunta: 'Hay un conflicto entre tu código y el de otro developer del equipo. ¿Cómo lo resolvés?',
        descripcion: 'Tanto a nivel técnico (git, merge) como a nivel personal',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes alguna sanción dentro del servidor? En caso de tenerla, ¿consideras que fue apropiada?',
        descripcion: 'Si no tienes, escribe "No tengo sanciones"',
        tipo: 'texto',
      },
      {
        pregunta: 'Si tienes algo más para agregar que debamos saber, hazlo aquí. Si no, déjalo en blanco.',
        descripcion: 'Opcional — podés escribir "Sin comentarios adicionales"',
        tipo: 'texto',
      },
    ],
  },
  disenador: {
    clave: 'disenador',
    nombre: 'Diseñador',
    color: '#FF73FA',
    descripcion:
      'El equipo de **Diseño** crea los assets visuales del servidor: banners, íconos, emojis, plantillas y más.\n\n**Lo que esperamos:**\n- Conocimiento en herramientas de diseño\n- Creatividad y buen gusto visual\n- Disponibilidad para crear contenido',
    icono: '🎨',
    preguntas: [
      {
        seccion: '📋 Preguntas Generales (1/5)',
        pregunta: 'Nombre de Discord + ID de usuario',
        descripcion: 'Ejemplo: urugodd · 123456789012345678',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cuántos años tienes?',
        descripcion: 'Escribe solo el número',
        tipo: 'texto',
      },
      {
        pregunta: '¿De qué país eres?',
        descripcion: 'País de residencia actual',
        tipo: 'texto',
      },
      {
        pregunta: '¿Qué haces en tu tiempo libre? (estudio / trabajo / hobby)',
        descripcion: 'Cuéntanos un poco sobre vos fuera de Discord',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cuántas horas semanales podrías dedicar al diseño del servidor?',
        descripcion: 'Tiempo promedio a la semana disponible para crear contenido',
        tipo: 'opcion',
        opciones: ['1-3 horas', '4-8 horas', 'Más de 8 horas'],
      },
      {
        seccion: '📚 Preguntas Teóricas (6/15)',
        pregunta: '¿Qué programas de diseño utilizas principalmente?',
        descripcion: 'El que uses con más frecuencia para tus proyectos',
        tipo: 'opcion',
        opciones: ['Photoshop / Illustrator', 'Figma', 'Canva', 'Affinity', 'Otro'],
      },
      {
        pregunta: '¿Cuánto tiempo llevas diseñando? Describe brevemente tu experiencia.',
        descripcion: 'Años de experiencia y en qué tipo de proyectos trabajaste',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes experiencia creando assets para Discord (banners, íconos, emojis, plantillas)?',
        descripcion: 'Describe qué tipo de assets hiciste y para qué proyectos',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes portfolio o ejemplos de tu trabajo? Comparte el enlace o describe tu estilo visual.',
        descripcion: 'Behance, ArtStation, Instagram, Drive, o cualquier otro medio',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cuál es tu estilo de diseño preferido?',
        descripcion: 'El estilo en el que te sentís más cómodo/a creando',
        tipo: 'opcion',
        opciones: ['Minimalista', 'Dark / Oscuro', 'Colorido / Vibrante', 'Ilustración / Anime', 'Otro'],
      },
      {
        pregunta: '¿Tienes experiencia con animaciones, GIFs o APNG?',
        descripcion: 'Discord soporta GIFs animados y APNG para emojis',
        tipo: 'opcion',
        opciones: ['Sí, bastante', 'Algo de experiencia', 'No'],
      },
      {
        pregunta: '¿Sabes qué es el branding? ¿Has trabajado con identidad visual de algún proyecto?',
        descripcion: 'Paleta de colores, tipografía, coherencia visual, etc.',
        tipo: 'texto',
      },
      {
        pregunta: '¿Conoces los formatos de exportación para Discord (PNG, GIF, APNG, WEBP) y sus limitaciones?',
        descripcion: 'Ej: tamaño máximo de emojis, resolución de banners, etc.',
        tipo: 'texto',
      },
      {
        pregunta: '¿Puedes trabajar bajo plazos o deadlines ajustados?',
        descripcion: 'A veces se necesita contenido con urgencia para eventos del servidor',
        tipo: 'opcion',
        opciones: ['Sí, sin problema', 'Depende del plazo', 'Me cuesta un poco'],
      },
      {
        pregunta: '¿Por qué quieres ser Diseñador del servidor?',
        descripcion: 'Tu motivación real — ¿qué te atrae de este rol?',
        tipo: 'texto',
      },
      {
        seccion: '⚙️ Preguntas Prácticas (16/25)',
        pregunta: 'Se necesita un banner de bienvenida (1024x512). ¿Qué información incluirías y cómo lo diseñarías?',
        descripcion: 'Elementos visuales, texto, colores, jerarquía, etc.',
        tipo: 'texto',
      },
      {
        pregunta: 'El staff quiere renovar el ícono del servidor. ¿Cómo presentarías opciones y cuál sería tu proceso creativo?',
        descripcion: 'Bocetos, variantes, presentación al equipo, iteraciones, etc.',
        tipo: 'texto',
      },
      {
        pregunta: 'Un miembro del equipo te pide un diseño urgente para mañana y tienes poco tiempo. ¿Cómo lo manejás?',
        descripcion: '¿Aceptarías? ¿Cómo priorizarías? ¿Qué le comunicarías al equipo?',
        tipo: 'texto',
      },
      {
        pregunta: 'Se te da libertad creativa total para crear un emoji animado del servidor. Describe tu idea.',
        descripcion: 'Concepto, colores, movimiento, qué expresaría el emoji',
        tipo: 'texto',
      },
      {
        pregunta: 'El staff rechaza tu diseño pero no explica bien el motivo. ¿Cómo reaccionas?',
        descripcion: '¿Pedís feedback? ¿Iterás igual? ¿Cómo manejás la crítica?',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cómo adaptarías un diseño para que se vea bien tanto en modo claro como en modo oscuro de Discord?',
        descripcion: 'Contraste, fondos transparentes, colores que funcionen en ambos modos',
        tipo: 'texto',
      },
      {
        pregunta: 'Se necesitan 10 emojis personalizados con coherencia visual entre sí. ¿Por dónde empezarías?',
        descripcion: 'Define paleta, estilo, tamaño, proceso de producción',
        tipo: 'texto',
      },
      {
        pregunta: 'Alguien del staff quiere una plantilla para anuncios del servidor. Describe qué elementos incluirías y por qué.',
        descripcion: 'Encabezado, cuerpo, colores, tipografía, espacio para texto variable',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes alguna sanción dentro del servidor? En caso de tenerla, ¿consideras que fue apropiada?',
        descripcion: 'Si no tienes, escribe "No tengo sanciones"',
        tipo: 'texto',
      },
      {
        pregunta: 'Si tienes algo más para agregar que debamos saber, hazlo aquí. Si no, déjalo en blanco.',
        descripcion: 'Opcional — podés escribir "Sin comentarios adicionales"',
        tipo: 'texto',
      },
    ],
  },
  tickets: {
    clave: 'tickets',
    nombre: 'Tickets',
    color: '#FF9400',
    descripcion:
      'El equipo de **Tickets** atiende las consultas, reportes y solicitudes de los miembros del servidor, siendo la primera línea de soporte.\n\n**Lo que esperamos:**\n- Paciencia y buen trato\n- Disponibilidad para atender tickets\n- Capacidad de resolver problemas',
    icono: '🎫',
    preguntas: [
      {
        seccion: '📋 Preguntas Generales (1/5)',
        pregunta: 'Nombre de Discord + ID de usuario',
        descripcion: 'Ejemplo: urugodd · 123456789012345678',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cuántos años tienes?',
        descripcion: 'Escribe solo el número',
        tipo: 'texto',
      },
      {
        pregunta: '¿De qué país eres?',
        descripcion: 'País de residencia actual',
        tipo: 'texto',
      },
      {
        pregunta: '¿Qué haces en tu tiempo libre? (estudio / trabajo / hobby)',
        descripcion: 'Cuéntanos un poco sobre vos fuera de Discord',
        tipo: 'texto',
      },
      {
        pregunta: '¿Desde qué dispositivo gestionarías los tickets?',
        descripcion: 'El dispositivo principal desde el que estarías disponible',
        tipo: 'opcion',
        opciones: ['PC', 'Celular', 'Ambos'],
      },
      {
        seccion: '📚 Preguntas Teóricas (6/15)',
        pregunta: '¿Tienes micrófono disponible si fuese necesario?',
        descripcion: 'Para casos donde una llamada pueda resolver mejor el ticket',
        tipo: 'opcion',
        opciones: ['Sí', 'No'],
      },
      {
        pregunta: '¿Cuántas horas al día podrías dedicar a atender tickets?',
        descripcion: 'Tiempo promedio disponible diariamente para atención',
        tipo: 'opcion',
        opciones: ['1-2 horas', '3-5 horas', 'Más de 5 horas'],
      },
      {
        pregunta: '¿Tienes experiencia atendiendo soporte o tickets en otros servidores? ¿Cuáles?',
        descripcion: 'Si no tienes, escribe "No tengo experiencia previa"',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cuál crees que es el objetivo principal del equipo de tickets?',
        descripcion: 'Con tus propias palabras — no hay una sola respuesta correcta',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cómo describirías un buen servicio al usuario en Discord?',
        descripcion: 'Qué hace a alguien un buen agente de soporte',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes experiencia con sistemas de tickets de Discord? Especifica.',
        descripcion: 'Ej: Carl-bot, Ticket Tool, bots propios, etc.',
        tipo: 'texto',
      },
      {
        pregunta: '¿Sabes qué significa NSFW? ¿Cómo actuarías ante un reporte de contenido inapropiado?',
        descripcion: 'Escribe el significado completo y describe tu accionar',
        tipo: 'texto',
      },
      {
        pregunta: '¿Cuáles consideras las reglas más importantes de un servidor de Discord?',
        descripcion: 'Nombra al menos 3 y explica brevemente por qué son importantes',
        tipo: 'texto',
      },
      {
        pregunta: 'Si tienes 5 tickets abiertos al mismo tiempo, ¿cómo priorizas cuál atender primero?',
        descripcion: 'Urgencia, tipo de problema, tiempo de espera del usuario, etc.',
        tipo: 'texto',
      },
      {
        pregunta: '¿Por qué quieres encargarte de los tickets del servidor?',
        descripcion: 'Tu motivación real — ¿qué te atrae de este rol?',
        tipo: 'texto',
      },
      {
        seccion: '⚙️ Preguntas Prácticas (16/25)',
        pregunta: 'Un usuario abre un ticket diciendo que fue baneado injustamente, pero no tiene pruebas. ¿Cómo lo manejas?',
        descripcion: '¿Qué le preguntarías? ¿A quién escalarías el caso?',
        tipo: 'texto',
      },
      {
        pregunta: 'Recibes un ticket de alguien muy enojado que insulta directamente al staff. ¿Cómo reaccionas?',
        descripcion: '¿Mantienes la calma? ¿Cómo lo calmarías? ¿Habría consecuencias?',
        tipo: 'texto',
      },
      {
        pregunta: 'Un usuario abre 3 tickets seguidos por el mismo motivo porque no recibió respuesta. ¿Qué harías?',
        descripcion: '¿Cómo evitarías esto? ¿Cómo lo resolverías si ya pasó?',
        tipo: 'texto',
      },
      {
        pregunta: 'Te llega un ticket reportando a un moderador por abuso de poder. ¿Cómo procedes?',
        descripcion: '¿Lo manejas vos? ¿Lo escalarías? ¿A quién?',
        tipo: 'texto',
      },
      {
        pregunta: 'Un usuario reporta spam masivo en un canal pero tú no tienes permisos de moderación. ¿Qué harías?',
        descripcion: '¿A quién avisás? ¿Cómo actúas mientras esperás respuesta?',
        tipo: 'texto',
      },
      {
        pregunta: 'Alguien abre un ticket preguntando cómo obtener un rol que no existe en el servidor. ¿Cómo lo atiendes?',
        descripcion: '¿Le explicás? ¿Le ofrecés alternativas? ¿Cierras el ticket?',
        tipo: 'texto',
      },
      {
        pregunta: 'Un usuario pide información personal/privada de otro miembro del servidor. ¿Cómo manejas la situación?',
        descripcion: 'Privacidad, política del servidor, cómo responderías sin generar conflicto',
        tipo: 'texto',
      },
      {
        pregunta: 'Describe tu manera de actuar si un usuario reporta a otro pero te dice que no tiene pruebas.',
        descripcion: '¿Investigan igual? ¿Le pedís que recopile evidencia? ¿Cerrás el ticket?',
        tipo: 'texto',
      },
      {
        pregunta: '¿Tienes alguna sanción dentro del servidor? En caso de tenerla, ¿consideras que fue apropiada?',
        descripcion: 'Si no tienes, escribe "No tengo sanciones"',
        tipo: 'texto',
      },
      {
        pregunta: 'Si tienes algo más para agregar que debamos saber, hazlo aquí. Si no, déjalo en blanco.',
        descripcion: 'Opcional — podés escribir "Sin comentarios adicionales"',
        tipo: 'texto',
      },
    ],
  },
}

export function getTipo(clave: string): TipoPostulacion | undefined {
  return tipos[clave]
}

export function getSecciones(preguntas: Pregunta[]): { nombre: string; preguntas: Pregunta[] }[] {
  const secciones: { nombre: string; preguntas: Pregunta[] }[] = []
  let current: { nombre: string; preguntas: Pregunta[] } | null = null

  for (const p of preguntas) {
    if (p.seccion) {
      current = { nombre: p.seccion, preguntas: [] }
      secciones.push(current)
    }
    if (current) {
      current.preguntas.push(p)
    }
  }

  return secciones
}
