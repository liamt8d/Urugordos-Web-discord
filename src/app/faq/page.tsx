'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const faqGroups = [
  {
    category: 'Niveles y Experiencia',
    items: [
      {
        q: '¿Cómo funciona el sistema de niveles y cómo gano experiencia?',
        a: `El sistema de niveles funciona con experiencia (XP) que ganas automáticamente al participar activamente en el servidor.

**¿Cómo ganas XP?**

- **Chat**: 0-30 XP por mensaje en canales de texto (cooldown de 30 segundos entre mensajes).
- **Voz**: 0-45 XP por minuto en canales de voz (necesitas estar al menos 5 minutos para que empiece a contar).
- **Eventos**: Participar en eventos y dinámicas del servidor otorga XP extra.

**Consideraciones importantes:**

- Enviar mensajes muy rápido no te dará más XP — el cooldown lo impide.
- El XP acumulado es permanente y no se pierde si sales del servidor.
- Cada nivel requiere más XP que el anterior, así que subir se vuelve más difícil con el tiempo.

Para más detalles sobre la obtención de XP y roles especiales, visita [¿Cómo obtener los roles?](/roles/beneficios/obtencion).`,
      },
      {
        q: '¿Qué recompensas obtengo al subir de nivel?',
        a: `Al alcanzar ciertos niveles (3, 5, 10, 20, 30, etc.), el sistema te asigna automáticamente roles que desbloquean ventajas dentro del servidor. Cada nivel otorga permisos progresivos:

- **Niveles bajos (3–10)**: Cambio de apodo, adjuntar archivos, enviar enlaces.
- **Niveles medios (20–50)**: Stickers y emojis externos, sonidos, vídeo en voz, GIFs directos.
- **Niveles altos (60–100)**: Salas privadas, reacciones ilimitadas, encuestas, gradientes de color, canales premium.

Para ver la lista completa de todos los niveles y sus beneficios, visita [Beneficios por Nivel](/roles/beneficios).`,
      },
      {
        q: '¿Pierdo mi nivel y mi experiencia si abandono el servidor?',
        a: `No, tu nivel y experiencia no se pierden si abandonas el servidor. Los datos de XP quedan registrados en nuestra base de datos.

Sin embargo, al regresar tendrás que **volver a subir de nivel** para recuperar los roles de nivel que tenías asignados. El sistema te reasignará los roles automáticamente a medida que recuperes el progreso, pero no los tendrás de inmediato al reingresar.

Para evitar esto, recomendamos no abandonar el servidor si has invertido tiempo en subir de nivel.`,
      },
    ],
  },
  {
    category: 'Apelaciones y Sanciones',
    items: [
      {
        q: 'Fui sancionado (mute/ban), ¿cómo puedo apelar la decisión?',
        a: `Si fuiste sancionado con un mute o ban y consideras que fue injusto o un malentendido, puedes apelar la decisión a través de nuestro formulario web. No se aceptan apelaciones por tickets de Discord.

**Pasos para apelar:**
1. Ingresa a [/apelar](/apelar)
2. Completa el formulario con tu **usuario de Discord**, el **motivo de la sanción** y tu **versión de los hechos**
3. Envía la apelación y espera la revisión del staff

El equipo evaluará tu caso y te responderá en un plazo de **1 a 7 días**. No intentes contactar a los moderadores por privado ni crear cuentas alternativas para evadir la sanción, ya que esto empeorará tu situación.`,
      },
      {
        q: '¿Cuánto tiempo tarda el staff en revisar una apelación?',
        a: `El equipo de moderación revisa las apelaciones en cuanto le es posible, pero el tiempo puede variar según la cantidad de casos pendientes.

El plazo estimado es de **1 a 7 días como máximo**. Te pedimos paciencia durante este proceso.

**Importante**: enviar mensajes privados a los moderadores, abrir múltiples tickets o insistir repetidamente hará que tu caso sea rechazado automáticamente.`,
      },
      {
        q: '¿Puedo apelar una advertencia (warn)?',
        a: `Las advertencias (warns) son sanciones leves que se aplican por faltas menores como spam, comportamiento inapropiado o incumplimiento de reglas básicas.

Por lo general, **no son apelables** a menos que tengas pruebas claras de que fue un error del bot o del moderador. Si crees que la advertencia fue injusta, puedes:

- Abrir un ticket en [Discord](https://discord.com/channels/1333180919112273993/1500961451836178604)
- Usar el formulario web en [/apelar](/apelar)

Ten en cuenta que acumular varias advertencias puede resultar en sanciones mayores como mute temporal o ban. Revisa las [reglas del servidor](/reglas) para evitar futuras sanciones.`,
      },
    ],
  },
  {
    category: 'Uso de Comandos',
    items: [
      {
        q: '¿En qué canales puedo utilizar los comandos de los bots?',
        a: `Para mantener el orden y la legibilidad en el servidor, los comandos de bots están restringidos a canales específicos según su tipo:

- **#comandos**: Aquí se usan todos los comandos de economía, niveles, interacción, música y diversión en general. Es el canal principal para interactuar con los bots.
- **Canales de voz**: Algunos bots permiten comandos de música directamente en el chat de texto del canal de voz donde estás conectado.
- **Canales de staff**: Los comandos de moderación y administración solo funcionan en canales visibles para el equipo de staff.
- **Canales generales**: Comandos básicos como "/rank" o "/perfil" suelen funcionar en cualquier canal de texto público.

Si un comando no responde en el canal donde lo escribiste, prueba en #comandos. Si aún así no funciona, puede ser un problema de permisos o de nivel (revisa la pregunta anterior). Si el error persiste, abre un ticket en [Discord](https://discord.com/channels/1333180919112273993/1500961451836178604).`,
      },
      {
        q: '¿Por qué el bot me dice que no tengo permisos para usar un comando?',
        a: `Hay varias razones por las que un bot puede denegarte el uso de un comando:

- **Canal incorrecto**: La mayoría de los comandos deben usarse en #comandos para mantener el orden. Si intentas usarlos en canales generales, el bot los bloqueará.
- **Nivel insuficiente**: Algunos comandos requieren un nivel mínimo de experiencia. Revisa los beneficios por nivel para saber qué desbloqueas.
- **Rol necesario**: Ciertos comandos son exclusivos para Boosters, miembros de YouTube o el equipo de staff.
- **Cooldown activo**: Los comandos tienen un tiempo de espera entre usos para evitar spam. Espera unos segundos y vuelve a intentar.
- **Permisos de Discord**: El comando puede requerir permisos específicos (como gestionar mensajes o expulsar miembros) que solo el staff posee.

Si el comando es público y aún así te da error, verifica que estás en el canal correcto (#comandos) y que tu nivel de experiencia sea suficiente. Si el problema persiste, abre un ticket en [Discord](https://discord.com/channels/1333180919112273993/1500961451836178604) para que el staff lo revise.`,
      },
    ],
  },
  {
    category: 'Servidor y Boosters',
    items: [
      {
        q: '¿Qué es el Server Boosting y cómo mejoro el servidor?',
        a: `El Server Boosting es una función de Discord que permite a los usuarios otorgar ventajas colectivas a sus comunidades favoritas. Al usar una mejora en nuestro servidor, nos ayudas a desbloquear más espacios para emojis, mejor calidad de audio en canales de voz, mayor límite de tamaño para la subida de archivos y opciones avanzadas de personalización estética que benefician a todos los miembros.

**Beneficios por apoyar al servidor**

Todos los usuarios que decidan aplicar una mejora recibirán de forma inmediata estas ventajas exclusivas.`,
        extra: (
          <div className="boost-grid">
            <div className="boost-card">
              <h4>Rol Exclusivo Nitro Booster</h4>
              <p>Un rol especial con un color distintivo que te posicionará en la parte superior de la lista de miembros en línea, destacando tu apoyo.</p>
            </div>
            <div className="boost-card">
              <h4>Permisos Multimedia Avanzados</h4>
              <p>Acceso inmediato para enviar GIFs directamente, usar stickers externos y utilizar emojis de otros servidores en cualquier canal de texto público.</p>
            </div>
            <div className="boost-card">
              <h4>Rol de Color Personalizado</h4>
              <p>Puedes solicitar un rol con el color HEX que quieras y un nombre exclusivo. Abre un ticket de "Reclamar recompensa" para pedirlo.</p>
            </div>
            <div className="boost-card">
              <h4>Canales VIP Exclusivos</h4>
              <p>Acceso directo a salas de chat de texto y canales de voz privados creados únicamente para los aportadores y el equipo del staff.</p>
            </div>
          </div>
        ),
        extraAfter: `**Cómo mejorar el servidor: paso a paso**

*Desde la Aplicación de Escritorio (PC / Mac)*

1. Dirígete a la barra lateral izquierda y haz clic en el nombre del servidor (parte superior de la lista de canales).
2. En el menú desplegable, selecciona "Mejora de servidor" (Server Boost).
3. Se abrirá una ventana con el nivel actual del servidor. Haz clic en "Mejorar este servidor".
4. Selecciona la cantidad de mejoras a aplicar (con Nitro mensual o anual tienes 2 mejoras incluidas).
5. Confirma la selección. El sistema anunciará tu mejora automáticamente en el canal general.

*Desde Dispositivos Móviles (Android / iOS)*

1. Abre Discord y accede al servidor.
2. Desliza hacia la derecha para abrir el menú lateral y toca los tres puntos junto al nombre del servidor.
3. Desplázate y selecciona el icono de diamante "Mejorar".
4. Toca "Mejorar este servidor" y confirma el número de Boosts.
5. Sigue las instrucciones de facturación en pantalla.

**Preguntas frecuentes sobre el Server Boosting**

**¿Las mejoras del servidor son permanentes?**
No. Las mejoras permanecen activas mientras mantengas tu suscripción a Discord Nitro activa o mientras dejes la mejora asignada a nuestra comunidad.

**¿Puedo transferir mi Boost a otro servidor?**
Sí, Discord permite transferir mejoras a otra comunidad, pero hay un período de enfriamiento (cooldown) obligatorio de 7 días antes de poder mover esa misma mejora de nuevo.

**¿Qué ocurre si dejo de mejorar el servidor?**
Si tu suscripción expira o remueves la mejora, el sistema retirará los roles exclusivos y los permisos especiales asociados de forma automática hasta que se vuelva a recibir un nuevo Boost.

*Más información en [Preguntas frecuentes sobre las Mejoras del servidor](https://support.discord.com/hc/es/articles/360028038352-Preguntas-frecuentes-sobre-las-Mejoras-del-servidor)*`,
      },
      {
        q: '¿Cómo reclamo mi rol de color personalizado por ser Booster?',
        a: `Una vez que el sistema anuncie tu mejora en el servidor, dirígete al canal de tickets en [Discord](https://discord.com/channels/1333180919112273993/1500961451836178604) y abre un ticket de "Reclamar recompensa". Indica el color en formato HEX (ej. #FF5733) y el nombre que quieres para tu rol exclusivo, y un administrador te lo asignará. Este beneficio es solo para quienes aportan una mejora al servidor.`,
      },
      {
        q: '¿Qué pasa con mis beneficios si mi suscripción a Nitro expira?',
        a: 'Si tu mejora de servidor expira o la retiras manualmente, Discord quitará automáticamente el rol de Nitro Booster. Como consecuencia, perderás temporalmente el rol exclusivo, el color personalizado, los permisos multimedia avanzados y el acceso a los canales VIP. Estos beneficios se restaurarán automáticamente si vuelves a mejorar el servidor, sin necesidad de solicitarlo.',
      },
    ],
  },
]

export default function FAQPage() {
  const [active, setActive] = useState<string>(faqGroups[0].items[0].q)

  const flat = faqGroups.flatMap(g => g.items)
  const current = flat.find(f => f.q === active)

  const fmt = (t: string) => t
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" style="color:#b06040;text-decoration:none;font-weight:600">$1</a>')
    .replace(/\n/g, '<br>')

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">FAQ</span>
            <h1>Preguntas Frecuentes</h1>
            <p>Todas las respuestas a tus dudas sobre la comunidad.</p>
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-grid">
            <div className="faq-sidebar">
              {faqGroups.map(group => (
                <div key={group.category}>
                  <h3 className="faq-category">{group.category}</h3>
                  {group.items.map(f => (
                    <button
                      key={f.q}
                      className={`faq-btn${active === f.q ? ' active' : ''}`}
                      onClick={() => setActive(f.q)}
                    >
                      {f.q}
                    </button>
                  ))}
                </div>
              ))}
              <a href="https://discord.com/channels/1333180919112273993/1500961451836178604" target="_blank" rel="noreferrer" className="faq-btn faq-btn-ticket">
                ¿No encuentras tu pregunta? Abre un ticket →
              </a>
            </div>
            <div className="faq-answer">
              <span aria-hidden="true" className="faq-answer-corner faq-answer-corner--tl" />
              <span aria-hidden="true" className="faq-answer-corner faq-answer-corner--tr" />
              <span aria-hidden="true" className="faq-answer-corner faq-answer-corner--bl" />
              <span aria-hidden="true" className="faq-answer-corner faq-answer-corner--br" />
              {current && (
                <div key={active} className="faq-answer-inner">
                  <h2 className="faq-answer-q">{current.q}</h2>
                  <p className="faq-answer-a" dangerouslySetInnerHTML={{ __html: fmt(current.a) }} />
                  {'extra' in current && current.extra}
                  {'extraAfter' in current && (
                    <p className="faq-answer-a faq-answer-after" dangerouslySetInnerHTML={{ __html: fmt(current.extraAfter || '') }} />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        html { scrollbar-gutter: stable; }
        .hero-small h1 {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
        }
        .hero-badge {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .faq-section {
          max-width: 64rem;
          margin: 0 auto;
          padding: 0 1rem 5rem;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr 3fr;
          }
        }
        .faq-sidebar {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .faq-category {
          font-family: 'Cinzel', serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.25rem;
          margin-top: 0.5rem;
        }
        .faq-category:first-child {
          margin-top: 0;
        }
        .faq-btn {
          width: 100%;
          text-align: left;
          padding: 0.85rem 1rem;
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.65);
          font-family: 'Onest', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          line-height: 1.4;
        }
        .faq-btn:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }
        .faq-btn.active {
          background: rgba(176,96,64,0.12);
          border-color: #b06040;
          color: #fff;
          font-weight: 600;
        }
        .faq-btn-ticket {
          display: block;
          text-align: center;
          margin-top: 0.5rem;
          color: #b06040;
          font-weight: 600;
          text-decoration: none;
          border-style: dashed;
          border-color: rgba(176,96,64,0.3);
        }
        .faq-btn-ticket:hover {
          background: rgba(176,96,64,0.1);
          border-color: #b06040;
          color: #fff;
        }
        .faq-answer {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          padding: 2rem;
          min-height: 200px;
          overflow: hidden;
        }
        .faq-answer-corner {
          position: absolute;
          width: 0.6rem;
          height: 0.6rem;
          pointer-events: none;
          transition: border-color 0.4s;
          opacity: 0.3;
        }
        .faq-answer-corner--tl {
          top: 0.4rem;
          left: 0.4rem;
          border-top: 1.5px solid #b06040;
          border-left: 1.5px solid #b06040;
        }
        .faq-answer-corner--tr {
          top: 0.4rem;
          right: 0.4rem;
          border-top: 1.5px solid #b06040;
          border-right: 1.5px solid #b06040;
        }
        .faq-answer-corner--bl {
          bottom: 0.4rem;
          left: 0.4rem;
          border-bottom: 1.5px solid #b06040;
          border-left: 1.5px solid #b06040;
        }
        .faq-answer-corner--br {
          bottom: 0.4rem;
          right: 0.4rem;
          border-bottom: 1.5px solid #b06040;
          border-right: 1.5px solid #b06040;
        }
        .faq-answer:hover .faq-answer-corner {
          opacity: 1;
        }
        .faq-answer-inner {
          animation: faqFadeIn 0.35s ease-out;
        }
        @keyframes faqFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (min-width: 640px) {
          .faq-answer-corner { width: 0.75rem; height: 0.75rem; }
          .faq-answer-corner--tl { top: 0.5rem; left: 0.5rem; }
          .faq-answer-corner--tr { top: 0.5rem; right: 0.5rem; }
          .faq-answer-corner--bl { bottom: 0.5rem; left: 0.5rem; }
          .faq-answer-corner--br { bottom: 0.5rem; right: 0.5rem; }
        }
        .faq-answer-q {
          font-family: 'Cinzel', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1rem;
        }
        .faq-answer-a {
          font-size: 0.95rem;
          opacity: 0.7;
          line-height: 1.7;
          white-space: pre-wrap;
        }
        .faq-answer-after {
          margin-top: 1rem;
        }
        .boost-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1.5rem 0;
        }
        @media (max-width: 600px) {
          .boost-grid { grid-template-columns: 1fr; }
        }
        .boost-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          padding: 1.25rem;
          transition: border-color 0.25s, background 0.25s;
        }
        .boost-card:hover {
          border-color: #f477d5;
          background: rgba(255,255,255,0.06);
        }
        .boost-card h4 {
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #f477d5;
          margin-bottom: 0.5rem;
        }
        .boost-card p {
          font-size: 0.85rem;
          opacity: 0.6;
          line-height: 1.5;
        }
      `}</style>
    </>
  )
}
