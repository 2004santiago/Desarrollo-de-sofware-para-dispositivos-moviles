import { useState } from 'react'
import { IonInput, IonButton } from '@ionic/react'

type Props = {
  onAgregar: (titulo: string) => void
}

export default function TaskForm({ onAgregar }: Props) {
  const [titulo, setTitulo] = useState<string>('')

  const agregar = () => {
    if (titulo.trim() === '') return
    onAgregar(titulo.trim())
    setTitulo('')
  }

  return (
    <>
      <IonInput
        value={titulo}
        onIonInput={(e) => setTitulo(e.detail.value ?? '')}
        placeholder="Nueva tarea"
      />
      <IonButton onClick={agregar}>Agregar</IonButton>
    </>
  )
}