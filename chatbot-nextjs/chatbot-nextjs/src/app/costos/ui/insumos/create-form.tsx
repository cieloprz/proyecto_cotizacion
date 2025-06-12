'use client'

import { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BeakerIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  SquaresPlusIcon,
  CubeIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/costos/ui/button';

interface Consumibles {
  id: number;
  nombre: string;
  tipo: string;
  presentacion: string;
  unidad_medida: string;
  rxn: string;
  precio_iva: number;
  precio_unitario: number;
  plataforma: string;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

export default function CrearInsumo() {
  const [consumibles, setConsumibles] = useState<Consumibles[]>([]);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [unidad_medida, setUnidadMedida] = useState('');
  const [rxn, setRxn] = useState('');
  const [precio_iva, setPrecioIva] = useState('');
  const [precio_unitario, setPrecioUnitario] = useState('');
  const [plataforma, setPlataforma] = useState('');

  const router = useRouter();

  // Agregar proyecto
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!nombre || !tipo || !precio_unitario) {
      alert("Estos los campos son obligatorios.");
      return;
    }

    axios.post(`${API_URL}/api/api/consumibles/`, {
      nombre,
      tipo,
      presentacion,
      unidad_medida,
      rxn,
      precio_iva: parseFloat(precio_iva),
      precio_unitario: parseFloat(precio_unitario),
      plataforma,
    })
      .then(response => {
        alert('Consumible agregado correctamente');
        router.push('/costos/dashboard/insumos');
        setConsumibles([...consumibles, response.data as Consumibles]);
        setNombre('');
        setTipo('');
        setPresentacion('');
        setUnidadMedida('');
        setRxn('');
        setPrecioIva('');
        setPrecioUnitario('');
        setPlataforma('');
      })
      .catch(error => {
        console.error("Error al agregar el consumible: ", error);
        alert('Error al agregar el consumible');
      });
  };



  return <form onSubmit={handleSubmit}>
    <div className="rounded-md bg-gray-50 p-4 md:p-6">

      {/* Nombre del insumo */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          Nombre
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe el nombre del consumible"
              required
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby='amount-error'
            />
            <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>




      {/* Tipo de insumo */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          Tipo
        </label>
        <div className="relative">
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Escribe el tipo del consumible"
            aria-describedby='customer-error'
          />
        </div>


        {/* Presentación del insumo */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Presentación
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="text"
                value={presentacion}
                onChange={(e) => setPresentacion(e.target.value)}
                
                placeholder="Escribe la presentación del consumible"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='amount-error'
              />
              <CubeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>


        {/* Unidad de medida */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Unidad de medida
          </label>
          <div className="relative">
            <input
              type="text"
              value={unidad_medida ?? ""}
              onChange={(e) => setUnidadMedida(e.target.value)}
              
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Escribe la unidad de medida del consumible"
              aria-describedby='customer-error'
            />
          </div>
        </div>

        {/* Unidad de medida */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            RXN
          </label>
          <div className="relative">
            <input
              type="number"
              value={rxn ?? ""}
              onChange={(e) => setRxn(e.target.value)}
              
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Escribe el RXN"
              aria-describedby='customer-error'
            />
          </div>
        </div>



        {/* Costo unitario */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Precio general con IVA
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="number"
                value={precio_iva}
                onChange={(e) => setPrecioIva(e.target.value)}
                step="0.01"
                placeholder="Ingresa el precio general con IVA del consumible"
                
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>


        {/* Costo unitario */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Precio Unitario
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="number"
                value={precio_unitario}
                onChange={(e) => setPrecioUnitario(e.target.value)}
                step="0.01"
                placeholder="Ingresa el precio unitario del consumible"
                
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>


        {/* Cantidad existente */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Plataforma
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="text"
                value={plataforma}
                onChange={(e) => setPlataforma(e.target.value)}
                step="1"
                placeholder="Ingresa la plataforma en la que se usa"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <SquaresPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>



      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/insumos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Consumible</Button>
      </div>
    </div>
  </form>;
}
