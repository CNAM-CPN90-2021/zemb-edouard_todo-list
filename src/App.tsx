import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonBadge,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Tab1 from "./pages/Tab1";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useTodoList } from "./hooks/useTodoList";

const App: React.FC = () => {
  const { todoElements } = useTodoList();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {/*
              Il y a un bug gênant : les données ne sont pas synchronisées entre les onglets 

              Car tes différentes listes ne partagent pas la même instance de useTodoList()

              Et du coup ne se synchronisent entre elles QUE quand on rehcarge la page (car elles partagent le localStorage)

              la solution est simple : 

              function App() {
                const todoList = useTodoList()

                return (
                  <>
                    <Route
                      path="/tab1"
                      component={() => <Tab1 todoList={todoList} filtered={true}></Tab1>}
                    />
                    <Route
                      path="/tab2"
                      component={() => <Tab1 todoList={todoList} filtered={false}></Tab1>}
                    />
                  </>
                )

              }
            */}
            <Route
              path="/tab1"
              component={() => <Tab1 filtered={true}></Tab1>}
              exact={true}
            />
            <Route
              path="/tab2"
              component={() => <Tab1 filtered={false}></Tab1>}
              exact={true}
            />
            <Route
              path="/"
              render={() => <Redirect to="/tab1" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="top">
            <IonTabButton tab="tab1" href="/tab1">
              <IonLabel>À faire</IonLabel>
              <IonBadge color="primary">
                {
                  // TODO: Problème d'actualisation de la valeur
                  /*
                    c'est parce que ce composant et ta liste ne partagent pas la même instance de useTodoList()
                  */
                  todoElements.filter((item) => item.checked !== true).length
                }
              </IonBadge>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonLabel>Tous</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
