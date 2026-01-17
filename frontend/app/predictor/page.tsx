"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { predictPersona, PredictionResult } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  age: z.coerce.number().min(18, "Umur minimal 18").max(100),
  annual_income: z.coerce.number().min(1, "Income minimal 1k$"),
  spending_score: z.coerce.number().min(1).max(100, "Score maksimal 100"),
});

type FormData = z.infer<typeof formSchema>;

export default function PredictorPage() {
  const [result, formAction, isPending] = useActionState(
    async (previousState: PredictionResult | null, data: FormData) => {
      try {
        return await predictPersona(data.age, data.annual_income, data.spending_score);
      } catch (error) {
        console.error("Gagal prediksi:", error);
        return null;
      }
    },
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 25,
      annual_income: 50,
      spending_score: 50,
    },
  });

  // --- UI TETAP SAMA ---
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">AI Persona Predictor</h1>
        <p className="text-muted-foreground">Masukkan data customer untuk mengetahui segmen pasarnya.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Data</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={() => handleSubmit(formAction)()} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input type="number" id="age" {...register("age")} />
                {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">Annual Income (k$)</Label>
                <Input type="number" id="income" {...register("annual_income")} />
                {errors.annual_income && <p className="text-red-500 text-sm">{errors.annual_income.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="score">Spending Score (1-100)</Label>
                <Input type="number" id="score" {...register("spending_score")} />
                {errors.spending_score && <p className="text-red-500 text-sm">{errors.spending_score.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Analyzing..." : "Analyze Customer"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {result ? (
            <Card className="border-2 border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary text-xl">Hasil Analisis</CardTitle>
                <CardDescription>Customer ini masuk dalam kategori:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-extrabold text-primary">{result.persona}</div>
                <p className="text-sm text-muted-foreground">{result.description}</p>
                <div className="text-xs text-muted-foreground mt-4 pt-4 border-t">Cluster ID: {result.cluster_id}</div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-50 border-dashed">
              <CardContent className="text-center text-muted-foreground">
                Hasil prediksi akan muncul di sini
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
