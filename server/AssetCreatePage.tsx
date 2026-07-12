import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AssetCreatePage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [form, setForm] = useState({
        name: "",
        categoryId: "",
        serialNumber: "",
        acquisitionDate: "",
        acquisitionCost: "",
        condition: "",
        location: "",
        departmentId: "",
        isBookable: false,
        file: null as File | null,
    });

    useEffect(() => {
        axios.get("/api/assetcategories").then((res) => setCategories(res.data));
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("categoryId", form.categoryId);
        if (form.serialNumber) fd.append("serialNumber", form.serialNumber);
        if (form.acquisitionDate) fd.append("acquisitionDate", form.acquisitionDate);
        if (form.acquisitionCost) fd.append("acquisitionCost", form.acquisitionCost);
        if (form.condition) fd.append("condition", form.condition);
        if (form.location) fd.append("location", form.location);
        if (form.departmentId) fd.append("departmentId", form.departmentId);
        fd.append("isBookable", String(form.isBookable));
        if (form.file) fd.append("file", form.file);

        await axios.post("/api/assets", fd, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    };

    return (
        <form onSubmit={submit} style={{ padding: 24 }}>
            <h2>Create Asset</h2>

            <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            >
                <option value="">Select Category</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <input
                placeholder="Serial Number"
                value={form.serialNumber}
                onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
            />

            <input
                type="date"
                value={form.acquisitionDate}
                onChange={(e) => setForm({ ...form, acquisitionDate: e.target.value })}
            />

            <input
                placeholder="Acquisition Cost"
                type="number"
                value={form.acquisitionCost}
                onChange={(e) => setForm({ ...form, acquisitionCost: e.target.value })}
            />

            <input
                placeholder="Condition"
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
            />

            <input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <input
                type="file"
                onChange={(e) =>
                    setForm({ ...form, file: e.target.files?.[0] ?? null })
                }
            />

            <label>
                <input
                    type="checkbox"
                    checked={form.isBookable}
                    onChange={(e) => setForm({ ...form, isBookable: e.target.checked })}
                />
                Shared / Bookable
            </label>

            <button type="submit">Save</button>
        </form>
    );
}