// Les 5 onglets de la barre du bas
export type TabParamList = {
  Planning: undefined;
  MealPrep: undefined;
  Courses: undefined;
  Aliments: undefined;
  Stock: undefined;
};

// Les écrans de la pile Root
export type RootStackParamList = {
  Tabs: undefined;                       // le bloc des 5 onglets
  AlimentDetail: { alimentId: string };  // reçoit l'id de l'aliment
  Import: undefined;
  Settings: undefined;
};