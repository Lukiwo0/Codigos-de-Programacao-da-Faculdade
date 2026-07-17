'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Scissors, User, XCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export default function HistoricoPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      
      // Simulate network delay
      const delay = Math.floor(Math.random() * 1500) + 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      const storedHistory = JSON.parse(localStorage.getItem('barberHistory') || '[]');
      
      // Se não houver histórico, cria um mockado para demonstração
      if (storedHistory.length === 0) {
        const mockHistory = [
          {
            id: 'A9B2C1',
            serviceName: 'Corte Tradicional',
            barberName: 'Ricardo "Mão de Tesoura"',
            date: '2023-10-15',
            time: '14:30',
            status: 'Concluído',
            createdAt: new Date('2023-10-10').toISOString()
          },
          {
            id: 'X8Y7Z6',
            serviceName: 'Barba Terapia',
            barberName: 'Carlos "Navalha de Ouro"',
            date: '2023-11-20',
            time: '10:00',
            status: 'Cancelado',
            createdAt: new Date('2023-11-15').toISOString()
          }
        ];
        setHistory(mockHistory);
      } else {
        setHistory(storedHistory);
      }
      
      setLoading(false);
    };

    fetchHistory();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Seu Histórico</h1>
          <p className="text-gray-400">Acompanhe seus agendamentos passados e futuros.</p>
        </div>
        <Link href="/agendamento">
          <Button>Novo Agendamento</Button>
        </Link>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-3xl overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-6 border-b border-[var(--surface-border)]">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar por código ou serviço..."
              className="w-full bg-black/50 border border-[var(--surface-border)] rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>
        </div>

        {/* List */}
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(n => (
                <div key={n} className="border border-[var(--surface-border)] rounded-2xl p-6 flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                  <div className="md:w-32 flex items-center justify-center border-t md:border-t-0 md:border-l border-[var(--surface-border)] pt-4 md:pt-0 pl-0 md:pl-6">
                    <Skeleton className="h-10 w-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : history.length > 0 ? (
            <div className="space-y-4 animate-fade-in">
              {history.map((appointment, i) => (
                <div key={i} className="border border-[var(--surface-border)] hover:border-[var(--primary)]/50 transition-colors rounded-2xl p-6 flex flex-col md:flex-row gap-6 bg-black/20">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-sm text-[var(--primary)] tracking-wider">#{appointment.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        appointment.status === 'Confirmado' ? 'bg-green-500/20 text-green-400' :
                        appointment.status === 'Cancelado' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      <div className="flex items-start gap-3">
                        <Scissors className="text-gray-500 h-5 w-5 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Serviço</p>
                          <p className="text-white font-medium">{appointment.serviceName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <User className="text-gray-500 h-5 w-5 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Profissional</p>
                          <p className="text-white font-medium">{appointment.barberName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="text-gray-500 h-5 w-5 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Data</p>
                          <p className="text-white font-medium">
                            {appointment.date ? new Intl.DateTimeFormat('pt-BR').format(new Date(`${appointment.date}T12:00:00`)) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="text-gray-500 h-5 w-5 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Horário</p>
                          <p className="text-white font-medium">{appointment.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {appointment.status === 'Confirmado' && (
                    <div className="md:w-32 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[var(--surface-border)] pt-4 md:pt-0 pl-0 md:pl-6">
                      <button className="flex items-center justify-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors py-2">
                        <XCircle className="h-4 w-4" /> Cancelar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Calendar className="h-16 w-16 text-[var(--surface-border)] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Nenhum agendamento</h3>
              <p className="text-gray-400 mb-6">Você ainda não possui histórico de agendamentos com a BarberTime.</p>
              <Link href="/agendamento">
                <Button>Agendar Agora</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
