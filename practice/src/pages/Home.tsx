import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import './Home.css'
import Loader from '../Loader'
import ListContact from '../ListContact'
import { useHistory } from 'react-router-dom'

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton } from '@ionic/react'
import { deleteContact, getContacts, Contacto } from '../services/storage'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)
  const [contactos, setContactos] = useState<Contacto[]>([])
  const history = useHistory()

  const load = () => {
    setContactos(getContacts())
  }

  useEffect(() => {
    // carga inicial
    const timer = window.setTimeout(() => {
      load()
      setLoading(false)
    }, 300)

    return () => window.clearTimeout(timer)
  }, [])

  // cada vez que vuelves a Home (por back) recarga
  useEffect(() => {
    const unlisten = history.listen((location) => {
      if (location.pathname === '/home') load()
    })
    return () => unlisten()
  }, [history])

  const eliminarContacto = (id: number) => {
    deleteContact(id)
    load()
  }

  const editarContacto = (id: number) => {
    history.push(`/edit/${id}`)
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
        <div className="page-container">
          <div>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>

          <h2>Lista de contactos</h2>

          <IonButton className="btn-agregar" onClick={() => history.push('/create')}>
            Agregar contacto
          </IonButton>

          <ListContact contactos={contactos} onEliminar={eliminarContacto} onEditar={editarContacto} />

          <IonImg src="/icon.png" className="home-icon" />
        </div>
      </IonContent>
    </IonPage>
  )
}