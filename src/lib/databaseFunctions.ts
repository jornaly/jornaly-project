import { supabase } from "./supabase";
import * as XLSX from "xlsx";

//Projects
export const getAllProjects = async (setDataProjects: (data: any) => void) => {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    console.log("Error fetching data:", error.message);
  } else {
    setDataProjects(data);
  }
};

export const insertProject = async (dataProject: any) => {
  const { data, error } = await supabase
    .from("projects")
    .insert(dataProject)
    .select();
  if (data) {
    localStorage.setItem("project_id", data[0]?.id);
  }
  if (error) {
    console.log("Error inserting data:", error.message);
  }
};

export const deleteProject = async (
  id: string,
  setDataProjects: (data: any) => void
) => {
  const response = await supabase.from("projects").delete().eq("id", id);
  if (response.status === 204) {
    getAllProjects(setDataProjects);
  } else {
    console.log("Error deleting data:", response.error?.message);
  }
};

//Tasks
export const insertTask = async (data: any) => {
  const { error } = await supabase.from("tasks").insert(data);
  if (error) {
    console.log("Error inserting data:", error.message);
  }
};

export const getTasksByProject = async (
  id: string,
  setDataTasks: (data: any) => void
) => {
  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("project_id", id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log("Error fetching data:", error.message);
  } else {
    setDataTasks(data);
  }
};

export const getTaskById = async (
  id: string,
  setDataTasks: (data: any) => void
) => {
  const { data, error } = await supabase.from("tasks").select().eq("id", id);
  if (error) {
    console.log("Error fetching data:", error.message);
  } else {
    setDataTasks(data);
  }
};

export const updateTask = async (data: any) => {
  const { error } = await supabase.from("tasks").update(data).eq("id", data.id);
  if (error) {
    console.log("Error updating data:", error.message);
  }
};

export const deleteTask = async (
  id: string,
  id_project: string,
  setTasks: (data: any) => void
) => {
  const response = await supabase.from("tasks").delete().eq("id", id);
  if (response.status === 204) {
    getTasksByProject(id_project, setTasks);
  } else {
    console.log("Error deleting data:", response.error?.message);
  }
};

//Commnets
export const insertComment = async (data: any) => {
  const { error } = await supabase.from("tasks_comments").insert(data);
  if (error) {
    console.log("Error inserting data:", error.message);
  }
};

export const getCommentsByTask = async (id: string) => {
  const { data, error } = await supabase
    .from("tasks_comments")
    .select()
    .eq("task_id", id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log("Error fetching data:", error.message);
  } else {
    return data;
  }
};

export const deleteComment = async (id: string) => {
  const response = await supabase.from("tasks_comments").delete().eq("id", id);
  if (response.status !== 204) {
    console.log("Error deleting data:", response.error?.message);
  }
};

//Risks
export const getAllRisks = async () => {
  const { data, error } = await supabase
    .from("risks")
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    console.log("Error fetching data:", error.message);
  } else {
    return data;
  }
};

export const insertRisk = async (data: any) => {
  const { error } = await supabase.from("risks").insert(data);
  if (error) {
    console.log("Error inserting data:", error.message);
  }
};

export const updateRisk = async (data: any) => {
  const { error } = await supabase.from("risks").update(data).eq("id", data.id);
  if (error) {
    console.log("Error updating data:", error.message);
  }
};

export const deleteRisk = async (id: string) => {
  const response = await supabase.from("risks").delete().eq("id", id);
  if (response.status !== 204) {
    console.log("Error deleting data:", response.error?.message);
  }
};

//Improvement actions
export const getAllImprovements = async () => {
  const { data, error } = await supabase
    .from("improvement_actions")
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    console.log("Error fetching data:", error.message);
  } else {
    return data;
  }
};

export const insertImprovement = async (data: any) => {
  const { error } = await supabase.from("improvement_actions").insert(data);
  if (error) {
    console.log("Error inserting data:", error.message);
  }
};

export const updateImprovent = async (data: any) => {
  const { error } = await supabase
    .from("improvement_actions")
    .update(data)
    .eq("id", data.id);
  if (error) {
    console.log("Error updating data:", error.message);
  }
};

export const deleteImprovement = async (id: string) => {
  const response = await supabase
    .from("improvement_actions")
    .delete()
    .eq("id", id);
  if (response.status !== 204) {
    console.log("Error deleting data:", response.error?.message);
  }
};

//Docs approval
export const getAllDocsApproval = async () => {
  const { data, error } = await supabase
    .from("docs_approval")
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    console.log("Error fetching data:", error.message);
  } else {
    return data;
  }
};

export const insertDocsApproval = async (data: any) => {
  const { error } = await supabase.from("docs_approval").insert(data);
  if (error) {
    console.log("Error inserting data:", error.message);
  }
};

export const updateDocsApproval = async (data: any) => {
  const { error } = await supabase
    .from("docs_approval")
    .update(data)
    .eq("id", data.id);
  if (error) {
    console.log("Error updating data:", error.message);
  }
};

export const deleteDocsApproval = async (id: string) => {
  const response = await supabase.from("docs_approval").delete().eq("id", id);
  if (response.status !== 204) {
    console.log("Error deleting data:", response.error?.message);
  }
};

//Comments docs
export const insertCommentDoc = async (data: any) => {
  const { error } = await supabase.from("docs_comments").insert(data);
  if (error) {
    console.log("Error inserting data:", error.message);
  }
};

export const getCommentsByDoc = async (id: string) => {
  const { data, error } = await supabase
    .from("docs_comments")
    .select()
    .eq("docs_id", id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log("Error fetching data:", error.message);
  } else {
    return data;
  }
};

export const deleteCommentDoc = async (id: string) => {
  const response = await supabase.from("docs_comments").delete().eq("id", id);
  if (response.status !== 204) {
    console.log("Error deleting data:", response.error?.message);
  }
};

//Docs
export const uploadDoc = async (name: string, file: File) => {
  const { error } = await supabase.storage.from("documents").upload(name, file);
  if (error) {
    console.log("Error uploading data:", error.message);
    return false;
  } else {
    return true;
  }
};

export const insertDoc = async (data: any) => {
  const { error } = await supabase.from("docs").insert(data);
  if (error) {
    console.log("Error inserting data:", error.message);
  }
};

export const getAllDocs = async () => {
  const { data, error } = await supabase
    .from("docs")
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    console.log("Error fetching data:", error.message);
  } else {
    return data;
  }
};

export const deleteDoc = async (name: string) => {
  const { error } = await supabase.storage.from("documents").remove([name]);
  if (error) {
    console.log("Error deleting document: ", error.message);
  }
};

//Generate Excel
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
  created_at?: string;
}

export const generateExcel = (data: Row[]) => {
  const filteredData = data.map(({ id, created_at, ...rest }) => rest);
  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
  XLSX.writeFile(workbook, `Riesgos - ${new Date().toLocaleDateString()}.xlsx`);
};
