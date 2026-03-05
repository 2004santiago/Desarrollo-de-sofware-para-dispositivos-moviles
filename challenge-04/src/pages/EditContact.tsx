import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from '@ionic/react'
import FormContact from '../FormContact'
import './Home.css'
import { getContacts, updateContact, Contacto } from '../services/storage'

export default function EditContact() {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const contactId = Number(id)

  const [contacto, setContacto] = useState<Contacto | null>(null)

  useEffect(() => {
    const found = getContacts().find((c) => c.id === contactId) ?? null
    setContacto(found)
  }, [contactId])

  const guardar = (nombre: string, telefono: string) => {
    updateContact(contactId, { nombre, telefono })
    history.push('/home')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Editar contacto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="page-container">
          {contacto ? (
            <FormContact
              onSubmit={guardar}
              submitText="Guardar cambios"
              initialNombre={contacto.nombre}
              initialTelefono={contacto.telefono}
            />
          ) : (
            <p>Contacto no encontrado.</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}