import {
  faWindows,
  faPlaystation,
  faXbox,
  faApple,
  faLinux,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGamepad,
  faStore,
  faShoppingCart,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

export const platformIcons = {
  PC: faWindows,
  PlayStation: faPlaystation,
  "PlayStation 2": faPlaystation,
  "PlayStation 3": faPlaystation,
  "PlayStation 4": faPlaystation,
  "PlayStation 5": faPlaystation,
  Xbox: faXbox,
  "Xbox 360": faXbox,
  "Xbox One": faXbox,
  "Xbox Series S/X": faXbox,
  iOS: faApple,
  macOS: faApple,
  Linux: faLinux,
  Android: faAndroid,
  Nintendo: faGamepad,
};

// iconos para las tiendas
export const storeIcons = {
  Steam: faWindows, // Steam usa principalmente Windows
  "Epic Games": faGamepad, // Epic Games Store
  GOG: faGamepad, // GOG (Good Old Games)
  Origin: faGamepad, // Origin (EA)
  Uplay: faGamepad, // Ubisoft Store
  BattleNet: faGamepad, // Blizzard Battle.net
  "Xbox Store": faXbox, // Tienda de Xbox
  "Xbox 360 Store": faXbox, // Tienda de Xbox
  "PlayStation Store": faPlaystation, // Tienda de PlayStation
  "Nintendo Store": faGamepad, // Nintendo eShop
  "App Store": faApple, // Apple App Store
  "Google Play": faAndroid, // Google Play Store
  Itch: faShoppingCart, // Itch.io
  "Humble Bundle": faShoppingCart, // Humble Bundle
  "Microsoft Store": faWindows, // Microsoft Store
  "Amazon Appstore": faShoppingCart, // Amazon Appstore
  "Linux Store": faLinux, // Tienda de Linux
  "Generic Store": faStore, // Tienda genérica
  "Web Store": faGlobe, // Tienda basada en web
};
