const logoutController = {};
logoutController.logout = async (req, res)=>{
    res.clearCookies("authToken")

    return res.json({message: "Cerraste sesión correctamente"});

};

export default logoutController