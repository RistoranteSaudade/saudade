export enum MenuItemType {
  MEAT = 'Le Carni',
  SIDES = 'Accompagnamenti',
  WINE = 'Vini',
  COCKTAILS = 'Cocktails',
  DESSERT = 'Dolci'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  type: MenuItemType;
  displayArea?: 'menu' | 'carta';
  tab?: string;
  section?: string;
  sectionOrder?: number;
  order?: number;
  cuts?: string[];
  isTraditionalSide?: boolean;
  image?: any;
}

export interface NavLink {
  name: string;
  path: string;
}