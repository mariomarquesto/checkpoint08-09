// createDoctors

// En este ejercicio deberás crear algunos registros para un modelo determinado.
// La instancia de sequelize que recibe la funcion (sequelize) tiene definido el modelo "Doctor".
// En el segundo parámetro (doctors), recibirás un array de datos de VARIOS doctores.
// Debes crear registros de doctores en el modelo a partir de los datos contenidos en el array.
// Tu función no necesita retornar nada, solamente hacer la creación

// TIP: Recuerda que la creación de un registro o instancia en Sequelize es una operación asíncrona que retorna una promesa.
// Por esto, en este ejercicio debes utilizar async/await

// Documentación con la que puedes guiarte: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

module.exports = async (sequelize, doctors) => {
  // Tu código aquí...
  const Doctor = sequelize.models.Doctor;
  try {
    
    for (const doctorData of doctors) {
      await Doctor.create(doctorData);
    }

    console.log('Registros de doctores creados con éxito.');
  } catch (error) {
    console.error('Error al crear registros de doctores:', error);
  }
};
