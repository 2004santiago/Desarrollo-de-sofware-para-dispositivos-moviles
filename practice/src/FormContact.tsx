// FormContact.tsx
import { useState } from 'react'
import { IonInput, IonButton } from '@ionic/react'

type Props = {
  onAgregar: (nombre: string, telefono: string) => void
}

export default function FormContact({ onAgregar }: Props) {
  const [nombre, setNombre] = useState<string>('')
  const [telefono, setTelefono] = useState<string>('')

  const agregar = () => {
    if (nombre.trim() === '' || telefono.trim() === '') return
    onAgregar(nombre.trim(), telefono.trim())
    setNombre('')
    setTelefono('')
  }

  return (
    <>
      <IonInput
        value={nombre}
        onIonInput={(e) => setNombre(e.detail.value ?? '')}
        placeholder="Nombre"
      />
      <IonInput
        value={telefono}
        onIonInput={(e) => setTelefono(e.detail.value ?? '')}
        placeholder="Teléfono"
      />
      <IonButton onClick={agregar}>Agregar</IonButton>
    </>
  )
}