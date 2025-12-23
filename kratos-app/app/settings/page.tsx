"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { LogOut, Save, User, Camera } from "lucide-react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    height_ft: "",
    height_in: "",
    weight: "",
    age: "",
    sex: "",
    body_type: "",
    body_fat: "",
    fitness_goal: "",
    activity_level: "",
    target_weight: "",
    profile_picture: "",
    overview_stats: ["workouts", "calories", "active_time", "sleep"],
  });

  const getInitials = () => "ER";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-md px-6 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        {/* Profile */}
        <Card className="bg-zinc-900/80 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="text-red-500" />
              Profile Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4 pb-4 border-b border-zinc-800">
              <Avatar className="h-24 w-24 border-2 border-red-600">
                {formData.profile_picture && (
                  <AvatarImage src={formData.profile_picture} />
                )}
                <AvatarFallback className="bg-red-600 text-white text-2xl font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>

              <Button
                type="button"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                <Camera className="w-4 h-4 mr-2" />
                Change Picture
              </Button>
            </div>

            <Label className="text-white">Height (ft / in)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="5"
                className="text-white placeholder:text-zinc-400"
              />
              <Input
                placeholder="10"
                className="text-white placeholder:text-zinc-400"
              />
            </div>

            <Label className="text-white">Weight (lbs)</Label>
            <Input
              placeholder="175"
              className="text-white placeholder:text-zinc-400"
            />

            <Label className="text-white">Age</Label>
            <Input
              placeholder="21"
              className="text-white placeholder:text-zinc-400"
            />

            <Label className="text-white">Sex</Label>
            <Select>
              <SelectTrigger className="text-white [&>span]:text-white">
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">
                  <span className="text-black">Male</span>
                </SelectItem>
                <SelectItem value="female">
                  <span className="text-black">Female</span>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full bg-red-600 hover:bg-red-700 h-12 rounded-2xl">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="bg-zinc-900/80 border-zinc-800">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white h-12 rounded-2xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
