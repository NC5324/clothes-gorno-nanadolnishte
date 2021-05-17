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

const Review = db.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1,
            max: 5
        }
    },
    description: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'review',
    updatedAt: false,
    createdAt: true
})

Clothing.hasMany(Review)
Review.belongsTo(Clothing)

const Order = db.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false,
        defaultValue: 0
    },
    products: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: []
    }
}, {
    tableName: 'orders',
    updatedAt: false,
    createdAt: true
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

export { Clothing, Image, Tag, ClothingImage, ClothingTag, Review,  Order, syncModels }
