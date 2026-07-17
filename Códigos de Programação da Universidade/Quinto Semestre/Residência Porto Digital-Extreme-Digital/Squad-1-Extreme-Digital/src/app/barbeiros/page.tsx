'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, AlertTriangle, RefreshCw } from 'lucide-react';
import { mockBarbers, Barber } from '@/mock/data';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export default function BarbeirosPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBarbers = async () => {
    setLoading(true);
    setError(false);
    
    // Dynatrace: Simulating timeout/error logic 20% of the time to generate errors
    const shouldFail = Math.random() < 0.2;
    const delay = Math.floor(Math.random() * 3000) + 1000;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    if (shouldFail) {
      setError(true);
      setLoading(false);
      // Log for Dynatrace to catch
      console.error("Dynatrace Observability: Simulated timeout/API error when fetching barbers.");
      return;
    }

    setBarbers(mockBarbers);
    setLoading(false);
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Nossos Mestres</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Conheça o time de profissionais da BarberTime. Especialistas dedicados a entregar o melhor resultado para o seu estilo.
        </p>
      </div>

      {error ? (
        <div className="glass max-w-md mx-auto p-8 rounded-2xl text-center border-red-500/20">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Servidor demorando para responder</h2>
          <p className="text-gray-400 mb-6">Tivemos um problema ao carregar os profissionais. Por favor, tente novamente.</p>
          <Button onClick={fetchBarbers} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Tentar Novamente
          </Button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(n => (
            <div key={n} className="glass rounded-2xl p-6 flex flex-col items-center">
              <Skeleton className="w-32 h-32 rounded-full mb-6" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-6 w-24 mb-6 rounded-full" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {barbers.map((barber) => (
            <div key={barber.id} className="glass p-6 rounded-2xl flex flex-col items-center text-center group">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 relative border-4 border-transparent group-hover:border-[var(--primary)] transition-all duration-300">
                <Image 
                  src={barber.image} 
                  alt={barber.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{barber.name}</h3>
              <p className="text-[var(--primary)] font-medium mb-3">{barber.specialty}</p>
              
              <div className="flex gap-4 mb-6 text-sm text-gray-400 bg-black/30 px-4 py-2 rounded-xl">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-[var(--primary)] fill-[var(--primary)]" />
                  <span className="font-bold text-white">{barber.rating}</span>
                </div>
                <div className="w-px h-4 bg-gray-700"></div>
                <div>
                  <span className="font-bold text-white">{barber.experienceYears}</span> anos exp.
                </div>
              </div>

              <Link href={`/agendamento?barbeiro=${barber.id}`} className="w-full mt-auto">
                <Button variant="outline" className="w-full group-hover:bg-[var(--primary)] group-hover:text-black transition-colors">
                  Selecionar Profissional
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
