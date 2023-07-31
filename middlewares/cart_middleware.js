module.exports = async (req, res, next) => {
  try {
    const { cart } = await req.cookies;
    if (!cart) {
      throw new Error('카트 등록을 먼저 해주세요.');
    }
    res.locals.cart = cart;
    next();
  } catch (error) {
    res.clearCookie('cart');
    return res.status(500).json({ error: error.message });
  }
};
