import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Scissors, User, Phone, MessageCircle, Check, Star, MapPin } from 'lucide-react';




const BarberShopBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    barber: '',
    date: '',
    time: '',
    notes: '',
    terms: false
  });
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    { id: 'clasico', name: 'Corte Clásico', price: '₡8,000', duration: '30 min', description: 'Corte tradicional con máquina y tijera' },
    { id: 'premium', name: 'Corte Premium', price: '₡12,000', duration: '45 min', description: 'Corte con tijera, lavado y peinado' },
    { id: 'barba', name: 'Afeitado de Barba', price: '₡6,000', duration: '25 min', description: 'Afeitado tradicional con navaja' },
    { id: 'completo', name: 'Servicio Completo', price: '₡18,000', duration: '60 min', description: 'Corte, barba, lavado y tratamiento' },
    { id: 'fade', name: 'Fade Moderno', price: '₡10,000', duration: '40 min', description: 'Degradado moderno con diseños' },
    { id: 'tratamiento', name: 'Tratamiento Capilar', price: '₡15,000', duration: '50 min', description: 'Hidratación y cuidado del cabello' }
  ];

  const barbers = [
    { id: 'any', name: 'Sin preferencia', specialty: 'Disponibilidad completa' },
    { id: 'carlos', name: 'Carlos Méndez', specialty: 'Especialista en fades y diseños', rating: 4.9 },
    { id: 'miguel', name: 'Miguel Rojas', specialty: 'Experto en barbas clásicas', rating: 4.8 },
    { id: 'andrea', name: 'Andrea López', specialty: 'Cortes modernos y tratamientos', rating: 5.0 }
  ];

  const timeSlots = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '2:00', '2:30', '3:00', '3:30',
    '4:00', '4:30', '5:00', '5:30', '6:00', '6:30'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    handleInputChange('service', service.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1: return formData.service && formData.barber;
      case 2: return formData.date && formData.time;
      case 3: return formData.name && formData.phone && formData.terms;
      default: return false;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Cita Confirmada!</h2>
          <p className="text-gray-600 mb-6">
            Hemos enviado los detalles de tu cita a tu WhatsApp. 
            Te esperamos el <strong>{formData.date}</strong> a las <strong>{formData.time}</strong>.
          </p>
          <div className="bg-amber-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-amber-800">
              <strong>Recordatorio:</strong> Llega 10 minutos antes de tu cita
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Agendar Nueva Cita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-4">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Barbería Élite</h1>
          <p className="text-amber-200 text-lg">Agenda tu cita en línea</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {isStepComplete(step) ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step ? 'bg-amber-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Step 1: Service & Barber Selection */}
            {currentStep === 1 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Scissors className="w-6 h-6 mr-2 text-amber-500" />
                  Selecciona tu Servicio
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {services.map((service) => (
                    <div 
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                        selectedService?.id === service.id 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <span className="text-amber-600 font-bold">{service.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.duration}
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-amber-500" />
                  Elige tu Barbero
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {barbers.map((barber) => (
                    <div 
                      key={barber.id}
                      onClick={() => handleInputChange('barber', barber.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                        formData.barber === barber.id 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{barber.name}</h4>
                        {barber.rating && (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{barber.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{barber.specialty}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-amber-500" />
                  Fecha y Hora
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecciona la Fecha
                    </label>
                    <input 
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horarios Disponibles
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleInputChange('time', time)}
                          className={`p-2 text-sm rounded-lg border transition-all ${
                            formData.time === time
                              ? 'border-amber-500 bg-amber-50 text-amber-700'
                              : 'border-gray-300 hover:border-amber-300 hover:bg-amber-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {formData.date && formData.time && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Resumen de tu Cita:</h4>
                    <p className="text-amber-700">
                      <strong>Servicio:</strong> {services.find(s => s.id === formData.service)?.name}<br/>
                      <strong>Barbero:</strong> {barbers.find(b => b.id === formData.barber)?.name}<br/>
                      <strong>Fecha:</strong> {formData.date}<br/>
                      <strong>Hora:</strong> {formData.time}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Phone className="w-6 h-6 mr-2 text-amber-500" />
                  Información de Contacto
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de WhatsApp *
                    </label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="8888-8888"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageCircle className="w-4 h-4 inline mr-1" />
                    Notas Especiales (Opcional)
                  </label>
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    placeholder="Ej: Fade bajo con diseño, alergia a ciertos productos, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="flex items-start mb-6">
                  <input 
                    type="checkbox"
                    id="terms"
                    checked={formData.terms}
                    onChange={(e) => handleInputChange('terms', e.target.checked)}
                    className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                    Acepto los <a href="#" className="text-amber-600 hover:text-amber-500">términos y condiciones</a> y 
                    autorizo el envío de recordatorios por WhatsApp
                  </label>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Confirmación Final:</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Servicio:</strong> {services.find(s => s.id === formData.service)?.name}</p>
                    <p><strong>Precio:</strong> {services.find(s => s.id === formData.service)?.price}</p>
                    <p><strong>Barbero:</strong> {barbers.find(b => b.id === formData.barber)?.name}</p>
                    <p><strong>Fecha:</strong> {formData.date} a las {formData.time}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="bg-gray-50 px-8 py-4 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                disabled={currentStep === 1}
              >
                Anterior
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepComplete(currentStep)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isStepComplete(currentStep)
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepComplete(3) || isSubmitting}
                  className={`px-8 py-2 rounded-lg font-medium transition-colors flex items-center ${
                    isStepComplete(3) && !isSubmitting
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Confirmando...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Confirmar Cita
                    </>
                  )}
                </button>
              )}
            </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-amber-200">
          <div className="flex items-center justify-center mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">Av. Central 123, San José, Costa Rica</span>
          </div>
          <p className="text-sm mb-1">Lunes a Sábado: 9:00 AM - 7:00 PM</p>
          <p className="text-xs text-amber-300">WhatsApp: +506 8888-8888</p>
        </div>
      </div>
    </div>
  );



  
};

export default BarberShopBooking;

