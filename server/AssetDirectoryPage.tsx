import React, { useEffect, useState } from "react";
import axios from "axios";

type AssetRow = {
    id: number;
    assetTag: string;
    name: string;
    categoryName?: string;
    serialNumber?: string;
    location?: string;
    departmentName?: string;
    status: string;
    isBookable: boolean;
};

export default function AssetDirectoryPage() {
    const [assets, setAssets] = useState<AssetRow[]>([]);
    const [assetTag, setAssetTag] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [location, setLocation] = useState("");

    const load = async () => {
        const res = await axios.get("/api/assets", {
            params: { assetTag, serialNumber, location },
        });
        setAssets(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h2>Asset Directory</h2>

            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <input placeholder="Asset Tag" value={assetTag} onChange={(e) => setAssetTag(e.target.value)} />
                <input placeholder="Serial Number" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
                <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <button onClick={load}>Search</button>
            </div>

            <table width="100%" cellPadding={8} border={1}>
                <thead>
                    <tr>
                        <th>Tag</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Serial</th>
                        <th>Status</th>
                        <th>Location</th>
                        <th>Bookable</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((a) => (
                        <tr key={a.id}>
                            <td>{a.assetTag}</td>
                            <td>{a.name}</td>
                            <td>{a.categoryName}</td>
                            <td>{a.serialNumber}</td>
                            <td>{a.status}</td>
                            <td>{a.location}</td>
                            <td>{a.isBookable ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}