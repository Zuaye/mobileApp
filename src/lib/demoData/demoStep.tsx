import { DemoStep } from "@/src/types/globalTypes";
import { BarChart3, Calendar, MessageSquare, Search, Users } from "lucide-react";


export const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: "Recherche avancée de biens",
    description:
      "Trouvez rapidement les propriétés qui correspondent exactement aux critères de vos clients.",
    icon: <Search className="h-5 w-5" />,
    screen: "/images/onboarding/searchEstate.png?height=600&width=800",
    features: [
      "Filtres multicritères",
      "Recherche par carte interactive",
      "Sauvegarde des recherches",
      "Alertes personnalisées",
    ],
  },
  {
    id: 2,
    title: "Gestion des visites",
    description:
      "Organisez et suivez toutes vos visites immobilières en un seul endroit.",
    icon: <Calendar className="h-5 w-5" />,
    screen: "/placeholder.svg?height=600&width=800",
    features: [
      "Planification simplifiée",
      "Rappels automatiques",
      "Feedback des clients",
      "Visites virtuelles",
    ],
  },
  {
    id: 3,
    title: "Analyse de marché",
    description:
      "Accédez à des données précises sur le marché immobilier pour conseiller vos clients.",
    icon: <BarChart3 className="h-5 w-5" />,
    screen: "/placeholder.svg?height=600&width=800",
    features: [
      "Tendances des prix",
      "Comparaison de quartiers",
      "Prévisions du marché",
      "Rapports personnalisés",
    ],
  },
  {
    id: 4,
    title: "Gestion des clients",
    description:
      "Suivez et gérez efficacement vos relations avec vos clients et prospects.",
    icon: <Users className="h-5 w-5" />,
    screen: "/placeholder.svg?height=600&width=800",
    features: [
      "Profils détaillés",
      "Historique des interactions",
      "Suivi des préférences",
      "Notifications automatiques",
    ],
  },
  {
    id: 5,
    title: "Communication intégrée",
    description:
      "Communiquez facilement avec vos clients directement depuis la plateforme.",
    icon: <MessageSquare className="h-5 w-5" />,
    screen: "/placeholder.svg?height=600&width=800",
    features: [
      "Messagerie instantanée",
      "Partage de documents",
      "Modèles de messages",
      "Historique des conversations",
    ],
  },
];
