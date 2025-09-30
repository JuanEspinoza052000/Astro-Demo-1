import { useEffect, useState } from 'react';

const testimoniosBase = [
  {
    nombre: "Carlos Ramírez",
    texto: "Excelente servicio, me ayudaron muchísimo con mi proyecto. Superaron todas mis expectativas.",
    estrellas: 5,
    empresa: "TechCorp",
  },
  {
    nombre: "María López",
    texto: "Muy profesionales y puntuales. La comunicación fue excelente durante todo el proceso.",
    estrellas: 4,
    empresa: "Diseño Creativo",
  },
  {
    nombre: "Ana Vargas",
    texto: "El diseño fue justo lo que quería. Entendieron perfectamente mi visión y la plasmaron.",
    estrellas: 5,
    empresa: "StartupHub",
  },
  {
    nombre: "Luis Fernández",
    texto: "Muy satisfecho con el resultado final. Recomiendo este servicio sin dudarlo.",
    estrellas: 5,
    empresa: "Consultora Plus",
  },
  {
    nombre: "Paola Jiménez",
    texto: "Me encantó la atención personalizada. Siempre estuvieron disponibles para resolver mis dudas.",
    estrellas: 4,
    empresa: "Marketing Digital",
  },
  {
    nombre: "Roberto Silva",
    texto: "Trabajo de calidad excepcional. El equipo demostró gran profesionalismo y creatividad.",
    estrellas: 5,
    empresa: "Innovación Web",
  },
  {
    nombre: "Carmen Torres",
    texto: "Proceso fluido y resultados impresionantes. Definitivamente trabajaré con ellos nuevamente.",
    estrellas: 5,
    empresa: "Retail Solutions",
  },
  {
    nombre: "Diego Morales",
    texto: "Excelente relación calidad-precio. Cumplieron todos los plazos establecidos.",
    estrellas: 4,
    empresa: "Logística Pro",
  }
];

const nombres = ["García", "Martínez", "Rodríguez", "Hernández", "González", "Pérez", "Salazar", "Castro", "Méndez", "Ruiz"];
const empresas = ["Innovations", "Solutions", "Group", "Corp", "Labs", "Studio", "Agency", "Consulting", "Partners", "Systems"];

const totalCartas = 10;
const poolSize = 50;

export default function TestimoniosGridRandomFade() {
  const generarPool = () => {
    const pool = [];
    for (let i = 0; i < poolSize; i++) {
      const base = testimoniosBase[i % testimoniosBase.length];
      const apellido = nombres[Math.floor(Math.random() * nombres.length)];
      const empresaSufijo = empresas[Math.floor(Math.random() * empresas.length)];
      pool.push({
        ...base,
        id: i,
        nombre: `${base.nombre.split(' ')[0]} ${apellido}`,
        empresa: `${base.empresa} ${empresaSufijo}`,
        foto: `https://i.pravatar.cc/100?img=${(i % 70) + 1}`,
      });
    }
    return pool;
  };

  const testimoniosPool = generarPool();

  const getRandomTestimonio = () => {
    return testimoniosPool[Math.floor(Math.random() * testimoniosPool.length)];
  };

  const [cartas, setCartas] = useState(() =>
    Array.from({ length: totalCartas }, (_, i) => ({
      ...getRandomTestimonio(),
      key: `init-${i}`,
    }))
  );

  const [fadingIndexes, setFadingIndexes] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  const startAnimation = () => {
    const id = setInterval(() => {
      const idx = Math.floor(Math.random() * totalCartas);
      if (fadingIndexes.includes(idx)) return;

      setFadingIndexes((prev) => [...prev, idx]);

      setTimeout(() => {
        setCartas((prev) =>
          prev.map((carta, i) =>
            i === idx
              ? { ...getRandomTestimonio(), key: `new-${Date.now()}-${idx}` }
              : carta
          )
        );
        setFadingIndexes((prev) => prev.filter((i) => i !== idx));
      }, 500);
    }, 3000);

    setIntervalId(id);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleMouseEnter = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleMouseLeave = () => {
    if (!intervalId) {
      startAnimation();
    }
  };

  const renderStars = (cantidad) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < cantidad ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-7xl mx-auto bg-gray-800">
        <div className="text-center mb-12 ">
          <h2 className="text-6xl font-bold text-gray-600 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-xl text-gray-400">Testimonios reales de personas que confiaron en nosotros</p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {cartas.map((testimonio, index) => (
            <div
              key={testimonio.key}
              className={`group relative bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500 ease-in-out overflow-hidden ${
                fadingIndexes.includes(index) ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>

              <div className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={testimonio.foto}
                    alt={testimonio.nombre}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-200 italic leading-relaxed line-clamp-3">
                    "{testimonio.texto}"
                  </p>
                </div>

                <div className="flex justify-center gap-1 mb-3">
                  {renderStars(testimonio.estrellas)}
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <p className="font-semibold text-gray-400 text-sm">{testimonio.nombre}</p>
                  <p className="text-xs text-gray-200 mt-1">{testimonio.empresa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Los testimonios se actualizan automáticamente. Pasa el cursor sobre la sección para pausar.
          </p>
        </div>
      </div>
    </div>
  );
}
