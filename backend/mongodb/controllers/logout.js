export const logout = async (req, res) => {
    try {
        res.clearCookie("userRegistered");
        return res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}
//module.exports = logout;