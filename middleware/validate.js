const validateUser = (req, res, next) => {
    const { name, email, age } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    if (typeof age !== 'number') {
      return res.status(400).json({ message: 'Age must be a number' });
    }
    if (typeof name !== 'string') {
      return res.status(400).json({ message: 'Name Invalid' });
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    next();
  };
  
  module.exports = { validateUser };