'use client';
import React, { useRef } from 'react';
import { Toast } from '../../(components)/toast';

export default function SalidaForm(): JSX.Element {
  const horasAfueraRef = useRef<HTMLInputElement>(null);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    Toast.fire({
      title: 'El usuario se va de joda!',
      text: `Sale a las ${data.get('salida')} por unas ${data.get(
        'horas-afuera'
      )} horas`,
      icon: 'info'
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="salida">A que hora salis?</label>
        <input
          type="time"
          name="salida"
          required
          id="salida"
          className=" text-2xl text-center text-black bg-white border-2 border-black rounded-lg w-2/3 h-16 mt-10 mb-10 mx-auto block focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
        />

        {/* range for hours user will be out */}
        <label htmlFor="horas-afuera">Cuantas horas vas a estar afuera?</label>
        <input
          type="range"
          name="horas-afuera"
          id="horas-afuera"
          min="1"
          max="12"
          step="1"
          required
          defaultValue="1"
          ref={horasAfueraRef}
          className="w-2/3 mx-auto block focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
        />

        <button type="submit" className="bg-white px-3 py-2 rounded text-black">
          Predecir
        </button>
      </form>
    </div>
  );
}
