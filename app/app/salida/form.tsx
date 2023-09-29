'use client';
import React, { useState } from 'react';
import { Toast } from '../../(components)/toast';
import { getHour } from '../../utils';
import { getRangeWeather } from './actions';

const defaultFormData = {
  horaSalida: getHour(new Date()),
  cantidadHoras: '1'
};

export default function SalidaForm(): JSX.Element {
  const [formData, setFormData] = useState(defaultFormData);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Toast.fire({
      title: 'El usuario se va de joda!',
      text: `Sale a las ${formData.horaSalida} por unas ${formData.cantidadHoras} horas`,
      icon: 'info'
    });
    const outfit = await getRangeWeather(parseInt(formData.cantidadHoras, 10));
    Toast.fire({
      title: 'outfit encontrado!',
      text: `Arriba: ${outfit.upper}, Abajo: ${outfit.lower}`,
      icon: 'success'
    });
  };

  return (
    <div>
      <form onSubmit={submit} onReset={() => setFormData(defaultFormData)}>
        <label htmlFor="horaSalida">A que hora salis?</label>
        <input
          type="time"
          name="horaSalida"
          required
          id="horaSalida"
          onChange={onChange}
          value={formData.horaSalida}
          className="text-2xl text-center text-black bg-white border-2 border-black rounded-lg w-2/3 h-16 mt-10 mb-10 mx-auto block focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
        />

        {/* range for hours user will be out */}
        <label htmlFor="cantidadHoras">
          Cuantas horas vas a estar afuera? {formData.cantidadHoras}hs
        </label>
        <input
          type="range"
          name="cantidadHoras"
          id="cantidadHoras"
          min="1"
          max="12"
          step="1"
          required
          onChange={onChange}
          value={formData.cantidadHoras}
          className="text-2xl text-center text-black bg-white border-2 border-black rounded-lg w-2/3 h-16 mt-10 mb-10 mx-auto block focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
        />
        <div className="mt-2">
          <button
            type="reset"
            className="bg-red-700 px-3 py-2 mx-2 rounded text-white"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-white px-3 mx-2 py-2 rounded text-black"
          >
            Predecir
          </button>
        </div>
      </form>
    </div>
  );
}
