import { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react'
import Loader from '../Loader'
import TaskForm from '../TaskForm'
import TaskList, { Task } from '../TaskList'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)
  const [tareas, setTareas] = useState<Task[]>([])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTareas([
        { id: 1, titulo: 'Comprar leche', completada: false },
        { id: 2, titulo: 'Estudiar Ionic', completada: true },
      ])
      setLoading(false)
    }, 800)

    return () => window.clearTimeout(timer)
  }, [])

  const agregarTarea = (titulo: string) => {
    const nueva: Task = {
      id: Date.now(),
      titulo,
      completada: false,
    }
    setTareas((prev) => [...prev, nueva])
  }

  const toggleTarea = (id: number) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    )
  }

  const eliminarTarea = (id: number) => {
    setTareas((prev) => prev.filter((t) => t.id !== id))
  }

  if (loading) return <Loader />

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <h2>Mis tareas</h2>

        <TaskForm onAgregar={agregarTarea} />

        <TaskList tareas={tareas} onToggle={toggleTarea} onEliminar={eliminarTarea} />
      </IonContent>
    </IonPage>
  )
}