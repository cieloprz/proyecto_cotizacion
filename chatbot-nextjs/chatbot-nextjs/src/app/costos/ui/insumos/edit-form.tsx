'use client';


import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/app/costos/ui/button';
import {
  CurrencyDollarIcon, UserCircleIcon, BeakerIcon, SquaresPlusIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

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

export default function EditarInsumo() {
  const router = useRouter();
  const { id } = useParams(); // Obtener el id desde la URL
  const [consumibles, setConsumibles] = useState<Consumibles[]>([]);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [unidad_medida, setUnidadMedida] = useState('');
  const [rxn, setRxn] = useState('');
  const [precio_iva, setPrecioIva] = useState('');
  const [precio_unitario, setPrecioUnitario] = useState('');
  const [plataforma, setPlataforma] = useState('');


  // Cargar los datos del insumo al montar la página
  useEffect(() => {
    if (!id) return;

    axios.get(`${API_URL}/api/api/consumibles/${id}/`)
      .then(response => {
        const data: Consumibles = response.data as Consumibles;
        setConsumibles([data]);
        setNombre(data.nombre);
        setTipo(data.tipo);
        setPresentacion(data.presentacion);
        setUnidadMedida(data.unidad_medida);
        setRxn(data.rxn.toString());
        setPrecioIva(data.precio_iva.toString());
        setPrecioUnitario(data.precio_unitario.toString());
        setPlataforma(data.plataforma);
      })
      .catch(error => console.error("Error al cargar el insumo: ", error));
  }, [id]);

  // Enviar los cambios al backend
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    axios.put(`${API_URL}/api/api/conusmibles/${id}/`, {
      nombre,
      tipo,
      presentacion,
      unidad_medida,
      rxn,
      precio_iva: parseFloat(precio_iva),
      precio_unitario: parseFloat(precio_unitario),
      plataforma,
    })
      .then(() => {
        alert('Consumible actualizado correctamente');
        router.push('/costos/dashboard/insumos'); // Redirigir a la lista de insumos
      })
      .catch(error => {
        console.error("Error al actualizar el consumible: ", error);
        alert('Error al actualizar el consumible');
      });
  };

  if (!consumibles) return <p>Cargando...</p>;



  return <form onSubmit={handleUpdate}>
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
              placeholder="Escribe el nombre del insumo"
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
        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />



        {/* Presentación del insumo */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Presentación
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="text"
                value={presentacion ?? ""}
                onChange={(e) => setPresentacion(e.target.value)}

                placeholder="Escribe la presentación del insumo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='amount-error'
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
              value={unidad_medida ?? ""}
              onChange={(e) => setUnidadMedida(e.target.value)}

              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
      <div className="mt-4 flex gap-4">
        <Button type="submit">Guardar Cambios</Button>
        <Link
          href="/costos/dashboard/insumos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
      </div>
    </div>
  </form>;
}
