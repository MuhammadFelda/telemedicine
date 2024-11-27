"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDoctors } from "@/app/hooks/GetDoctor";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

export default function AppointmentFormRoute() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    userId: 1,
    doctorId: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { doctors, loading } = useDoctors();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const datetime = `${formData.date}T${formData.time}`;

      const doctorId = parseInt(formData.doctorId);
      console.log(doctorId);

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: datetime,
          doctorId: doctorId
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Something went wrong");
      }

      const data = await res.json();
      alert("Appointment created successfully!");
      router.push("/appointments");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Create Appointment</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Time</Label>
            <Input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Doctor</Label>
            <Select
              value={formData.doctorId}
              onValueChange={(value) => {
                setFormData({
                  ...formData,
                  doctorId: value,
                });
              }}
            >
              <SelectTrigger>
                {formData.doctorId ? (
                  doctors.find((doc) => doc.id.toString() === formData.doctorId)?.name
                ) : (
                  "Choose Doctor"
                )}
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id.toString()}>
                    {doctor.name}{" - "}{doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-1/12">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}