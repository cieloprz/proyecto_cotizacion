"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBGO, getConsumibles, getReactivos, getCuantificaciones, getBGOConsumibles, createBGOConsumible, updateBGOConsumible, deleteBGOConsumible } from "../api-costos";
import { Pagination, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem } from "@mui/material";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Search from "@/app/costos/ui/search"; // Componente de búsqueda
import { inter } from '@/app/costos/ui/fonts';


interface BGOConsumible {
    id?: number;
    bgo: number;
    consumible?: number | null;
    reactivo?: number | null;
    cuantificacion?: number | null;
    cantidad: number;
    costo: number;
}

interface BufferGelOligo {
    id: number;
    nombre: string;
}

interface Material {
    id: number;
    nombre: string;
    costo: number;
}

export default function BGOConsumiblePage() {
    const queryClient = useQueryClient();
    const { data: buffersGelOligo = [] } = useQuery<BufferGelOligo[]>({ queryKey: ["buffersGelOligo"], queryFn: getBGO });
    const { data: consumibles = [] } = useQuery<Material[]>({ queryKey: ["consumibles"], queryFn: getConsumibles });
    const { data: reactivos = [] } = useQuery<Material[]>({ queryKey: ["reactivos"], queryFn: getReactivos });
    const { data: cuantificaciones = [] } = useQuery<Material[]>({ queryKey: ["cuantificaciones"], queryFn: getCuantificaciones });
    const { data: bgoConsumibles = [] } = useQuery<BGOConsumible[]>({ queryKey: ["bgoConsumibles"], queryFn: getBGOConsumibles });

    const createMutation = useMutation({
        mutationFn: (data: BGOConsumible) => createBGOConsumible(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bgoConsumibles"] })
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: BGOConsumible }) => updateBGOConsumible(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bgoConsumibles"] })
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteBGOConsumible(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bgoConsumibles"] })
    });

    const [open, setOpen] = useState(false);
    const [editando, setEditando] = useState(false);
    const [bgoConsumibleId, setBGOConsumibleId] = useState<number | null>(null);
    const [selectedBGO, setSelectedBGO] = useState<number | "">("");
    const [selectedMaterial, setSelectedMaterial] = useState<{ type: string; id: number | "" }>({ type: "", id: "" });
    const [cantidad, setCantidad] = useState(0);
    const [costo, setCosto] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const handleOpen = () => {
        setEditando(false);
        setBGOConsumibleId(null);
        setSelectedBGO("");
        setSelectedMaterial({ type: "", id: "" });
        setCantidad(0);
        setCosto(0);
        setOpen(true);
    };

    const handleClose = () => {
        setBGOConsumibleId(null);
        setEditando(false);
        setOpen(false);
    };

    const handleEdit = (bc: BGOConsumible) => {
        setEditando(true);
        setBGOConsumibleId(bc.id && !isNaN(Number(bc.id)) ? Number(bc.id) : null);
        setSelectedBGO(bc.bgo);
        setCantidad(bc.cantidad);
        setCosto(bc.costo);

        const tipoMaterial =
            bc.consumible ? "consumible" :
                bc.reactivo ? "reactivo" :
                    bc.cuantificacion ? "cuantificacion" : "";

        setSelectedMaterial({ type: tipoMaterial, id: bc.consumible || bc.reactivo || bc.cuantificacion || "" });

        setOpen(true);
    };

    const handleSubmit = async () => {
        if (!selectedBGO || !selectedMaterial.id) {
            console.error("❌ Error: Debes seleccionar un Buffer/Gel/Oligo y un material.");
            return;
        }

        const newBGOConsumible: BGOConsumible = {
            bgo: selectedBGO,
            cantidad: Number(cantidad),
            costo: 0, // El backend calculará el costo
            consumible: selectedMaterial.type === "consumible" ? selectedMaterial.id : null,
            reactivo: selectedMaterial.type === "reactivo" ? selectedMaterial.id : null,
            cuantificacion: selectedMaterial.type === "cuantificacion" ? selectedMaterial.id : null
        };

        try {
            if (editando && bgoConsumibleId !== null && !isNaN(bgoConsumibleId)) {
                await updateMutation.mutateAsync({ id: bgoConsumibleId, data: newBGOConsumible });
            } else {
                await createMutation.mutateAsync(newBGOConsumible);
            }

            handleClose();
            queryClient.invalidateQueries({ queryKey: ["bgoConsumibles"] });
        } catch (error) {
            console.error("⚠️ Error en la mutación:", error);
        }
    };

    const getMaterialList = () => {
        switch (selectedMaterial.type) {
            case "consumible":
                return consumibles;
            case "reactivo":
                return reactivos;
            case "cuantificacion":
                return cuantificaciones;
            default:
                return [];
        }
    };

    return (
        <div className="ml-20 md:ml-1 p-4 md:p-2 mx-auto transition-all duration-300">
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${inter.className} text-2xl`}>Gestión de BGOConsumibles</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Buscar..." onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        <PlusIcon className="h-5 md:ml-4" />
                        Agregar
                    </Button>
                </div>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Buffer/Gel/Oligo</TableCell>
                            <TableCell>Material</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Costo</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bgoConsumibles.map((bc) => (
                            <TableRow key={bc.id}>
                                <TableCell>{bc.id}</TableCell>
                                <TableCell>{bc.bgo}</TableCell>
                                <TableCell>{bc.consumible ? "Consumible" : bc.reactivo ? "Reactivo" : bc.cuantificacion ? "Cuantificación" : "N/A"}</TableCell>
                                <TableCell>{bc.cantidad}</TableCell>
                                <TableCell>${bc.costo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{editando ? "Editar Material del BGOConsumible" : "Agregar Material a BGOConsumible"}</DialogTitle>
                    <DialogContent>
                        {/* Selección de Buffer/Gel/Oligo */}
                        <Select fullWidth value={selectedBGO} onChange={(e) => setSelectedBGO(e.target.value === "" ? "" : Number(e.target.value))}>
                            <MenuItem value="">Seleccionar Buffer/Gel/Oligo</MenuItem>
                            {buffersGelOligo.map((bgo) => (
                                <MenuItem key={bgo.id} value={bgo.id}>{bgo.nombre}</MenuItem>
                            ))}
                        </Select>

                        {/* Selección del Tipo de Material */}
                        <Select fullWidth value={selectedMaterial.type} onChange={(e) => setSelectedMaterial({ type: e.target.value, id: "" })}>
                            <MenuItem value="">Seleccionar Tipo de Material</MenuItem>
                            <MenuItem value="consumible">Consumible</MenuItem>
                            <MenuItem value="reactivo">Reactivo</MenuItem>
                            <MenuItem value="cuantificacion">Cuantificación</MenuItem>
                        </Select>

                        {/* Selección del Material Específico */}
                        <Select
                            fullWidth
                            value={selectedMaterial.id}
                            onChange={(e) =>
                                setSelectedMaterial({ ...selectedMaterial, id: e.target.value === "" ? "" : Number(e.target.value) })
                            }
                        >
                            <MenuItem value="">Seleccionar Material</MenuItem>
                            {getMaterialList().map((m) => (
                                <MenuItem key={m.id} value={m.id}>{m.nombre}</MenuItem>
                            ))}
                        </Select>

                        {/* Cantidad */}
                        <TextField fullWidth type="number" label="Cantidad" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} />

                        {/* Costo (calculado por el backend) */}
                        <TextField fullWidth type="number" label="Costo" value={costo} disabled />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            {editando ? "Actualizar" : "Guardar"}
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </div>
    );
}