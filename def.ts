import { sequelize } from "./conn";

const { DataTypes } = require('sequelize');

const User = sequelize.define(
    'user',
    {
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usertype: {
            type: DataTypes.ENUM('Normal', 'Premium'),
            allowNull: false,
        }
   },
   {
        tableName : 'Users',
        timestamps : false,
   },
);


const Post = sequelize.define(
    'post',
    {
        postid : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true 
        },
        postContent : {
            type : DataTypes.TEXT,
            allowNull : true,
        },
        userid : {
            type : DataTypes.INTEGER,
            references : {
                model : User,
                key : 'userid'
            },
            onDelete : 'CASCADE'
        }
    },
    {
        tableName : 'Posts',
        timestamps : false,
    }
);

const Comment = sequelize.define(
    'Comment', 
    {
        commentid : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        postid : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Post,
                key: 'postid',
            },
            onDelete: 'CASCADE'
        },
        userid  : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userid',
            },
            onDelete: 'CASCADE',
        },
        commentcontent : {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, 
    {
        tableName: 'comments',
        timestamps: false,
    }
);

const Like = sequelize.define(
    'Like', 
    {
        likeid : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        postid : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Post,
                key: 'postid',
            },
            onDelete: 'CASCADE'
        },
        userid : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userid',
            },
            onDelete: 'CASCADE'
        }
    }, 
    {
        tableName: 'likes',
        timestamps: false
    }
);

const Follower = sequelize.define(
    'Follower', 
    {
        followerid : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userid',
            },
            onDelete: 'CASCADE'
        },
        followedid : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userid',
            },
            onDelete: 'CASCADE'
        }
    }, 
    {
        tableName: 'followers',
        timestamps: false,
        primaryKey: ['followerid', 'followedid']
    }
);

const PremiumUser = sequelize.define(
    'PremiumUser', 
    {
        userid : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: User, 
                key: 'userid',
            },
            onDelete: 'CASCADE'
        },
        subscriptionplan : {
            type: DataTypes.ENUM('Silver', 'Gold', 'Daimond', 'Platinum')
        }
    }, 
    {
        tableName: 'premiumusers',
        timestamps: false,
    }
);

const synchronizeModels = async () => {
    try {
        await sequelize.sync({force : true });
        console.log('Successfully created models');
    } catch (err) {
        console.log('An error occured!!', err);
    }
}

const usersArray = [
    { username: 'varun', email: 'varunkumar@gmail.com', usertype: 'Normal' },
    { username: 'vinay', email: 'vinay@gmail.com', usertype: 'Premium' },
    { username: 'usha', email: 'usha@gmail.com', usertype: 'Normal' },
    { username: 'anjani', email: 'anjani@gmail.com', usertype: 'Premium' }
];

const insertData = async() => {
    try{
        
        await User.bulkCreate(usersArray);
        console.log('Successfully inserted data into users table.');
    } catch(err) {
        console.log('An error occured!!');
    }
}

const initializeDatabase = async() => {
    await synchronizeModels();
    await insertData();
}

initializeDatabase();
export { User, Post, Comment, Like, Follower, PremiumUser};