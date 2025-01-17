import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getAllRisks,
  insertRisk,
  updateRisk,
  generateExcel,
} from "@/lib/databaseFunctions";
import { DialogDeleteRisk } from "./dialogs/DeleteRisk";

interface Row {
  id: string;
  number: string;
  process: string;
  risk: string;
  cause: string;
  effect: string;
  existing_control: string;
  probability_evaluation: string;
  impact_evaluation: string;
  initial_risk_level: string;
  proposed_control: string;
  responsible: string;
  execution_date: string;
  status: string;
  probability: string;
  impact: string;
  residual_risk_level: string;
}

const dataNewRow = (): Row => ({
  id: "0",
  number: "",
  process: "",
  risk: "",
  cause: "",
  effect: "",
  existing_control: "",
  probability_evaluation: "",
  impact_evaluation: "",
  initial_risk_level: "",
  proposed_control: "",
  responsible: "",
  execution_date: "",
  status: "",
  probability: "",
  impact: "",
  residual_risk_level: "",
});

export function TableRisks() {
  const [dataRisks, setDataRisks] = useState<Row[]>();
  const [initialDataRisks, setInitialDataRisks] = useState<Row[]>();
  const [newRow, setNewRow] = useState(true);
  const [formData, setFormData] = useState<Partial<Row>>({});
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const risks = await getAllRisks();
      setDataRisks(risks);
      setInitialDataRisks(risks);
    };
    getData();
    setReloadData(false);
  }, [reloadData]);

  const addRow = () => {
    if (newRow) {
      const row = dataNewRow();
      setDataRisks([row, ...(dataRisks || [])]);
      setNewRow(false);
    }
  };

  const handleCancelNewRow = (id: string) => {
    setDataRisks(dataRisks?.filter((item) => item.id !== id));
    setNewRow(true);
  };

  const updateCell = (id: string, field: keyof Row, value: string) => {
    setDataRisks(
      dataRisks?.map((fila) => {
        if (fila.id === id) {
          setFormData({ ...fila, [field]: value });
          return { ...fila, [field]: value };
        }
        return fila;
      })
    );
  };

  const classCondition = (condition: string) => {
    const variant = {
      Bajo: "bg-green-500",
      Medio: "bg-yellow-400",
      Alto: "bg-orange-500",
      Extremo: "bg-red-600",
    }[condition];
    return variant;
  };

  const isRowComplete = (row: Row) => {
    return Object.entries(row)
      .filter(([key]) => key !== "id") // Excluir la propiedad "id"
      .some(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      );
  };

  const isRowModified = (rowModified: Row) => {
    const rowSaved = initialDataRisks?.find(
      (item) => item.id === rowModified.id
    );
    if (!rowSaved) return false;
    return Object.keys(rowModified).some((key) => {
      const field = key as keyof Row;
      return rowModified[field] !== rowSaved[field];
    });
  };

  const handleSubmit = async () => {
    delete formData.id;
    await insertRisk(formData);
    setReloadData(true);
  };

  const handleUpdate = async () => {
    await updateRisk(formData);
    setReloadData(true);
  };

  const handleGenerateExcel = () => {
    if (dataRisks) {
      generateExcel(dataRisks);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <Button onClick={addRow}>Nueva fila</Button>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={handleGenerateExcel}
        >
          Generar excel
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead
              className="text-center border-l-2 border-r-2"
              colSpan={3}
            >
              1. Identificación del riesgo
            </TableHead>
            <TableHead className="text-center border-r-2" colSpan={3}>
              2. Análisis del riesgo
            </TableHead>
            <TableHead className="text-center border-r-2" colSpan={3}>
              3. Evaluación del riesgo
            </TableHead>
            <TableHead className="text-center border-r-2" colSpan={4}>
              4. Tratamiento del riesgo
            </TableHead>
            <TableHead className="text-center" colSpan={3}>
              5. Reevalución del riesgo
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead>Opciones</TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Proceso</TableHead>
            <TableHead>Riesgo</TableHead>
            <TableHead>Causa</TableHead>
            <TableHead>Efecto</TableHead>
            <TableHead>Control existente</TableHead>
            <TableHead>Probabilidad (P)</TableHead>
            <TableHead>Impacto (I)</TableHead>
            <TableHead>Nivel de riesgo inicial (PxI)</TableHead>
            <TableHead>Control propuesto</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead>Fecha ejecución</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Probabilidad (P)</TableHead>
            <TableHead>Impacto (I)</TableHead>
            <TableHead>Nivel de riesgo residual (PxI)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataRisks?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {row.id !== "0" && (
                  <div className="flex gap-2">
                    <DialogDeleteRisk
                      id={row.id}
                      setReloadData={setReloadData}
                    />
                    <Button
                      disabled={!isRowModified(row)}
                      className="hover:bg-[#66ff7018]"
                      variant="outline"
                      size="icon"
                      onClick={handleUpdate}
                    >
                      <Check className="text-green-700" />
                    </Button>
                  </div>
                )}
                {row.id === "0" && (
                  <div className="flex gap-2">
                    <Button
                      className="hover:bg-[#FF666618]"
                      variant="outline"
                      size="icon"
                      onClick={() => handleCancelNewRow(row.id)}
                    >
                      <Ban className="text-red-700" />
                    </Button>
                    <Button
                      disabled={!isRowComplete(row)}
                      className="hover:bg-[#66ff7018]"
                      variant="outline"
                      size="icon"
                      onClick={handleSubmit}
                    >
                      <Check className="text-green-700" />
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Input
                  name="number"
                  value={row.number}
                  onChange={(e) => {
                    updateCell(row.id, "number", e.target.value);
                  }}
                  type="number"
                  min={0}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="process"
                  value={row.process}
                  onChange={(e) =>
                    updateCell(row.id, "process", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  name="risk"
                  value={row.risk}
                  onChange={(e) => updateCell(row.id, "risk", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="cause"
                  value={row.cause}
                  onChange={(e) => updateCell(row.id, "cause", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="effect"
                  value={row.effect}
                  onChange={(e) => updateCell(row.id, "effect", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="existing_control"
                  value={row.existing_control}
                  onChange={(e) =>
                    updateCell(row.id, "existing_control", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Select
                  value={row.probability_evaluation}
                  onValueChange={(value) =>
                    updateCell(row.id, "probability_evaluation", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remoto">Remoto</SelectItem>
                    <SelectItem value="Improbable">Improbable</SelectItem>
                    <SelectItem value="Posible">Posible</SelectItem>
                    <SelectItem value="Probable">Probable</SelectItem>
                    <SelectItem value="Muy probable">Muy probable</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={row.impact_evaluation}
                  onValueChange={(value) =>
                    updateCell(row.id, "impact_evaluation", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Muy bajo">Muy bajo</SelectItem>
                    <SelectItem value="Bajo">Bajo</SelectItem>
                    <SelectItem value="Medio">Medio</SelectItem>
                    <SelectItem value="Alto">Alto</SelectItem>
                    <SelectItem value="Muy alto">Muy alto</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={row.initial_risk_level}
                  onValueChange={(value) =>
                    updateCell(row.id, "initial_risk_level", value)
                  }
                >
                  <SelectTrigger
                    className={classCondition(row.initial_risk_level)}
                  >
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bajo">Bajo</SelectItem>
                    <SelectItem value="Medio">Medio</SelectItem>
                    <SelectItem value="Alto">Alto</SelectItem>
                    <SelectItem value="Extremo">Extremo</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input
                  name="proposed_control"
                  value={row.proposed_control}
                  onChange={(e) =>
                    updateCell(row.id, "proposed_control", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  name="responsible"
                  value={row.responsible}
                  onChange={(e) =>
                    updateCell(row.id, "responsible", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  type="date"
                  name="execution_date"
                  value={row.execution_date}
                  onChange={(e) =>
                    updateCell(row.id, "execution_date", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Select
                  value={row.status}
                  onValueChange={(value) => updateCell(row.id, "status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Detenido">Detenido</SelectItem>
                    <SelectItem value="En curso">En curso</SelectItem>
                    <SelectItem value="Listo">Listo</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={row.probability}
                  onValueChange={(value) =>
                    updateCell(row.id, "probability", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remoto">Remoto</SelectItem>
                    <SelectItem value="Improbable">Improbable</SelectItem>
                    <SelectItem value="Posible">Posible</SelectItem>
                    <SelectItem value="Probable">Probable</SelectItem>
                    <SelectItem value="Muy probable">Muy probable</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={row.impact}
                  onValueChange={(value) => updateCell(row.id, "impact", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Muy bajo">Muy bajo</SelectItem>
                    <SelectItem value="Bajo">Bajo</SelectItem>
                    <SelectItem value="Medio">Medio</SelectItem>
                    <SelectItem value="Alto">Alto</SelectItem>
                    <SelectItem value="Muy alto">Muy alto</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={row.residual_risk_level}
                  onValueChange={(value) =>
                    updateCell(row.id, "residual_risk_level", value)
                  }
                >
                  <SelectTrigger
                    className={classCondition(row.residual_risk_level)}
                  >
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bajo">Bajo</SelectItem>
                    <SelectItem value="Medio">Medio</SelectItem>
                    <SelectItem value="Alto">Alto</SelectItem>
                    <SelectItem value="Extremo">Extremo</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
