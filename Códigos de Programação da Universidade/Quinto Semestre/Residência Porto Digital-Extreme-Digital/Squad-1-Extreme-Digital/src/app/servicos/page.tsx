'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Clock } from 'lucide-react';
import { mockServices, Service } from '@/mock/data';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ServicosPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('todos');

  // Simulating API call for Dynatrace observability
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      // Simula lentidão de rede proposital (2 a 4 segundos)
      const delay = Math.floor(Math.random() * 2000) + 2000;
      
      await new Promise(resolve => setTimeout(resolve, delay));
      setServices(mockServices);
      setLoading(false);
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'todos' || service.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['todos', 'cabelo', 'barba', 'combo', 'sobrancelha', 'coloracao'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Nossos Serviços</h1>
        <p className="text-gray-400 text-lg">Escolha o melhor tratamento para o seu estilo.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[var(--surface)] border border-[var(--surface-border)] rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all ${
                filter === cat 
                  ? 'bg-[var(--primary)] text-black' 
                  : 'bg-[var(--surface)] text-gray-400 hover:text-white border border-[var(--surface-border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="glass rounded-2xl p-4 flex flex-col gap-4">
              <Skeleton className="w-full aspect-[4/3] rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div key={service.id} className="glass rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-2 transition-all duration-300">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[var(--primary)]" />
                    <span className="text-sm font-medium text-white">{service.durationMinutes} min</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow">{service.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-[var(--primary)]">R$ {service.price}</span>
                    <Link href={`/agendamento?servico=${service.id}`}>
                      <Button size="sm">Agendar</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400">
              <p>Nenhum serviço encontrado com estes filtros.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
