import { useState } from "react";
import { BookOpen, Search, ShieldCheck } from "lucide-react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Badge,
} from "@/components/ui";
import { mockDeterrents } from "@/data/mockData";

const effTone = { low: "danger", medium: "warning", high: "success" } as const;

export default function DeterrentLibrary() {
  const [q, setQ] = useState("");
  const filtered = mockDeterrents.filter(
    (d) =>
      !q ||
      d.species.toLowerCase().includes(q.toLowerCase()) ||
      d.method.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-appbg">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" /> Deterrent Library
          </h1>
          <p className="text-muted mt-2">
            Approved, humane methods to protect your fields
          </p>
        </div>

        <Input
          placeholder="Search by species or method..."
          leftIcon={<Search className="h-4 w-4" />}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((d) => (
            <Card key={d.id}>
              <CardHeader>
                <div>
                  <CardTitle className="text-base">{d.method}</CardTitle>
                  <p className="text-xs text-muted mt-1">for {d.species}</p>
                </div>
                <Badge tone={effTone[d.effectiveness]}>{d.effectiveness}</Badge>
              </CardHeader>
              <CardBody>
                <p className="text-sm">{d.description}</p>
                {d.isApproved && (
                  <div className="flex items-center gap-1 mt-3 text-xs text-success">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Approved method
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}