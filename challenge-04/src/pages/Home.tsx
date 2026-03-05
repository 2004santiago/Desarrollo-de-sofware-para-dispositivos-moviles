import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Home.css'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
} from '@ionic/react'

import ListContact from '../ListContact'
import { deleteContact, getContacts, Contacto } from '../services/storage'
import { logout } from '../services/auth'

const Home: React.FC = () => {
  const history = useHistory()
  const [contactos, setContactos] = useState<Contacto[]>([])

  const load = () => setContactos(getContacts())

  useEffect(() => {
    load()
    const unlisten = history.listen((loc) => {
      if (loc.pathname === '/home') load()
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de contactos</IonTitle>

          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                logout()
                history.push('/login')
              }}
            >
              Logout
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="page-container">
          <h2>Lista de contactos</h2>

          <IonButton className="btn-agregar" onClick={() => history.push('/create')}>
            Agregar contacto
          </IonButton>

          <ListContact
            contactos={contactos}
            onEliminar={eliminarContacto}
            onEditar={editarContacto}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Home