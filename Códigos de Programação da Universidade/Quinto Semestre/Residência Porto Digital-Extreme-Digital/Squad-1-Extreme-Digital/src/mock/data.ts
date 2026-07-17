export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  image: string;
  category: 'cabelo' | 'barba' | 'combo' | 'sobrancelha' | 'coloracao';
};

export type Barber = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experienceYears: number;
  image: string;
};

export const mockServices: Service[] = [
  {
    id: 's1',
    name: 'Corte Tradicional',
    description: 'Corte clássico na tesoura ou máquina com acabamento impecável.',
    price: 45,
    durationMinutes: 40,
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=600&auto=format&fit=crop',
    category: 'cabelo',
  },
  {
    id: 's2',
    name: 'Degradê (Fade)',
    description: 'Corte moderno com transição suave nas laterais e muito estilo.',
    price: 55,
    durationMinutes: 45,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop',
    category: 'cabelo',
  },
  {
    id: 's3',
    name: 'Barba Terapia',
    description: 'Modelagem completa com toalha quente, navalha e produtos premium.',
    price: 40,
    durationMinutes: 30,
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop',
    category: 'barba',
  },
  {
    id: 's4',
    name: 'Corte + Barba',
    description: 'O combo perfeito para renovar o visual completo com desconto especial.',
    price: 85,
    durationMinutes: 70,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop',
    category: 'combo',
  },
  {
    id: 's5',
    name: 'Sobrancelha',
    description: 'Alinhamento e limpeza das sobrancelhas com navalha.',
    price: 15,
    durationMinutes: 15,
    image: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=600&auto=format&fit=crop',
    category: 'sobrancelha',
  },
  {
    id: 's6',
    name: 'Pigmentação',
    description: 'Disfarce de falhas na barba ou cabelo com tinta de alta qualidade.',
    price: 35,
    durationMinutes: 30,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600&auto=format&fit=crop',
    category: 'coloracao',
  },
];

export const mockBarbers: Barber[] = [
  {
    id: 'b1',
    name: 'Ricardo "Mão de Tesoura"',
    specialty: 'Cortes Clássicos',
    rating: 4.9,
    experienceYears: 8,
    image: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'b2',
    name: 'Felipe "Fade Master"',
    specialty: 'Degradê & Pigmentação',
    rating: 4.8,
    experienceYears: 5,
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'b3',
    name: 'Carlos "Navalha de Ouro"',
    specialty: 'Barba Terapia',
    rating: 5.0,
    experienceYears: 12,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=400&auto=format&fit=crop',
  },
];

export const mockTimes = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
];
