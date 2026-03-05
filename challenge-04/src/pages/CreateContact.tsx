import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import FormContact from '../FormContact.tsx'
import './Home.css'
import { addContact } from '../services/storage'

export default function CreateContact() {
  const history = useHistory()

  const crear = (nombre: string, telefono: string) => {
    addContact({ id: Date.now(), nombre, telefono })
    history.push('/home')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Crear contacto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="page-container">
          <FormContact onSubmit={crear} submitText="Crear" />
        </div>
      </IonContent>
    </IonPage>
  )
}