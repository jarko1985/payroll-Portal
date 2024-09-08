const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "No Token" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.json(err);
  }
};

export { verifyUser };
