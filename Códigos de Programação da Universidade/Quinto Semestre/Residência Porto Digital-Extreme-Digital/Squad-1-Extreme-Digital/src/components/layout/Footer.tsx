'use client';

import Link from 'next/link';
import { Scissors, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const simulateError = () => {
    // Simulando um erro JS para o Dynatrace capturar
    throw new Error('Dynatrace Observability Test: Simulated JavaScript Error triggered from Footer');
  };

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--surface-border)] pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Scissors className="h-6 w-6 text-[var(--primary)]" />
              <span className="text-xl font-bold tracking-wider">
                BARBER<span className="text-[var(--primary)]">TIME</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              A melhor experiência de barbearia da cidade. Estilo, tradição e qualidade em um só lugar.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[var(--primary)] transition-colors">Início</Link></li>
              <li><Link href="/servicos" className="hover:text-[var(--primary)] transition-colors">Serviços</Link></li>
              <li><Link href="/barbeiros" className="hover:text-[var(--primary)] transition-colors">Profissionais</Link></li>
              <li><Link href="/agendamento" className="hover:text-[var(--primary)] transition-colors">Agendar Horário</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white">Contato</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--primary)] shrink-0" />
                <span>Av. Paulista, 1000 - Bela Vista<br />São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[var(--primary)] shrink-0" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[var(--primary)] shrink-0" />
                <span>contato@barbertime.com.br</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>Seg - Sex</span>
                <span>09:00 - 20:00</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>Sábado</span>
                <span>09:00 - 18:00</span>
              </li>
              <li className="flex justify-between pb-2 text-[var(--primary)]">
                <span>Domingo</span>
                <span>Fechado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--surface-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BarberTime. Todos os direitos reservados.
          </p>
          <button 
            onClick={simulateError}
            className="text-xs text-gray-600 hover:text-red-500 transition-colors"
            title="Dynatrace: Simular Erro JS"
          >
            [Observability: Trigger Error]
          </button>
        </div>
      </div>
    </footer>
  );
}
