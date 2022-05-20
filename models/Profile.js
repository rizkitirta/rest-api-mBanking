
module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nik: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nama_depan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nama_belakang: {
            type: DataTypes.STRING,
            allowNull: true
        },
        no_hp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tanggal_lahir: {
            type: DataTypes.DATE,
            allowNull: true,
            // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        tempat_lahir: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true,
        },
    }, {
        tableName: 'profile',
        classMethods: {
            associate: function (models) {
                Profile.belongsTo(models.User, {foreignKey: 'id'});
            }
        }
    })

    return Profile;
}