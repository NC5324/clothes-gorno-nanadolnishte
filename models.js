import { DataTypes } from 'sequelize'
import db from './connection.js'

const Furniture = db.define('Furniture', {
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
    old_price: {
        type: DataTypes.REAL
    },
    new_price: {
        type: DataTypes.REAL
    },
}, {
    tableName: 'furniture',
    updatedAt: false,
    createdAt: true
})

const Category = db.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'category',
    timestamps: false
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
    display_name: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tag',
    timestamps: false
})

const FurnitureCategory = db.define('FurnitureCategory', {
    FurnitureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Furniture,
            key: 'id'
        },
        field: 'furniture_id'
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Category,
            key: 'id'
        },
        field: 'category_id'
    }
}, {
    tableName: 'furniture_category',
    timestamps: false
})

Furniture.belongsToMany(Category, {
    through: FurnitureCategory
})
Category.belongsToMany(Furniture, {
    through: FurnitureCategory
})

const FurnitureImage = db.define('FurnitureImage', {
    FurnitureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Furniture,
            key: 'id'
        },
        field: 'furniture_id'
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
    tableName: 'furniture_image',
    timestamps: false
})

Furniture.belongsToMany(Image, {
    through: FurnitureImage
})
Image.belongsToMany(Furniture, {
    through: FurnitureImage
})

const FurnitureTag = db.define('FurnitureTag', {
    FurnitureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Furniture,
            key: 'id'
        },
        field: 'furniture_id'
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
    tableName: 'furniture_tag',
    timestamps: false
})

Furniture.belongsToMany(Tag, {
    through: FurnitureTag
})
Tag.belongsToMany(Furniture, {
    through: FurnitureTag
})

const CategoryTag = db.define('CategoryTag', {
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Category,
            key: 'id'
        },
        field: 'category_id'
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
    tableName: 'category_tag',
    timestamps: false
})

Category.belongsToMany(Tag, {
    through: CategoryTag
})
Tag.belongsToMany(Category, {
    through: CategoryTag
})

const options = {
    force: true,
    alter: true
}

function syncModels() {
    db.sync(options)
}

export { Furniture, Category, Image, Tag, FurnitureCategory, FurnitureImage, FurnitureTag, CategoryTag, syncModels }
