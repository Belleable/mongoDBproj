export const logout = async (req, res) => {
    try {
        res.clearCookie("userRegistered");
        res.json({ status: "success", success: "Logout"});
    } catch (error) {
        res.status(404).json({ error: "Error" });
    }
}