import { exec } from "child_process";

export default async function handler(req, res) {
    exec("df -h / | awk 'NR==2 {print $2, $3, $4}'", (error, stdout, stderr) => {
        if (error) {
            console.error("Command execution error:", error);
            console.error("stderr:", stderr);
            return res.status(500).json({ error: "Failed to retrieve storage info" });
        }

        try {
            const [size, used, available] = stdout.trim().split(/\s+/);
            const totalStorage = parseFloat(size.replace(/[A-Za-z]/g, ""));
            const usedStorage = parseFloat(used.replace(/[A-Za-z]/g, ""));
            const freeStorage = parseFloat(available.replace(/[A-Za-z]/g, ""));

            res.status(200).json({
                totalStorage: totalStorage.toFixed(2),
                usedStorage: usedStorage.toFixed(2),
                freeStorage: freeStorage.toFixed(2),
            });
        } catch (err) {
            console.error("Error processing storage info:", err);
            res.status(500).json({ error: "Error processing storage info" });
        }
    });
}
