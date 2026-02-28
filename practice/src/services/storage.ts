export type Contacto = {
  id: number
  nombre: string
  telefono: string
}

const KEY = 'contactos'

export const getContacts = (): Contacto[] => {
  const raw = localStorage.getItem(KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Contacto[]
  } catch {
    return []
  }
}

export const saveContacts = (contacts: Contacto[]) => {
  localStorage.setItem(KEY, JSON.stringify(contacts))
}

export const addContact = (contact: Contacto) => {
  const contacts = getContacts()
  contacts.push(contact)
  saveContacts(contacts)
}

export const updateContact = (id: number, data: Pick<Contacto, 'nombre' | 'telefono'>) => {
  const contacts = getContacts()
  const updated = contacts.map((c) => (c.id === id ? { ...c, ...data } : c))
  saveContacts(updated)
}

export const deleteContact = (id: number) => {
  const contacts = getContacts().filter((c) => c.id !== id)
  saveContacts(contacts)
}