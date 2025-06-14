"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Bell,
  Lock,
  Languages,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/src/components/ui/switch";
import { Card } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface SettingsState {
  notifications: {
    messages: boolean;
    updates: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private";
    showOnline: boolean;
  };
  language: string;
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      messages: true,
      updates: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      showOnline: true,
    },
    language: "fr",
  });

  const handleNotificationChange = (
    key: keyof typeof settings.notifications
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handlePrivacyChange = (key: keyof typeof settings.privacy) => {
    if (key === "profileVisibility") {
      setSettings((prev) => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          profileVisibility:
            prev.privacy.profileVisibility === "public" ? "private" : "public",
        },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          [key]: !prev.privacy[key],
        },
      }));
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6 mt-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Paramètres
        </h1>
      </div>

      {/* Thème */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-slate-600" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500" />
            )}
            <span className="font-medium">Thème</span>
          </div>
          <Select value={theme} onValueChange={(value) => setTheme(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Clair</SelectItem>
              <SelectItem value="dark">Sombre</SelectItem>
              <SelectItem value="system">Système</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-4 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="font-medium">Notifications</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm">Messages</label>
            <Switch
              checked={settings.notifications.messages}
              onCheckedChange={() => handleNotificationChange("messages")}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">Mises à jour</label>
            <Switch
              checked={settings.notifications.updates}
              onCheckedChange={() => handleNotificationChange("updates")}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">Marketing</label>
            <Switch
              checked={settings.notifications.marketing}
              onCheckedChange={() => handleNotificationChange("marketing")}
            />
          </div>
        </div>
      </Card>

      {/* Confidentialité */}
      <Card className="p-4 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-slate-600" />
          <span className="font-medium">Confidentialité</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm">Profil public</label>
            <Switch
              checked={settings.privacy.profileVisibility === "public"}
              onCheckedChange={() => handlePrivacyChange("profileVisibility")}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">Montrer statut en ligne</label>
            <Switch
              checked={settings.privacy.showOnline}
              onCheckedChange={() => handlePrivacyChange("showOnline")}
            />
          </div>
        </div>
      </Card>

      {/* Actions rapides */}
      <Card className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-between text-left font-normal h-auto py-3"
        >
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-slate-600" />
            <span>Changer le mot de passe</span>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400" />
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-between text-left font-normal h-auto py-3"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-slate-600" />
            <span>Aide et support</span>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400" />
        </Button>
      </Card>
    </div>
  );
}
