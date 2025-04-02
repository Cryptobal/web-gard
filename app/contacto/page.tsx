'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Si es el campo de teléfono, solo permitir números y máximo 9 dígitos
    if (name === 'telefono') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 9) {
        setFormData({ ...formData, [name]: onlyNums });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://hook.us1.make.com/b742nwic3qci4y21hg5ol1equ2t9rerj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setEnviado(true);
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      } else {
        setError('Hubo un problema al enviar el mensaje. Por favor, inténtelo de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="gard-container py-20 pt-32">
        <h1 className="text-heading-2 mb-6">Contacto directo con expertos en seguridad</h1>
        
        <p className="text-body-lg mb-8 max-w-3xl">
          En Gard Security valoramos la comunicación directa y eficiente con nuestros clientes. 
          Nuestro equipo de especialistas está disponible para atender todas sus consultas y 
          brindarle asesoramiento personalizado sobre soluciones de seguridad adaptadas a sus 
          necesidades específicas.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-heading-4 mb-6">Canales de comunicación</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-[#F97316] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Teléfono directo</h3>
                  <p className="text-muted-foreground mb-1">Respuesta inmediata en horario laboral</p>
                  <a href="tel:+56941137976" className="text-primary hover:underline">+56 9 4113 7976</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-[#F97316] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Correo electrónico</h3>
                  <p className="text-muted-foreground mb-1">Respuesta en menos de 24 horas</p>
                  <a href="mailto:comercial@gard.cl" className="text-primary hover:underline">comercial@gard.cl</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#F97316] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Oficina central</h3>
                  <p className="text-muted-foreground mb-1">Visítenos previo agendamiento</p>
                  <address className="not-italic">
                    Camino Los Trapenses 2140, Lo Barnechea<br />
                    Santiago, Chile
                  </address>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-[#F97316] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Horario de atención</h3>
                  <p className="text-muted-foreground">Lunes a viernes: 9:00 - 18:00 hrs</p>
                  <p className="text-muted-foreground">Emergencias: 24/7</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-heading-5 mb-4">Para una atención más eficiente</h3>
              <p className="text-muted-foreground mb-4">
                Para ayudarnos a atenderle mejor, le recomendamos tener a mano la siguiente información:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Tipo de servicio que necesita (guardias, monitoreo, etc.)</li>
                <li>Ubicación de su empresa o instalación</li>
                <li>Tamaño aproximado del área a proteger</li>
                <li>Necesidades específicas de seguridad</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted/10 p-8 rounded-xl">
            <h2 className="text-heading-4 mb-6">Formulario de contacto</h2>
            <p className="mb-6 text-muted-foreground">
              Complete el formulario a continuación y uno de nuestros asesores se pondrá en contacto con usted a la brevedad.
            </p>
            
            {enviado ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
                <h3 className="font-semibold mb-2">¡Mensaje enviado con éxito!</h3>
                <p>Gracias por contactarnos. Un asesor se comunicará con usted a la brevedad.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium mb-1">Nombre completo</label>
                  <input 
                    type="text" 
                    id="nombre" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full p-2 border border-input rounded-md" 
                    placeholder="Ingrese su nombre" 
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Correo electrónico</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-input rounded-md" 
                    placeholder="ejemplo@correo.com" 
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium mb-1">Teléfono (9 dígitos)</label>
                  <input 
                    type="tel" 
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full p-2 border border-input rounded-md" 
                    placeholder="912345678" 
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Ingrese solo 9 dígitos, sin espacios ni guiones</p>
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium mb-1">Mensaje</label>
                  <textarea 
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full p-2 border border-input rounded-md" 
                    placeholder="Describa su consulta o necesidad..." 
                    required
                  ></textarea>
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="border-t pt-8">
          <h2 className="text-heading-4 mb-6">Preguntas frecuentes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">¿Cuánto tiempo tardarán en responder a mi consulta?</h3>
              <p className="text-muted-foreground">
                Nos comprometemos a responder todas las consultas por correo electrónico en un plazo máximo de 24 horas hábiles.
                Para consultas telefónicas, la atención es inmediata durante nuestro horario laboral.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">¿Ofrecen servicio de cotización sin compromiso?</h3>
              <p className="text-muted-foreground">
                Sí, todas nuestras cotizaciones son gratuitas y sin compromiso. Elaboramos propuestas personalizadas
                según las necesidades específicas de cada cliente, con total transparencia en precios y condiciones.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">¿Atienden emergencias fuera del horario laboral?</h3>
              <p className="text-muted-foreground">
                Disponemos de un servicio de atención de emergencias 24/7 para clientes con contratos activos.
                Este servicio garantiza respuesta inmediata ante cualquier incidente de seguridad.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-primary/5 p-6 rounded-xl">
            <div className="flex items-start">
              <MessageSquare className="h-8 w-8 text-[#F97316] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">¿Prefiere una comunicación más directa?</h3>
                <p className="mb-4">
                  Si desea una respuesta más rápida o hablar directamente con un asesor de seguridad,
                  le recomendamos utilizar nuestro sistema de cotización online.
                </p>
                <Link 
                  href="/cotizar"
                  className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
                >
                  Solicitar cotización rápida
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 