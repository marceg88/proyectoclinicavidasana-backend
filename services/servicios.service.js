const mongoose = require("mongoose")
const Servicio = require("../models/servicios.schema")
const Usuario = require("../services/usuarios.service")


const ServiciosUsuarios = {
  async registroServicio(servicio, paciente){
    try {
      const usuario = await Usuario.findById(paciente)
      if(usuario){
        try {
          const nuevoServicio = await new Servicio(servicio)
          const session = await mongoose.startSession()
          await session.withTransaction(async () => {
            await nuevoServicio.save({session})
            await usuario.services.push(nuevoServicio._id)
            await usuario.save({session})
          })
          await session.endSession()
          return nuevoServicio
        } catch (error) {
          return error
        }
      }else{
        res.status(403).json({message: "El usuario no existe en la base de datos"})
      }
    } catch (error) {
      return error
    }
  },
  async findServiceById(id){
    try {
      const servicio = await Servicio.findById(id)
      return servicio
    } catch (error) {
      return error
    }
  },
  async findByPatient(patientId){
    try {
      const servicio = await Servicio.find({patient: patientId})
      return servicio
    } catch (error) {
      return error
    }
  },
  async editServiceById(id, service) {
    try {
      const currentService = await Servicio.findById(id)
      if(service.nameService !== "") currentService.nameService = service.nameService
      if(service.dateService !== "") currentService.dateService = service.dateService
      if(service.price !== "") currentService.price = service.price
      const serviceUpdated = currentService.save()
      return serviceUpdated
    } catch (error) {
      return error
    }
  },
  async deleteServiceById(id){
    try {
      await this.findServiceById(id)
      try {
        const session = await mongoose.startSession()
        await session.withTransaction(async () => {
          const service = await Servicio.findByIdAndDelete(id, {session}).populate("patient")
          service.patient.services.pull(service)
          await service.patient.save({ session })
        })
        session.endSession()
        return
      } catch (error) {
        return error
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = ServiciosUsuarios