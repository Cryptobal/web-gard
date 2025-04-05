'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import API_URLS from '@/app/config/api';

export default function ContactForm() {
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
      const response = await fetch(API_URLS.CONTACTO, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setEnviado(true);
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
        
        // Obtener parámetros UTM de sessionStorage
        const utmSource = sessionStorage.getItem('utm_source') || '';
        const utmMedium = sessionStorage.getItem('utm_medium') || '';
        const utmCampaign = sessionStorage.getItem('utm_campaign') || '';
        const utmTerm = sessionStorage.getItem('utm_term') || '';
        const utmContent = sessionStorage.getItem('utm_content') || '';
        
        // Google Tag Manager event
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "submit_form_contacto",
          form_type: "contacto",
          page_path: window.location.pathname,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_term: utmTerm,
          utm_content: utmContent
        });
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
  );
} 