const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",            //  <── acepta todos los puertos/hosts
    methods: ["GET", "POST"]
  }
});

// Estado de los lobbies: { lobbyCode: { players: [], gameStarted: false, question: null, timeLeft: 0 } }
const lobbies = {};

// Lista de preguntas de ejemplo
// ...existing code...
const questions = [
  /* 1 ─ Nacimiento de la Iglesia */
  {
    id: 1,
    text: "¿Qué acontecimiento marca el nacimiento oficial de la Iglesia según Hechos 2?",
    options: [
      { id: 1, text: "Pentecostés",         correct: true  },
      { id: 2, text: "Navidad",             correct: false },
      { id: 3, text: "Ascensión",           correct: false },
      { id: 4, text: "Transfiguración",     correct: false }
    ]
  },

  /* 2 ─ Primeros convertidos */
  {
    id: 2,
    text: "¿Aproximadamente cuántas personas se bautizaron el día de Pentecostés?",
    options: [
      { id: 1, text: "120",    correct: false },
      { id: 2, text: "3000",   correct: true  },
      { id: 3, text: "5000",   correct: false },
      { id: 4, text: "70",     correct: false }
    ]
  },

  /* 3 ─ Término griego */
  {
    id: 3,
    text: "¿Qué término griego se usa para designar la asamblea de creyentes?",
    options: [
      { id: 1, text: "Koinonía", correct: false },
      { id: 2, text: "Ekklesía", correct: true  },
      { id: 3, text: "Agapé",    correct: false },
      { id: 4, text: "Logos",    correct: false }
    ]
  },

  /* 4 ─ Comunión */
  {
    id: 4,
    text: "El concepto de compartir bienes y vivir en comunión se denomina…",
    options: [
      { id: 1, text: "Diaconía", correct: false },
      { id: 2, text: "Koinonía", correct: true  },
      { id: 3, text: "Didajé",   correct: false },
      { id: 4, text: "Eudaimonía", correct: false }
    ]
  },

  /* 5 ─ Didajé */
  {
    id: 5,
    text: "La 'Didajé' hace referencia principalmente a:",
    options: [
      { id: 1, text: "La persecución romana",          correct: false },
      { id: 2, text: "La enseñanza apostólica",        correct: true  },
      { id: 3, text: "Una fiesta judía",               correct: false },
      { id: 4, text: "Una ciudad helenística",         correct: false }
    ]
  },

  /* 6 ─ Primer mártir */
  {
    id: 6,
    text: "¿Quién es reconocido como el primer mártir cristiano?",
    options: [
      { id: 1, text: "Pablo",   correct: false },
      { id: 2, text: "Esteban", correct: true  },
      { id: 3, text: "Pedro",   correct: false },
      { id: 4, text: "Santiago",correct: false }
    ]
  },

  /* 7 ─ Apóstol de los gentiles */
  {
    id: 7,
    text: "¿Qué apóstol es llamado 'apóstol de los gentiles' por su labor misionera?",
    options: [
      { id: 1, text: "Juan",        correct: false },
      { id: 2, text: "Pablo",       correct: true  },
      { id: 3, text: "Andrés",      correct: false },
      { id: 4, text: "Bartolomé",   correct: false }
    ]
  },

  /* 8 ─ Concilio */
  {
    id: 8,
    text: "¿Qué concilio resolvió la controversia sobre la circuncisión de los gentiles?",
    options: [
      { id: 1, text: "Concilio de Nicea",     correct: false },
      { id: 2, text: "Concilio de Jerusalén", correct: true  },
      { id: 3, text: "Concilio de Éfeso",     correct: false },
      { id: 4, text: "Concilio de Calcedonia",correct: false }
    ]
  },

  /* 9 ─ Infraestructura romana */
  {
    id: 9,
    text: "¿Cuál de las siguientes facilitó físicamente la expansión del cristianismo bajo la Pax Romana?",
    options: [
      { id: 1, text: "Las calzadas romanas", correct: true  },
      { id: 2, text: "La Vía Láctea",        correct: false },
      { id: 3, text: "El Correo Persa",      correct: false },
      { id: 4, text: "La Ruta de la Seda",   correct: false }
    ]
  },

  /* 10 ─ Lengua común */
  {
    id: 10,
    text: "¿Qué lengua se convirtió en vehículo común para la predicación del evangelio en el siglo I?",
    options: [
      { id: 1, text: "Latín",          correct: false },
      { id: 2, text: "Arameo",         correct: false },
      { id: 3, text: "Griego koiné",   correct: true  },
      { id: 4, text: "Hebreo",         correct: false }
    ]
  },

  /* 11 ─ Diaconía */
  {
    id: 11,
    text: "La 'diaconía' en las primeras comunidades se centraba en:",
    options: [
      { id: 1, text: "Predicar en sinagogas",              correct: false },
      { id: 2, text: "Servicio a viudas y huérfanos",       correct: true  },
      { id: 3, text: "Cobrar impuestos",                   correct: false },
      { id: 4, text: "Construir templos paganos",          correct: false }
    ]
  },

  /* 12 ─ Regiones iniciales */
  {
    id: 12,
    text: "Tras Jerusalén, ¿qué regiones menciona Hechos como primeras áreas de expansión?",
    options: [
      { id: 1, text: "Judea, Samaria y Galilea", correct: true  },
      { id: 2, text: "Egipto y Etiopía",         correct: false },
      { id: 3, text: "Roma y Cartago",           correct: false },
      { id: 4, text: "Babilonia y Persia",       correct: false }
    ]
  },

  /* 13 ─ Liturgia */
  {
    id: 13,
    text: "La celebración de la fracción del pan hacía memoria de:",
    options: [
      { id: 1, text: "La creación",                correct: false },
      { id: 2, text: "La pasión y resurrección",   correct: true  },
      { id: 3, text: "El éxodo de Egipto",         correct: false },
      { id: 4, text: "La conquista de Canaán",     correct: false }
    ]
  },

  /* 14 ─ Epístolas */
  {
    id: 14,
    text: "¿Qué escritos proporcionaron el fundamento teológico de la Iglesia primitiva?",
    options: [
      { id: 1, text: "Los Salmos",                  correct: false },
      { id: 2, text: "Las Epístolas de Pablo",      correct: true  },
      { id: 3, text: "El Apocalipsis",              correct: false },
      { id: 4, text: "Los Evangelios gnósticos",    correct: false }
    ]
  },

  /* 15 ─ Persecución y dispersión */
  {
    id: 15,
    text: "La persecución tras la muerte de Esteban provocó que los creyentes se dispersaran y…",
    options: [
      { id: 1, text: "abandonaran la fe",           correct: false },
      { id: 2, text: "llevaran el evangelio a nuevas regiones", correct: true },
      { id: 3, text: "se unieran al ejército romano", correct: false },
      { id: 4, text: "volvieran al judaísmo",        correct: false }
    ]
  },

  /* 16 ─ Influencia cultural */
  {
    id: 16,
    text: "La incorporación de conceptos y prácticas romanas al cristianismo primitivo se describe como:",
    options: [
      { id: 1, text: "Sincretismo cultural", correct: true  },
      { id: 2, text: "Gnosticismo",          correct: false },
      { id: 3, text: "Iconoclasia",          correct: false },
      { id: 4, text: "Maniqueísmo",          correct: false }
    ]
  },

  /* 17 ─ Compromiso misionero */
  {
    id: 17,
    text: "El compromiso misionero de las primeras comunidades se enfocaba en:",
    options: [
      { id: 1, text: "Crear un templo en Jerusalén", correct: false },
      { id: 2, text: "La evangelización universal",  correct: true  },
      { id: 3, text: "Redactar leyes civiles",        correct: false },
      { id: 4, text: "Reformar el Senado romano",     correct: false }
    ]
  },

  /* 18 ─ Valor comunitario */
  {
    id: 18,
    text: "¿Qué valor se considera pilar de la construcción de la Iglesia hoy, inspirado en las primeras comunidades?",
    options: [
      { id: 1, text: "Amor y servicio mutuo", correct: true  },
      { id: 2, text: "Extrema austeridad",    correct: false },
      { id: 3, text: "Poder político",        correct: false },
      { id: 4, text: "Aislamiento cultural",  correct: false }
    ]
  },

  /* 19 ─ Pax Romana */
  {
    id: 19,
    text: "La 'Pax Romana' proporcionó principalmente:",
    options: [
      { id: 1, text: "Libertad total de culto",   correct: false },
      { id: 2, text: "Estabilidad y vías de comunicación", correct: true },
      { id: 3, text: "Fin de los impuestos",      correct: false },
      { id: 4, text: "Prohibición del griego",    correct: false }
    ]
  },

  /* 20 ─ Enseñanza continua */
  {
    id: 20,
    text: "¿Qué elemento aseguraba la identidad y continuidad de la fe en las primeras comunidades?",
    options: [
      { id: 1, text: "Enseñanza y doctrina bíblica", correct: true  },
      { id: 2, text: "Rituales paganos",             correct: false },
      { id: 3, text: "Milicias cristianas",          correct: false },
      { id: 4, text: "Apuestas en el Coliseo",       correct: false }
    ]
  }
];

// ...existing code...

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Crear un lobby
  socket.on('create-lobby', (lobbyCode) => {
    lobbies[lobbyCode] = {
      players: [],
      gameStarted: false,
      question: null,
      timeLeft: 0
    };
    socket.join(lobbyCode);
    socket.emit('lobby-created', lobbyCode);
    io.to(lobbyCode).emit('update-players', lobbies[lobbyCode].players);
  });

  // Unirse a un lobby
  socket.on('join-lobby', ({ code, name }) => {
  console.log(`Intento de unirse: código=${code}, nombre=${name}`);
  
  if (lobbies[code]) {
    if (lobbies[code].gameStarted) {
      console.log(`Error: el juego ya comenzó en el lobby ${code}`);
      socket.emit('join-error', 'The game has already started.');
    } else if (lobbies[code].players.some(p => p.name === name)) {
      console.log(`Error: nombre ${name} ya está en uso en el lobby ${code}`);
      socket.emit('join-error', 'Ese nombre ya está en uso en este lobby.');
    } else {
      // Jugador válido, puede unirse
      const player = { id: socket.id, name, pieces: 0 };
      lobbies[code].players.push(player);
      socket.join(code);
      
      console.log(`Jugador ${name} (${socket.id}) se unió al lobby ${code}`);
      
      // Emitir al jugador que se unió exitosamente
      socket.emit('join-success', { 
        code, 
        player,
        players: lobbies[code].players 
      });
      
      // Emitir a todos los jugadores la lista actualizada
      io.to(code).emit('update-players', lobbies[code].players);
    }
  } else {
    console.log(`Error: código de lobby inválido ${code}`);
    socket.emit('join-error', 'Invalid lobby code.');
  }
});

  // Iniciar el juego
  socket.on('start-game', (code) => {
    if (lobbies[code]) {
      lobbies[code].gameStarted = true;
      io.to(code).emit('game-started');

      let questionIndex = 0;
      let timer = null;

      const askQuestion = () => {
        if (questionIndex < questions.length) {
          lobbies[code].question = questions[questionIndex];
          lobbies[code].timeLeft = 10;
          io.to(code).emit('new-question', lobbies[code].question);
          io.to(code).emit('update-timer', lobbies[code].timeLeft);

          timer = setInterval(() => {
            lobbies[code].timeLeft -= 1;
            if (lobbies[code].timeLeft >= 0) {
              io.to(code).emit('update-timer', lobbies[code].timeLeft);
            }
            if (lobbies[code].timeLeft === 0) {
              clearInterval(timer);
              // Enviar la respuesta correcta explícitamente
              const correct = lobbies[code].question.options.find(o => o.correct);
              io.to(code).emit('show-correct', { correctOption: correct });
              setTimeout(() => {
                questionIndex++;
                askQuestion();
              }, 2000); // 2 segundos para mostrar la respuesta correcta
            }
          }, 1000);
        } else {
          io.to(code).emit('game-ended', lobbies[code].players);
        }
      };
      askQuestion();
    }
  });

  // Enviar respuesta
 socket.on('submit-answer', ({ code, option, playerId }) => {
  if (lobbies[code] && lobbies[code].question) {
    // Verificar que el lobby exista y que haya una pregunta activa
    const playerIndex = lobbies[code].players.findIndex(p => p.id === playerId);
    
    // Verificar que el jugador existe y aún hay tiempo para responder
    if (playerIndex !== -1 && lobbies[code].timeLeft > 0) {
      // Obtener referencia directa al jugador para actualizar sus piezas
      const player = lobbies[code].players[playerIndex];
      
      console.log(`Jugador ${player.name} respondió. Es correcta: ${option.correct}`);
      
      // Actualizar puntuación si la respuesta es correcta
      if (option.correct) {
        // Incrementar piezas al jugador que respondió correctamente
        player.pieces += 1;
        console.log(`${player.name} ahora tiene ${player.pieces} piezas`);
        
        // Emitir evento individual al jugador que respondió correctamente
        io.to(playerId).emit('answer-result', { 
          correct: true,
          message: '¡Respuesta correcta!' 
        });
      } else {
        // Emitir evento individual al jugador que respondió incorrectamente
        io.to(playerId).emit('answer-result', { 
          correct: false, 
          message: 'Respuesta incorrecta' 
        });
      }
      
      // Actualizar a todos los jugadores sobre el estado actual de puntuaciones
      io.to(code).emit('update-players', lobbies[code].players);
    }
  }
});

  // Desconexión de un usuario
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const code in lobbies) {
      const lobby = lobbies[code];
      const playerIndex = lobby.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        lobby.players.splice(playerIndex, 1);
        io.to(code).emit('update-players', lobby.players);
        if (lobby.players.length === 0) {
          delete lobbies[code]; // Eliminar lobby si no hay jugadores
        }
        break;
      }
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});