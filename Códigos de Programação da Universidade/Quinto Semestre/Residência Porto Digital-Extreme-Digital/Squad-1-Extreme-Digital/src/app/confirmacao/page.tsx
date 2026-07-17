'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Calendar, Scissors, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function ConfirmacaoContent() {
  const searchParams = useSearchParams();
  const codigo = searchParams.get('codigo') || 'TBD123';

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fade-in">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Agendamento Confirmado!</h1>
      <p className="text-xl text-gray-400 mb-2">Tudo certo com o seu horário.</p>
      <p className="text-gray-400 mb-12">Te esperamos na BarberTime.</p>

      <div className="glass max-w-sm mx-auto rounded-2xl p-8 mb-12 relative overflow-hidden border border-[var(--primary)]/30">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
        
        <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest">Código da Reserva</p>
        <p className="text-4xl font-mono font-bold text-[var(--primary)] mb-8 tracking-widest">{codigo}</p>
        
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3 text-gray-300">
            <Calendar className="w-5 h-5 text-[var(--primary)]" />
            <span>Consulte o <Link href="/historico" className="text-white font-medium hover:underline">histórico</Link> para ver data e hora.</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Scissors className="w-5 h-5 text-[var(--primary)]" />
            <span>Serviço Premium</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <User className="w-5 h-5 text-[var(--primary)]" />
            <span>Profissional Especializado</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button variant="outline" className="w-full sm:w-auto">
            Voltar para Início
          </Button>
        </Link>
        <Link href="/agendamento">
          <Button className="w-full sm:w-auto">
            Novo Agendamento
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmacaoPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-white">Carregando confirmação...</div>}>
      <ConfirmacaoContent />
    </Suspense>
  );
}
