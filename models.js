import { DataTypes } from 'sequelize'
import db from './connection.js'

const Clothing = db.define('Clothing', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price2: {
        type: DataTypes.REAL
    },
    price: {
        type: DataTypes.REAL
    },
}, {
    tableName: 'clothing',
    updatedAt: false,
    createdAt: true
})

const Image = db.define('Image', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'image',
    timestamps: false,
})

const Tag = db.define('Tag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    code: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tag',
    timestamps: false
})

const ClothingImage = db.define('ClothingImage', {
    ClothingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Clothing,
            key: 'id'
        },
        field: 'clothing_id'
    },
    ImageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Image,
            key: 'id'
        },
        field: 'image_id'
    }
}, {
    tableName: 'clothing_image',
    timestamps: false
})

Clothing.belongsToMany(Image, {
    through: ClothingImage
})
Image.belongsToMany(Clothing, {
    through: ClothingImage
})

const ClothingTag = db.define('ClothingTag', {
    ClothingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Clothing,
            key: 'id'
        },
        field: 'clothing_id'
    },
    TagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Tag,
            key: 'id'
        },
        field: 'tag_id'
    }
}, {
    tableName: 'clothing_tag',
    timestamps: false
})

Clothing.belongsToMany(Tag, {
    through: ClothingTag
})
Tag.belongsToMany(Clothing, {
    through: ClothingTag
})

async function syncModels() {
    try {
        await db.sync()
    } catch(err) {
        console.log(err)
    }
}

export { Clothing, Image, Tag, ClothingImage, ClothingTag, syncModels }
