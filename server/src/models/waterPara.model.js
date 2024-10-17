import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import Pond from './Pond.model.js'; // Giả sử bạn đã định nghĩa model Pond

const WaterPara = sequelize.define('WaterPara', {
  waterParameterId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pondId: { // Khóa ngoại liên kết với Pond
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pond', // Tên bảng Pond trong cơ sở dữ liệu
      key: 'pondId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  temperature: {
    type: DataTypes.DECIMAL(5, 2), // Nhiệt độ có thể có 2 số thập phân
    allowNull: false,
  },
  recordDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  pondSaltLevel: {
    type: DataTypes.DECIMAL(5, 2), // Mức muối trong ao
    allowNull: true,
  },
  pondPHLevel: {
    type: DataTypes.DECIMAL(5, 2), // Độ pH của ao
    allowNull: true,
  },
  pondOxygenLevel: {
    type: DataTypes.DECIMAL(5, 2), // Nồng độ oxy trong ao
    allowNull: true,
  },
  pondNitrite: {
    type: DataTypes.DECIMAL(5, 2), // Nồng độ nitrite trong ao
    allowNull: true,
  },
  pondNitrate: {
    type: DataTypes.DECIMAL(5, 2), // Nồng độ nitrate trong ao
    allowNull: true,
  },
  pondPhosphate: {
    type: DataTypes.DECIMAL(5, 2), // Nồng độ phosphate trong ao
    allowNull: true,
  },
}, {
  tableName: 'water_para',
  timestamps: false, // Không sử dụng createdAt và updatedAt
});

// Thiết lập quan hệ giữa WaterPara và Pond
WaterPara.belongsTo(Pond, { foreignKey: 'pondId' });
Pond.hasMany(WaterPara, { foreignKey: 'pondId' });

export default WaterPara;
