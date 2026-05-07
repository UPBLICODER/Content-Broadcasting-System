"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContent } from "@/services/content.service";

// Validation schema
const schema = z
  .object({
    title: z.string().min(1, "Title is required"),
    subject: z.string().min(1, "Subject is required"),
    description: z.string().optional(),
    file: z
      .any()
      .refine((files) => files?.length === 1, "File is required")
      .refine((files) => {
        const file = files?.[0];
        if (!file) return false;

        const allowed = ["image/jpeg", "image/png", "image/gif"];
        return allowed.includes(file.type);
      }, "Only JPG, PNG, GIF allowed")
      .refine((files) => {
        const file = files?.[0];
        if (!file) return false;
        return file.size <= 10 * 1024 * 1024;
      }, "File must be less than 10MB"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    rotationDuration: z.string().optional(),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be greater than start time",
    path: ["endTime"],
  });

export default function UploadContentForm({ teacherId, teacherName }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/gif"];

    if (!allowed.includes(file.type)) {
      setMessage("Only JPG, PNG, or GIF files are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("File must be less than 10MB.");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("subject", data.subject);
      formData.append("description", data.description || "");
      formData.append("file", data.file[0]);
      formData.append("startTime", data.startTime);
      formData.append("endTime", data.endTime);
      formData.append("rotationDuration", data.rotationDuration || "");
      formData.append("teacherId", teacherId || "");

      await createContent(formData);

      setMessage("Content uploaded successfully");
      reset();
      setPreview(null);
    } catch (err) {
      setMessage("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">Submit lesson for approval</h2>
        {teacherName && (
          <p className="text-sm text-gray-500">Uploading as {teacherName}</p>
        )}
        <p className="text-sm text-gray-500">
          Add a title, subject, and lesson file. Set the publish window and
          submit the lesson for principal review.
        </p>
      </div>

      {message && (
        <p
          className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-blue-600"}`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          placeholder="Lesson title"
          {...register("title")}
          className="w-full border p-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <input
          placeholder="Subject"
          {...register("subject")}
          className="w-full border p-2"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm">{errors.subject.message}</p>
        )}

        <textarea
          placeholder="Description"
          {...register("description")}
          className="w-full border p-2"
        />

        <input
          type="file"
          {...register("file")}
          onChange={handleFileChange}
          className="w-full"
        />
        {errors.file && (
          <p className="text-red-500 text-sm">{errors.file.message}</p>
        )}

        {preview && (
          <img src={preview} className="w-full h-40 object-cover rounded" />
        )}

        <input
          type="datetime-local"
          {...register("startTime")}
          className="w-full border p-2"
        />
        {errors.startTime && (
          <p className="text-red-500 text-sm">{errors.startTime.message}</p>
        )}

        <input
          type="datetime-local"
          {...register("endTime")}
          className="w-full border p-2"
        />
        {errors.endTime && (
          <p className="text-red-500 text-sm">{errors.endTime.message}</p>
        )}

        <input
          placeholder="Rotation Duration"
          {...register("rotationDuration")}
          className="w-full border p-2"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
