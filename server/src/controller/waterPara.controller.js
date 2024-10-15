import Pond from '../models/pond.model.js';
import WaterPara from '../models/waterPara.model.js';
 // Để kiểm tra sự tồn tại của Pond

// Tạo một thông số nước mới
export const createWaterPara = async (req, res) => {
  const {
    pondId,
    temperature,
    pondSaltLevel,
    pondPHLevel,
    pondOxygenLevel,
    pondNitrite,
    pondNitrate,
    pondPhosphate,
  } = req.body;

  // Kiểm tra các trường bắt buộc
  if (
    pondId === undefined ||
    temperature === undefined ||
    pondSaltLevel === undefined ||
    pondPHLevel === undefined ||
    pondOxygenLevel === undefined ||
    pondNitrite === undefined ||
    pondNitrate === undefined ||
    pondPhosphate === undefined
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Kiểm tra xem Pond có tồn tại không
    const pond = await Pond.findByPk(pondId);
    if (!pond) {
      return res.status(404).json({ message: 'Pond not found' });
    }

    // Tạo mới WaterPara
    const newWaterPara = await WaterPara.create({
      pondId,
      temperature,
      // recordDate sẽ được tự động gán bởi defaultValue: DataTypes.NOW
      pondSaltLevel,
      pondPHLevel,
      pondOxygenLevel,
      pondNitrite,
      pondNitrate,
      pondPhosphate,
    });

    res.status(201).json(newWaterPara);
  } catch (err) {
    console.error('Error creating water parameter:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy tất cả các thông số nước
export const getAllWaterParas = async (req, res) => {
  try {
    const waterParas = await WaterPara.findAll({
      include: {
        model: Pond,
        attributes: ['pondId', 'pondName'], // Lấy một số trường từ Pond nếu cần
      },
    });
    res.status(200).json(waterParas);
  } catch (err) {
    console.error('Error fetching water parameters:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy thông số nước mới nhất theo pond ID
export const getWaterParaByPondId = async (req, res) => {
  const { pondId } = req.params; // Lấy pondId từ tham số yêu cầu
  
  if (!pondId) {
    return res.status(400).json({ message: 'Pond ID is required' });
  }

  try {
    const waterParam = await WaterPara.findOne({
      where: { pondId }, // Tìm kiếm thông số nước theo pondId
      include: {
        model: Pond,
        attributes: ['pondId', 'pondName'], // Lấy một số trường từ Pond nếu cần
      },
      order: [['recordDate', 'DESC']], // Sắp xếp theo recordDate giảm dần
      limit: 1, // Giới hạn chỉ trả về một bản ghi (mới nhất)
    });

    if (!waterParam) {
      return res.status(404).json({ message: 'No water parameters found for this pond' });
    }

    res.status(200).json(waterParam); // Trả về thông số nước mới nhất
  } catch (err) {
    console.error('Error fetching water parameters:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
  

// Cập nhật thông số nước
export const updateWaterPara = async (req, res) => {
  const { id } = req.params;
  const {
    temperature,
    pondSaltLevel,
    pondPHLevel,
    pondOxygenLevel,
    pondNitrite,
    pondNitrate,
    pondPhosphate,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Water Parameter ID is required' });
  }

  try {
    const waterPara = await WaterPara.findByPk(id);

    if (!waterPara) {
      return res.status(404).json({ message: 'Water Parameter not found' });
    }

    // Cập nhật các trường nếu chúng được cung cấp trong request body
    await waterPara.update({
      temperature:
        temperature !== undefined ? temperature : waterPara.temperature,
      pondSaltLevel:
        pondSaltLevel !== undefined
          ? pondSaltLevel
          : waterPara.pondSaltLevel,
      pondPHLevel:
        pondPHLevel !== undefined ? pondPHLevel : waterPara.pondPHLevel,
      pondOxygenLevel:
        pondOxygenLevel !== undefined
          ? pondOxygenLevel
          : waterPara.pondOxygenLevel,
      pondNitrite:
        pondNitrite !== undefined ? pondNitrite : waterPara.pondNitrite,
      pondNitrate:
        pondNitrate !== undefined ? pondNitrate : waterPara.pondNitrate,
      pondPhosphate:
        pondPhosphate !== undefined
          ? pondPhosphate
          : waterPara.pondPhosphate,
      recordDate: new Date(),
      // recordDate không nên cập nhật lại, nếu cần thì thêm logic riêng
    });

    res
      .status(200)
      .json({ message: 'Water Parameter updated successfully', waterPara });
  } catch (err) {
    console.error('Error updating water parameter:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa thông số nước
export const deleteWaterPara = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Water Parameter ID is required' });
  }

  try {
    const waterPara = await WaterPara.findByPk(id);

    if (!waterPara) {
      return res.status(404).json({ message: 'Water Parameter not found' });
    }

    await waterPara.destroy();
    res.status(200).json({ message: 'Water Parameter deleted successfully' });
  } catch (err) {
    console.error('Error deleting water parameter:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getAllWaterParaRecordByPondId = async (req, res) => {
  const { pondId } = req.params; // Lấy pondId từ tham số yêu cầu

  if (!pondId) {
    return res.status(400).json({ message: 'Pond ID is required' });
  }

  try {
    const waterParas = await WaterPara.findAll({
      where: { pondId }, // Tìm kiếm thông số nước theo pondId
      include: {
        model: Pond,
        attributes: ['pondId', 'pondName'], // Lấy một số trường từ Pond nếu cần
      },
      order: [['recordDate', 'DESC']], // Sắp xếp theo recordDate giảm dần
    });

    if (waterParas.length === 0) {
      return res.status(404).json({ message: 'No water parameters found for this pond' });
    }

    res.status(200).json(waterParas); // Trả về danh sách thông số nước
  } catch (err) {
    console.error('Error fetching water parameters:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
