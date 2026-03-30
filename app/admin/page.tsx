"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Save,
  RotateCcw,
  ChevronLeft,
  Timer,
  Trophy,
  AlertCircle,
  Eye,
  Laptop,
} from "lucide-react";
import {
  getSettings,
  saveSettings,
  DEFAULT_SETTINGS,
  type GameSettings,
} from "@/lib/game-config";

export default function AdminPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset to original defaults?")) {
      setSettings(DEFAULT_SETTINGS);
      saveSettings(DEFAULT_SETTINGS);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-stone-200 font-sans p-6 selection:bg-amber-500/30 flex items-center justify-center">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-amber-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-900/10 blur-[150px] rounded-full opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between pb-2">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-stone-500 hover:text-white group transition-colors px-0 hover:bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Game Preview
          </Button>
          <div className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Control Center
          </div>
        </div>

        <Card className="bg-stone-900/60 border-white/5 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden pt-0">
          <CardHeader className="p-10 pb-6 border-b border-white/5 bg-linear-to-b from-white/2 to-transparent">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <Settings className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <CardTitle className="text-3xl font-serif font-bold text-white tracking-tight">
                  Game Expedition Parameters
                </CardTitle>
                <CardDescription className="text-stone-500 font-medium">
                  Fine-tune the archaeological quest for your live presentation.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <Trophy className="w-4 h-4 text-emerald-500" />
                  <Label className="text-xs font-bold uppercase tracking-widest">
                    Points per Find
                  </Label>
                </div>
                <Input
                  type="number"
                  value={settings.pointsPerFind}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pointsPerFind: Number(e.target.value),
                    })
                  }
                  className="bg-stone-900 border-white/10 rounded-xl h-12 focus:border-amber-500/50 transition-all font-mono text-white"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <Label className="text-xs font-bold uppercase tracking-widest">
                    Points Penalty (Miss)
                  </Label>
                </div>
                <Input
                  type="number"
                  value={settings.pointsPenaltyMiss}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pointsPenaltyMiss: Number(e.target.value),
                    })
                  }
                  className="bg-stone-900 border-white/10 rounded-xl h-12 focus:border-amber-500/50 transition-all font-mono text-white"
                />
              </div>
            </div>

            <Separator className="bg-white/5" />

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <Timer className="w-4 h-4 text-blue-500" />
                  <Label className="text-xs font-bold uppercase tracking-widest">
                    Success Message Duration (ms)
                  </Label>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={settings.timeoutSuccessAlert}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timeoutSuccessAlert: Number(e.target.value),
                      })
                    }
                    className="bg-stone-900 border-white/10 rounded-xl h-14 focus:border-amber-500/50 transition-all font-mono text-lg text-white"
                  />
                  <div className="text-stone-600 text-xs font-mono shrink-0">
                    {(settings.timeoutSuccessAlert / 1000).toFixed(1)}s
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <Timer className="w-4 h-4 text-red-500" />
                  <Label className="text-xs font-bold uppercase tracking-widest">
                    Error Message Duration (ms)
                  </Label>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={settings.timeoutErrorAlert}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timeoutErrorAlert: Number(e.target.value),
                      })
                    }
                    className="bg-stone-900 border-white/10 rounded-xl h-14 focus:border-amber-500/50 transition-all font-mono text-lg text-white"
                  />
                  <div className="text-stone-600 text-xs font-mono shrink-0">
                    {(settings.timeoutErrorAlert / 1000).toFixed(1)}s
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <Timer className="w-4 h-4 text-amber-500" />
                  <Label className="text-xs font-bold uppercase tracking-widest">
                    Modal Open Delay (ms)
                  </Label>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={settings.timeoutModalOpenDelay}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timeoutModalOpenDelay: Number(e.target.value),
                      })
                    }
                    className="bg-stone-900 border-white/10 rounded-xl h-14 focus:border-amber-500/50 transition-all font-mono text-lg text-white"
                  />
                  <div className="text-stone-600 text-xs font-mono shrink-0">
                    {(settings.timeoutModalOpenDelay / 1000).toFixed(1)}s
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <Trophy className="w-4 h-4 text-emerald-500" />
                  <Label className="text-xs font-bold uppercase tracking-widest">
                    Game Over Transition Delay (ms)
                  </Label>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={settings.timeoutGameOverDelay}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timeoutGameOverDelay: Number(e.target.value),
                      })
                    }
                    className="bg-stone-900 border-white/10 rounded-xl h-14 focus:border-amber-500/50 transition-all font-mono text-lg text-white"
                  />
                  <div className="text-stone-600 text-xs font-mono shrink-0">
                    {(settings.timeoutGameOverDelay / 1000).toFixed(1)}s
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-10 pt-6 border-t border-white/5 bg-linear-to-t from-white/1 to-transparent flex gap-3">
            <Button
              onClick={handleSave}
              className={`flex-1 h-14 rounded-2xl font-bold transition-all hover:scale-[1.01] active:scale-[0.98]
                ${isSaved ? "bg-emerald-600 hover:bg-emerald-500" : "bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-[0_20px_40px_-15px_rgba(217,119,6,0.5)]"}`}
            >
              {isSaved ? (
                <Eye className="mr-2 h-5 w-5" />
              ) : (
                <Save className="mr-2 h-5 w-5" />
              )}
              {isSaved ? "Saved Successfully!" : "Commit Configuration"}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="h-14 w-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 p-0 text-stone-400"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
