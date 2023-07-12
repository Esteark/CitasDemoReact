import React, { useState, useEffect } from "react";
import Error from "../error/Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validacion formuario

    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("Hay un campo vacio");
      setError(true);
      return;
    }
    const generarID = () => {
      const random = Math.random().toString(36).substr(2);
      const fecha = Date.now().toString(36);
      return random + fecha;
    };
    const newPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };
    if (paciente.id) {
      newPaciente.id = paciente.id;
      // Encuantram el paciente que contiene el id que hay en la prop paciente y una vez lo encuentre mandale la nueva informacion que hay en newPaciente es decir mande un nuevo array con dichas propiedades nuevas , si no retorna el mismo arreglo
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? newPaciente : pacienteState
      );
      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      // Nuevo registro
      newPaciente.id = generarID();
      setPacientes([...pacientes, newPaciente]);
    }

    setError(false);
    //Reiniciar el form
    setNombre("");
    setEmail("");
    setPropietario("");
    setFecha("");
    setSintomas("");
  };

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center ">
        Seguimiento pacientes
      </h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y{" "}
        <span className="text-indigo-600 font-bold  ">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-5 mb-10 "
      >
        {error && (
          <Error>
            <p>Todos los campos son Obligatorios</p>
          </Error>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 uppercase font-bold "
            htmlFor="mascota"
          >
            Nombre Mascota
          </label>
          <input
            type="text"
            placeholder="Nombre de la mascota"
            className=" border-2  w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-gray-400 cursor-pointer "
            id="mascota"
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            value={nombre}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 uppercase font-bold "
            htmlFor="propietario"
          >
            Nombre propietario
          </label>
          <input
            type="text"
            placeholder="Nombre del propietario"
            className=" border-2  w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-gray-400 cursor-pointer "
            id="propietario"
            value={propietario}
            onChange={(e) => {
              setPropietario(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 uppercase font-bold "
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email contacto propietario"
            className=" border-2  w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-gray-400 cursor-pointer"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 uppercase font-bold "
            htmlFor="alta"
          >
            Alta
          </label>
          <input
            type="date"
            className=" border-2  w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-gray-400 cursor-pointer"
            id="alta"
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 uppercase font-bold "
            htmlFor="sintomas"
          >
            Sintomas
          </label>
          <textarea
            className=" border-2  w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-gray-400 cursor-pointer"
            id="sintomas"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => {
              setSintomas(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded-md transition-all"
          value={paciente.id ? "Editar paciente" : "Agregar paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;
