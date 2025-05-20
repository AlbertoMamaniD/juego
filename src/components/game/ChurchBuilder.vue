```vue
<template>
  <div class="flex flex-col items-center p-8 bg-gradient-to-b from-sky-100 to-green-100 rounded-lg shadow-lg">
    <div class="relative">
      <svg
        width="500"
        height="400"
        viewBox="0 0 500 400"
        class="drop-shadow-lg"
      >
        <!-- Fondo del cielo -->
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#87CEEB" />
            <stop offset="100%" stop-color="#E0F6FF" />
          </linearGradient>
          <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#90EE90" />
            <stop offset="100%" stop-color="#228B22" />
          </linearGradient>
          <linearGradient id="stoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F5F5DC" />
            <stop offset="50%" stop-color="#D2B48C" />
            <stop offset="100%" stop-color="#A0522D" />
          </linearGradient>
        </defs>

        <!-- Cielo -->
        <rect width="500" height="300" fill="url(#skyGradient)" />

        <!-- Nubes -->
        <template v-if="hasWeatherVane">
          <ellipse cx="100" cy="50" rx="30" ry="15" fill="white" opacity="0.8" />
          <ellipse cx="420" cy="80" rx="25" ry="12" fill="white" opacity="0.8" />
          <ellipse cx="300" cy="40" rx="35" ry="18" fill="white" opacity="0.8" />
        </template>

        <!-- Suelo/Jardín -->
        <template v-if="hasGarden">
          <rect y="300" width="500" height="100" fill="url(#grassGradient)" />
          <!-- Flores decorativas -->
          <circle cx="50" cy="330" r="3" fill="#FF69B4" />
          <circle cx="55" cy="335" r="3" fill="#FF1493" />
          <circle cx="450" cy="325" r="3" fill="#FF69B4" />
          <circle cx="445" cy="330" r="3" fill="#FF1493" />
          <circle cx="100" cy="340" r="3" fill="#FF0000" />
          <circle cx="400" cy="345" r="3" fill="#FFD700" />
        </template>

        <!-- Base de la iglesia -->
        <rect
          v-if="hasBase"
          x="150"
          y="250"
          width="200"
          height="50"
          fill="url(#stoneGradient)"
          stroke="#8B4513"
          stroke-width="2"
        />

        <!-- Paredes principales -->
        <template v-if="hasWalls">
          <rect
            x="160"
            y="200"
            width="180"
            height="50"
            fill="url(#stoneGradient)"
            stroke="#8B4513"
            stroke-width="2"
          />
          <!-- Detalles de piedra -->
          <template v-if="hasDetails">
            <line x1="180" y1="200" x2="180" y2="250" stroke="#8B4513" stroke-width="1" />
            <line x1="200" y1="200" x2="200" y2="250" stroke="#8B4513" stroke-width="1" />
            <line x1="220" y1="200" x2="220" y2="250" stroke="#8B4513" stroke-width="1" />
            <line x1="240" y1="200" x2="240" y2="250" stroke="#8B4513" stroke-width="1" />
            <line x1="260" y1="200" x2="260" y2="250" stroke="#8B4513" stroke-width="1" />
            <line x1="280" y1="200" x2="280" y2="250" stroke="#8B4513" stroke-width="1" />
            <line x1="300" y1="200" x2="300" y2="250" stroke="#8B4513" stroke-width="1" />
            <line x1="320" y1="200" x2="320" y2="250" stroke="#8B4513" stroke-width="1" />
          </template>
        </template>

        <!-- Techo principal -->
        <template v-if="hasRoof">
          <polygon
            points="155,200 250,160 345,200"
            fill="#8B0000"
            stroke="#654321"
            stroke-width="2"
          />
          <!-- Líneas del techo -->
          <line x1="170" y1="190" x2="230" y2="170" stroke="#654321" stroke-width="1" />
          <line x1="190" y1="185" x2="250" y2="165" stroke="#654321" stroke-width="1" />
          <line x1="210" y1="180" x2="270" y2="165" stroke="#654321" stroke-width="1" />
          <line x1="230" y1="185" x2="290" y2="170" stroke="#654321" stroke-width="1" />
          <line x1="250" y1="190" x2="310" y2="175" stroke="#654321" stroke-width="1" />
          <line x1="270" y1="185" x2="330" y2="190" stroke="#654321" stroke-width="1" />
        </template>

        <!-- Torre principal del campanario -->
        <template v-if="hasTower">
          <rect
            x="230"
            y="130"
            width="40"
            height="70"
            fill="url(#stoneGradient)"
            stroke="#8B4513"
            stroke-width="2"
          />
          <!-- Techo de la torre -->
          <polygon
            points="225,130 250,100 275,130"
            fill="#8B0000"
            stroke="#654321"
            stroke-width="2"
          />
        </template>

        <!-- Segunda torre -->
        <template v-if="hasSecondTower">
          <rect
            x="125"
            y="150"
            width="35"
            height="50"
            fill="url(#stoneGradient)"
            stroke="#8B4513"
            stroke-width="2"
          />
          <!-- Techo de la segunda torre -->
          <polygon
            points="120,150 142.5,125 165,150"
            fill="#8B0000"
            stroke="#654321"
            stroke-width="2"
          />
        </template>

        <!-- Cruz principal -->
        <template v-if="hasCross">
          <rect x="248" y="85" width="4" height="15" fill="#FFD700" />
          <rect x="240" y="91" width="15" height="4" fill="#FFD700" />
        </template>

        <!-- Veleta -->
        <template v-if="hasWeatherVane">
          <line x1="142.5" y1="125" x2="142.5" y2="115" stroke="#8B4513" stroke-width="2" />
          <polygon points="142.5,115 137,110 142.5,113 148,110" fill="#FFD700" />
        </template>

        <!-- Campanas -->
        <template v-if="hasBells">
          <ellipse cx="240" cy="160" rx="6" ry="8" fill="#B8860B" />
          <ellipse cx="260" cy="160" rx="6" ry="8" fill="#B8860B" />
        </template>

        <!-- Ventanas principales -->
        <template v-if="hasWindows">
          <!-- Ventana principal (rosetón) -->
          <circle cx="250" cy="215" r="10" fill="#4169E1" stroke="#8B4513" stroke-width="2" />
          <circle cx="250" cy="215" r="5" fill="#87CEEB" />
          <line x1="250" y1="205" x2="250" y2="225" stroke="#8B4513" stroke-width="1" />
          <line x1="240" y1="215" x2="260" y2="215" stroke="#8B4513" stroke-width="1" />
          
          <!-- Ventanas laterales principales -->
          <rect x="180" y="210" width="10" height="15" fill="#4169E1" stroke="#8B4513" stroke-width="1" />
          <rect x="310" y="210" width="10" height="15" fill="#4169E1" stroke="#8B4513" stroke-width="1" />
          <line x1="185" y1="210" x2="185" y2="225" stroke="#8B4513" stroke-width="1" />
          <line x1="315" y1="210" x2="315" y2="225" stroke="#8B4513" stroke-width="1" />
          
          <!-- Ventanas de las torres -->
          <rect x="235" y="140" width="5" height="8" fill="#4169E1" stroke="#8B4513" stroke-width="1" />
          <rect x="260" y="140" width="5" height="8" fill="#4169E1" stroke="#8B4513" stroke-width="1" />
          <rect x="130" y="155" width="4" height="6" fill="#4169E1" stroke="#8B4513" stroke-width="1" />
          <rect x="146" y="155" width="4" height="6" fill="#4169E1" stroke="#8B4513" stroke-width="1" />
        </template>

        <!-- Ventanas decorativas adicionales -->
        <template v-if="hasDecorativeWindows">
          <!-- Ventanas altas en los extremos -->
          <rect x="165" y="185" width="8" height="12" fill="#4169E1" stroke="#8B4513" stroke-width="1" />
          <rect x="327" y="185" width="8" height="12" fill="#4169E1" stroke="#8B4513" stroke-width="1" />
          
          <!-- Ventana triangular en el techo -->
          <polygon points="250,165 240,180 260,180" fill="#4169E1" stroke="#8B4513" stroke-width="1" />
        </template>

        <!-- Puerta principal -->
        <template v-if="hasDoor">
          <rect x="242" y="230" width="16" height="20" fill="#654321" stroke="#8B4513" stroke-width="2" />
          <path d="M 242 230 Q 250 220 258 230" fill="#654321" stroke="#8B4513" stroke-width="2" />
          <circle cx="250" cy="245" r="1" fill="#FFD700" />
          <!-- Detalles de la puerta -->
          <line x1="242" y1="235" x2="258" y2="235" stroke="#8B4513" stroke-width="1" />
          <line x1="242" y1="240" x2="258" y2="240" stroke="#8B4513" stroke-width="1" />
        </template>

        <!-- Escalones mejorados -->
        <template v-if="hasSteps">
          <rect x="230" y="250" width="40" height="5" fill="#696969" />
          <rect x="232" y="255" width="36" height="5" fill="#708090" />
          <rect x="234" y="260" width="32" height="5" fill="#778899" />
          <rect x="236" y="265" width="28" height="5" fill="#808080" />
        </template>

        <!-- Segundo techo (nave lateral) -->
        <template v-if="hasRoof2">
          <polygon points="100,200 155,175 155,200" fill="#8B0000" stroke="#654321" stroke-width="2" />
          <polygon points="345,200 400,175 345,200" fill="#8B0000" stroke="#654321" stroke-width="2" />
        </template>

        <!-- Chimenea -->
        <template v-if="hasChimney">
          <rect x="320" y="145" width="8" height="20" fill="#654321" stroke="#8B4513" stroke-width="1" />
          <rect x="317" y="145" width="14" height="4" fill="#8B4513" />
        </template>

        <!-- Cerca decorativa -->
        <template v-if="hasFence">
          <g stroke="#8B4513" stroke-width="2" fill="none">
            <line x1="50" y1="350" x2="450" y2="350" />
            <line v-for="x in [60, 100, 400, 440]" :key="x" :x1="x" y1="340" :x2="x" y2="355" />
          </g>
        </template>

        <!-- Sendero -->
        <template v-if="hasPath">
          <rect x="245" y="255" width="10" height="45" fill="#C0C0C0" />
          <line x1="245" y1="255" x2="245" y2="300" stroke="#A9A9A9" stroke-width="1" />
          <line x1="255" y1="255" x2="255" y2="300" stroke="#A9A9A9" stroke-width="1" />
        </template>

        <!-- Árboles -->
        <template v-if="hasTrees">
          <rect x="30" y="280" width="6" height="30" fill="#8B4513" />
          <circle cx="33" cy="280" r="15" fill="#228B22" />
          <rect x="460" y="285" width="6" height="30" fill="#8B4513" />
          <circle cx="463" cy="285" r="12" fill="#228B22" />
        </template>

        <!-- Iluminación -->
        <template v-if="hasLighting">
          <g>
            <line x1="80" y1="310" x2="80" y2="340" stroke="#654321" stroke-width="2" />
            <circle cx="80" cy="310" r="4" fill="#FFD700" opacity="0.8" />
            <line x1="420" y1="310" x2="420" y2="340" stroke="#654321" stroke-width="2" />
            <circle cx="420" cy="310" r="4" fill="#FFD700" opacity="0.8" />
          </g>
          <circle cx="250" cy="215" r="3" fill="#FFFF00" opacity="0.6" />
          <circle cx="185" cy="210" r="2" fill="#FFFF00" opacity="0.6" />
          <circle cx="315" cy="210" r="2" fill="#FFFF00" opacity="0.6" />
        </template>
      </svg>
    </div>

    <!-- Información de progreso -->
    <div class="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h3 class="text-xl font-bold text-gray-800 mb-3">Construcción de la Iglesia</h3>
      <div class="text-lg font-semibold text-blue-600 mb-3">
        Piezas: {{ pieces }}/20
      </div>
      
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div :class="['flex items-center', hasBase ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasBase ? '✅' : '⬜' }}</span>
          Base (1)
        </div>
        <div :class="['flex items-center', hasWalls ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasWalls ? '✅' : '⬜' }}</span>
          Paredes (2)
        </div>
        <div :class="['flex items-center', hasRoof ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasRoof ? '✅' : '⬜' }}</span>
          Techo principal (3)
        </div>
        <div :class="['flex items-center', hasTower ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasTower ? '✅' : '⬜' }}</span>
          Torre campanario (4)
        </div>
        <div :class="['flex items-center', hasCross ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasCross ? '✅' : '⬜' }}</span>
          Cruz dorada (5)
        </div>
        <div :class="['flex items-center', hasWindows ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasWindows ? '✅' : '⬜' }}</span>
          Ventanas vitral (6)
        </div>
        <div :class="['flex items-center', hasDoor ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasDoor ? '✅' : '⬜' }}</span>
          Puerta entrada (7)
        </div>
        <div :class="['flex items-center', hasDetails ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasDetails ? '✅' : '⬜' }}</span>
          Detalles piedra (8)
        </div>
        <div :class="['flex items-center', hasBells ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasBells ? '✅' : '⬜' }}</span>
          Campanas (9)
        </div>
        <div :class="['flex items-center', hasGarden ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasGarden ? '✅' : '⬜' }}</span>
          Jardín (10)
        </div>
        <div :class="['flex items-center', hasSecondTower ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasSecondTower ? '✅' : '⬜' }}</span>
          Segunda torre (11)
        </div>
        <div :class="['flex items-center', hasSteps ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasSteps ? '✅' : '⬜' }}</span>
          Escalones (12)
        </div>
        <div :class="['flex items-center', hasRoof2 ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasRoof2 ? '✅' : '⬜' }}</span>
          Techos laterales (13)
        </div>
        <div :class="['flex items-center', hasChimney ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasChimney ? '✅' : '⬜' }}</span>
          Chimenea (14)
        </div>
        <div :class="['flex items-center', hasDecorativeWindows ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasDecorativeWindows ? '✅' : '⬜' }}</span>
          Ventanas extra (15)
        </div>
        <div :class="['flex items-center', hasFence ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasFence ? '✅' : '⬜' }}</span>
          Cerca decorativa (16)
        </div>
        <div :class="['flex items-center', hasPath ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasPath ? '✅' : '⬜' }}</span>
          Sendero (17)
        </div>
        <div :class="['flex items-center', hasTrees ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasTrees ? '✅' : '⬜' }}</span>
          Árboles (18)
        </div>
        <div :class="['flex items-center', hasWeatherVane ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasWeatherVane ? '✅' : '⬜' }}</span>
          Veleta y nubes (19)
        </div>
        <div :class="['flex items-center', hasLighting ? 'text-green-600' : 'text-gray-400']">
          <span class="mr-2">{{ hasLighting ? '✅' : '⬜' }}</span>
          Iluminación (20)
        </div>
      </div>

      <div v-if="pieces >= 20" class="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
        <span class="text-green-800 font-semibold">🎉 ¡Iglesia completada! 🎉</span>
        <p class="text-green-700 text-sm mt-1">
          Has construido una magnífica catedral con todos los elementos arquitectónicos.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChurchBuilder',
  props: {
    pieces: {
      type: Number,
      default: 0
    }
  },
  computed: {
    hasBase() { return this.pieces >= 1; },
    hasWalls() { return this.pieces >= 2; },
    hasRoof() { return this.pieces >= 3; },
    hasTower() { return this.pieces >= 4; },
    hasCross() { return this.pieces >= 5; },
    hasWindows() { return this.pieces >= 6; },
    hasDoor() { return this.pieces >= 7; },
    hasDetails() { return this.pieces >= 8; },
    hasBells() { return this.pieces >= 9; },
    hasGarden() { return this.pieces >= 10; },
    hasSecondTower() { return this.pieces >= 11; },
    hasSteps() { return this.pieces >= 12; },
    hasRoof2() { return this.pieces >= 13; },
    hasChimney() { return this.pieces >= 14; },
    hasDecorativeWindows() { return this.pieces >= 15; },
    hasFence() { return this.pieces >= 16; },
    hasPath() { return this.pieces >= 17; },
    hasTrees() { return this.pieces >= 18; },
    hasWeatherVane() { return this.pieces >= 19; },
    hasLighting() { return this.pieces >= 20; }
  }
};
</script>

<style scoped>
/* Tailwind CSS is already included in the template via classes */
</style>
```