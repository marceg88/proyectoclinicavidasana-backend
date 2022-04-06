const ServiciosUsuarios = require("../services/servicios.service")
const { validationResult } = require("express-validator")

const registrarServicio = async (req, res, next) => {
  const servicioJson = {...req.body}
  const paciente = req.body.patient
  try {
    const nuevoServicio = await ServiciosUsuarios.registroServicio(servicioJson, paciente)
    console.log(nuevoServicio)
    res.status(200).json({
      message: "El servicio fue registrado con exito",
      status: "OK",
      data: nuevoServicio
    })
  } catch (error) {
    res.status(400).json({
      message: "El servicio no pudo ser registrado",
      status: "Failed",
      data: error
    })
  }
}

const findServiceById = async (req, res, next) => {
  const { serviceId } = req.params
  try {
    const service = await ServiciosUsuarios.findServiceById(serviceId)
    console.log("1",service)
    res.status(200).json({
      message: "El servicio fue encontrado con exito",
      status: "OK",
      data: service
    })
  } catch (error) {
    res.status(400).json({
      message: "El servicio no pudo ser encontrado",
      status: "Failed",
      data: error
    })
  }
}

const findServiceByPatient = async (req, res, next) => {
  const patientId = req.params.userId
  try {
    const services = await ServiciosUsuarios.findByPatient(patientId)
    res.status(200).json({
      message: 'La lista de servicios para este paciente fue encontrada',
      status: 'OK',
      data: services
    })
  } catch (error) {
    res.status(400).json({
      message: 'No pudo ser encontrado servicios para este paciente',
      status: 'Failed',
      data: {}
    })
  }
}

const editServices = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors)
  // if (!errors.isEmpty()) {
  //     next(errors)
  // } else {
    const { serviceId } = req.params
    const { nameService, dateService, price } = req.body
    console.log(req.body)
    try {
      const serviceUpdated = await ServiciosUsuarios.editServiceById(serviceId, { nameService, dateService, price })
      console.log("edit",serviceUpdated)
      res.status(201).json({
        message: "El servicio se actualizo con exito",
        status: "OK",
        data: serviceUpdated
      })
    } catch (error) {
      res.status(400).json({
        message: "El servicio no pudo ser actualizado",
        status: "Failed",
        data: error
      })
    }
  // }
}

const deleteService = async (req, res, next) => {
  const { serviceId } = req.params
  try {
    const service = await ServiciosUsuarios.deleteServiceById(serviceId)
    res.status(200).json({
      message: "El servicio fue eliminado con exito",
      status: "OK",
      data: service
    })
  } catch (error) {
    res.status(400).json({
      message: "El servicio no se pudo eliminar",
      status: "OK",
      data: {}
    })
  }
}

module.exports = { registrarServicio, findServiceById, findServiceByPatient, editServices, deleteService }