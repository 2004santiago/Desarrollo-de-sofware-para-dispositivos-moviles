import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { AuthProvider } from "./context/AuthContext";
import { ContactsProvider } from "./context/ContactsContext";
import { TasksProvider } from "./context/TasksContext";
import { FruitsProvider } from "./context/FruitsContext";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ContactsProvider>
        <TasksProvider>
          <FruitsProvider>
            <App />
          </FruitsProvider>
        </TasksProvider>
      </ContactsProvider>
    </AuthProvider>
  </React.StrictMode>
);