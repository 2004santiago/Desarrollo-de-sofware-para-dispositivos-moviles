// ListContact.tsx
import { IonList, IonItem, IonLabel, IonButton } from '@ionic/react'

type Contacto = {
  id: number
  nombre: string
  telefono: string
}

type Props = {
  contactos: Contacto[]
  onEliminar: (id: number) => void
}

export default function ListContact({ contactos, onEliminar }: Props) {
  return (
    <IonList>
      {contactos.map((c) => (
        <IonItem key={c.id}>
          <IonLabel>
            {c.nombre} - {c.telefono}
          </IonLabel>
          <IonButton onClick={() => onEliminar(c.id)}>X</IonButton>
        </IonItem>
      ))}
    </IonList>
  )
}