/**
 * Componente en donde se generan los links de navegación del módulo de gestíon de costos
 */
'use client';

import {
  UserGroupIcon,
  HomeIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


const links = [
  {
    name: 'Panel de Control',
    href: '/costos/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Consumibles',
    href: '/costos/dashboard/consumibles',
    icon: BeakerIcon,
  },
  {
    name: 'Procesos',
    href: '/costos/dashboard/procesos',
    icon: Cog6ToothIcon
  },
  {
    name: 'Procesos-Consumibles',
    href: '/costos/dashboard/procesos-consumibles',
    icon: BeakerIcon,
  },
  {
    name: 'Servicios',
    href: '/costos/dashboard/servicios',
    icon: ClipboardDocumentListIcon
  },
  {
    name: 'Servicios-Procesos',
    href: '/costos/dashboard/servicios-procesos',
    icon: ClipboardDocumentListIcon
  },
  {
    name: 'Invoices',
    href: '/costos/dashboard/invoices',
    icon: UserGroupIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
