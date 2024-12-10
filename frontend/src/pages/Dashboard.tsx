import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Chip,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { format } from "date-fns";
import DeleteDialog from "../components/DeleteDialog";

interface User {
  id: string;
  name: string;
}

interface Incident {
  id: number;
  name: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "inprogress" | "resolved" | "closed";
  date: string; // Date is auto-generated by backend
  reportedBy: string;
  assignedTo?: string;
}

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);
  const [search, setSearch] = useState<string>("");

  // Users for "Assigned To" dropdown
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fakeUsers: User[] = [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Smith" },
      { id: "3", name: "Alice Brown" },
    ];
    setUsers(fakeUsers);
  }, []);

  // State for Modals
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  // Incident form state (no "date" field since it's auto-generated)
  const [formData, setFormData] = useState<Omit<Incident, "id" | "date">>({
    name: "",
    description: "",
    priority: "low",
    status: "open",
    reportedBy: "John Doe", // Default
    assignedTo: "",
  });

  // Simulate data fetching
  useEffect(() => {
    const fakeData: Incident[] = [
      {
        id: 1,
        name: "Network Issue",
        description: "Internet is not working on floor 2.",
        priority: "high",
        status: "open",
        date: "2024-12-10T13:22:44.397Z",
        reportedBy: "John Doe",
        assignedTo: "Jane Smith",
      },
      {
        id: 2,
        name: "Server Down",
        description: "Main server crashed.",
        priority: "critical",
        status: "inprogress",
        date: "2024-12-09T09:45:00.000Z",
        reportedBy: "Alice Brown",
      },
    ];
    setIncidents(fakeData);
    setFilteredIncidents(fakeData);
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = incidents.filter((incident) => incident.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredIncidents(filtered);
  }, [search, incidents]);

  // Handle Create/Edit Modal submission
  const handleSubmit = () => {
    if (editModal && selectedIncident) {
      // Edit existing incident
      const updatedIncidents = incidents.map((inc) => (inc.id === selectedIncident.id ? { ...selectedIncident, ...formData } : inc));
      setIncidents(updatedIncidents);
    } else {
      // Create new incident
      const newIncident: Incident = {
        ...formData,
        id: incidents.length + 1,
        date: new Date().toISOString(), // Simulate backend date
      };
      setIncidents([...incidents, newIncident]);
    }
    handleCloseModals();
  };

  // Function to handle delete confirmation
  const handleDelete = () => {
    if (selectedIncident) {
      const updatedIncidents = incidents.filter((inc) => inc.id !== selectedIncident.id);
      setIncidents(updatedIncidents);
    }
    setDeleteDialog(false); // Close dialog
  };

  // Function to open the delete dialog
  const openDeleteDialog = (incident: Incident) => {
    setSelectedIncident(incident);
    setDeleteDialog(true);
  };

  const handleOpenEdit = (incident: Incident) => {
    setSelectedIncident(incident);
    setFormData({
      name: incident.name,
      description: incident.description,
      priority: incident.priority,
      status: incident.status,
      reportedBy: incident.reportedBy,
      assignedTo: incident.assignedTo || "",
    });
    setEditModal(true);
  };

  const handleCloseModals = () => {
    setOpenModal(false);
    setEditModal(false);
    setDeleteDialog(false);
    setSelectedIncident(null);
    setFormData({
      name: "",
      description: "",
      priority: "low",
      status: "open",
      reportedBy: "John Doe",
      assignedTo: "",
    });
  };

  // Utility: Get Chip color based on value
  const getChipColor = (value: string) => {
    switch (value) {
      case "low":
      case "open":
        return "success";
      case "medium":
      case "inprogress":
        return "warning";
      case "high":
        return "error";
      case "critical":
      case "resolved":
      case "closed":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Incidentes
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField label="Buscar por nombre" variant="outlined" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
          Crear Incidente
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Prioridad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Reportado Por</TableCell>
              <TableCell>Asignado A</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIncidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.name}</TableCell>
                <TableCell>{incident.description}</TableCell>
                <TableCell>
                  <Chip label={incident.priority} color={getChipColor(incident.priority)} />
                </TableCell>
                <TableCell>
                  <Chip label={incident.status} color={getChipColor(incident.status)} />
                </TableCell>
                <TableCell>{incident.reportedBy}</TableCell>
                <TableCell>{incident.assignedTo || "N/A"}</TableCell>
                <TableCell>{format(new Date(incident.date), "yyyy-MM-dd")}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenEdit(incident)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDeleteDialog(incident)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Create/Edit Modal */}
      <Dialog open={openModal || editModal} onClose={handleCloseModals}>
        <DialogTitle>{editModal ? "Editar Incidente" : "Crear Incidente"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Prioridad"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Incident["priority"] })}
            margin="normal"
          >
            <MenuItem value="low">Baja</MenuItem>
            <MenuItem value="medium">Media</MenuItem>
            <MenuItem value="high">Alta</MenuItem>
            <MenuItem value="critical">Crítica</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label="Estado"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Incident["status"] })}
            margin="normal"
          >
            <MenuItem value="open">Abierto</MenuItem>
            <MenuItem value="inprogress">En progreso</MenuItem>
            <MenuItem value="resolved">Resuelto</MenuItem>
            <MenuItem value="closed">Cerrado</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label="Asignado A"
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            margin="normal"
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.name}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModals}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteDialog
        open={deleteDialog}
        title="Eliminar Incidente"
        message={`¿Estás seguro de que deseas eliminar el incidente "${selectedIncident?.name}"?`}
        onClose={() => setDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default Dashboard;
