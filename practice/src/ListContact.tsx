import { IonList, IonItem, IonLabel, IonButton } from '@ionic/react'
import './pages/Home.css'

type Contacto = {
  id: number
  nombre: string
  telefono: string
}

type Props = {
  contactos: Contacto[]
  onEliminar: (id: number) => void
  onEditar: (id: number) => void
}

export default function ListContact({ contactos, onEliminar, onEditar }: Props) {
  return (
    <IonList>
      {contactos.map((c) => (
        <IonItem key={c.id}>
          <IonLabel>
            {c.nombre} - {c.telefono}
          </IonLabel>

          <IonButton slot="end" fill="outline" size="small" onClick={() => onEditar(c.id)}>
            Edit
          </IonButton>

          <IonButton className="btn-delete" slot="end" fill="clear" size="small" onClick={() => onEliminar(c.id)}>
            X
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  )
}