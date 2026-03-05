import { useEffect, useState } from 'react'
import { IonInput, IonButton } from '@ionic/react'

type Props = {
  onSubmit: (nombre: string, telefono: string) => void
  submitText?: string
  initialNombre?: string
  initialTelefono?: string
}

export default function FormContact({
  onSubmit,
  submitText = 'Guardar',
  initialNombre = '',
  initialTelefono = '',
}: Props) {
  const [nombre, setNombre] = useState<string>(initialNombre)
  const [telefono, setTelefono] = useState<string>(initialTelefono)

  useEffect(() => setNombre(initialNombre), [initialNombre])
  useEffect(() => setTelefono(initialTelefono), [initialTelefono])

  const guardar = () => {
    const n = nombre.trim()
    const t = telefono.trim()
    if (!n || !t) return
    onSubmit(n, t)
  }

  return (
    <>
      <IonInput value={nombre} onIonInput={(e) => setNombre(e.detail.value ?? '')} placeholder="Nombre" />
      <IonInput value={telefono} onIonInput={(e) => setTelefono(e.detail.value ?? '')} placeholder="Teléfono" />
      <IonButton className="btn-agregar" onClick={guardar}>
        {submitText}
      </IonButton>
    </>
  )
}