"use client";
import Modal from "@/components/common/modal";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center flex-1 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    

        <div className="mt-8">
          <Modal
            trigger={
              <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                Probar Modal
              </button>
            }
            title="Modal de Prueba"
            description="Este es un modal customizable creado con shadcn/ui. Puedes personalizar el título, descripción, botones y acciones."
            actionText="Confirmar"
            cancelText="Cerrar"
            onAction={() => router.push("/login")}
            onCancel={() => console.log("Modal cancelado")}
          />
        </div>
      </main>
    </div>
  );
}
