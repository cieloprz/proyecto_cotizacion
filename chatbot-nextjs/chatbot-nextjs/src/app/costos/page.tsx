import AcmeLogo from '@/app/costos/ui/uusmb-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { inter } from '@/app/costos/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div />
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-20">
          <p
            className={`${inter.className} text-xl text-gray-800 leading-normal`}
          >
            <strong>Bienvenido al modulo de gestion de costos.</strong> En este espacio se podrán agregar, eliminar, modificar
            y borrar los costos de los insumos y procesos para realizar los servicios de secuenciación Masiva en la Unidad
            Universitaria de Secuenciación Masiva y Bioinformática del IBt de la UNAM Campus Morelos.
            Para empezar, puedes leer el {' '}
            <a href="" className="text-blue-500">
              Manual de usuario del sistema
            </a>
            .
          </p>

          <Link
            href="/costos/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 md:text-base"
          >
            <span>Comenzar</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>


        </div>
      </div>
    </main>
  );
}
