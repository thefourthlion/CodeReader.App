const QRCode = require("../models/QRCode");
exports.createQRCode = async (req, res) => {
  try {
    const newQRCode = await QRCode.create({
      userId: req.body.userId,
      data: req.body.data,
      type: req.body.type || 'text',
      title: req.body.title || null,
    });
    res.status(201).json(newQRCode);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.readQRCode = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 100;
  const offset = page * limit;
  const userId = req.query.userId;
  
  try {
    const whereClause = userId ? { userId } : {};
    const result = await QRCode.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    res.json({ data: result.rows, total: result.count, page, limit });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.readQRCodeFromID = async (req, res) => {
  try {
    const result = await QRCode.findByPk(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.updateQRCode = async (req, res) => {
  try {
    const [updated] = await QRCode.update(
      { url: req.body.url, qr: req.body.qr, title: req.body.title },
      { where: { id: req.params.id }, returning: true }
    );
    if (updated === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    const result = await QRCode.findByPk(req.params.id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.deleteQRCode = async (req, res) => {
  try {
    const deleted = await QRCode.destroy({ where: { id: req.params.id } });
    if (deleted === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
