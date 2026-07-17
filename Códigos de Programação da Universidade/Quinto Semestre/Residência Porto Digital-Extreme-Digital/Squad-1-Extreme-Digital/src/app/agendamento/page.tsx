'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Check, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock, Scissors, User } from 'lucide-react';
import { mockServices, mockBarbers, mockTimes, Service, Barber } from '@/mock/data';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const STEPS = [
  { id: 1, name: 'Serviço' },
  { id: 2, name: 'Profissional' },
  { id: 3, name: 'Data' },
  { id: 4, name: 'Horário' },
  { id: 5, name: 'Seus Dados' },
  { id: 6, name: 'Resumo' }
];

function AgendamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [clientData, setClientData] = useState({
    nome: '',
    telefone: '',
    email: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Initialize from query params if available
  useEffect(() => {
    const serviceId = searchParams.get('servico');
    const barberId = searchParams.get('barbeiro');
    
    if (serviceId) {
      const service = mockServices.find(s => s.id === serviceId);
      if (service) setSelectedService(service);
    }
    
    if (barberId) {
      const barber = mockBarbers.find(b => b.id === barberId);
      if (barber) setSelectedBarber(barber);
    }
  }, [searchParams]);

  // Generate some future dates for the date picker
  const upcomingDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // Start from tomorrow
    return d;
  }).filter(d => d.getDay() !== 0); // Exclude Sundays

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const validateClientData = () => {
    const newErrors: { [key: string]: string } = {};
    if (!clientData.nome || clientData.nome.length < 3) newErrors.nome = 'Nome deve ter no mínimo 3 caracteres.';
    if (!clientData.telefone || clientData.telefone.length < 10) newErrors.telefone = 'Telefone inválido.';
    if (!clientData.email || !/^\S+@\S+\.\S+$/.test(clientData.email)) newErrors.email = 'E-mail inválido.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    setLoading(true);
    
    // Simulate API submission delay for Dynatrace
    const delay = Math.floor(Math.random() * 2000) + 1500;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Generate fake reservation code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Save to localStorage to simulate backend persistence
    const newAppointment = {
      id: code,
      serviceName: selectedService?.name,
      barberName: selectedBarber?.name,
      date: selectedDate,
      time: selectedTime,
      clientData,
      status: 'Confirmado',
      createdAt: new Date().toISOString()
    };
    
    const existingHistory = JSON.parse(localStorage.getItem('barberHistory') || '[]');
    localStorage.setItem('barberHistory', JSON.stringify([newAppointment, ...existingHistory]));
    
    setLoading(false);
    
    // Redirect to confirmation page
    router.push(`/confirmacao?codigo=${code}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Agendar Horário</h1>
        <p className="text-gray-400">Complete os passos abaixo para garantir seu horário.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--surface-border)] -z-10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--primary)] transition-all duration-500 ease-in-out" 
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
          
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                currentStep > step.id ? 'bg-[var(--primary)] text-black' : 
                currentStep === step.id ? 'bg-[var(--primary)] text-black ring-4 ring-[var(--primary)]/30' : 
                'bg-[var(--surface)] border border-[var(--surface-border)] text-gray-500'
              }`}>
                {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${currentStep >= step.id ? 'text-white' : 'text-gray-500'}`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="glass rounded-3xl p-6 md:p-10 min-h-[400px] flex flex-col relative overflow-hidden">
        
        {/* STEP 1: Serviço */}
        {currentStep === 1 && (
          <div className="animate-fade-in flex-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Scissors className="text-[var(--primary)]" /> Escolha o Serviço
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockServices.map(service => (
                <div 
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                    selectedService?.id === service.id 
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                      : 'border-[var(--surface-border)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden shrink-0">
                    <Image src={service.image} alt={service.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{service.name}</h4>
                    <p className="text-sm text-gray-400">{service.durationMinutes} min</p>
                    <p className="text-[var(--primary)] font-bold mt-1">R$ {service.price}</p>
                  </div>
                  {selectedService?.id === service.id && (
                    <div className="ml-auto bg-[var(--primary)] text-black rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Barbeiro */}
        {currentStep === 2 && (
          <div className="animate-fade-in flex-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <User className="text-[var(--primary)]" /> Escolha o Profissional
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                  onClick={() => setSelectedBarber({ id: 'any', name: 'Qualquer Profissional', specialty: 'Qualquer Especialidade', rating: 5.0, experienceYears: 0, image: '' })}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                    selectedBarber?.id === 'any' 
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                      : 'border-[var(--surface-border)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                    <User className="text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Qualquer Profissional</h4>
                    <p className="text-sm text-gray-400">O primeiro disponível</p>
                  </div>
                  {selectedBarber?.id === 'any' && (
                    <div className="ml-auto bg-[var(--primary)] text-black rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
              </div>

              {mockBarbers.map(barber => (
                <div 
                  key={barber.id}
                  onClick={() => setSelectedBarber(barber)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                    selectedBarber?.id === barber.id 
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                      : 'border-[var(--surface-border)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  <div className="w-16 h-16 relative rounded-full overflow-hidden shrink-0">
                    <Image src={barber.image} alt={barber.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{barber.name}</h4>
                    <p className="text-sm text-gray-400">{barber.specialty}</p>
                  </div>
                  {selectedBarber?.id === barber.id && (
                    <div className="ml-auto bg-[var(--primary)] text-black rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Data */}
        {currentStep === 3 && (
          <div className="animate-fade-in flex-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <CalendarIcon className="text-[var(--primary)]" /> Escolha a Data
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {upcomingDates.map((date, i) => {
                const dateStr = date.toISOString().split('T')[0];
                const dayName = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date).replace('.', '');
                const dayNum = date.getDate();
                const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date).replace('.', '');
                
                return (
                  <div 
                    key={i}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      selectedDate === dateStr 
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                        : 'border-[var(--surface-border)] hover:border-[var(--primary)]/50'
                    }`}
                  >
                    <p className="text-sm text-gray-400 uppercase">{dayName}</p>
                    <p className="text-3xl font-bold text-white my-1">{dayNum}</p>
                    <p className="text-sm text-gray-400 capitalize">{monthName}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Horário */}
        {currentStep === 4 && (
          <div className="animate-fade-in flex-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="text-[var(--primary)]" /> Escolha o Horário
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {mockTimes.map((time) => {
                // Randomly disable some times to make it realistic
                const isUnavailable = Math.random() < 0.3;
                
                return (
                  <button
                    key={time}
                    disabled={isUnavailable}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-lg border text-center transition-all ${
                      isUnavailable 
                        ? 'border-[var(--surface-border)] bg-gray-900 text-gray-600 cursor-not-allowed line-through' 
                        : selectedTime === time
                          ? 'border-[var(--primary)] bg-[var(--primary)] text-black font-bold'
                          : 'border-[var(--surface-border)] hover:border-[var(--primary)] text-white hover:bg-[var(--primary)]/10'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Dados do Cliente */}
        {currentStep === 5 && (
          <div className="animate-fade-in flex-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <User className="text-[var(--primary)]" /> Seus Dados
            </h2>
            <div className="space-y-6 max-w-md">
              <Input 
                label="Nome Completo" 
                placeholder="Ex: João Silva" 
                value={clientData.nome}
                onChange={(e) => setClientData({...clientData, nome: e.target.value})}
                error={errors.nome}
              />
              <Input 
                label="Telefone / WhatsApp" 
                placeholder="Ex: (11) 99999-9999" 
                value={clientData.telefone}
                onChange={(e) => {
                  // Fake mask logic
                  let val = e.target.value.replace(/\D/g, '');
                  if (val.length > 11) val = val.slice(0, 11);
                  if (val.length > 2) val = `(${val.slice(0,2)}) ${val.slice(2)}`;
                  if (val.length > 10) val = `${val.slice(0,10)}-${val.slice(10)}`;
                  setClientData({...clientData, telefone: val});
                }}
                error={errors.telefone}
              />
              <Input 
                label="E-mail" 
                type="email"
                placeholder="Ex: joao@email.com" 
                value={clientData.email}
                onChange={(e) => setClientData({...clientData, email: e.target.value})}
                error={errors.email}
              />
            </div>
          </div>
        )}

        {/* STEP 6: Resumo */}
        {currentStep === 6 && (
          <div className="animate-fade-in flex-1">
            <h2 className="text-2xl font-bold text-white mb-6">Confirme seu Agendamento</h2>
            
            <div className="bg-black/50 border border-[var(--surface-border)] rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-2 gap-y-6 border-b border-gray-800 pb-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Serviço</p>
                  <p className="font-bold text-white text-lg">{selectedService?.name}</p>
                  <p className="text-[var(--primary)] font-medium">R$ {selectedService?.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Profissional</p>
                  <p className="font-bold text-white text-lg">{selectedBarber?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Data</p>
                  <p className="font-bold text-white text-lg">
                    {selectedDate && new Intl.DateTimeFormat('pt-BR').format(new Date(`${selectedDate}T12:00:00`))}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Horário</p>
                  <p className="font-bold text-white text-lg">{selectedTime}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">Cliente</p>
                <p className="font-bold text-white">{clientData.nome}</p>
                <p className="text-gray-300">{clientData.telefone}</p>
                <p className="text-gray-300">{clientData.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-10 flex justify-between items-center pt-6 border-t border-[var(--surface-border)]">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            disabled={currentStep === 1 || loading}
            className={currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> Voltar
          </Button>

          {currentStep < 6 ? (
            <Button 
              onClick={() => {
                if (currentStep === 5 && !validateClientData()) return;
                handleNext();
              }}
              disabled={
                (currentStep === 1 && !selectedService) ||
                (currentStep === 2 && !selectedBarber) ||
                (currentStep === 3 && !selectedDate) ||
                (currentStep === 4 && !selectedTime)
              }
            >
              Continuar <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button 
              onClick={handleConfirm}
              isLoading={loading}
              className="bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]"
            >
              Confirmar Agendamento <Check className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AgendamentoPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-white">Carregando formulário...</div>}>
      <AgendamentoContent />
    </Suspense>
  );
}
