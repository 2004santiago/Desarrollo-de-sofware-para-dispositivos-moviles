// pages/Home.tsx
import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'
import Loader from '../Loader'
import FormContact from '../FormContact'
import ListContact from '../ListContact'

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg } from '@ionic/react'

type Contacto = {
  id: number
  nombre: string
  telefono: string
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)
  const [contactos, setContactos] = useState<Contacto[]>([])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setContactos([
        { id: 1, nombre: 'Ana', telefono: '3001234567' },
        { id: 2, nombre: 'Carlos', telefono: '3109876543' },
      ])
      setLoading(false)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [])

  const agregarContacto = (nombre: string, telefono: string) => {
    const nuevo: Contacto = {
      id: Date.now(),
      nombre,
      telefono,
    }
    setContactos((prev) => [...prev, nuevo])
  }

  const eliminarContacto = (id: number) => {
    setContactos((prev) => prev.filter((c) => c.id !== id))
  }

  if (loading) return <Loader />

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de contactos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h2>Lista de contactos</h2>

        <FormContact onAgregar={agregarContacto} />
        <ListContact contactos={contactos} onEliminar={eliminarContacto} />

        <IonImg
          src="/icon.png"
          style={{
            width: '192px',
            height: '192px',
            display: 'block',
            margin: '0 auto'
          }}
        />      
        </IonContent>
    </IonPage>
  )
}