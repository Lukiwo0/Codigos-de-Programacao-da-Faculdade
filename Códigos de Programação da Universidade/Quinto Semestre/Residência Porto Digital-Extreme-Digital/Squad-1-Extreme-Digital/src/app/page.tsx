'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Clock, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mockServices, mockBarbers } from "@/mock/data";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2000&auto=format&fit=crop"
            alt="Barbearia Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white drop-shadow-lg">
            SUA MELHOR <span className="text-[var(--primary)]">VERSÃO</span> COMEÇA AQUI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            A tradição da barbearia clássica unida às técnicas mais modernas. 
            Experimente o padrão BarberTime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agendamento">
              <Button size="lg" className="w-full sm:w-auto">
                Agendar Horário <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/servicos">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-black/50 backdrop-blur-sm">
                Ver Serviços
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Como Funciona</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Agendar seu horário nunca foi tão fácil e rápido.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "1. Escolha o Serviço", desc: "Temos diversas opções de cortes, barbas e tratamentos premium." },
            { icon: Clock, title: "2. Selecione o Horário", desc: "Veja a agenda em tempo real e escolha o horário que melhor se adapta a você." },
            { icon: MapPin, title: "3. Compareça e Relaxe", desc: "Nós cuidamos do resto. Chegue no horário e desfrute de uma cerveja gelada." }
          ].map((item, i) => (
            <div key={i} className="glass p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[var(--primary)]/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <item.icon className="h-8 w-8 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destaques Serviços */}
      <section className="bg-[var(--surface)] py-24 border-y border-[var(--surface-border)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Serviços Populares</h2>
              <p className="text-gray-400">Os preferidos dos nossos clientes.</p>
            </div>
            <Link href="/servicos" className="text-[var(--primary)] hover:text-white transition-colors hidden sm:flex items-center gap-2 font-medium">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockServices.slice(0, 3).map((service) => (
              <div key={service.id} className="group relative rounded-2xl overflow-hidden cursor-pointer">
                <div className="aspect-[4/3] relative">
                  <Image src={service.image} alt={service.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 w-full p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                      <p className="text-gray-300 text-sm">{service.durationMinutes} min</p>
                    </div>
                    <span className="text-[var(--primary)] font-bold text-xl">R$ {service.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/servicos">
              <Button variant="outline" className="w-full">Ver todos os serviços</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nossos Profissionais */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Nossos Mestres</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Profissionais altamente qualificados para entregar o melhor resultado.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mockBarbers.map((barber) => (
            <div key={barber.id} className="glass p-6 rounded-2xl flex flex-col items-center text-center group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 relative border-4 border-transparent group-hover:border-[var(--primary)] transition-colors duration-300">
                <Image src={barber.image} alt={barber.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{barber.name}</h3>
              <p className="text-[var(--primary)] font-medium text-sm mb-3">{barber.specialty}</p>
              <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full">
                <Star className="h-4 w-4 text-[var(--primary)] fill-[var(--primary)]" />
                <span className="text-sm font-bold text-white">{barber.rating}</span>
                <span className="text-xs text-gray-400 ml-1">({barber.experienceYears} anos exp.)</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
