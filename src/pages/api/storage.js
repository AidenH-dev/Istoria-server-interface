import { exec } from "child_process";

export default async function handler(req, res) {
    exec("diskutil info / | grep 'Total Space\\|Free Space'", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${stderr}`);
            return res.status(500).json({ error: "Failed to retrieve storage info" });
        }

        console.log("Raw stdout:", stdout);

        try {
            const lines = stdout.trim().split("\n").map(line => line.trim());
            const totalLine = lines.find(line => line.includes("Container Total Space"));
            const freeLine = lines.find(line => line.includes("Container Free Space"));

            if (!totalLine || !freeLine) {
                throw new Error("Could not find total or free space lines");
            }

            // Extract numeric values
            const totalStorage = parseFloat(totalLine.split(":")[1].trim().replace(/[^0-9.]/g, ""));
            const freeStorage = parseFloat(freeLine.split(":")[1].trim().replace(/[^0-9.]/g, ""));

            // Calculate used storage
            if (isNaN(totalStorage) || isNaN(freeStorage)) {
                throw new Error("Parsed values are not valid numbers");
            }

            const usedStorage = totalStorage - freeStorage;

            console.log(`Calculated Storage: Total=${totalStorage}, Free=${freeStorage}, Used=${usedStorage}`);

            res.status(200).json({
                totalStorage: totalStorage.toFixed(2), // Ensure two decimal places
                usedStorage: usedStorage.toFixed(2),  // Ensure two decimal places
            });
        } catch (err) {
            console.error("Error processing storage info:", err);
            res.status(500).json({ error: "Error processing storage info" });
        }
    });
}

