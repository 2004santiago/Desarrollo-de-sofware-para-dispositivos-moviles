import { IonList, IonItem, IonLabel, IonButton } from '@ionic/react'

export type Task = {
  id: number
  titulo: string
  completada: boolean
}

type Props = {
  tareas: Task[]
  onToggle: (id: number) => void
  onEliminar: (id: number) => void
}

export default function TaskList({ tareas, onToggle, onEliminar }: Props) {
  return (
    <IonList>
      {tareas.map((t) => (
        <IonItem key={t.id}>
          <IonLabel>
            {t.completada ? `✅ ${t.titulo}` : t.titulo}
          </IonLabel>

          <IonButton onClick={() => onToggle(t.id)}>
            {t.completada ? 'Undo' : 'Done'}
          </IonButton>

          <IonButton onClick={() => onEliminar(t.id)}>X</IonButton>
        </IonItem>
      ))}
    </IonList>
  )
}