'use client';
import React, { useState } from 'react';
import { Popup, Toast } from '../../(components)/toast';
import { config, getHour, getLower, getUpper } from '../../utils';
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
    // const horaVuelta es la suma entre formData.horaSalida (es un string de la hora, ej: 09:10) y formData.cantidadHoras (es un numero que tiene la cantidad de tiempo que va a estar afuera)
    const horaVuelta = new Date(
      new Date().setHours(
        parseInt(formData.horaSalida.split(':')[0], 10) +
          parseInt(formData.cantidadHoras, 10)
      )
    );

    if (
      !outfit.highest.lower ||
      !outfit.highest.upper ||
      !outfit.lowest.lower ||
      !outfit.lowest.upper
    ) {
      return Popup.fire({
        title: 'Error al buscar respuestas',
        icon: 'error',
        text: 'No tenemos suficientes respuestas para el rango de temperatura especificado. Por favor, responde el formulario para que aprendamos más de vos!'
      });
    }

    if (
      outfit.highest.lower === outfit.lowest.lower &&
      outfit.highest.upper === outfit.lowest.upper
    ) {
      // Significa que no hay cambios de temperatura o que va a usar lo mismo durante toda la salida
      Popup.fire({
        title: `Outfit para ${formData.horaSalida} - ${getHour(horaVuelta)}`,
        html: `Sali con <b>${
          getUpper(outfit.highest.upper).displayName
        }</b> y unos <b>${
          getLower(outfit.highest.lower).displayName
        }</b>.<br/>La temperatura se va a mantener parecida en toda tu salida.`,
        icon: 'info'
      });
    } else {
      // Significa que hay un cambio de temperatura que justifica un 2do outfit. 2 opciones:
      /// - Decir Sali con {outfit.highest} pero considera que podes llegar a necesitar {outfit.lowest}
      /// - Decir Sali con {outfit.lowest} pero considera que podes llegar a necesitar {outfit.highest}

      if (outfit.highest.lower === outfit.lowest.lower) {
        // Caso: Misma parte de abajo, solo cambia la de arriba
        Popup.fire({
          title: `Outfit para ${formData.horaSalida} - ${getHour(horaVuelta)}`,
          html: `Salí con <b>${
            getUpper(outfit.highest.upper).displayName
          }</b> y unos <b>${
            getLower(outfit.highest.lower).displayName
          }</b>. <br/>
          Considerá que podes llegar a necesitar <b>${
            getUpper(outfit.lowest.upper).displayName
          }</b> en algun momento.`,
          icon: 'info'
        });
      } else {
        // Caso: Diferente parte de abajo en el rango
        Popup.fire({
          title: `Outfit para ${formData.horaSalida} - ${getHour(horaVuelta)}`,
          html: `Salí con <b>${
            getUpper(outfit.highest.upper).displayName
          }</b> y unos <b>${
            getLower(outfit.highest.lower).displayName
          }</b>. <br/>
          Considerá que podes llegar a necesitar <b>${
            getUpper(outfit.lowest.upper).displayName
          }</b> con unos <b>${
            getLower(outfit.lowest.lower).displayName
          }</b> en algun momento.`,
          icon: 'info'
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={submit} onReset={() => setFormData(defaultFormData)}>
        <label htmlFor="horaSalida">A que hora salis?</label>
        <input
          type="time"
          name="horaSalida"
          required
          disabled
          readOnly
          id="horaSalida"
          onChange={onChange}
          value={formData.horaSalida}
          className="disabled:cursor-not-allowed text-2xl text-center text-black bg-white border-2 border-black rounded-lg w-2/3 h-16 mt-10 mb-10 mx-auto block focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50"
        />

        <label htmlFor="cantidadHoras">
          Cuantas horas vas a estar afuera? {formData.cantidadHoras}hs
        </label>
        <input
          type="range"
          name="cantidadHoras"
          id="cantidadHoras"
          min="1"
          max={config.rateLimits.maxHoursOut}
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
