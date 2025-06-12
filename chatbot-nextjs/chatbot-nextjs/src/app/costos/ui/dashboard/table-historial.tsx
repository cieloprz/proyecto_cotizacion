'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { inter } from '@/app/costos/ui/fonts';
import Search from '@/app/costos/ui/search';
import Link from 'next/link';
import { Suspense } from 'react';
import { PlusIcon, TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { InvoicesTableSkeleton } from '@/app/costos/ui/skeletons';


interface HistorialCambio {
  id: number;
  tabla_modificada: string;
  id_modificado: number;
  tipo_accion: string;
  usuario: string;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

export default function HistorialTable() {
  const [historialCambios, setHistorialCambios] = useState<HistorialCambio[]>([]);
  const [tabla_modificada, setTablaModificada] = useState('');
  const [id_modificado, setIdModificado] = useState('');
  const [tipo_accion, setTipoAccion] = useState('');
  const [usuario, setUsuario] = useState('');

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  // Buscar en el historial
  useEffect(() => {
    axios.get(`${API_URL}/api/api/historial-cambios/?search=${query}`)
      .then(response => setHistorialCambios(response.data as HistorialCambio[]))
      .catch(error => console.error("Error al obtener el historial: ", error));
  }, [query]); // Se ejecuta cuando cambia 'query'

  // Deshacer cambio
  const handleDelete = (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas deshacer este cambio?")) return;

    axios.delete(`${API_URL}/api/api/historial-cambios/${id}/`)
      .then(() => {
        setHistorialCambios(historialCambios.filter((historialCambios: HistorialCambio) => historialCambios.id !== id));
      })
      .catch((error: any) => console.error("Error al deshacer el cambio: ", error));
  };


  {/* Barra de búsqueda para el historial */ }
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-xl font-bold`}>Historial de Cambios</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar en el historial..." />
      </div>

      {/* Tabla de historial */}
      <div className="overflow-x-auto">

        <table className="min-w-full text-gray-900 table-auto">
          <thead className="rounded-lg text-left text-sm font-bold">
            <tr>
              <td scope="col" className="px-4 py-5 sm:pl-6">
                Tabla modificada</td>
              <td scope="col" className="px-3 py-5">
                ID modificado</td>
              <td scope="col" className="px-3 py-5">
                Tipo de accion</td>
              <td scope="col" className="px-3 py-5">
                Usuario </td>
            </tr>
          </thead>

          <Suspense fallback={<InvoicesTableSkeleton />}>

            <tbody className="bg-white">
              {historialCambios.map((historialCambios, index) => (
                <tr key={historialCambios.id || index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {historialCambios.tabla_modificada} </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {historialCambios.id_modificado}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {historialCambios.tipo_accion}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {historialCambios.usuario}</td>


                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <button className="rounded-md border p-2 hover:bg-gray-100"
                        onClick={() => handleDelete(historialCambios.id)}><span className="sr-only"> Deshacer cambio </span>
                        <ArrowUturnLeftIcon className="w-5" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Suspense>
        </table>

      </div>
    </div>

  );

}


