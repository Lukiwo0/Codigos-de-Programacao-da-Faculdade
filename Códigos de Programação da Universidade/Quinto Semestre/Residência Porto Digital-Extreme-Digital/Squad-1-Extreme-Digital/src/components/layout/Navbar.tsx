import Link from 'next/link';
import { Scissors } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Scissors className="h-8 w-8 text-[var(--primary)] transition-transform group-hover:rotate-180 duration-500" />
            <span className="text-2xl font-bold tracking-wider">
              BARBER<span className="text-[var(--primary)]">TIME</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Início</Link>
            <Link href="/servicos" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Serviços</Link>
            <Link href="/barbeiros" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Barbeiros</Link>
            <Link href="/historico" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Histórico</Link>
          </div>

          <Link 
            href="/agendamento" 
            className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-black font-bold py-2 px-6 rounded-full transition-all hover:scale-105"
          >
            Agendar Agora
          </Link>
        </div>
      </div>
    </nav>
  );
}
